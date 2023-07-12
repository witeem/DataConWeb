import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// menu 模块
const ModuleList = lazyLoad(React.lazy(() => import("@/views/apiManage/module/list/index")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "Module Manage"
		},
		children: [
			{
				path: "/module/list",
				element: ModuleList,
				meta: {
					requiresAuth: true,
					title: "Modulelist",
					key: "modulelist"
				}
			}
		]
	}
];

export default menuRouter;
