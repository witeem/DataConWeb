export type TableListItem = {
	id: number;
	authorityScope: number;
	roleName: string;
	description: string;
	active: number;
};

export type SelectListItem = {
	label: string;
	value: number;
};

export type MenuRoleItem = {
	roleId: number;
	menuId: number;
	moduleId: string;
};
