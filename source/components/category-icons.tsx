import {Cpu,Globe,MonitorPlay,ShieldCheck,Orbit,GraduationCap,BriefcaseBusiness,Landmark,Scale,Users,HeartPulse,Leaf,Palette,Brain,Compass,BookOpen} from "lucide-react";
import type {LucideIcon} from "lucide-react";
const categoryIcons:Record<string,LucideIcon>={technology:Cpu,education:GraduationCap,work:BriefcaseBusiness,government:Landmark,crime:Scale,society:Users,health:HeartPulse,environment:Leaf,culture:Palette,psychology:Brain,values:Compass};
const technologyIcons:Record<string,LucideIcon>={T1:Cpu,T2:Globe,T3:MonitorPlay,T4:ShieldCheck,T5:Orbit};
export const getCategoryIcon=(id:string)=>categoryIcons[id]??BookOpen;
export const getTopicIcon=(id:string,categoryId:string)=>technologyIcons[id]??getCategoryIcon(categoryId);
