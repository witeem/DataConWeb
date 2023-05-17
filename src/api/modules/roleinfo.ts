import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import type { TableListItem } from "@/views/roles/list/data";

/**
 * @name Role information module
 */
// *
export const InsertRoleApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Roles/InsertRole`, params);
	return request.post<boolean>(PORT1 + `/Roles/InsertRole`, {}, { params });
	return request.post<boolean>(PORT1 + `/Roles/InsertRole`, qs.stringify(params));
};

export const UpdateRoleApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Roles/UpdateRole`, params);
	return request.post<boolean>(PORT1 + `/Roles/UpdateRole`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Roles/UpdateRole`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/** GET /api/rule */
export const GetRolePageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/Roles/GetRolePage`, params);
};
