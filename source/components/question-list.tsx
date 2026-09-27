"use client";
import {siteUrl} from "@/lib/navigation";
import {useSearchParams} from "@/lib/navigation";
import {ArrowRight,Layers,X} from "lucide-react";
import {categories,topics,questions,sourceRecordCount,questionHasTag,questionUsesTopic,practiceHref,questionCategoryLabel} from "@/lib/content";
import {SiteShell} from "./site-shell";

export function QuestionList(){
  const params=useSearchParams();
  const category=categories.find(c=>c.id===params.get("category"));
  const topic=topics.find(t=>t.id===params.get("topic")&&(!category||t.categoryId===category.id));
  const tag=params.get("tag")||undefined;
  const tagged=questions.filter(q=>!tag||questionHasTag(q,tag));
  const visible=tagged.filter(q=>(!category||q.categoryIds.includes(category.id))&&(!topic||questionUsesTopic(q,topic.id)));
  const directions=category?topics.filter(t=>t.categoryId===category.id):[];
  return <SiteShell>
    <div className="page-intro catalog-intro"><div><p className="eyebrow">WRITING PRACTICE / TASK 2</p><h1>从观点，到你的文章<span className="title-dot">.</span></h1><p className="intro-copy">按大类和标签选题，查看素材导引，完成自己的论证。</p></div><div className="intro-stats"><div><strong>{sourceRecordCount}</strong><span>题库来源记录</span></div><div><strong>40<span style={{fontSize:14,marginLeft:4,display:"inline"}}>min</span></strong><span>单次练习参考</span></div></div></div>
    <nav className="category-filters" aria-label="练习大类">
      <a className={"filter-chip "+(!category?"selected":"")} href={siteUrl(practiceHref({tag}))} aria-current={!category?"page":undefined}>全部题目<span className="filter-count">{tagged.length}</span></a>
      {categories.map(c=><a key={c.id} className={"filter-chip "+(category?.id===c.id?"selected":"")} href={siteUrl(practiceHref({category:c.id,tag}))} aria-current={category?.id===c.id?"page":undefined}>{c.shortName}<span className="filter-count">{tagged.filter(q=>q.categoryIds.includes(c.id)).length}</span></a>)}
    </nav>
    <div className="category-banner"><span className="category-badge"><Layers size={16}/>{category?.name??"全话题"}</span><span>{category?.description??"跨话题题目可从多个大类进入。"}</span></div>
    {(directions.length>0||tag)&&<div className="filter-panel" aria-label="素材方向与标签">
      {directions.length>0&&<><span className="filter-caption">素材方向</span><a href={siteUrl(practiceHref({category:category?.id,tag}))} className={"filter-chip "+(!topic?"selected":"")}>全部</a>{directions.map(t=><a key={t.id} className={"filter-chip "+(topic?.id===t.id?"selected":"")} href={siteUrl(practiceHref({category:category?.id,topic:t.id,tag}))}>{t.name}</a>)}</>}
      {tag&&<a className="filter-chip selected active-tag" href={siteUrl(practiceHref({category:category?.id,topic:topic?.id}))} aria-label={"清除标签 "+tag}>#{tag}<X size={14}/></a>}
    </div>}
    <div className="section-label"><h2>题目索引</h2><span>{visible.length} 条练习题 · {visible.reduce((n,q)=>n+q.sources.length,0)} 条来源记录</span></div>
    <div className="question-list">{visible.map(q=><article className="question-card" key={q.id}>
      <span className="question-no">{String(q.order).padStart(2,"0")}</span><div>
        <div className="question-top"><h2><a href={siteUrl("/practice/"+q.id)}>{q.title}</a></h2><span className="question-type">{questionCategoryLabel(q)} · {q.type}</span>{q.sourceMissing&&<span className="source-missing">仅中文题意</span>}</div>
        <p className="question-summary">{q.summary}</p><div className="tags">{q.tags.map(t=><a key={t} className="tag tag-button" href={siteUrl(practiceHref({tag:t}))}>#{t}</a>)}</div>
        <p className="question-source">{q.sources[0].source} · {q.sources[0].date}{q.sources.length>1?` · 合并 ${q.sources.length} 条来源`:""}</p>
      </div><a href={siteUrl("/practice/"+q.id)} className="start-link">开始练习 <ArrowRight size={15}/></a>
    </article>)}{visible.length===0&&<div className="empty-state"><p>当前大类与标签组合没有匹配题目。</p><a className="filter-chip empty-action" href={siteUrl("/practice")}>查看全部题目</a></div>}</div>
    <p className="source-footnote">题目来源：《2026 在考真题》与《2023–2025 真题集》。相同题干合并显示并保留来源；原科技练习中已合并的同主题题目继续保留。题干沿用源题库，其中 1 条仅有中文题意。</p>
  </SiteShell>;
}
