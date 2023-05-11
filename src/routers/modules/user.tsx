import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "用户管理"
		},
		children: [
			{
				path: "/user/list",
				element: lazyLoad(React.lazy(() => import("@/views/user/list/index"))),
				meta: {
					requiresAuth: true,
					title: "用户列表",
					key: "userlist"
				}
			}
		]
	}
];

export default menuRouter;
