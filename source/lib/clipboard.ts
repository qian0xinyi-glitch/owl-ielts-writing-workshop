/** Copy text locally. If browser access is unavailable, the caller offers manual copying. */
export async function copyText(text:string):Promise<boolean>{
 try{
  if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(text);return true;}
 }catch{/* Try the browser's legacy copy action before displaying the manual fallback. */}
 const previous=document.activeElement instanceof HTMLElement?document.activeElement:null;
 const field=document.createElement('textarea');
 field.value=text;field.readOnly=true;
 field.style.cssText='position:fixed;top:0;left:-9999px;opacity:0;';
 document.body.appendChild(field);
 try{field.focus({preventScroll:true});field.select();return document.execCommand('copy');}
 catch{return false;}
 finally{field.remove();previous?.focus({preventScroll:true});}
}
