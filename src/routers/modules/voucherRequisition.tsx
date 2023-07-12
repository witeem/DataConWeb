import React from "react";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";
import lazyLoad from "../utils/lazyLoad";

// outlet 模块
const RequisitionList = lazyLoad(React.lazy(() => import("@/views/voucherManage/requisition/list/index")));
const RequisitionAdd = lazyLoad(React.lazy(() => import("@/views/voucherManage/requisition/components/addform")));
const RequisitionUpdate = lazyLoad(React.lazy(() => import("@/views/voucherManage/requisition/components/updateform")));

const MaintenanceRouter: Array<RouteObject> = [
	{
		element: <LayoutIndex />,
		meta: {
			title: "voucher"
		},
		children: [
			{
				path: "/voucher/requisitionlist",
				element: RequisitionList,
				meta: {
					requiresAuth: true,
					title: "Requisition List",
					key: "requisitionlist"
				}
			},
			{
				path: "/voucher/requisitionadd",
				element: RequisitionAdd,
				meta: {
					requiresAuth: false,
					title: "Requisition Add",
					key: "requisitionadd"
				}
			},
			{
				path: "/voucher/requisitionupdate",
				element: RequisitionUpdate,
				meta: {
					requiresAuth: false,
					title: "Requisition Update",
					key: "requisitionupdate"
				}
			}
		]
	}
];

export default MaintenanceRouter;
