import type { DataNode } from "antd/es/tree";
import * as Icons from "@ant-design/icons";
import React from "react";
import { MenuItem } from "./menudata";

// Dynamically render the Icon icon
const customIcons: { [key: string]: any } = Icons;
const getBarItem = (title: React.ReactNode, key?: React.Key | null, children?: DataNode[], type?: "group"): DataNode => {
	return {
		key,
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
	if (name !== "") return React.createElement(customIcons[name]);
};

// The processing background returns the key value of the menu as required by the antd menu
export const deepLoopFloatBar = (menuList?: Menu.MenuOptions[], newArr: DataNode[] = []) => {
	menuList?.forEach((item: Menu.MenuOptions) => {
		if (item.children?.length) {
			newArr.push(getBarItem(item.title, item.value, deepLoopFloatBar(item.children)));
		} else {
			newArr.push(getBarItem(item.title, item.value));
		}
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
