# 灵境 Designer OS — 演示版（本地单机版）

设计师工作台的**演示版本**，专门用于向他人展示效果。

> ⚠️ 本版本不含任何真实数据：所有项目名、人名、报价、待办均为虚构示例。
> 原版的登录/注册与 Supabase 云端同步在此版本中已**整体移除**——无需账号，
> 打开即用，所有数据只保存在当前浏览器的 localStorage 里。

## 方式一：本地单文件，双击即用（推荐给展示对象）

项目根目录下的 **`灵境工作台.html`** 是完整单文件应用（JS/CSS 已全部内联）：

- 双击即可在浏览器中打开，**不需要安装 Node、不需要启动任何服务**；
- 数据保存在浏览器本地，刷新/重开不丢；
- 桌面上若已创建「灵境工作台」快捷方式（Chrome `--app` 模式），双击会以
  **独立窗口**打开（无地址栏，类似桌面软件）；窗口/任务栏图标为 `app.ico`。

分发给别人时，把 `灵境工作台.html`（可连同 `icon-192.png`、`app.ico`）发给对方即可。

> 重新生成单文件：修改代码后运行 `pnpm build`，产物在 `dist/spa/index.html`，
> 复制并改名为 `灵境工作台.html` 覆盖即可。
> 重建桌面快捷方式：以 `--app="file:///绝对路径/灵境工作台.html"` 参数给
> Edge/Chrome 建快捷方式，图标指向 `app.ico`。

## 方式二：开发模式（改代码时用）

需要 Node.js 18+（推荐 20+）。

```bash
# 使用 pnpm（项目默认包管理器）
pnpm install
pnpm dev

# 或使用 npm
npm install
npm run dev
```

启动后浏览器打开终端提示的地址（默认 http://localhost:8080）。

生产构建 / 产物预览：

```bash
pnpm build      # 产物输出到 dist/spa
pnpm start      # 运行构建后的产物（先 build）
```

## 预置的演示数据

首次在浏览器打开时自动写入（每个浏览器只写一次，标记存于 localStorage 的
`dw_demo_seeded`），包含：

| 数据 | 位置 | 内容 |
| --- | --- | --- |
| 项目任务 | 首页「项目看板」+「甘特图」 | 3 个虚构项目（云栖茶饮品牌升级、星桥 SaaS 控制台 2.0、作品集网站改版）共 9 个任务，日期相对"今天"动态生成 |
| 待办事项 | 首页/待办页/侧边栏 | 8 条虚构待办，含未开始/进行中/已完成 |
| 日历事务 | 侧边栏「智能日历」 | 4 条固定日期的虚构事务 |
| 常用网页 | 侧边栏 | Figma / Notion / Dribbble / Behance（默认项） |

日期按"打开当天"为基准计算，因此无论何时演示，甘特图的时间轴都是活的。

想清空演示数据重新看首次效果：在浏览器控制台执行
`localStorage.clear()` 后刷新页面即可。

## 修改演示数据 / 问候语

- 演示数据：[client/lib/demoData.ts](client/lib/demoData.ts)
- 顶部问候的虚构人物名（默认「林小灵」）：
  [client/components/layout/Topbar.tsx](client/components/layout/Topbar.tsx)
- 页面标题 / PWA 名称：`index.html`、`public/manifest.json`

## 数据保存在哪里

所有数据（演示数据 + 你演示时的手动修改）都保存在**当前浏览器**的
localStorage（`dw_` 前缀）。换浏览器或清缓存后重新出现的是初始演示数据。
无任何账号体系，也不联网上传——演示时可以放心操作。

## 技术栈

React 18 + Vite + TypeScript + TailwindCSS 3 + Radix UI（源自 Fusion Starter 模板）。
路由为 HashRouter（`#/projects` 等），构建产物可静态部署（如 GitHub Pages）。
