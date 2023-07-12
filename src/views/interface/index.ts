import type { TablePaginationConfig } from "antd/es/table";
import type { FilterValue } from "antd/es/table/interface";

interface TableParams {
	pagination: TablePaginationConfig;
	sortField?: string;
	sortOrder?: string;
	filters: Record<string, FilterValue | null>;
	keyword?: string;
}

interface InsertRoleModuleParams {
	menuId: number;
	moduleIds: number[];
}

export type TbParams = TableParams;
export type RoleModuleParams = InsertRoleModuleParams;

export const GetRoleListReq = (params: any) => ({
	...params,
	pageSize: params.pagination?.pageSize,
	pageIndex: params.pagination?.current,
	isPage: false
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
	...params,
	title: params.title
});

export const GetAddmModuleReq = (params: any) => ({
	...params,
	title: params.title
});

// moudle
export const GetPageBaseReq = (params: any) => ({
	...params,
	pageSize: params.pageSize,
	pageIndex: params.current,
	isPage: true
});
