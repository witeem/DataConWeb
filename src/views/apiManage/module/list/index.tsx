/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { TableListItem } from "./data";
import { ModulePagePagination, TableListPagination } from "@/views/components/tablelist-template/tablelist";
import { useTranslation } from "react-i18next";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, Card, Col, Row } from "antd";
import { RedoOutlined, SearchOutlined } from "@ant-design/icons";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import { GetPageBaseReq } from "@/views/interface";
import { GetModulePageApi } from "@/api/modules/module";
import MenuBar from "@/layouts/components/Menu/menubar";
import { features } from "process";

type MenuBarProps = {
	key: number;
	title: string;
};

interface ModalProps {
	ShowModal: (params: any) => void;
}

interface ColumnProps {
	ShowModal: (params: any) => void;
}

const ModuleList: React.FC = () => {
	const { t } = useTranslation();
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const actionRef = useRef<ActionType>();
	const menuBarRef = useRef<ModalProps>(null);
	const [selectedMenu, setSelectedMenu] = useState<MenuBarProps>();
	const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
	const [tableParams, setTableParams] = useState<ModulePagePagination>({
		current: 1,
		pageSize: 10,
		total: 0,
		menuId: 0
	});

	const columns: ProColumns<TableListItem>[] = [
		{
			title: t("moduleColumn.code"),
			width: 120,
			dataIndex: "code",
			key: "code",
			align: "center"
		},
		{
			title: t("moduleColumn.title"),
			width: 120,
			dataIndex: "title",
			key: "title",
			align: "center"
		},
		{
			title: t("moduleColumn.description"),
			dataIndex: "description",
			key: "description",
			search: false,
			align: "center"
		},
		{
			title: t("moduleColumn.linkUrl"),
			dataIndex: "linkUrl",
			key: "linkUrl",
			search: false,
			align: "center"
		},
		{
			title: t("moduleColumn.controller"),
			dataIndex: "controller",
			key: "controller",
			align: "center"
		},
		{
			title: t("moduleColumn.action"),
			dataIndex: "action",
			key: "action",
			align: "center"
		},
		{
			title: t("moduleColumn.enabled"),
			dataIndex: "enabled",
			key: "enabled",
			align: "center",
			valueEnum: {
				true: { text: "Active", status: "Success" },
				false: { text: "Banned", status: "Error" }
			},
			width: 100
		}
	];

	const createBtn = async () => {
		addRef.current!.ShowModal({ menuId: selectedMenu?.key, menuTitle: selectedMenu?.title });
	};

	const updateBtn = async (params: TableListItem) => {
		updateRef.current!.ShowModal({ ...params, menuTitle: selectedMenu?.title });
	};

	const loadTable = async () => {
		actionRef.current!.reload();
	};

	const fetchData = async (params: any) => {
		params = { ...params, ...tableParams };
		params.pageSize = tableParams.pageSize || 10;
		let res = await GetModulePageApi(GetPageBaseReq(params));
		if (res.success) {
			return res;
		}

		return [];
	};

	const handleClick = async (data: MenuBarProps) => {
		setTableParams({ ...tableParams, menuId: data.key });
		setSelectedMenu(data);
	};

	useEffect(() => {}, []);

	return (
		<Card bordered={false} title="Module List">
			<Row>
				<Col span={18} push={5}>
					<Addform innerRef={addRef} loadTable={loadTable} />
					<Updateform innerRef={updateRef} loadTable={loadTable} />
					<ProTable<TableListItem, TableListPagination>
						bordered={true}
						params={tableParams}
						request={fetchData}
						actionRef={actionRef}
						columns={columns}
						rowKey={record => record.id}
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
										shape="round"
										type="primary"
										key="reset"
										icon={<RedoOutlined />}
										onClick={() => {
											form?.resetFields();
											form?.submit();
										}}
									>
										{t("opt.reset")}
									</Button>,
									<Button
										shape="round"
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
				</Col>
				<Col span={4} pull={18} className="right-border-sider">
					<MenuBar onClick={handleClick} innerRef={menuBarRef} />
				</Col>
			</Row>
		</Card>
	);
};

export default ModuleList;
