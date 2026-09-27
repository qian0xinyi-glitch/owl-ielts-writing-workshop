import {SITE_NAME,SITE_NAME_EN} from './brand';
import {countWords,formatTime,questionCategoryLabel,type Question} from './content';

export type SavedDraft={body:string;elapsedSeconds:number;updatedAt:string};
export type WritingSnapshot=Pick<SavedDraft,'body'|'elapsedSeconds'>;

export function formatWritingDraft(question:Question,draft:WritingSnapshot,savedAt?:string){
 const timestamp=savedAt?`保存时间：${new Date(savedAt).toISOString().slice(0,16).replace('T',' ')} UTC`:`复制时间：${new Date().toISOString().slice(0,16).replace('T',' ')} UTC`;
 return [
  `${SITE_NAME} / TASK 2`,
  question.title,
  `${questionCategoryLabel(question)} · ${question.id.toUpperCase()}`,
  `字数：${countWords(draft.body)}`,
  `所用时间：${formatTime(draft.elapsedSeconds)}（分:秒）`,
  timestamp,
  '',
  question.sourceMissing?'题意（源题库未提供英文原题）':'QUESTION',
  question.question,
  '',
  'YOUR WRITING',
  draft.body,
  '',
  `${SITE_NAME_EN} | ${question.id.toUpperCase()}`,
 ].join('\n');
}
