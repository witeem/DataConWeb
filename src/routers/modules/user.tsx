import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// user 模块
const UserList = lazyLoad(React.lazy(() => import("@/views/apiManage/user/list/index")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "User Manage"
		},
		children: [
			{
				path: "/user/list",
				element: UserList,
				meta: {
					requiresAuth: true,
					title: "Userlist",
					key: "userlist"
				}
			}
		]
	}
];

export default menuRouter;
