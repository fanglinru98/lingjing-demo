import "./global.css";

import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { createRoot } from "react-dom/client";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Projects from "./pages/Projects";
import Todos from "./pages/Todos";
import Placeholder from "./pages/Placeholder";
import NotFound from "./pages/NotFound";
import { seedDemoDataIfEmpty } from "@/lib/demoData";
import GlobalEditors from "@/components/editor/GlobalEditors";

// 演示版：首次打开自动写入一套虚构演示数据（项目/待办/日历）
seedDemoDataIfEmpty();

const queryClient = new QueryClient();

const App = () => {
  useEffect(() => {
    // 注册 Service Worker（PWA 离线安装；file:// 或失败时自动忽略）
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.register("./sw.js").catch(() => { /* 非 https 或失败时忽略 */ });
    }
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <GlobalEditors />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/todos" element={<Todos />} />
            <Route
              path="/inspiration"
              element={<Placeholder title="灵感库" />}
            />
            <Route
              path="/collaboration"
              element={<Placeholder title="团队协作" />}
            />
            <Route
              path="/analytics"
              element={<Placeholder title="数据洞察" />}
            />
            <Route
              path="/library"
              element={<Placeholder title="素材库" />}
            />
            <Route
              path="/settings"
              element={<Placeholder title="设置中心" />}
            />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </HashRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

createRoot(document.getElementById("root")!).render(<App />);
