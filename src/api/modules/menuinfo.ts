import { PORT1 } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";
import { deepLoopFloatBar } from "@/layouts/components/Menu/menumap";

/**
 * @name Menu information module
 */
// *
export const InsertMenuApi = (params: any) => {
	return request.post<boolean>(PORT1 + `/Menu/InsertMenu`, params);
	return request.post<boolean>(PORT1 + `/Menu/InsertMenu`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(PORT1 + `/Menu/InsertMenu`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/** GET /api/GetMenuTree */
export const GetAllMenuTreeApi = (params?: any) => {
	return request.getpage<Menu.MenuOptions[]>(PORT1 + `/Menu/GetAllMenuTree`, params);
};

export const GetMenuData = async () => {
	try {
		const { data } = await GetAllMenuTreeApi();
		if (!data) return [];
		return deepLoopFloatBar(data);
	} catch (error) {
		console.log(error);
	}

	return [];
};
