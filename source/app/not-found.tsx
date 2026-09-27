import {siteUrl} from "@/lib/navigation";
import {SiteShell} from "@/components/site-shell";
export default function NotFound(){return <SiteShell><div className="empty-state"><h1>没有找到这条内容</h1><p>可以从素材库或题目索引重新进入。</p><a className="filter-chip" style={{display:'inline-block',marginTop:20}} href={siteUrl("/")}>返回素材库</a></div></SiteShell>}
