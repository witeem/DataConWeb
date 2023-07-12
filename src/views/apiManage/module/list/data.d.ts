export type TableListItem = {
	id: number;
	menuId: number;
	title: string;
	description: string;
	linkUrl: string;
	controller: string;
	action: string;
	code: string;
	enabled: boolean;
	roles: any[];
};
