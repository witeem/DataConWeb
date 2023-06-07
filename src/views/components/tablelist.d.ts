interface TableListPageReq {
	pageSize: number;
	current: number;
	total: number;
}
export type TableListPagination = TableListPageReq;

export type ModulePagePagination = TableListPageReq & {
	menuId: number;
};
