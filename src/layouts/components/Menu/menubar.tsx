import { useEffect, useImperativeHandle, useState } from "react";
import { Tree, message } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";

import { GetAllMenuTreeApi } from "@/api/modules/menuinfo";
import "../../index.less";
import { handleMenuBar } from "./menu-util";

const MenuBar = (props: any) => {
	const [menuList, setMenuList] = useState<DataNode[]>();

	const onSelect: TreeProps["onSelect"] = (selectedKeys, info) => {
		if (info.selectedNodes?.length > 0) {
			props.onClick(info.selectedNodes[0]);
		}
	};

	const getMenuData = async () => {
		try {
			const { data } = await GetAllMenuTreeApi();
			if (!data) return;
			setMenuList(handleMenuBar(data));
		} catch (error) {
			message.error("Failed to pull the menu data");
		}
	};

	const UpdateMenuTree = async () => {
		getMenuData();
	};

	useEffect(() => {
		getMenuData();
	}, []);

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		UpdateMenuTree
	}));

	return <Tree className="menu-tree" showIcon showLine onSelect={onSelect} treeData={menuList} />;
};

export default MenuBar;
