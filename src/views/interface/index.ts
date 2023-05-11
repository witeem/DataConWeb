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

const GetRandomuserParams = (params: TableParams) => ({
	pageSize: params.pagination?.pageSize,
	pageIndex: params.pagination?.current,
	keyword: params.keyword
});

export default GetRandomuserParams;
