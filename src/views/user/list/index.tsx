/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Button, Card } from "antd";
import type { TableListItem } from "./data";
import { getUserPageApi } from "@/api/modules/userinfo";
import { GetPageBaseReq } from "@/views/interface/index";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import { useTranslation } from "react-i18next";
import ProTable from "@ant-design/pro-table";
import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TableListPagination } from "@/views/components/tablelist";

import "./index.less";
import ProfileForm from "../components/profileform";
import useAuthButtons from "@/hooks/useAuthButtons";
import { current } from "immer";

interface ModalProps {
	showModal: () => void;
}

interface ColumnProps {
	showModal: (params: TableListItem) => void;
}

const UserList: React.FC = () => {
	const { t } = useTranslation();
	const { BUTTONS } = useAuthButtons();
	const profileRef = useRef<ColumnProps>(null);
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const actionRef = useRef<ActionType>();
	const target = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState(433); // 表格高度，默认值大约显示10行

	const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 10,
		total: 0
	});

	const columns: ProColumns<TableListItem>[] = [
		{
			title: t("userColumn.userId"),
			width: 120,
			dataIndex: "userId",
			key: "userId",
			align: "center"
		},
		{
			title: t("userColumn.userName"),
			width: 120,
			dataIndex: "userName",
			key: "userName",
			align: "center"
		},
		{
			title: t("userColumn.mallId"),
			dataIndex: "mallId",
			key: "mallId",
			align: "center"
		},
		{
			title: t("userColumn.emailAdd"),
			dataIndex: "emailAdd",
			key: "emailAdd",
			align: "center",
			width: "50%"
		},
		{
			title: t("opt.opt"),
			dataIndex: "option",
			valueType: "option",
			fixed: "right",
			align: "center",
			width: 120,
			render: (_, record) => {
				let opts = [];
				if (BUTTONS.update) {
					opts.push(
						<Button
							className="ant-btn-primary btn-ripple"
							key="updateItem"
							onClick={() => {
								updateBtn(record);
							}}
						>
							{t("opt.update")}
						</Button>
					);
				}
				if (BUTTONS.profile) {
					opts.push(
						<Button
							className="ant-btn-primary btn-ripple"
							key="profile"
							onClick={() => {
								profileBtn(record);
							}}
						>
							{t("opt.profile")}
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

	const profileBtn = async (params: TableListItem) => {
		profileRef.current!.showModal(params);
	};

	const loadTable = async () => {
		actionRef.current!.reload();
	};

	const fetchData = async (params: any) => {
		params = { ...params, ...tableParams };
		params.pageSize = tableParams.pageSize || 10;
		let res = await getUserPageApi(GetPageBaseReq(params));
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
			<ProfileForm innerRef={profileRef} loadTable={loadTable} />
			<ProTable<TableListItem, TableListPagination>
				tableStyle={{ height: tableHeight }}
				headerTitle={t("userColumn.userlist")}
				bordered={true}
				params={tableParams}
				request={fetchData}
				actionRef={actionRef}
				columns={columns}
				rowKey={record => record.userId}
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
				rowSelection={{
					onChange: (_, selectedRows) => {
						setSelectedRows(selectedRows);
					}
				}}
				search={{
					optionRender: ({ searchText }, { form }) => {
						return [
							<Button
								className="btn-ripple"
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
								className="btn-ripple"
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

export default UserList;
