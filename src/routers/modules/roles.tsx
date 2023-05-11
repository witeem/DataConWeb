import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "角色管理"
		},
		children: [
			{
				path: "/roles/list",
				element: lazyLoad(React.lazy(() => import("@/views/roles/list/index"))),
				meta: {
					requiresAuth: true,
					title: "角色列表",
					key: "rolelist"
				}
			}
		]
	}
];

export default menuRouter;
