/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import type { CategoryListItem } from "./data";
import { GetPageBaseReq } from "@/views/interface/index";
import Addform from "../components/categoryaddform";
import Updateform from "../components/categoryupdateform";
import { useTranslation } from "react-i18next";
import ProTable from "@ant-design/pro-table";
import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TableListPagination } from "@/views/components/tablelist";

import "./index.less";
import useAuthButtons from "@/hooks/useAuthButtons";
import { GetTradeCategoryPageApi } from "@/api/modules/outlet";

interface ModalProps {
	showModal: () => void;
}

interface ColumnProps {
	showModal: (params: CategoryListItem) => void;
}

const CategoryList: React.FC = () => {
	const { t } = useTranslation();
	const { BUTTONS } = useAuthButtons();
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const actionRef = useRef<ActionType>();
	const target = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState(433); // 表格高度，默认值大约显示10行
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 10,
		total: 0
	});

	const columns: ProColumns<CategoryListItem>[] = [
		{
			title: "ID",
			dataIndex: "id",
			key: "id",
			align: "center",
			fixed: "left",
			search: false,
			width: 120
		},
		{
			title: t("outletColumn.category"),
			dataIndex: "category",
			key: "category",
			align: "center",
			fixed: "left",
			width: "50%"
		},
		{
			title: t("outletColumn.mallId"),
			dataIndex: "mallId",
			key: "mallId",
			align: "center"
		},
		{
			title: t("outletColumn.active"),
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
				return opts;
			}
		}
	];

	const createBtn = async () => {
		addRef.current!.showModal();
	};

	const updateBtn = async (params: CategoryListItem) => {
		updateRef.current!.showModal(params);
	};

	const loadTable = async () => {
		actionRef.current!.reload();
	};

	const fetchData = async (params: any) => {
		params = { ...params, ...tableParams };
		params.pageSize = tableParams.pageSize || 10;
		let res = await GetTradeCategoryPageApi(GetPageBaseReq(params));
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
			<ProTable<CategoryListItem, TableListPagination>
				tableStyle={{ height: tableHeight }}
				headerTitle={t("outletColumn.outletlist")}
				bordered={true}
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

export default CategoryList;
