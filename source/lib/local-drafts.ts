import type {SavedDraft,WritingSnapshot} from './writing-draft';
const key=(id:string)=>'owl-ielts-draft-v1-'+id;
export function readLocalDraft(id:string):SavedDraft|null{
 const raw=localStorage.getItem(key(id));if(!raw)return null;
 let value:SavedDraft;try{value=JSON.parse(raw);}catch{throw new Error('本机草稿无法读取，请先复制练习稿备份。');}
 if(!value||typeof value.body!=='string'||!Number.isFinite(value.elapsedSeconds)||value.elapsedSeconds<0||typeof value.updatedAt!=='string'||!Number.isFinite(Date.parse(value.updatedAt)))throw new Error('本机草稿格式有误，请先复制练习稿备份。');
 return value;
}
export function saveLocalDraft(id:string,snapshot:WritingSnapshot):SavedDraft{
 const draft={...snapshot,updatedAt:new Date().toISOString()};
 try{localStorage.setItem(key(id),JSON.stringify(draft));}catch{throw new Error('浏览器暂时无法保存，请用“复制练习稿”备份正文。');}
 return draft;
}
