import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
export default defineConfig({base:'/owl-ielts-writing-workshop/',plugins:[react()],resolve:{alias:{'@':fileURLToPath(new URL('.',import.meta.url))}},server:{host:'0.0.0.0',allowedHosts:['terminal.local']},preview:{host:'0.0.0.0',allowedHosts:['terminal.local']},build:{outDir:'dist',chunkSizeWarningLimit:1500}});
