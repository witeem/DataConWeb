import * as types from "@/redux/mutation-types";
import { GetAuthorMenusApi } from "@/api/modules/login";
import { Dispatch } from "react";

// * updateCollapse
export const updateCollapse = (isCollapse: boolean) => ({
	type: types.UPDATE_COLLAPSE,
	isCollapse
});

// * setMenuList
export const setMenuList = (menuList: Menu.MenuOptions[]) => ({
	type: types.SET_MENU_LIST,
	menuList
});

// ? 下面方法仅为测试使用，不参与任何功能开发
interface MenuProps {
	type: string;
	menuList: Menu.MenuOptions[];
}
// * redux-thunk
export const getMenuListActionThunk = () => {
	return async (dispatch: Dispatch<MenuProps>) => {
		const res = await GetAuthorMenusApi();
		dispatch({
			type: types.SET_MENU_LIST,
			menuList: (res.data as Menu.MenuOptions[]) ?? []
		});
	};
};

// * redux-promise《async/await》
export const getMenuListAction = async (): Promise<MenuProps> => {
	const res = await GetAuthorMenusApi();
	return {
		type: types.SET_MENU_LIST,
		menuList: res.data ? res.data : []
	};
};

// * redux-promise《.then/.catch》
export const getMenuListActionPromise = (): Promise<MenuProps> => {
	return GetAuthorMenusApi().then(res => {
		return {
			type: types.SET_MENU_LIST,
			menuList: res.data ? res.data : []
		};
	});
};
