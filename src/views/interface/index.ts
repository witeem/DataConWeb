import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

interface TableParams {
	pagination: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters: Record<string, FilterValue | null>;
	keyword?: string;
}

export type TbParams = TableParams;

export const GetRandomuserParams = (params: any) => ({
	pageSize: params.pagination?.pageSize,
	pageIndex: params.pagination?.current,
	keyword: params.keyword,
	...params
});

export const GetInsertRoleReq = (params: any) => ({
	active: params.active,
	...params
});

export const GetRegisterReq = (params: any) => ({
	...params,
	isReceiveEmail: params.isReceiveEmail === true ? 1 : 0,
	isReceiveEODMail: params.isReceiveEODMail === true ? 1 : 0
});

export const GetUserUpdateReq = (params: any) => ({
	...params,
	isReceiveEmail: params.isReceiveEmail === true ? 1 : 0,
	isReceiveEODMail: params.isReceiveEODMail === true ? 1 : 0
});

export const GetAddmMenuReq = (params: any) => ({
	title: params.title,
	...params
});
