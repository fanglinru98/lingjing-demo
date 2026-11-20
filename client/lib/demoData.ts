// Designer OS — 演示版预置假数据
// 首次在浏览器打开时自动写入 localStorage（只写一次，带 dw_demo_seeded 标记），
// 让工作台首次展示就有完整效果：项目看板、待办、甘特图、日历事务。
// 全部人名/项目名/价格均为虚构，可按需在下方随意修改。

import { dwSet } from "./store";
import { TASK_TAG_COLORS, type Task, type Todo } from "./types";

const DAY = 86400000;
const SEED_FLAG = "dw_demo_seeded";

/** 相对今天偏移 n 天的日期（YYYY-MM-DD，本地时区） */
function day(n: number): string {
  const d = new Date(Date.now() + n * DAY);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function task(partial: Omit<Task, "color">): Task {
  return { ...partial, color: TASK_TAG_COLORS[partial.tag] || TASK_TAG_COLORS["新增"] };
}

function buildTasks(): Task[] {
  return [
    // 云栖茶饮 · 品牌升级
    task({ id: "DSK-001", title: "主视觉提案终稿交付", project: "云栖茶饮 · 品牌升级", date: day(-2), start: day(-12), tag: "交付", status: "已完成", owner: "林", desc: "三选一终稿，客户已签字确认", price: 1200 }),
    task({ id: "DSK-002", title: "包装插画系列（4 款）", project: "云栖茶饮 · 品牌升级", date: day(4), start: day(-6), tag: "视觉", status: "设计中", owner: "林", desc: "春日限定系列，含杯身与外盒", price: 2600 }),
    task({ id: "DSK-003", title: "门店海报延展设计", project: "云栖茶饮 · 品牌升级", date: day(9), start: day(2), tag: "新增", status: "未开始", owner: "岚", desc: "覆盖三家直营店主题墙", price: 1800 }),
    // 星桥 SaaS · 控制台 2.0
    task({ id: "DSK-004", title: "数据看板组件库梳理", project: "星桥 SaaS · 控制台 2.0", date: day(3), start: day(-3), tag: "组件", status: "设计中", owner: "周", desc: "图表/表格/筛选项统一规范", price: 3200 }),
    task({ id: "DSK-005", title: "深色模式全站适配", project: "星桥 SaaS · 控制台 2.0", date: day(6), start: day(1), tag: "高优先级", status: "未开始", owner: "周", desc: "按 WCAG 对比度标准校验", price: 1500 }),
    task({ id: "DSK-006", title: "图标风格规范 v1", project: "星桥 SaaS · 控制台 2.0", date: day(-5), start: day(-10), tag: "评审", status: "已完成", owner: "林", desc: "线性 1.5px 圆角风格定稿", price: 900 }),
    // 作品集网站改版
    task({ id: "DSK-007", title: "首页视觉稿（含动效）", project: "作品集网站改版", date: day(2), start: day(-2), tag: "视觉", status: "设计中", owner: "林", desc: "滚动叙事 + 项目卡片悬停", price: 2000 }),
    task({ id: "DSK-008", title: "案例详情模板 ×3", project: "作品集网站改版", date: day(12), start: day(5), tag: "调研", status: "未开始", owner: "林", desc: "品牌/产品/项目三类模板", price: 1600 }),
    // 未排期任务（演示甘特图"未排期"小签）
    task({ id: "DSK-009", title: "动效趋势灵感整理", project: "灵感库", date: "", tag: "灵感", status: "设计中", owner: "岚", desc: "收集 2026 上半年交互动效案例", price: undefined }),
  ];
}

function buildTodos(): Todo[] {
  const now = Date.now();
  return [
    { id: "DSK-100", title: "整理 Dribbble 灵感画板到灵感库", project: "灵感库", due: "今天", status: "未开始", tag: "视觉", tagClass: "bg-sky-100 text-sky-700" },
    { id: "DSK-101", title: "回复客户第二轮评审意见", project: "云栖茶饮 · 品牌升级", due: "今天", status: "进行中", tag: "评审", tagClass: "bg-amber-100 text-amber-700" },
    { id: "DSK-102", title: "导出包装系列切图并打包", project: "云栖茶饮 · 品牌升级", due: "明天", status: "未开始", tag: "交付", tagClass: "bg-emerald-100 text-emerald-700" },
    { id: "DSK-103", title: "调研深色模式配色方案", project: "星桥 SaaS · 控制台 2.0", due: "明天", status: "未开始", tag: "调研", tagClass: "bg-emerald-100 text-emerald-700" },
    { id: "DSK-104", title: "更新组件库命名规范文档", project: "星桥 SaaS · 控制台 2.0", due: "本周五", status: "未开始", tag: "组件", tagClass: "bg-violet-100 text-violet-700" },
    { id: "DSK-105", title: "确认作品集域名与备案", project: "作品集网站改版", due: "本周六", status: "未开始", tag: "新增", tagClass: "bg-slate-100 text-slate-700" },
    { id: "DSK-106", title: "给首页视觉稿加滚动动效标注", project: "作品集网站改版", due: "今天", status: "进行中", tag: "高优先级", tagClass: "bg-pink-100 text-pink-700" },
    { id: "DSK-107", title: "与印刷厂核对包装刀版文件", project: "云栖茶饮 · 品牌升级", due: "昨天", status: "已完成", tag: "交付", tagClass: "bg-emerald-100 text-emerald-700", doneAt: now - 3600000 },
  ];
}

/** 日历事务：key 为当月日期（1-28），演示用固定日期 */
function buildCalendar(): Record<string, string> {
  return {
    "3": "客户评审会 14:00（云栖茶饮）",
    "9": "星桥 SaaS 版本发布日",
    "15": "作品集网站上线检查",
    "22": "月度报价复盘",
  };
}

/** 首次打开时写入演示数据（每个浏览器只写一次） */
export function seedDemoDataIfEmpty(): void {
  try {
    if (localStorage.getItem(SEED_FLAG)) return;
  } catch {
    return;
  }
  try {
    dwSet("projects", buildTasks());
    dwSet("todos", buildTodos());
    dwSet("calendar", buildCalendar());
    localStorage.setItem(SEED_FLAG, "1");
  } catch {
    /* 存储不可用时静默降级为空状态 */
  }
}
