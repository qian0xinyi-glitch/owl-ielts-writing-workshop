import {notFound} from "@/lib/navigation";
import {topics} from "@/lib/content";
import {ChainPage} from "@/components/material-pages";
export default function Page({params}:{params:{topic:string;chain:string}}){const ids=params;const topic=topics.find(t=>t.id===ids.topic);const chain=topic?.blocks.find(b=>b.id===ids.chain);if(!topic||!chain)notFound();return <ChainPage topic={topic} chain={chain}/>}
