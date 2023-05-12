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

export const GetAddmMenuReq = (params: any) => ({
	title: params.title,
	...params
});
