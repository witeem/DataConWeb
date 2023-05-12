import Layout from "@/layouts/index";
import Menubar from "@/layouts/components/Menu/menubar";
// 懒加载 Layout
// import React from "react";
// import lazyLoad from "@/routers/utils/lazyLoad";
// const Layout = lazyLoad(React.lazy(() => import("@/layouts/index")));

/**
 * @description: default layout
 */
export const LayoutIndex = () => <Layout />;
export const MenuBarLayout = () => <Menubar />;
