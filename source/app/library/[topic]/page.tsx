import {notFound} from "@/lib/navigation";
import {topics} from "@/lib/content";
import {TopicPage} from "@/components/material-pages";
export default function Page({params}:{params:{topic:string}}){const {topic:id}=params;const topic=topics.find(t=>t.id===id);if(!topic)notFound();return <TopicPage topic={topic}/>}
