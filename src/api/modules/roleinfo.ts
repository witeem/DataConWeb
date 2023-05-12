import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import type { TableListItem } from "@/views/roles/list/data";

/**
 * @name Role information module
 */
// *
export const PosttestApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, params);
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, {}, { params });
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, qs.stringify(params));
};

/** GET /api/rule */
export const GetRolePageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/Roles/GetRolePage`, params);
};
