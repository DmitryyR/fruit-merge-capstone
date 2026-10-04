"""Generate real Ukrainian male speech and timestamped boundaries, with system TLS trust."""
import asyncio, json, os, re, subprocess, sys
from pathlib import Path
ROOT=Path(__file__).resolve().parents[2]
sys.path.insert(0,str(ROOT/'.local/video-python'))
import truststore
truststore.inject_into_ssl()
import edge_tts, imageio_ffmpeg

FFMPEG=imageio_ffmpeg.get_ffmpeg_exe()
RAW=ROOT/'artifacts/capstone/raw'
RAW.mkdir(parents=True,exist_ok=True)
segments=json.loads((ROOT/'docs/submission/narration-segments.json').read_text(encoding='utf-8'))

def duration(path):
    result=subprocess.run([FFMPEG,'-hide_banner','-i',str(path),'-f','null','-'],capture_output=True,text=True,encoding='utf-8',errors='replace')
    if result.returncode: raise RuntimeError(result.stderr)
    match=re.search(r'Duration: (\d+):(\d+):([\d.]+)',result.stderr)
    return int(match[1])*3600+int(match[2])*60+float(match[3])

async def main():
    voices=await edge_tts.list_voices()
    voice=next(v for v in voices if v['ShortName']=='uk-UA-OstapNeural')
    assert voice['Gender']=='Male'
    (RAW/'voice-metadata.json').write_text(json.dumps(voice,ensure_ascii=False,indent=2),encoding='utf-8')
    for n,segment in enumerate(segments):
        path=RAW/f'{n+1:02}-{segment["id"]}.mp3'
        boundaries=[]
        communicate=edge_tts.Communicate(segment['text'],voice='uk-UA-OstapNeural',rate=os.environ.get('CAPSTONE_VOICE_RATE','-3%'),boundary='WordBoundary')
        with path.open('wb') as audio:
            async for chunk in communicate.stream():
                if chunk['type']=='audio':audio.write(chunk['data'])
                elif chunk['type']=='WordBoundary':boundaries.append({k:v for k,v in chunk.items() if k!='type'})
        (RAW/f'{n+1:02}-{segment["id"]}-boundaries.json').write_text(json.dumps(boundaries,ensure_ascii=False,indent=2),encoding='utf-8')
        segment['audio']=str(path.relative_to(ROOT)).replace('\\','/')
        segment['duration']=duration(path)
        print(segment['id'],segment['duration'],flush=True)
    manifest={'voice':'uk-UA-OstapNeural','gender':'Male','rate':os.environ.get('CAPSTONE_VOICE_RATE','-3%'),'segments':segments,'speechSeconds':sum(s['duration'] for s in segments)}
    (RAW/'narration-manifest.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2),encoding='utf-8')
    (ROOT/'docs/submission/narration-ua.txt').write_text('\n\n'.join(s['text'] for s in segments)+'\n',encoding='utf-8')
    print('Total:',manifest['speechSeconds'],flush=True)

if __name__=='__main__':asyncio.run(main())
