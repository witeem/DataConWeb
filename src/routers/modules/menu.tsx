import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "菜单管理"
		},
		children: [
			{
				path: "/menu/addform",
				element: lazyLoad(React.lazy(() => import("@/views/menu/components/addform"))),
				meta: {
					requiresAuth: true,
					title: "新建菜单",
					key: "addmenu"
				}
			}
		]
	}
];

export default menuRouter;
