import {notFound} from "@/lib/navigation";
import {questions} from "@/lib/content";
import {WritingPractice} from "@/components/writing-practice";
export default function Page({params}:{params:{id:string}}){const {id}=params;const question=questions.find(q=>q.id===id);if(!question)notFound();return <WritingPractice key={id} question={question}/>}
