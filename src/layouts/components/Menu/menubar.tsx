import { Ref, useEffect, useImperativeHandle, useState } from "react";
import { Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import { deepLoopFloatBar } from "./menumap";
import { GetAllMenuTreeApi } from "@/api/modules/menuinfo";

import "../../index.less";

interface Props {
	innerRef: Ref<{ UpdateMenuTree: () => void }>;
	onClick: (data: any) => void;
}

const MenuBar = (props: Props) => {
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
			setMenuList(deepLoopFloatBar(data));
		} catch (error) {
			console.log(error);
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

	return <Tree className="menu-tree" showLine onSelect={onSelect} treeData={menuList} />;
};

export default MenuBar;
