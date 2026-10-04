import {chromium} from '@playwright/test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const url='https://dmitryyr.github.io/fruit-merge-capstone/capstone.html';
const browser=await chromium.launch();
try{
 const context=await browser.newContext({viewport:{width:1440,height:1100}});
 const page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 const response=await page.goto(url);assert.equal(response.status(),200);
 await page.waitForFunction(()=>document.querySelector('video')?.readyState>=2,{},{timeout:30000});
 const metadata=await page.locator('video').evaluate(v=>({duration:v.duration,width:v.videoWidth,height:v.videoHeight,currentSrc:v.currentSrc,readyState:v.readyState}));
 assert(Math.abs(metadata.duration-113.633333)<.1);assert.equal(metadata.width,1920);assert.equal(metadata.height,1080);
 await page.locator('video').evaluate(async v=>{v.muted=true;await v.play();});
 await page.waitForFunction(()=>document.querySelector('video').currentTime>1);
 await page.locator('video').evaluate(v=>{v.pause();v.currentTime=21.8;});
 await page.waitForFunction(()=>!document.querySelector('video').seeking);
 await page.screenshot({path:'artifacts/capstone/raw/public-player.png'});
 const media=await context.request.get(metadata.currentSrc);assert.equal(media.status(),200);
 const bytes=await media.body(),sha256=createHash('sha256').update(bytes).digest('hex');
 assert.equal(sha256,'2082b9a788e34166d4f69a356b80e1dcca1d969a01d6b64ea9ae943158663e35');
 const files=[];
 for(const name of ['Fruit_Merge_Capstone_Final_UA.mp4','Fruit_Merge_Capstone_Narration_UA.mp3','Fruit_Merge_Capstone_Final_UA.srt']){
  const r=await context.request.get('https://github.com/DmitryyR/fruit-merge-capstone/releases/download/capstone-video-v1/'+name);
  assert.equal(r.status(),200);const body=await r.body();files.push({name,status:r.status(),bytes:body.length,sha256:createHash('sha256').update(body).digest('hex')});
 }
 await page.setViewportSize({width:390,height:844});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(errors,[]);
 const result={checkedAt:new Date().toISOString(),url,httpStatus:200,anonymousContext:true,metadata,playbackAdvanced:true,seekSucceeded:true,sha256,files,mobileOverflow:false,pageerrors:errors};
 await fs.writeFile('docs/evidence/video/public-player.json',JSON.stringify(result,null,2)+'\n');
 console.log(JSON.stringify(result,null,2));
}finally{await browser.close();}
