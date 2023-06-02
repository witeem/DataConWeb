/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { TableListItem } from "./data";
import { ModulePagePagination, TableListPagination } from "@/views/components/tablelist";
import { useTranslation } from "react-i18next";
import ProTable, { ActionType, ProColumns } from "@ant-design/pro-table";
import { Button, Card, Col, Row } from "antd";
import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import { GetPageBaseReq } from "@/views/interface";
import { GetModulePageApi } from "@/api/modules/module";
import MenuBar from "@/layouts/components/Menu/menubar";

/** 获取列表 GET  */
export async function requestData(
	params: {
		// query
		/** 当前的页码 */
		current?: number;
		/** 页面的容量 */
		pageSize?: number;
	},
	options?: { [key: string]: any }
) {
	return await GetModulePageApi(GetPageBaseReq(params));
}

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
		pageSize: 20,
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

	const CreateBtn = async () => {
		addRef.current!.ShowModal({ menuId: selectedMenu?.key, menuTitle: selectedMenu?.title });
	};

	const UpdateBtn = async (params: TableListItem) => {
		updateRef.current!.ShowModal({ ...params, menuTitle: selectedMenu?.title });
	};

	const LoadTable = async () => {
		await requestData(GetPageBaseReq(tableParams));
	};

	const handleClick = async (data: MenuBarProps) => {
		setTableParams({ ...tableParams, menuId: data.key });
		setSelectedMenu(data);
	};

	useEffect(() => {
		LoadTable();
	}, [tableParams]);

	return (
		<Card bordered={false} title="Module List">
			<Row>
				<Col span={18} push={5}>
					<Addform innerRef={addRef} loadTable={LoadTable} />
					<Updateform innerRef={updateRef} loadTable={LoadTable} />
					<ProTable<TableListItem, TableListPagination>
						bordered={true}
						params={tableParams}
						request={requestData}
						actionRef={actionRef}
						columns={columns}
						rowKey={record => record.id}
						rowSelection={{
							onChange: (_, selectedRows) => {
								setSelectedRows(selectedRows);
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
				</Col>
				<Col span={4} pull={18} className="right-border-sider">
					<MenuBar onClick={handleClick} innerRef={menuBarRef} />
				</Col>
			</Row>
		</Card>
	);
};

export default ModuleList;
