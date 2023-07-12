import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import { GetRoleListReq } from "@/views/interface";

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
	return request.getpage<any[]>(PORT1 + `/Roles/GetRolePage`, params);
};

export const GetMenusByRoleIdApi = (params?: any) => {
	return request.get<any[]>(PORT1 + `/Roles/GetMenusByRoleId`, params);
};

export const InsertUserRoleApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Roles/InsertUserRole`, params);
	return request.post<boolean>(PORT1 + `/Roles/InsertUserRole`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Roles/InsertUserRole`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const InsertRoleMenuModuleApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Roles/InsertRoleMenuModule`, params);
	return request.post<boolean>(PORT1 + `/Roles/InsertRoleMenuModule`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Roles/InsertRoleMenuModule`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const GetRoleList = async (roleName: string) => {
	try {
		let params = {
			roleName
		};
		const { data } = await GetRolePageApi(GetRoleListReq(params));
		if (!data) return [];
		return data;
	} catch (error) {
		return [];
	}
};
