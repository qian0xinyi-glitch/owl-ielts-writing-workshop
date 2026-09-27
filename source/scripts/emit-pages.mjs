import {readFile,writeFile,mkdir,copyFile} from 'node:fs/promises';
import path from 'node:path';
const content=JSON.parse(await readFile('lib/content.json','utf8'));const training=JSON.parse(await readFile('lib/training-data.json','utf8'));
const routes=['practice','imitation',...content.topics.flatMap(t=>[`library/${t.id}`,...t.blocks.map(b=>`library/${t.id}/${b.id}`)]),...content.questions.map(q=>`practice/${q.id}`),...training.exercises.map(e=>`imitation/${e.id}`)];
for(const route of routes){const dir=path.join('dist',route);await mkdir(dir,{recursive:true});await copyFile('dist/index.html',path.join(dir,'index.html'));}
await copyFile('dist/index.html','dist/404.html');await writeFile('dist/.nojekyll','');
await writeFile('dist/site-version.json',JSON.stringify({version:'2026-09-27-copy-draft',sourceCommit:'7ec2d511af0794507cf052e3f920f8b33cdd28a8',routes:routes.length+1,chains:content.topics.reduce((n,t)=>n+t.blocks.length,0),imitationExercises:training.exercises.length},null,2)+'\n');
console.log(`Created ${routes.length+1} directly accessible GitHub Pages routes.`);
