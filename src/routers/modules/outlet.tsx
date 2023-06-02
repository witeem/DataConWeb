import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// outlet 模块
const OutletList = lazyLoad(React.lazy(() => import("@/views/outlet/list/index")));
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
			}
		]
	}
];

export default menuRouter;
