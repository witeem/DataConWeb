import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import { handleMenuBar } from "@/layouts/components/Menu/menu-util";

/**
 * @name Menu information module
 */
// *
export const InsertMenuApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Menu/InsertMenu`, params);
	return request.post<boolean>(PORT1 + `/Menu/InsertMenu`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Menu/InsertMenu`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateMenuApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Menu/UpdateMenu`, params);
	return request.post<boolean>(PORT1 + `/Menu/UpdateMenu`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Menu/UpdateMenu`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const GetMenuByIdApi = (params?: any) => {
	return request.get<Menu.MenuOptions>(PORT1 + `/Menu/GetMenuById`, params);
};

export const GetAllMenuTreeApi = (params?: any) => {
	return request.getpage<Menu.MenuOptions[]>(PORT1 + `/Menu/GetAllMenuTree`, params);
};

export const GetMenuData = async (hideHome?: boolean) => {
	try {
		const { data } = await GetAllMenuTreeApi();
		if (!data) return [];
		return handleMenuBar(data, hideHome);
	} catch (error) {
		return [];
	}
};
