import {notFound} from "@/lib/navigation";
import {training} from "@/lib/training";
import {findChain,topicForChain} from "@/lib/content";
import {ImitationPractice} from "@/components/imitation-practice";
export default function Page({params}:{params:{id:string}}){
  const {id}=params;const task=training.exercises.find(e=>e.id===id);if(!task)notFound();
  const source=findChain(task.sourceId)!;const target=findChain(task.targetId)!;
  const mechanism=training.mechanisms.find(m=>m.id===task.mechanismId)!;
  const similar=training.exercises.filter(e=>e.mechanismId===task.mechanismId);
  const next=similar[(similar.indexOf(task)+1)%similar.length];
  return <ImitationPractice key={task.id} task={task} source={source} target={target} mechanism={mechanism} sourceHref={'/library/'+topicForChain(source.id)!.id+'/'+source.id} targetHref={'/library/'+topicForChain(target.id)!.id+'/'+target.id} next={{id:next.id,title:next.title}}/>;
}
