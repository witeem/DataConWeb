import type { DataNode } from "antd/es/tree";
import * as Icons from "@ant-design/icons";
import React from "react";
import { MenuItem } from "./menudata";

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
export const deepLoopFloatBar = (menuList?: Menu.MenuOptions[], hideHome?: boolean, newArr: DataNode[] = []) => {
	if (hideHome) {
		menuList?.shift();
	}
	menuList?.forEach((item: Menu.MenuOptions) => {
		if (item.children?.length) {
			newArr.push(getBarItem(item.title, item.value, "", deepLoopFloatBar(item.children)));
		} else {
			if (item.btns?.length) {
				newArr.push(getBarItem(item.title, item.value, "", deepLoopFloatBtn(item.btns)));
			} else {
				newArr.push(getBarItem(item.title, item.value));
			}
		}
	});
	return newArr;
};

export const deepLoopFloatBtn = (menuList?: Menu.MenuOptions[], newArr: DataNode[] = []) => {
	menuList?.forEach((item: Menu.MenuOptions) => {
		newArr.push(getBarItem(item.title, item.value, addIcon(item.icon!)));
	});
	return newArr;
};

// The processing background returns the key value of the menu as required by the antd menu
export const deepLoopFloat = (menuList: Menu.MenuOptions[], newArr: MenuItem[] = []) => {
	menuList.forEach((item: Menu.MenuOptions) => {
		if (item.children?.length) {
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!), deepLoopFloat(item.children)));
		} else {
			newArr.push(getItem(item.title, item.path, addIcon(item.icon!)));
		}
	});
	return newArr;
};
