export type TableListItem = {
	id: number;
	outletlist: string;
	outletId: string;
	outletName: string;
	mallId: string;
	trade: string;
	outletNumber: string;
	category: string;
	active: boolean;
	zone: string;
	vendorId: string;
	leaseId: string;
	tenantId: string;
	leaseStartDate: string;
	leaseEndDate: string;
};

export type CategoryListItem = {
	id: number;
	category: string;
	active: boolean;
	mallId: string;
};
