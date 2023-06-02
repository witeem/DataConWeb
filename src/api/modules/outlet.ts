import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import { TableListItem } from "@/views/outlet/list/data";

/**  */
export const GetOutletPageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/Outlet/GetOutletPage`, params);
};

export const InsertOutletApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Outlet/InsertOutlet`, params);
	return request.post<boolean>(PORT1 + `/Outlet/InsertOutlet`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Outlet/InsertOutlet`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateOutletApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Outlet/UpdateOutlet`, params);
	return request.post<boolean>(PORT1 + `/Outlet/UpdateOutlet`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Outlet/UpdateOutlet`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
