import { Voucher } from "@/api/config/servicePort";
import qs from "qs";
import { request } from "@/api";

/***
 * Requisition
 */
export const GetRequisitionPageApi = (params?: any) => {
	return request.getpage<any[]>(Voucher + `/Requisition/GetRequisitionPage`, params);
};

export const GetRequisitionApi = (params?: any) => {
	return request.get<any>(Voucher + `/Requisition/GetRequisitionById`, params);
};

export const InsertRequisitionApi = (params: any) => {
	return request.post<boolean>(Voucher + `/Requisition/InsertRequisition`, params);
	return request.post<boolean>(Voucher + `/Requisition/InsertRequisition`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(Voucher + `/Requisition/InsertRequisition`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

export const UpdateRequisitionApi = (params: any) => {
	return request.post<boolean>(Voucher + `/Requisition/UpdateRequisition`, params);
	return request.post<boolean>(Voucher + `/Requisition/UpdateRequisition`, {}, { params }); // post request carries query parameter ==>? username=admin&password=123456
	return request.post<boolean>(Voucher + `/Requisition/UpdateRequisition`, qs.stringify(params)); // post requests carry form parameters ==> application/x-www-form-urlencoded
};

/***
 * DocumentDtl
 */
export const GetDocumentDtlPageApi = (params?: any) => {
	return request.getpage<any[]>(Voucher + `/Requisition/GetDocumentDtlPage`, params);
};

/***
 * DocumentAttachment
 */
export const GetDocumentAttPageApi = (params?: any) => {
	return request.getpage<any[]>(Voucher + `/Requisition/GetDocumentAttachedPage`, params);
};
