// @ts-ignore
/* eslint-disable */
import { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import type { TableListItem } from "./data";
import { GetRolePageApi } from "@/api/modules/roleinfo";
import { GetRandomuserParams } from "@/views/interface/index";
import { useTranslation } from "react-i18next";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import ProTable from "@ant-design/pro-table";
import { PageContainer } from "@ant-design/pro-layout";
import type { ProColumns, ActionType } from "@ant-design/pro-table";
import type { TableListPagination } from "@/views/components/tablelist";

import "./index.less";

/** 获取规则列表 GET /api/rule */
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
	return await GetRolePageApi(GetRandomuserParams(params));
}

const RoleList: React.FC = () => {
	interface ModalProps {
		ShowModal: () => void;
	}

	interface ColumnProps {
		ShowModal: (params: TableListItem) => void;
	}

	// 按钮权限
	const { t } = useTranslation();
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);

	const actionRef = useRef<ActionType>();
	const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 20
	});

	const columns: ProColumns<TableListItem>[] = [
		{
			title: t("roleColumn.roleName"),
			dataIndex: "roleName",
			key: "keyword",
			width: 120,
			align: "center"
		},
		{
			title: t("roleColumn.desc"),
			dataIndex: "description",
			key: "description",
			align: "center"
		},
		{
			title: t("roleColumn.authScope"),
			dataIndex: "authorityScope",
			sorter: true,
			search: false,
			align: "center"
		},
		{
			title: t("roleColumn.active"),
			dataIndex: "active",
			key: "active",
			align: "center",
			valueEnum: {
				1: { text: "活跃", status: "Success" },
				0: { text: "禁用", status: "Error" }
			},
			width: "50%"
		},
		{
			title: t("opt.opt"),
			dataIndex: "option",
			valueType: "option",
			fixed: "right",
			width: 120,
			render: (_, record) => [
				<a
					key="updateItem"
					onClick={() => {
						UpdateBtn(record);
					}}
				>
					{t("opt.update")}
				</a>
			]
		}
	];

	const CreateBtn = async () => {
		addRef.current!.ShowModal();
	};

	const UpdateBtn = async (params: TableListItem) => {
		updateRef.current!.ShowModal(params);
	};

	return (
		<div className="card content-box">
			<Addform innerRef={addRef} />
			<Updateform innerRef={updateRef} />
			<PageContainer>
				<ProTable<TableListItem, TableListPagination>
					headerTitle={t("roleColumn.rolelist")}
					bordered={true}
					params={tableParams}
					request={requestData}
					actionRef={actionRef}
					columns={columns}
					rowKey={record => record.roleName}
					toolBarRender={() => [
						<Button
							type="primary"
							key="primary"
							onClick={() => {
								CreateBtn();
							}}
						>
							<PlusOutlined /> {t("opt.create")}
						</Button>
					]}
					rowSelection={{
						onChange: (_, selectedRows) => {
							setSelectedRows(selectedRows);
						}
					}}
				/>
			</PageContainer>
		</div>
	);
};

export default RoleList;
