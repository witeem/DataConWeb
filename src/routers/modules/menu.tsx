import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const AddMenu = lazyLoad(React.lazy(() => import("@/views/menu/addindex")));
const UpdateMenu = lazyLoad(React.lazy(() => import("@/views/menu/components/updateform")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "菜单管理"
		},
		children: [
			{
				path: "/menu/addform",
				element: AddMenu,
				meta: {
					requiresAuth: true,
					title: "新建菜单",
					key: "addmenu"
				}
			},
			{
				path: "/menu/updateform",
				element: UpdateMenu,
				meta: {
					requiresAuth: true,
					title: "编辑菜单",
					key: "updatemenu"
				}
			}
		]
	}
];

export default menuRouter;
