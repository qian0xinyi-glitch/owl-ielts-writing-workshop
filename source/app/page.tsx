import {siteUrl} from "@/lib/navigation";
import {ArrowUpRight,ArrowRight} from "lucide-react";
import {categories,topics,chainCount,practiceHref} from "@/lib/content";
import {SiteShell} from "@/components/site-shell";
import {getTopicIcon} from "@/components/category-icons";

export default function Home({searchParams}:{searchParams:{category?:string}}){
  const params=(searchParams)??{};
  const selected=categories.find(c=>c.id===params.category);
  const shown=selected?[selected]:categories;
  return <SiteShell>
    <section className="library-welcome" aria-label="素材库概览">
      <div className="library-welcome-copy"><p className="eyebrow">THE OWL'S NOTEBOOK / IELTS TASK 2</p><p className="intro-copy">读懂逻辑，用挖空记住表达，再把思路写进新的论点。</p><div className="library-facts"><span><strong>10</strong> 主要大类</span><span><strong>{topics.filter(t=>t.categoryId!=="values").length}</strong> 主题条目</span><span><strong>{chainCount}</strong> 逻辑链与解释段</span></div></div>
      <img className="welcome-owl" src={siteUrl("/images/owl-reading.png")} alt="戴圆眼镜的棕色猫头鹰坐在书堆上阅读，周围点缀彩铅绿叶" width={280} height={240} fetchPriority="high"/>
    </section>
    <nav className="category-filters" aria-label="素材大类">
      <a className={"filter-chip "+(!selected?"selected":"")} href={siteUrl("/")} aria-current={!selected?"page":undefined}>全部话题</a>
      {categories.map(c=><a key={c.id} href={siteUrl("/?category="+c.id)} className={"filter-chip "+(selected?.id===c.id?"selected":"")} aria-current={selected?.id===c.id?"page":undefined}>{c.shortName}<span className="filter-count">{topics.filter(t=>t.categoryId===c.id).length}</span></a>)}
    </nav>
    <div className="catalog-helper"><span>选择话题，阅读解释段或开始全文挖空。</span><a href={siteUrl(practiceHref({category:selected?.id}))}>进入{selected?.shortName??"全话题"}写作练习 <ArrowRight size={16}/></a></div>
    {shown.map(category=>{
      const group=topics.filter(t=>t.categoryId===category.id);
      const tone=categories.indexOf(category)%5;
      return <section className="catalog-section" key={category.id} aria-labelledby={"category-"+category.id}>
        <div className="catalog-section-heading"><div><p className="english-label">{category.english}</p><h2 id={"category-"+category.id}>{category.name}</h2><p>{category.description}</p></div><span>{group.length} {category.kind==="values"?"组判断":"个主题"} · {group.reduce((n,t)=>n+t.blocks.length,0)} 条逻辑链</span></div>
        <div className="topic-grid">{group.map(t=>{
          const Icon=getTopicIcon(t.id,t.categoryId);
          return <a className="topic-card" href={siteUrl("/library/"+t.id)} key={t.id}>
            <div className="card-top"><span className={"topic-icon tone-"+tone}><Icon size={25}/></span><span className="topic-number">{t.id}</span></div>
            <p className="english-label">{t.english}</p><h3>{t.name}</h3><p className="topic-description">{t.description}</p>
            <div className="tags">{t.tags.filter(tag=>tag!==category.shortName).slice(0,4).map(tag=><span className="tag" key={tag}>#{tag}</span>)}</div>
            <div className="card-bottom"><span>{t.blocks.length} 条逻辑链</span><ArrowUpRight size={21}/></div>
          </a>;
        })}</div>
      </section>;
    })}
  </SiteShell>;
}
