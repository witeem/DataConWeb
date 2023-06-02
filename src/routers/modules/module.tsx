import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// menu 模块
const ModuleList = lazyLoad(React.lazy(() => import("@/views/module/list/index")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "服务管理"
		},
		children: [
			{
				path: "/module/list",
				element: ModuleList,
				meta: {
					requiresAuth: true,
					title: "服务列表",
					key: "modulelist"
				}
			}
		]
	}
];

export default menuRouter;
