// Original vector illustrations, created for this project. No external imagery.
import { readFileSync, mkdirSync, writeFileSync } from 'node:fs';
const fruits=JSON.parse(readFileSync('src/game/catalog/fruits.json','utf8'));
const colors=['#ca4050','#e85e62','#c94f6a','#a7bd62','#f4ae58','#8a639f','#edd35c','#a7c76a','#f0a34e','#efa180','#d96156','#b9bd62','#ec9943','#a28459','#e68542','#c6544e','#a07199','#f1be58','#90a455','#efa867','#a8835f','#e782a8','#d7b961','#e4c27c','#cad49b','#76ac75','#a9c579','#9977ad','#b9bd55','#ddb95a'];
mkdirSync('public/assets/fruits',{recursive:true});
let register='# Реєстр ресурсів\n\n30 оригінальних SVG, створених агентом для цього проєкту 03.10.2026. Зовнішні зображення, шрифти й торгові марки не використані. Генератор збережено в scripts/create-assets.mjs; ресурси поширюються за MIT разом із кодом.\n\n| ID | Назва | Файл | Походження |\n|---|---|---|---|\n';
for(const f of fruits){
 const n=f.rank,c=colors[n-1];let shape='';
 const oval=`<ellipse cx="64" cy="70" rx="44" ry="43" fill="${c}"/>`;
 if([2,3].includes(n)){shape=`<path d="M22 49Q25 29 44 33Q64 23 84 33Q104 29 106 49Q107 78 64 116Q21 78 22 49" fill="${c}"/><path d="M33 30L48 25L62 37L76 22L96 30L83 46L64 40L46 47Z" fill="#5c8a52"/>`;for(const [x,y] of [[38,56],[61,54],[85,55],[49,76],[75,78],[63,97]])shape+=`<ellipse cx="${x}" cy="${y}" rx="2" ry="3" fill="#ffe4a0"/>`;}
 else if(n===1){shape=`<path d="M40 49Q64 20 85 14Q78 41 89 56" fill="none" stroke="#6b7950" stroke-width="5" stroke-linecap="round"/><circle cx="39" cy="77" r="29" fill="#c94152"/><circle cx="87" cy="80" r="29" fill="#dc5560"/>`;}
 else if([12,19,20].includes(n)){shape=`<path d="M49 22Q65 11 80 25Q76 47 99 65Q123 108 67 117Q11 119 24 79Q30 61 46 47Z" fill="${c}"/>`;if(n===19)shape+='<ellipse cx="65" cy="79" rx="22" ry="25" fill="#eadc95"/><ellipse cx="65" cy="82" rx="15" ry="18" fill="#986b44"/>';}
 else if([7,8,9,13,24].includes(n)){shape=oval+`<circle cx="64" cy="72" r="32" fill="#fff0b0" opacity=".75"/><circle cx="64" cy="72" r="26" fill="${c}"/>`;for(let i=0;i<8;i++){const a=i*Math.PI/4;shape+=`<path d="M64 72L${64+27*Math.cos(a)} ${72+27*Math.sin(a)}" stroke="#fff2c8" stroke-width="2"/>`;}}
 else if(n===26||n===30){shape=oval;for(const x of [42,61,80])shape+=`<path d="M${x} 30Q${x-12} 65 ${x} 112" fill="none" stroke="${n===30?'#b3953b':'#4c8257'}" stroke-width="7" opacity=".65"/>`;}
 else if(n===23||n===29){shape=`<ellipse cx="64" cy="77" rx="38" ry="40" fill="${c}"/><path d="M40 43L29 15L52 27L60 5L71 28L98 12L87 43Z" fill="#6c9961"/>`;for(let y=53;y<110;y+=14)shape+=`<path d="M30 ${y}L97 ${y+25}M96 ${y}L30 ${y+25}" stroke="#a59446" opacity=".5" stroke-width="2"/>`;}
 else if(n===14){shape=oval+'<ellipse cx="64" cy="72" rx="34" ry="33" fill="#bcd388"/><ellipse cx="64" cy="72" rx="11" ry="19" fill="#ecedbd"/>';for(let i=0;i<12;i++){const a=i*Math.PI/6;shape+=`<ellipse cx="${64+23*Math.cos(a)}" cy="${72+22*Math.sin(a)}" rx="1.8" ry="2.5" fill="#586848"/>`;}}
 else if(n===21){shape=oval+'<ellipse cx="64" cy="74" rx="32" ry="32" fill="#fff2d5"/><ellipse cx="64" cy="77" rx="25" ry="23" fill="#f3e5c6"/>';}
 else if(n===22){shape=oval+'<ellipse cx="64" cy="73" rx="32" ry="33" fill="#fff1e0"/>';for(const [x,y] of [[48,60],[74,58],[60,70],[82,78],[43,82],[62,91]])shape+=`<circle cx="${x}" cy="${y}" r="2" fill="#624a48"/>`;}
 else{shape=oval;if(n===11||n===10)shape+=`<path d="M64 30Q74 70 65 110" stroke="#a7463833" fill="none" stroke-width="3"/>`;}
 const leaf=[1,2,3,23,29].includes(n)?'':`<path d="M63 31Q61 18 67 12" fill="none" stroke="#6b7950" stroke-width="4" stroke-linecap="round"/><path d="M67 25Q74 5 96 17Q87 35 67 25" fill="#688f54"/>`;
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128"><title>${f.name}</title>${shape}${leaf}<ellipse cx="43" cy="51" rx="7" ry="11" transform="rotate(30 43 51)" fill="#fff" opacity=".24"/><circle cx="53" cy="76" r="3" fill="#3d463b"/><circle cx="77" cy="76" r="3" fill="#3d463b"/><path d="M60 84Q65 89 70 84" fill="none" stroke="#3d463b" stroke-width="2.5" stroke-linecap="round"/></svg>`;
 writeFileSync(`public/${f.texture}`,svg);
 register+=`| ${f.id} | ${f.name} | [SVG](../public/${f.texture}) | Оригінальна векторна ілюстрація |\n`;
}
writeFileSync('docs/asset-register.md',register);
