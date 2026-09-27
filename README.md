# Owl's IELTS Writing Workshop

猫头鹰雅思写作工坊：素材库、全文挖空、仿写训练和写作练习。

网站：https://qian0xinyi-glitch.github.io/owl-ielts-writing-workshop/

此版本对应原网站 2026-09-27 更新，已将 PDF 导出替换为复制练习稿。

## 使用说明

- 复制练习稿包含题目、作文正文、字数和用时，无需登录。
- 保存草稿将正文和用时保存在当前浏览器。换设备、隐私模式或清除浏览器数据后不会同步保留。重要作文请另外复制备份。
- 原网站的云端草稿不会自动迁入 GitHub 版。
- 全文挖空核对在浏览器完成。仿写模块提供原段对照，不含自动作文评分。

## 维护

`source/` 保留完整可编辑源码；根目录是 GitHub Pages 的静态成品。

```sh
cd source
corepack pnpm install --frozen-lockfile
pnpm run typecheck
pnpm run build
```

将 `source/dist/` 的内容更新到仓库根目录，保留 `source/` 和 `.nojekyll`，提交到 `main` 后由 Pages 自动发布。发布来源为 `main` 的根目录。

主要内容：`source/lib/content.json`；挖空和仿写：`source/lib/training-data.json`；配色和字体：`source/app/owl-theme.css`。

所有页面保留独立地址，直接打开、刷新或分享均可访问。更换仓库名时，同时调整 `source/vite.config.ts` 和 `source/lib/navigation.ts` 的路径。
