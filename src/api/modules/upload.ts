import { Voucher } from "@/api/config/servicePort";
import { request } from "@/api";

/***
 * File
 */
export interface OutputFile {
	UploadSerial: string;
	ServerPath: string;
	Files: [];
}

export const UploadApi = (params?: any) => {
	return request.postfile<OutputFile>(Voucher + `/File/Upload`, params);
};

export const DelFile = (params: any) => {
	return request.post<boolean>(Voucher + `/File/Download`, params);
};

export const Download = (params: any) => {
	return request.get<boolean>(Voucher + `/File/Download`, params);
};
