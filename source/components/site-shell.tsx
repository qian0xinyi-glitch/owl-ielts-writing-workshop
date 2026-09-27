"use client";
import {siteUrl} from "@/lib/navigation";
import {usePathname} from "@/lib/navigation";
import {BookOpen,PenLine,Shuffle} from "lucide-react";
import {SITE_NAME,SITE_NAME_EN} from "@/lib/brand";
export function SiteShell({children}:{children:React.ReactNode}){
  const path=usePathname();
  const links=[{href:"/",name:"素材库",Icon:BookOpen,active:path==='/'||path.startsWith('/library')},{href:"/practice",name:"写作练习",Icon:PenLine,active:path.startsWith('/practice')},{href:"/imitation",name:"仿写训练",Icon:Shuffle,active:path.startsWith('/imitation')}];
  return <><a className="skip-link" href={siteUrl("#main-content")}>跳转到内容</a><header className="site-header"><div className="header-inner"><a href={siteUrl("/")} className="brand"><img src={siteUrl("/favicon.svg")} className="brand-mark" alt="" width={48} height={48}/><span>{path==='/'?<h1 className="home-brand-title" lang="en">Owl's IELTS Writing Workshop</h1>:<><strong>{SITE_NAME}</strong><small>{SITE_NAME_EN}</small></>}</span></a><nav aria-label="主导航">{links.map(({href,name,Icon,active})=><a href={siteUrl(href)} key={href} className={active?'active':''} aria-current={active?'page':undefined}><Icon size={18}/>{name}</a>)}</nav><span className="site-edition">IELTS <b>TASK 2</b></span></div></header><main id="main-content" className="site-main">{children}</main><footer className="site-footer"><span>{SITE_NAME}</span><span>面向 7–7.5 分的观点调用与仿写训练</span></footer></>;
}
