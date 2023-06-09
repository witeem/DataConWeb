import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// role 模块
const RoleList = lazyLoad(React.lazy(() => import("@/views/apiManage/roles/list/index")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "Role Manage"
		},
		children: [
			{
				path: "/roles/list",
				element: RoleList,
				meta: {
					requiresAuth: true,
					title: "Rolelist",
					key: "rolelist"
				}
			}
		]
	}
];

export default menuRouter;
