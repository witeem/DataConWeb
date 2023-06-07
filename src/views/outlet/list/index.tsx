/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import type { TableListItem } from "./data";
import { GetPageBaseReq } from "@/views/interface/index";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import { useTranslation } from "react-i18next";
import ProTable from "@ant-design/pro-table";
import { PlusOutlined, RedoOutlined, SearchOutlined } from "@ant-design/icons";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TableListPagination } from "@/views/components/tablelist";

import "./index.less";
import useAuthButtons from "@/hooks/useAuthButtons";
import { GetOutletPageApi } from "@/api/modules/outlet";
import { formatTime } from "@/utils/util";

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
	return await GetOutletPageApi(GetPageBaseReq(params));
}

interface ModalProps {
	showModal: () => void;
}

interface ColumnProps {
	showModal: (params: TableListItem) => void;
}

const OutletList: React.FC = () => {
	const { t } = useTranslation();
	const { BUTTONS } = useAuthButtons();
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const actionRef = useRef<ActionType>();
	const target = useRef<HTMLDivElement>(null);
	const [tableHeight, setTableHeight] = useState(433); // 表格高度，默认值大约显示10行
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 20,
		total: 0
	});

	const columns: ProColumns<TableListItem>[] = [
		{
			title: t("outletColumn.vendorId"),
			dataIndex: "vendorId",
			key: "vendorId",
			align: "center",
			fixed: "left",
			width: 120
		},
		{
			title: t("outletColumn.outletName"),
			dataIndex: "outletName",
			key: "outletName",
			align: "center",
			fixed: "left",
			width: 200
		},
		{
			title: t("outletColumn.trade"),
			dataIndex: "trade",
			key: "trade",
			align: "center"
		},
		{
			title: t("outletColumn.outletNumber"),
			dataIndex: "outletNumber",
			key: "outletNumber",
			align: "center"
		},
		{
			title: t("outletColumn.mallId"),
			dataIndex: "mallId",
			key: "mallId",
			search: false,
			align: "center"
		},
		{
			title: t("outletColumn.category"),
			dataIndex: "category",
			key: "category",
			search: false,
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
			title: t("outletColumn.zone"),
			dataIndex: "zone",
			key: "zone",
			align: "center"
		},
		{
			title: t("outletColumn.leaseId"),
			dataIndex: "leaseId",
			key: "leaseId",
			align: "center"
		},
		{
			title: t("outletColumn.leaseStartDate"),
			dataIndex: "leaseStartDate",
			key: "leaseStartDate",
			search: false,
			align: "center",
			render: (_, record) => formatTime(record.leaseStartDate)
		},
		{
			title: t("outletColumn.leaseEndDate"),
			dataIndex: "leaseEndDate",
			key: "leaseEndDate",
			search: false,
			align: "center",
			render: (_, record) => formatTime(record.leaseEndDate)
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

	const updateBtn = async (params: TableListItem) => {
		updateRef.current!.showModal(params);
	};

	const loadTable = async () => {
		actionRef.current!.reload();
	};

	useEffect(() => {
		loadTable();
	}, [tableParams]);

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
			<ProTable<TableListItem, TableListPagination>
				tableStyle={{ height: tableHeight }}
				scroll={{ x: "calc(800px + 50%)" }}
				headerTitle={t("outletColumn.outletlist")}
				bordered={true}
				params={tableParams}
				request={requestData}
				actionRef={actionRef}
				columns={columns}
				rowKey={record => record.vendorId}
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

export default OutletList;
