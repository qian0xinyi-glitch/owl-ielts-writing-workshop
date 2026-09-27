import {createRoot} from 'react-dom/client';
import Home from './app/page';
import PracticeIndex from './app/practice/page';
import Practice from './app/practice/[id]/page';
import ImitationIndex from './app/imitation/page';
import Imitation from './app/imitation/[id]/page';
import Topic from './app/library/[topic]/page';
import Chain from './app/library/[topic]/[chain]/page';
import NotFound from './app/not-found';
import {usePathname} from './lib/navigation';
import {topics,questions} from './lib/content';
import {training} from './lib/training';
import './app/globals.css';
import './app/owl-theme.css';
function App(){
 const path=usePathname();const query=Object.fromEntries(new URLSearchParams(window.location.search));const parts=path.split('/').filter(Boolean);
 if(path==='/')return <Home searchParams={query}/>;
 if(path==='/practice')return <PracticeIndex/>;
 if(path==='/imitation')return <ImitationIndex searchParams={query}/>;
 if(parts.length===2&&parts[0]==='practice'&&questions.some(q=>q.id===parts[1]))return <Practice params={{id:parts[1]}}/>;
 if(parts.length===2&&parts[0]==='imitation'&&training.exercises.some(e=>e.id===parts[1]))return <Imitation params={{id:parts[1]}}/>;
 if(parts[0]==='library'){const topic=topics.find(t=>t.id===parts[1]);if(topic&&parts.length===2)return <Topic params={{topic:topic.id}}/>;if(topic&&parts.length===3&&topic.blocks.some(b=>b.id===parts[2]))return <Chain params={{topic:topic.id,chain:parts[2]}}/>;}
 return <NotFound/>;
}
createRoot(document.getElementById('root')!).render(<App/>);
