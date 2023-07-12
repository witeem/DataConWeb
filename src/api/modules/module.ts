import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import { TableListItem } from "@/views/apiManage/module/list/data";

/**  */
export const GetModulePageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/module/GetModulePage`, params);
};

export const InsertModuleApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/module/InsertModule`, params);
	return request.post<boolean>(PORT1 + `/module/InsertModule`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/module/InsertModule`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateModuleApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/module/UpdateModule`, params);
	return request.post<boolean>(PORT1 + `/module/UpdateModule`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/module/UpdateModule`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
