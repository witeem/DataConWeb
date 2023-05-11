import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import type { TableListItem } from "@/views/roles/list/data";

/**
 * @name 角色信息模块
 */
// *
export const PosttestApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, params);
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, {}, { params }); // post 请求携带 query 参数  ==>  ?username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, qs.stringify(params)); // post 请求携带 表单 参数  ==>  application/x-www-form-urlencoded
	return request.post<boolean>(PORT1 + `/Roles/PosttestApi`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};

/** 获取规则列表 GET /api/rule */
export const GetRolePageApi = (params?: any) => {
	return request.getpage<TableListItem[]>(PORT1 + `/Roles/GetRolePage`, params);
	return request.getpage<TableListItem[]>(PORT1 + `/Roles/GetRolePage`, params, { headers: { noLoading: true } }); // 控制当前请求不显示 loading
};
