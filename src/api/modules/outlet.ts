import { MainTenace } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";

/**  */
export const GetOutletPageApi = (params?: any) => {
	return request.getpage<any[]>(MainTenace + `/Outlet/GetOutletPage`, params);
};

export const InsertOutletApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Outlet/InsertOutlet`, params);
	return request.post<boolean>(MainTenace + `/Outlet/InsertOutlet`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Outlet/InsertOutlet`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateOutletApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Outlet/UpdateOutlet`, params);
	return request.post<boolean>(MainTenace + `/Outlet/UpdateOutlet`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Outlet/UpdateOutlet`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/***
 * Trade Category
 */
export const GetCategoryPageApi = (params?: any) => {
	return request.getpage<any[]>(MainTenace + `/Category/GetCategoryPage`, params);
};

export const InsertCategoryApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Category/InsertCategory`, params);
	return request.post<boolean>(MainTenace + `/Category/InsertCategory`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Category/InsertCategory`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateCategoryApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/Category/UpdateCategory`, params);
	return request.post<boolean>(MainTenace + `/Category/UpdateCategory`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/Category/UpdateCategory`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
