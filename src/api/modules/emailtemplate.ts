import { MainTenace } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";

/***
 * EmailTemplate
 */
export const GetEmailTemplateApi = (params?: any) => {
	return request.getpage<any>(MainTenace + `/EmailTemplate/GetEmailTemplate`, params);
};

export const UpdateEmailTemplateApi = (params: any) => {
	return request.post<boolean>(MainTenace + `/EmailTemplate/UpdateEmailTemplate`, params);
	return request.post<boolean>(MainTenace + `/EmailTemplate/UpdateEmailTemplate`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(MainTenace + `/EmailTemplate/UpdateEmailTemplate`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};
