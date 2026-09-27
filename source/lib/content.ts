import data from "./content.json";

export type Category = {id:string;number:string;name:string;shortName:string;english:string;description:string;kind:string};
export type Chain = {id:string;title:string;name:string;chain:string;model:string;guide:string};
export type Topic = {id:string;title:string;name:string;english:string;description:string;tags:string[];categoryId:string;blocks:Chain[]};
export type Question = {
  id:string;title:string;summary:string;type:string;question:string;tags:string[];
  guides:{chainId:string;use:string}[];
  sources:{source:string;date:string;question:string;sourceId:string;indexCalls:string[]}[];
  note:string;sourceMissing:boolean;categoryIds:string[];order:number;
};
export const categories:Category[] = data.categories;
export const topics:Topic[] = data.topics;
export const questions:Question[] = data.questions;
export const sourceRecordCount = questions.reduce((n,q)=>n+q.sources.length,0);
export const chainCount = topics.reduce((n,t)=>n+t.blocks.length,0);
const chainById = new Map(topics.flatMap(t=>t.blocks.map(b=>[b.id,b] as const)));
const ownerByChain = new Map(topics.flatMap(t=>t.blocks.map(b=>[b.id,t] as const)));
export const findChain = (id:string) => chainById.get(id);
export const topicForChain = (id:string) => ownerByChain.get(id);
export const categoryForTopic = (topic:Topic) => categories.find(c=>c.id===topic.categoryId)!;
export const questionCategoryLabel = (q:Question) => categories.find(c=>c.id===q.categoryIds[0])?.shortName ?? "跨题练习";
export const questionHasTag = (q:Question,tag:string) => q.tags.includes(tag)||q.guides.some(g=>topicForChain(g.chainId)?.tags.includes(tag));
export const questionUsesTopic = (q:Question,id:string) => q.guides.some(g=>topicForChain(g.chainId)?.id===id);
export function practiceHref({category,topic,tag}:{category?:string;topic?:string;tag?:string}={}){
  const params=new URLSearchParams();
  if(category&&category!=="all")params.set("category",category);
  if(topic&&topic!=="all")params.set("topic",topic);
  if(tag)params.set("tag",tag);
  return "/practice"+(params.size?"?"+params.toString():"");
}
export {countWords} from "./word-count";
export function formatTime(seconds:number){return `${Math.floor(seconds/60).toString().padStart(2,"0")}:${Math.floor(seconds%60).toString().padStart(2,"0")}`;}
