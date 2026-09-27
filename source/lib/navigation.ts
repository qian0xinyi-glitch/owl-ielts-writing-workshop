export const BASE_PATH = '/owl-ielts-writing-workshop';
export function siteUrl(path: string): string {
 if (!path.startsWith('/') || path.startsWith('//')) return path;
 if (path === BASE_PATH || path.startsWith(BASE_PATH + '/')) return path;
 const url = new URL(path, 'https://local.invalid');
 const pathname = url.pathname.endsWith('/') || /\.[^/]+$/.test(url.pathname) ? url.pathname : url.pathname + '/';
 return BASE_PATH + pathname + url.search + url.hash;
}
export function usePathname(): string {
 const path=window.location.pathname;
 const local=path===BASE_PATH?'/':path.startsWith(BASE_PATH+'/')?path.slice(BASE_PATH.length):path;
 return local.replace(/\/+$/, '') || '/';
}
export function useSearchParams(): URLSearchParams { return new URLSearchParams(window.location.search); }
export function notFound(): never { throw new Error('没有找到这条内容'); }
