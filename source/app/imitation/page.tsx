import {siteUrl} from "@/lib/navigation";
import {ArrowRight,ArrowUpRight,Layers,Shuffle} from "lucide-react";
import {SiteShell} from "@/components/site-shell";
import {training} from "@/lib/training";
import {findChain,topicForChain,categoryForTopic} from "@/lib/content";

export default function ImitationPage({searchParams}:{searchParams:{mechanism?:string;source?:string}}){
  const query=searchParams;
  const mechanism=training.mechanisms.find(m=>m.id===query.mechanism);
  const source=query.source?findChain(query.source):undefined;
  const exercises=training.exercises.filter(e=>(!mechanism||e.mechanismId===mechanism.id)&&(!source||e.sourceId===source.id));
  return <SiteShell>
    <div className="page-intro catalog-intro"><div><p className="eyebrow">FROM UNDERSTANDING TO WRITING</p><h1>仿写训练<span className="title-dot">.</span></h1><p className="intro-copy">学会一条推理，把它用到新的论点里。先尝试表达，再展开原段对照。</p></div><div className="intro-stats"><div><strong>{training.exercises.length}</strong><span>组迁移练习</span></div><div><strong>{training.mechanisms.length}</strong><span>类因果机制与判断</span></div></div></div>
    <div className="imitation-method"><span><b>01</b> 读原段，抓住机制</span><ArrowRight size={17}/><span><b>02</b> 根据中文论点写 2–3 句</span><ArrowRight size={17}/><span><b>03</b> 展开原段，自行对照</span></div>
    <section className="mechanism-filter" aria-label="按因果机制筛选"><div className="section-label"><h2><Layers size={17}/>按机制选练习</h2><span>同一机制，可以用在不同话题</span></div><div className="filter-panel"><a className={'filter-chip '+(!mechanism&&!source?'selected':'')} aria-current={!mechanism&&!source?'page':undefined} href={siteUrl("/imitation")}>全部 {training.exercises.length}</a>{training.mechanisms.map(m=><a key={m.id} className={'filter-chip '+(mechanism?.id===m.id?'selected':'')} aria-current={mechanism?.id===m.id?'page':undefined} href={siteUrl('/imitation?mechanism='+m.id)}>{m.name}<span className="filter-count">{training.exercises.filter(e=>e.mechanismId===m.id).length}</span></a>)}</div>
      {mechanism&&<p className="mechanism-description">{mechanism.description}</p>}
      {source&&<p className="mechanism-description">以 <strong>{source.id} · {source.name}</strong> 为学习原段 <a href={siteUrl("/imitation")}>清除筛选</a></p>}
    </section>
    <div className="section-label"><h2>{source?'从这段开始迁移':mechanism?.name||'选择一组，开始产出'}</h2><span>{exercises.length} 组 · 每组建议 5–8 分钟</span></div>
    <div className="imitation-grid">{exercises.map(e=>{
      const from=findChain(e.sourceId)!;const to=findChain(e.targetId)!;const tag=training.mechanisms.find(m=>m.id===e.mechanismId)!;
      return <a className="imitation-card" href={siteUrl('/imitation/'+e.id)} key={e.id}><div className="imitation-card-top"><span className="mechanism-tag">{tag.name}</span><span className="transfer-type"><Shuffle size={13}/>{e.crossTopic?'跨话题迁移':'同领域迁移'}</span></div><h2>{e.title}</h2><div className="transfer-route"><span>{categoryForTopic(topicForChain(e.sourceId)!).shortName}</span><ArrowRight size={15}/><span>{categoryForTopic(topicForChain(e.targetId)!).shortName}</span></div><div className="transfer-sources"><p><span>学习</span>{from.id} · {from.name}</p><p><span>写作</span>{to.id} · {to.name}</p></div><div className="imitation-card-bottom"><span>2–3 句 · 建议 40–60 词</span><strong>开始仿写 <ArrowUpRight size={17}/></strong></div></a>;
    })}</div>
    {!exercises.length&&<div className="empty-state"><p>当前组合还没有仿写任务。可以选择同一机制下的其他原段。</p><a className="filter-chip empty-action" href={siteUrl("/imitation")}>查看全部训练</a></div>}
    <p className="source-footnote">论点提示均取自素材库中的另一条解释段。训练重点是迁移推理、搭配和衔接方式；参考原段只供比较，没有唯一标准写法。</p>
  </SiteShell>;
}
