import { GetAllMenuTreeApi } from "@/api/modules/menuinfo";
import { deepLoopFloatBar } from "@/layouts/components/Menu/menumap";
import Transfer, { TransferDirection, TransferItem } from "antd/es/transfer";
import Tree, { DataNode } from "antd/es/tree";
import { useEffect, useState } from "react";

interface TreeTransferProps {
	dataSource: DataNode[];
	targetKeys: string[];
	onChange: (targetKeys: string[], direction: TransferDirection, moveKeys: string[]) => void;
}

const isChecked = (selectedKeys: (string | number)[], eventKey: string | number) => selectedKeys.includes(eventKey);

const TreeTransfer = ({ dataSource, targetKeys, ...restProps }: TreeTransferProps) => {
	const [menuList, setMenuList] = useState<DataNode[]>();
	const transferDataSource: TransferItem[] = [];
	function flatten(list: DataNode[] = []) {
		list.forEach(item => {
			transferDataSource.push(item as TransferItem);
			flatten(item.children);
		});
	}
	flatten(dataSource);

	// const generateTree = (treeNodes: DataNode[] = [], checkedKeys: string[] = []): DataNode[] =>
	// 	treeNodes.map(({ children, ...props }) => ({
	// 		...props,
	// 		disabled: checkedKeys.includes(props.key as string),
	// 		children: generateTree(children, checkedKeys)
	// 	}));

	const getMenuData = async () => {
		try {
			const { data } = await GetAllMenuTreeApi();
			if (!data) return;
			setMenuList(deepLoopFloatBar(data));
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		getMenuData();
	}, []);

	return (
		<Transfer
			{...restProps}
			targetKeys={targetKeys}
			dataSource={transferDataSource}
			className="tree-transfer"
			render={item => item.title!}
			showSelectAll={false}
			listStyle={{
				width: 300,
				height: 500
			}}
		>
			{({ direction, onItemSelect, selectedKeys }) => {
				if (direction === "left") {
					const checkedKeys = [...selectedKeys, ...targetKeys];
					return (
						<Tree
							blockNode
							checkable
							defaultExpandAll
							checkedKeys={checkedKeys}
							treeData={menuList}
							onCheck={(checkVals, { node: { key } }) => {
								console.log(checkVals);
								onItemSelect(key as string, !isChecked(checkedKeys, key));
							}}
							onSelect={(_, { node: { key } }) => {
								onItemSelect(key as string, !isChecked(checkedKeys, key));
							}}
						/>
					);
				}
			}}
		</Transfer>
	);
};

export default TreeTransfer;
