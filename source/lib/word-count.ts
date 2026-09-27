export function countWords(text:string){return (text.match(/[\p{L}\p{N}]+(?:[’'–-][\p{L}\p{N}]+)*/gu)||[]).length;}
