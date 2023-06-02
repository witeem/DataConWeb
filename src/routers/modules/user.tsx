import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// user 模块
const UserList = lazyLoad(React.lazy(() => import("@/views/user/list/index")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "用户管理"
		},
		children: [
			{
				path: "/user/list",
				element: UserList,
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
