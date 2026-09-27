import {Suspense} from "react";
import {QuestionList} from "@/components/question-list";
export default function Page(){return <Suspense fallback={<p className="loading-note">正在读取题目…</p>}><QuestionList/></Suspense>}
