"use client";
import {siteUrl} from "@/lib/navigation";
import {useEffect,useRef,useState} from "react";
import {ArrowLeft,ArrowRight,BookOpen,Check,ChevronDown,Copy,Eye,PenLine} from "lucide-react";
import {Button} from "@/components/ui/button";
import {Textarea} from "@/components/ui/textarea";
import {SiteShell} from "@/components/site-shell";
import type {Chain} from "@/lib/content";
import {countWords} from "@/lib/word-count";
import type {ImitationExercise,Mechanism} from "@/lib/training-types";

type Props={task:ImitationExercise;source:Chain;target:Chain;mechanism:Mechanism;sourceHref:string;targetHref:string;next:{id:string;title:string}};
export function ImitationPractice({task,source,target,mechanism,sourceHref,targetHref,next}:Props){
  const [text,setText]=useState("");const [reference,setReference]=useState(false);
  const [copyStatus,setCopyStatus]=useState("");const [copied,setCopied]=useState(false);
  const textRef=useRef<HTMLTextAreaElement>(null);const words=countWords(text);
  useEffect(()=>{
    if(!text.trim()||copied)return;
    const warn=(e:BeforeUnloadEvent)=>{e.preventDefault();e.returnValue="";};
    window.addEventListener("beforeunload",warn);return()=>window.removeEventListener("beforeunload",warn);
  },[text,copied]);
  async function copy(){
    try{await navigator.clipboard.writeText(text);setCopied(true);setCopyStatus("已复制，可以粘贴到自己的笔记。");}
    catch{textRef.current?.focus();textRef.current?.select();setCopyStatus("已选中文字，请按 Ctrl+C（Mac：⌘C）复制。");}
  }
  return <SiteShell>
    <a className="back-link" href={siteUrl('/imitation?mechanism='+mechanism.id)}><ArrowLeft size={15}/>返回{mechanism.name}训练</a>
    <div className="imitation-title"><div><p className="eyebrow">IMITATION / TRANSFER THE REASONING</p><h1>{task.title}<span className="title-dot">.</span></h1><p className="intro-copy">把 {source.id} 的推理方法，用在来自 {target.id} 的新论点中。</p></div><a className="mechanism-tag" href={siteUrl('/imitation?mechanism='+mechanism.id)}>{mechanism.name}</a></div>
    <div className="imitation-workspace">
      <aside className="imitation-source"><section className="paper-section"><div className="section-heading"><span className="section-index">01</span><h2>先学这段</h2><BookOpen size={17}/></div><div className="source-ident"><span className="chain-code">{source.id}</span><h3>{source.name}</h3></div><p className="mechanism-path">{mechanism.description}</p><details className="source-paragraph" open><summary>学习原段 <ChevronDown size={15}/></summary><p className="model-text" lang="en">{source.model}</p></details><div className="transfer-focus"><h3>这次迁移什么？</h3><p>{task.focus}</p></div><a className="training-text-link" href={siteUrl(sourceHref)}>回素材页做全文挖空 <ArrowRight size={14}/></a></section></aside>
      <div className="imitation-output"><section className="paper-section imitation-prompt"><div className="section-heading"><span className="section-index">02</span><h2>换一个论点，自己写</h2><span className="sub">YOUR TURN</span></div><p className="target-origin">论点来自 {target.id} · {target.name}</p><p className="target-prompt">{task.prompt}</p><details className="imitation-hints"><summary>需要帮助？展开思路提示 <ChevronDown size={15}/></summary><ol>{task.steps.map(s=><li key={s}>{s}</li>)}</ol></details><div className="writing-brief"><PenLine size={16}/><p>写 2–3 句，建议 40–60 词。保留因果过程和必要条件，选用适合新话题的词汇与衔接。</p></div></section>
        <section className="editor imitation-editor"><div className="editor-toolbar"><h2><PenLine size={17}/><label htmlFor="imitation-writing">你的解释段</label></h2><span className="word-count"><strong>{words}</strong>词</span></div><Textarea id="imitation-writing" ref={textRef} className="writing-textarea" lang="en" spellCheck={false} value={text} placeholder="从你的观点开始，说明为什么、如何发生，再补上必要的条件……" onChange={e=>{setText(e.target.value);setCopied(false);setCopyStatus("");}}/><div className="imitation-editor-bottom"><p className="training-note">本页输入不自动保存，离开前请复制。</p><Button variant="outline" disabled={!text.trim()} onClick={copy}>{copied?<Check size={15}/>:<Copy size={15}/>}复制我的段落</Button></div><p className="copy-status" role="status">{copyStatus}</p></section>
        <section className="paper-section comparison-section"><div className="section-heading"><span className="section-index">03</span><h2>写后对照</h2></div><p className="training-note">先完成自己的表达，再看看素材库如何展开同一个论点。原段篇幅可能更长，无需逐句对应。</p><Button className="reference-toggle" variant="outline" aria-expanded={reference} aria-controls="target-reference" onClick={()=>setReference(!reference)}><Eye size={16}/>{reference?"收起参考原段":"展开原段对照"}</Button>{reference&&<div id="target-reference"><p className="reference-label">{target.id} · {target.name}</p><p className="model-text" lang="en">{target.model}</p><p className="self-review">自行留意：因果中间环节是否完整？主题词与指代是否清晰？条件句是否避免了过度概括？</p><a href={siteUrl(targetHref)} className="training-text-link">查看这条素材与全文挖空 <ArrowRight size={14}/></a></div>}</section>
        <a className="next-imitation" href={siteUrl('/imitation/'+next.id)}><span>继续练同一机制<strong>{next.title}</strong></span><ArrowRight size={21}/></a>
      </div>
    </div>
  </SiteShell>;
}
