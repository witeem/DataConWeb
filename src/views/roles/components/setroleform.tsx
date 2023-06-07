import { useState, useEffect } from "react";
import { Tree, Row, Col, Select, Divider, Button, message } from "antd";
import type { SelectListItem, TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import { GetMenuData } from "@/api/modules/menuinfo";
import { GetMenusByRoleIdApi, GetRoleList, InsertRoleMenuModuleApi } from "@/api/modules/roleinfo";
import { RoleModuleParams } from "@/views/interface";
const treeData = await GetMenuData(true);

// The processing background returns the key value of the menu as required by the antd menu

interface TreeNode {
	checked: number[];
	halfChecked: number[];
}

const deepLoopFloat = (menuList: TableListItem[], newArr: SelectListItem[] = []) => {
	menuList.forEach((item: TableListItem) => {
		newArr.push({ label: item.roleName, value: item.id });
	});
	return newArr;
};

const getInsertRoleMenuReq = (roleId: number, params: RoleModuleParams[]) => {
	return {
		roleId: roleId,
		menuIds: params
	};
};

const SetRoleForm = (props: any) => {
	const { t } = useTranslation();
	const { selectedRole, loadTable } = props;
	const [checkedKeys, setCheckedKeys] = useState<TreeNode>();
	const [rolelist, setRoleList] = useState<SelectListItem[]>();
	const [roleVal, setRoleVal] = useState<number>(0);
	const getRoleData = async () => {
		const data = await GetRoleList("");
		setRoleList(deepLoopFloat(data));
	};

	const handleChange = (value: any) => {
		initMenuRoleData(value);
		setRoleVal(value);
	};

	const initMenuRoleData = async (roleId: any) => {
		const { data } = await GetMenusByRoleIdApi({ roleId: roleId });
		if (data) {
			let initMenus = data.map(item => {
				return item.menuId;
			});
			setCheckedKeys({ checked: initMenus, halfChecked: [] });
		} else {
			setCheckedKeys({ checked: [], halfChecked: [] });
		}
	};

	useEffect(() => {
		if (!rolelist) {
			getRoleData();
		}

		if (selectedRole) {
			initMenuRoleData(selectedRole.id);
			setRoleVal(selectedRole.id);
		}
	}, [selectedRole]);

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const submitBtn = async () => {
		let insertReq: RoleModuleParams[] = [];
		console.log(checkedKeys);
		checkedKeys?.checked?.forEach(op => {
			if (op > 0) {
				insertReq.push({ menuId: op, moduleIds: [0] });
			}
		});

		if (roleVal > 0) {
			console.log(getInsertRoleMenuReq(roleVal, insertReq));
			const { data } = await InsertRoleMenuModuleApi(getInsertRoleMenuReq(roleVal, insertReq));
			if (data) {
				message.success("success");
				loadTable();
			}
		}
	};

	return (
		<div>
			<Row>
				<Col span={20}>
					{t("roleColumn.roleName")}：
					<Select
						className="border-primary"
						showSearch
						style={{ width: 200 }}
						onChange={handleChange}
						placeholder="Search to Select"
						optionFilterProp="children"
						value={roleVal}
						filterOption={(input, option) => (option?.label ?? "").includes(input)}
						filterSort={optionA => optionA?.value ?? 0}
						options={rolelist}
					/>
				</Col>
				<Col span={4}>
					<Button type="primary" onClick={submitBtn}>
						{t("opt.submit")}
					</Button>
				</Col>
			</Row>
			<Divider />
			<Row>
				<Col span={24}>
					<Tree
						blockNode
						checkable
						checkedKeys={checkedKeys}
						showIcon
						treeData={treeData}
						onCheck={(values: any) => {
							setCheckedKeys(values);
						}}
						checkStrictly
					/>
				</Col>
			</Row>
		</div>
	);
};

export default SetRoleForm;
