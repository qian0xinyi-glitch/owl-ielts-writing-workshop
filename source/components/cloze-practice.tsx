"use client";
import {Fragment,useState} from "react";
import {BookOpen,Check,Eye,EyeOff,RotateCcw,SpellCheck} from "lucide-react";
import {Button} from "@/components/ui/button";
import {matchesClozeAnswer} from "@/lib/cloze-answer";
import type {ClozeBlank} from "@/lib/training-types";

const kindNames = {L:"词汇链",C:"重点搭配",D:"衔接与指代"};
export function ClozePractice({chainId,model,blanks}:{chainId:string;model:string;blanks:ClozeBlank[]}){
  const [mode,setMode]=useState<"read"|"cloze">("read");
  const [answers,setAnswers]=useState<string[]>(()=>blanks.map(()=>""));
  const [hints,setHints]=useState(true);
  const [checked,setChecked]=useState(false);
  const [revealed,setRevealed]=useState(false);
  const [usedAnswers,setUsedAnswers]=useState(false);
  const [confirmReset,setConfirmReset]=useState(false);
  const filled=answers.filter(a=>a.trim()).length;
  const correct=blanks.filter((b,i)=>matchesClozeAnswer(answers[i],b.answer)).length;
  function reset(){setAnswers(blanks.map(()=>""));setChecked(false);setRevealed(false);setUsedAnswers(false);setConfirmReset(false);}
  return <section className="paper-section cloze-section" id="paragraph-practice">
    <div className="section-heading"><span className="section-index">02</span><h2>解释段与全文挖空</h2><span className="sub">RECALL IN CONTEXT</span></div>
    <div className="learning-tabs" role="tablist" aria-label="解释段学习方式" onKeyDown={e=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const next=e.key==='Home'?'read':e.key==='End'?'cloze':mode==='read'?'cloze':'read';setMode(next);document.getElementById(next+'-tab')?.focus();}}}>
      <button id="read-tab" role="tab" tabIndex={mode==="read"?0:-1} aria-selected={mode==="read"} aria-controls="read-panel" onClick={()=>setMode("read")}><BookOpen size={16}/>阅读原段</button>
      <button id="cloze-tab" role="tab" tabIndex={mode==="cloze"?0:-1} aria-selected={mode==="cloze"} aria-controls="cloze-panel" onClick={()=>setMode("cloze")}><SpellCheck size={16}/>全文挖空 <span>{blanks.length} 空</span></button>
    </div>
    {mode==="read"?<div id="read-panel" role="tabpanel" aria-labelledby="read-tab"><p className="model-text" lang="en">{model}</p><p className="training-note">读完后切换到全文挖空，在完整语境中回忆主题词、搭配与衔接。</p></div>:<div id="cloze-panel" role="tabpanel" aria-labelledby="cloze-tab">
      <div className="cloze-controls"><div className="cloze-legend">{Object.entries(kindNames).map(([k,v])=><span key={k} className={'blank-key kind-'+k}><i/>{v}</span>)}</div><button className="hint-toggle" aria-pressed={hints} onClick={()=>setHints(!hints)}>{hints?<EyeOff size={15}/>:<Eye size={15}/>} {hints?"隐藏中文提示":"显示中文提示"}</button></div>
      <p className="training-note cloze-instruction">按原文填写；可以先开提示练习，再隐藏提示复练。已填写 {filled} / {blanks.length}。</p>
      <div className="cloze-paragraph" lang="en" aria-label="全文挖空段落">
        {blanks.map((blank,i)=>{
          const state=!checked?"":!answers[i].trim()?"missing":matchesClozeAnswer(answers[i],blank.answer)?"correct":"review";
          const feedback=state==="correct"?"已还原":state==="review"?"待核对":state==="missing"?"未填写":"";
          const fieldId=`${chainId}-blank-${i+1}`;
          return <Fragment key={fieldId}>{model.slice(i?blanks[i-1].end:0,blank.start)}<span className={`cloze-blank kind-${blank.kind} ${state}`} style={{width:`${Math.max(9,Math.min(34,blank.answer.length+4))}ch`}}>
            <span className="blank-entry"><label htmlFor={fieldId}>{String(i+1).padStart(2,"0")}</label><input id={fieldId} aria-label={`第${i+1}空，${kindNames[blank.kind]}${hints?'，'+blank.hint:''}`} aria-describedby={hints||feedback||revealed?`${fieldId}-help`:undefined} aria-invalid={state==="review"||state==="missing"?true:undefined} value={answers[i]} placeholder={`${blank.answer.split(/\s+/).length} word${blank.answer.includes(' ')?'s':''}`} spellCheck={false} autoComplete="off" autoCorrect="off" autoCapitalize="none" onChange={e=>{setAnswers(a=>a.map((v,j)=>j===i?e.target.value:v));setChecked(false);setConfirmReset(false);}}/></span>
            <span className="blank-help" id={`${fieldId}-help`} lang="zh-CN">{hints&&<span>{blank.hint}</span>}{feedback&&<b>{state==="correct"&&<Check size={12}/>} {feedback}</b>}{revealed&&<span className="blank-solution" lang="en">原文：{blank.answer}</span>}</span>
          </span></Fragment>;
        })}{model.slice(blanks[blanks.length-1].end)}
      </div>
      <div className="cloze-actions"><Button onClick={()=>setChecked(true)}>核对原文</Button><Button variant="outline" onClick={()=>{setRevealed(!revealed);setUsedAnswers(true);}}>{revealed?"收起答案":"展开原文答案"}</Button><Button variant="ghost" onClick={()=>setConfirmReset(true)} disabled={!filled&&!usedAnswers}><RotateCcw size={15}/>重新练习</Button></div>
      {confirmReset&&<div className="reset-confirm" role="alert">清空本段的填写内容，重新开始？ <Button size="sm" variant="outline" onClick={()=>setConfirmReset(false)}>保留内容</Button><Button size="sm" onClick={reset}>清空重练</Button></div>}
      <div aria-live="polite" className="cloze-result">{checked&&<p>与原文一致：<strong>{correct} / {blanks.length}</strong> 空{usedAnswers?"（本轮已查看答案，供对照学习）":""}。{correct===blanks.length?"可以试着用自己的话复述这条逻辑链。":"可先检查待核对的表达，再展开答案对照。"}</p>}</div>
      <p className="training-note">核对忽略大小写、多余空格及常见英美拼写差异。“待核对”只表示与原文不同，其他合理表达也可能成立。</p>
    </div>}
  </section>;
}
