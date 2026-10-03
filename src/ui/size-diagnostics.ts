import {fruits} from '../game/catalog/catalog';
import {spriteGeometry} from '../game/catalog/sizing';
import {config} from '../game/config';
import './size-diagnostics.css';

/** Read-only visual ruler. No game scene or storage adapter is instantiated here. */
export async function mountSizeDiagnostics(){
 const root=document.getElementById('app')!;
 root.className='size-diagnostics';
 root.innerHTML=`<header><p>ФРУКТОВИЙ САД · ПЕРЕВІРКА РОЗМІРІВ</p><h1>30 рівнів. Один масштаб.</h1>
 <p>Внутрішня ширина посудини — 432 px. Зелене коло — фізичний радіус; рожеве — попередній розмір тіла. Листя й хвостики декоративні.</p>
 <label>Масштаб перегляду <select id="size-zoom"><option value="1">100% · 1 ігровий px = 1 px екрана</option><option value="0.7625">76,25% · поле на desktop 1440×900</option><option value="0.7375">73,75% · поле на mobile 390×844</option></select></label>
 <p>На вузькому екрані посунь картку горизонтально. Масштаб однаковий для всіх фруктів. Це діагностика, вона не змінює партію або рекорд.</p></header>
 <main class="size-grid"></main><section class="size-table"><h2>Діаметри тіла та фізики</h2><p>Логічні ігрові px; старе тіло виміряне за калібруванням текстур 256×256. Кругла фізика наближує некруглу форму: коротша вісь може мати зазор.</p>
 <table><thead><tr><th>Рівень / фрукт</th><th>Тіло до</th><th>Фізика до</th><th>Тіло й фізика після</th></tr></thead><tbody>${fruits.map(f=>{const old=24+3*(f.rank-1);return `<tr><th>${f.rank}. ${f.name}</th><td>${(old*f.body.diameter/f.body.sourceSize).toFixed(2)}</td><td>${old.toFixed(2)}</td><td>${(2*f.radius).toFixed(2)}</td></tr>`;}).join('')}</tbody></table></section>`;
 const grid=root.querySelector('.size-grid')!;
 const canvases:HTMLCanvasElement[]=[];
 await Promise.all(fruits.map(async f=>{
  const card=document.createElement('article');
  card.innerHTML=`<h2>${String(f.rank).padStart(2,'0')} · ${f.name}</h2><p>Тіло Ø ${(f.radius*2).toFixed(2)} px</p><div class="size-scroll"><canvas width="480" height="440" aria-label="${f.name}: діаметр ${(f.radius*2).toFixed(2)} пікселів"></canvas></div>`;
  grid.append(card);
  const canvas=card.querySelector('canvas')!;canvases.push(canvas);
  const image=new Image();image.src=f.texture;
  try{await image.decode();}catch{card.append('Не вдалося завантажити зображення');return;}
  const ctx=canvas.getContext('2d')!;const g=spriteGeometry(f);const x=240,y=414-f.radius;
  ctx.strokeStyle='#9aaf90';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(config.left,10);ctx.lineTo(config.left,414);ctx.lineTo(config.right,414);ctx.lineTo(config.right,10);ctx.stroke();
  ctx.drawImage(image,x-g.originX*g.size,y-g.originY*g.size,g.size,g.size);
  ctx.strokeStyle='#326842';ctx.lineWidth=1;ctx.setLineDash([4,4]);ctx.beginPath();ctx.arc(x,y,f.radius,0,Math.PI*2);ctx.stroke();
  ctx.strokeStyle='#bd4774';ctx.setLineDash([2,3]);ctx.beginPath();ctx.arc(x,y,(24+3*(f.rank-1))*f.body.diameter/f.body.sourceSize/2,0,Math.PI*2);ctx.stroke();
  ctx.setLineDash([]);ctx.fillStyle='#326842';ctx.fillRect(x-3,y-1,6,2);ctx.fillRect(x-1,y-3,2,6);
 }));
 const select=root.querySelector<HTMLSelectElement>('#size-zoom')!;
 select.addEventListener('change',()=>{const zoom=Number(select.value);for(const canvas of canvases){canvas.style.width=`${480*zoom}px`;canvas.style.height=`${440*zoom}px`;}});
 root.dataset.ready='true';
}
