# yinxiaofeng 的博客

这是一个使用 [Hexo](https://hexo.io/) 构建、由 GitHub Pages 发布的静态博客，发布地址为 <https://sleeepyin.github.io/sleeepinx/>。

## 目录说明

- `source/_posts/`：文章 Markdown 源文件；新增或编辑文章只改这里。
- `source/css/site.css`：本项目的视觉微调样式。
- `docs/`：Hexo 生成的公开站点文件，由 GitHub Pages 工作流发布。不要手改，运行构建命令会覆盖它。
- `.github/workflows/pages.yml`：自动构建并部署 Pages 的工作流。

## 本地使用

需要 Node.js 20 或更高版本。

```bash
npm install
npm run dev
```

访问终端显示的本地地址预览站点。完成编辑后执行：

```bash
npm run build
```

它会重新生成 `docs/`。提交 `source/`、配置文件和新生成的 `docs/` 后，推送到 `main` 会自动部署。

## 提交与推送

每次确认本地构建无误后，在仓库根目录执行：

```bash
git add -A
git commit -m "更新博客内容"
git push -u origin main
```

首次推送后的站点地址为 <https://sleeepyin.github.io/sleeepinx/>。

## 发布设置

在 GitHub 仓库 **Settings → Pages** 中，将发布来源设为 **GitHub Actions**。首次推送后，可在仓库的 Actions 页面查看部署状态。
