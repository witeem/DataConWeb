// @ts-ignore
/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, Card } from "antd";
import type { TableListItem } from "./data";
import { GetRolePageApi } from "@/api/modules/roleinfo";
import { GetPageBaseReq } from "@/views/interface/index";
import { useTranslation } from "react-i18next";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import ProTable from "@ant-design/pro-table";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TableListPagination } from "@/views/components/tablelist";

import "./index.less";
import SetRoleDrawer from "../components/setroledrawer";
import useAuthButtons from "@/hooks/useAuthButtons";

const RoleList: React.FC = () => {
	const { t } = useTranslation();
	interface ModalProps {
		showModal: () => void;
	}

	interface ColumnProps {
		showModal: (params: TableListItem) => void;
	}

	// 按钮权限
	const { BUTTONS } = useAuthButtons();
	const setroleRef = useRef<ColumnProps>(null);
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);

	const actionRef = useRef<ActionType>();
	const target = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState(433); // 表格高度，默认值大约显示10行
	const [selectedRows, setSelectedRows] = useState<TableListItem[]>([]);
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 10,
		total: 0
	});

	const columns: ProColumns<TableListItem>[] = [
		{
			title: t("roleColumn.roleName"),
			dataIndex: "roleName",
			key: "roleName",
			width: 120,
			align: "center"
		},
		{
			title: t("roleColumn.desc"),
			dataIndex: "description",
			key: "description",
			search: false,
			align: "center"
		},
		{
			title: t("roleColumn.active"),
			dataIndex: "active",
			key: "active",
			align: "center",
			valueEnum: {
				true: { text: "Active", status: "Success" },
				false: { text: "Banned", status: "Error" }
			},
			width: 100
		},
		{
			title: t("opt.opt"),
			dataIndex: "option",
			valueType: "option",
			fixed: "right",
			align: "center",
			width: 120,
			render: (_, record) => {
				let opts: any = [];
				if (BUTTONS.update) {
					opts.push(
						<Button
							className="ant-btn-primary"
							key="updateItem"
							onClick={() => {
								updateBtn(record);
							}}
						>
							{t("opt.update")}
						</Button>
					);
				}
				if (BUTTONS.permissions) {
					opts.push(
						<Button
							className="ant-btn-primary"
							key="setRoleItem"
							onClick={() => {
								setRoleBtn(record);
							}}
						>
							{t("opt.setrole")}
						</Button>
					);
				}
				return opts;
			}
		}
	];

	const createBtn = async () => {
		addRef.current!.showModal();
	};

	const updateBtn = async (params: TableListItem) => {
		updateRef.current!.showModal(params);
	};

	const setRoleBtn = async (params: TableListItem) => {
		setroleRef.current!.showModal(params);
	};

	const loadTable = async () => {
		actionRef.current!.reload();
	};

	const fetchData = async (params: any) => {
		params = { ...params, ...tableParams };
		params.pageSize = tableParams.pageSize || 10;
		let res = await GetRolePageApi(GetPageBaseReq(params));
		if (res.success) {
			return res;
		}

		return [];
	};

	useEffect(() => {
		loadTable();
	}, [JSON.stringify(tableParams)]);

	useEffect(() => {
		const searchHeight = document.getElementsByClassName("ant-pro-table-search")[0]?.clientHeight || 0;
		const headerHeight = document.getElementsByClassName("ant-layout-header")[0]?.clientHeight || 0;
		const contentHeight = document.getElementsByClassName("ant-layout-content")[0]?.clientHeight || 0;
		setTableHeight(contentHeight - headerHeight - searchHeight - 40);
	}, [document.getElementsByClassName("ant-layout-content")[0]?.clientHeight]);

	return (
		<div ref={target}>
			<Addform innerRef={addRef} loadTable={loadTable} />
			<Updateform innerRef={updateRef} loadTable={loadTable} />
			<SetRoleDrawer innerRef={setroleRef} loadTable={loadTable} />
			<ProTable<TableListItem, TableListPagination>
				tableStyle={{ height: tableHeight }}
				headerTitle={t("roleColumn.rolelist")}
				bordered={true}
				params={tableParams}
				request={fetchData}
				actionRef={actionRef}
				columns={columns}
				rowKey={record => record.roleName}
				toolBarRender={() =>
					BUTTONS.add && [
						<Button
							type="primary"
							key="primary"
							onClick={() => {
								createBtn();
							}}
						>
							<PlusOutlined /> {t("opt.create")}
						</Button>
					]
				}
				rowSelection={{
					onChange: (_, selectedRows) => {
						setSelectedRows(selectedRows);
					}
				}}
				pagination={{
					showQuickJumper: true,
					showSizeChanger: true,
					defaultPageSize: tableParams.pageSize,
					onShowSizeChange: (page, pageSize) => {
						setTableParams({ ...tableParams, current: page, pageSize });
					},
					onChange: (page, pageSize) => {
						setTableParams({ ...tableParams, current: page, pageSize });
					}
				}}
				search={{
					optionRender: ({ searchText }, { form }) => {
						return [
							<Button
								type="primary"
								key="reset"
								icon={<RedoOutlined />}
								onClick={() => {
									form?.resetFields();
								}}
							>
								{t("opt.reset")}
							</Button>,
							<Button
								type="primary"
								key="submit"
								icon={<SearchOutlined />}
								onClick={() => {
									form?.submit();
								}}
							>
								{t("opt.search")}
							</Button>
						];
					}
				}}
			/>
		</div>
	);
};

export default RoleList;
