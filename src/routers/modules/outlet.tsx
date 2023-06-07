import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// outlet 模块
const OutletList = lazyLoad(React.lazy(() => import("@/views/outlet/list/index")));
const CategoryList = lazyLoad(React.lazy(() => import("@/views/outlet/list/categorylist")));
const menuRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "分销管理"
		},
		children: [
			{
				path: "/outlet/list",
				element: OutletList,
				meta: {
					requiresAuth: true,
					title: "分销列表",
					key: "outletlist"
				}
			},
			{
				path: "/outlet/categorylist",
				element: CategoryList,
				meta: {
					requiresAuth: true,
					title: "贸易类型列表",
					key: "cateforylist"
				}
			}
		]
	}
];

export default menuRouter;
