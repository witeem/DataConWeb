import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// outlet 模块
const OutletList = lazyLoad(React.lazy(() => import("@/views/maintenanceManage/outlet/list/index")));
const CategoryList = lazyLoad(React.lazy(() => import("@/views/maintenanceManage/outlet/list/categorylist")));
const BankList = lazyLoad(React.lazy(() => import("@/views/maintenanceManage/bank/list")));
const DenominationList = lazyLoad(React.lazy(() => import("@/views/maintenanceManage/denomination/list")));
const DictionariesList = lazyLoad(React.lazy(() => import("@/views/maintenanceManage/dictionaries/list")));
const EmailTemp = lazyLoad(React.lazy(() => import("@/views/maintenanceManage/emailtemplate")));

const MaintenanceRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "Maintenance"
		},
		children: [
			{
				path: "/maintenance/outletlist",
				element: OutletList,
				meta: {
					requiresAuth: true,
					title: "Outlet List",
					key: "outletlist"
				}
			},
			{
				path: "/maintenance/categorylist",
				element: CategoryList,
				meta: {
					requiresAuth: true,
					title: "Category List",
					key: "categorylist"
				}
			},
			{
				path: "/maintenance/banklist",
				element: BankList,
				meta: {
					requiresAuth: true,
					title: "Bank List",
					key: "banklist"
				}
			},
			{
				path: "/maintenance/denominationlist",
				element: DenominationList,
				meta: {
					requiresAuth: true,
					title: "Denomination List",
					key: "denominationlist"
				}
			},
			{
				path: "/maintenance/diclist",
				element: DictionariesList,
				meta: {
					requiresAuth: true,
					title: "Dictionaries List",
					key: "diclist"
				}
			},
			{
				path: "/maintenance/emailtemplate",
				element: EmailTemp,
				meta: {
					requiresAuth: true,
					title: "Email Template",
					key: "emailtemplate"
				}
			}
		]
	}
];

export default MaintenanceRouter;
