import type { DataNode } from "antd/es/tree";
import * as Icons from "@ant-design/icons";
import React from "react";
import { MenuItem } from "./menudata";
import { Login } from "@/api/interface";

// Dynamically render the Icon icon
const customIcons: { [key: string]: any } = Icons;
const getBarItem = (
	title: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: DataNode[],
	type?: "group"
): DataNode => {
	return {
		key,
		icon,
		children,
		title,
		type
	} as DataNode;
};
const getItem = (
	label: React.ReactNode,
	key?: React.Key | null,
	icon?: React.ReactNode,
	children?: MenuItem[],
	type?: "group"
): MenuItem => {
	return {
		key,
		icon,
		children,
		label,
		type
	} as MenuItem;
};

const addIcon = (name: string) => {
	if (name) return React.createElement(customIcons[name]);
};

// The processing background returns the key value of the menu as required by the antd menu
export const handelMenuBar = (menuList?: Menu.MenuOptions[], hideHome?: boolean, newArr: DataNode[] = []) => {
	if (hideHome) {
		menuList?.shift();
	}
	menuList?.forEach((item: Menu.MenuOptions) => {
		if (item.children?.length) {
			newArr.push(getBarItem(item.title, item.value, addIcon(item.icon!), handelMenuBar(item.children)));
		} else {
			if (item.btns?.length) {
				newArr.push(getBarItem(item.title, item.value, addIcon(item.icon!), handelMenuBarBtn(item.btns)));
			} else {
				newArr.push(getBarItem(item.title, item.value, addIcon(item.icon!)));
			}
		}
	});
	return newArr;
};

export const handelMenuBarBtn = (menuList?: Menu.MenuOptions[], newArr: DataNode[] = []) => {
	menuList?.forEach((item: Menu.MenuOptions) => {
		newArr.push(getBarItem(item.title, item.value, addIcon(item.icon!)));
	});
	return newArr;
};

// The processing background returns the key value of the menu as required by the antd menu
export const handelMenuList = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
	menuList.forEach((item: Menu.MenuOptions) => {
		if (item.children?.length) {
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), handelMenuList(item.children)));
		} else {
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
		}
	});
	return newArr;
};

/**
 * Author Button
 *
 */
export const handleButtons = (params: any[], newParam: Login.ResAuthButtons = {}) => {
	params.forEach(item => {
		let btns: Login.ResAuthButtons = {};
		if (item.btns?.length) {
			item.btns.forEach((btn: string) => {
				btns[btn] = true;
			});
			newParam[item.menu] = btns;
		}
	});
	return newParam;
};
