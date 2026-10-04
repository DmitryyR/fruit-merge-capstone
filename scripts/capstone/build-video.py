"""Reproducible 1080p H.264/AAC edit, timed from actual Microsoft TTS word boundaries."""
import json,math,re,subprocess,sys,textwrap,hashlib
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'.local/video-python'))
import imageio_ffmpeg
FF=imageio_ffmpeg.get_ffmpeg_exe()
OUT=ROOT/'artifacts/capstone'; RAW=OUT/'raw'
manifest=json.loads((RAW/'narration-manifest.json').read_text(encoding='utf8'))
record=json.loads((RAW/'recording.json').read_text(encoding='utf8'))
segments=manifest['segments']; total=0
for s in segments:
    s['start']=total;s['length']=math.ceil((s['duration']+.2)*30)/30;total+=s['length']

def run(args,log):
    result=subprocess.run([FF,'-hide_banner','-y',*args],cwd=RAW,capture_output=True,text=True,encoding='utf8',errors='replace')
    (RAW/log).write_text(result.stdout+result.stderr,encoding='utf8')
    if result.returncode:raise RuntimeError(f'{log}: {result.stderr[-2000:]}')
    return result.stderr

def stamp(t,ass=False):
    n=round(t*(100 if ass else 1000));rate=100 if ass else 1000
    h,n=divmod(n,3600*rate);m,n=divmod(n,60*rate);s,n=divmod(n,rate)
    return f'{h}:{m:02}:{s:02}.{n:02}' if ass else f'{h:02}:{m:02}:{s:02},{n:03}'

captions=[]
for n,s in enumerate(segments):
    words=json.loads((RAW/f'{n+1:02}-{s["id"]}-boundaries.json').read_text(encoding='utf8'))
    # Recover punctuation from the authored transcript; never synthesize timing from word count.
    cursor=0
    for w in words:
        pos=s['text'].casefold().find(w['text'].casefold(),cursor)
        if pos>=0:
            end=pos+len(w['text']);punct=re.match(r'[.,;:!?…]*',s['text'][end:])[0]
            w['display']=s['text'][pos:end]+punct;cursor=end+len(punct)
        else:w['display']=w['text']
    group=[]
    def flush():
        if not group:return
        t0=s['start']+group[0]['offset']/1e7;t1=s['start']+(group[-1]['offset']+group[-1]['duration'])/1e7+.08
        text=' '.join(w['display'] for w in group)
        lines=textwrap.wrap(text,width=48,break_long_words=False,break_on_hyphens=False)
        assert len(lines)<=2,(s['id'],lines)
        captions.append((t0,t1,'\n'.join(lines)));group.clear()
    for w in words:
        candidate=group+[w]
        chars=len(' '.join(v['display'] for v in candidate))
        elapsed=(w['offset']+w['duration']-candidate[0]['offset'])/1e7
        if group and (len(textwrap.wrap(' '.join(v['display'] for v in candidate),width=48,break_long_words=False,break_on_hyphens=False))>2 or elapsed>6):flush()
        group.append(w)
        if w['display'].endswith(('.', '!', '?')) and elapsed>1.4:flush()
    flush()
for i in range(len(captions)-1):
    a,b,t=captions[i];captions[i]=(a,min(b,captions[i+1][0]-.03),t)
srt='\n\n'.join(f'{i+1}\n{stamp(a)} --> {stamp(b)}\n{t}' for i,(a,b,t) in enumerate(captions))+'\n'
(OUT/'Fruit_Merge_Capstone_Final_UA.srt').write_text(srt,encoding='utf8')
(ROOT/'docs/submission/captions-ua.srt').write_text(srt,encoding='utf8')
ass='''[Script Info]
ScriptType: v4.00+
PlayResX: 1920
PlayResY: 1080
WrapStyle: 2
[V4+ Styles]
Format: Name, Fontname, Fontsize, PrimaryColour, SecondaryColour, OutlineColour, BackColour, Bold, Italic, Underline, StrikeOut, ScaleX, ScaleY, Spacing, Angle, BorderStyle, Outline, Shadow, Alignment, MarginL, MarginR, MarginV, Encoding
Style: Caption,Segoe UI,38,&H00FFFFFF,&H00FFFFFF,&H00101E21,&H00101E21,0,0,0,0,100,100,0,0,1,1,0,2,130,130,32,1
Style: Label,Segoe UI,26,&H00F1DCA0,&H00FFFFFF,&H00101E21,&H00101E21,0,0,0,0,100,100,0,0,1,1,0,8,50,50,15,1
[Events]
Format: Layer, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text
'''
for a,b,t in captions:ass+=f'Dialogue: 0,{stamp(a,True)},{stamp(b,True)},Caption,,0,0,0,,{t.replace(chr(10),chr(92)+"N")}\n'
gameDuration=sum(s['length'] for s in segments[:2])
ass+=f'Dialogue: 0,0:00:00.00,{stamp(gameDuration,True)},Label,,0,0,0,,ТЕСТОВИЙ СЦЕНАРІЙ · справжні події миші та фізичні зіткнення\n'
(RAW/'captions.ass').write_text(ass,encoding='utf8')

# Decode and concatenate, with exact scene padding. Two-pass loudness normalization.
inputs=[];filters=[]
for i,s in enumerate(segments):
    inputs+=['-i',str(ROOT/s['audio'])]
    filters.append(f'[{i}:a]aresample=48000,apad,atrim=duration={s["length"]},asetpts=PTS-STARTPTS[a{i}]')
filters.append(''.join(f'[a{i}]' for i in range(6))+'concat=n=6:v=0:a=1[a]')
run([*inputs,'-filter_complex',';'.join(filters),'-map','[a]','-c:a','pcm_s16le','speech-unmixed.wav'],'audio-concat.log')
stats=run(['-i','speech-unmixed.wav','-af','loudnorm=I=-16:TP=-2:LRA=11:print_format=json','-f','null','-'],'loudness-pass1.log')
stats=json.loads(re.findall(r'\{[^{}]+\}',stats)[-1])
norm=f'loudnorm=I=-16:TP=-2:LRA=11:measured_I={stats["input_i"]}:measured_TP={stats["input_tp"]}:measured_LRA={stats["input_lra"]}:measured_thresh={stats["input_thresh"]}:offset={stats["target_offset"]}:linear=true:print_format=json'
run(['-i','speech-unmixed.wav','-af',norm,'-ar','48000','-c:a','pcm_s16le','narration-master.wav'],'loudness-pass2.log')
run(['-i','narration-master.wav','-c:a','libmp3lame','-b:a','192k',str(OUT/'Fruit_Merge_Capstone_Narration_UA.mp3')],'mp3-encode.log')

run(['-ss',str(record['gameplayTrimStart']),'-i','gameplay.webm','-t',str(gameDuration),'-an','-vf','fps=30,setsar=1','-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','scene-game.mp4'],'game-encode.log')
for s in segments[2:]:
    run(['-loop','1','-framerate','30','-i',s['id']+'.png','-t',str(s['length']),'-an','-c:v','libx264','-preset','fast','-crf','18','-pix_fmt','yuv420p',f'scene-{s["id"]}.mp4'],f'{s["id"]}-encode.log')
(RAW/'video-concat.txt').write_text('\n'.join(f"file 'scene-{sid}.mp4'" for sid in ['game',*[s['id'] for s in segments[2:]]]),encoding='utf8')
run(['-f','concat','-safe','0','-i','video-concat.txt','-c','copy','silent-edit.mp4'],'video-concat.log')
final=OUT/'Fruit_Merge_Capstone_Final_UA.mp4'
run(['-i','silent-edit.mp4','-i','narration-master.wav','-vf',f"drawbox=x=0:y=942:w=iw:h=138:color=0x101e21@0.97:t=fill,drawbox=x=0:y=0:w=iw:h=60:color=0x101e21@0.97:t=fill:enable='lt(t,{gameDuration})',ass=captions.ass",'-map','0:v:0','-map','1:a:0','-t',str(total),'-c:v','libx264','-preset','fast','-crf','19','-pix_fmt','yuv420p','-c:a','aac','-b:a','192k','-movflags','+faststart',str(final)],'final-encode.log')
probe=run(['-i',str(final),'-f','null','-'],'final-decode.log')
run(['-i',str(final),'-vf','blackdetect=d=0.1:pix_th=0.02','-af','loudnorm=I=-16:TP=-1.5:LRA=11:print_format=json','-f','null','-'],'final-av-quality.log')
for s in segments:
    run(['-ss',str(s['start']+s['length']/2),'-i',str(final),'-frames:v','1','-update','1',f'final-{s["id"]}.png'],f'frame-{s["id"]}.log')
for label,t in [('merge',segments[1]['start']+9),('pause',segments[1]['start']+13.4),('restart',segments[1]['start']+19)]:
    run(['-ss',str(t),'-i',str(final),'-frames:v','1','-update','1',f'final-{label}.png'],f'frame-{label}.log')
result={'durationSeconds':total,'gameplaySeconds':gameDuration,'interactiveGameplaySeconds':segments[1]['length'],'dimensions':[1920,1080],'fps':30,'segments':segments,'captions':len(captions),'lastCaptionEnd':captions[-1][1],'sha256':hashlib.sha256(final.read_bytes()).hexdigest(),'bytes':final.stat().st_size,'fullDecodeExit':0}
(RAW/'build-manifest.json').write_text(json.dumps(result,ensure_ascii=False,indent=2),encoding='utf8')
print(json.dumps({k:v for k,v in result.items() if k!='segments'},indent=2))
