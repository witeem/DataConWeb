import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const AddMenu = lazyLoad(React.lazy(() => import("@/views/apiManage/menu/addindex")));
const UpdateMenu = lazyLoad(React.lazy(() => import("@/views/apiManage/menu/components/updateform")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "Menu Manage"
		},
		children: [
			{
				path: "/menu/addform",
				element: AddMenu,
				meta: {
					requiresAuth: true,
					title: "Add Menu",
					key: "addmenu"
				}
			},
			{
				path: "/menu/updateform",
				element: UpdateMenu,
				meta: {
					requiresAuth: true,
					title: "Update Menu",
					key: "updatemenu"
				}
			}
		]
	}
];

export default menuRouter;
