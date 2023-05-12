/* eslint-disable @typescript-eslint/no-unused-vars */
import { useRef, useState } from "react";
import { Button } from "antd";
import type { TableListItem } from "./data";
import { GetUserPageApi } from "@/api/modules/userinfo";
import { GetRandomuserParams } from "@/views/interface/index";
import Addform from "@/views/user/components/addform";
import Updateform from "../components/updateform";
import { useTranslation } from "react-i18next";
import { PageContainer } from "@ant-design/pro-layout";
import ProTable from "@ant-design/pro-table";
import { PlusOutlined } from "@ant-design/icons";
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
	return await GetUserPageApi(GetRandomuserParams(params));
}

interface ModalProps {
	ShowModal: () => void;
}

interface ColumnProps {
	ShowModal: (params: TableListItem) => void;
}

const UserList: React.FC = () => {
	const { t } = useTranslation();
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const actionRef = useRef<ActionType>();

	const [userIdvalue, setUserIdvalue] = useState("");
	const [data, setData] = useState<TableListItem[]>();
	const [loading, setLoading] = useState(false);
	const [selectedRowsState, setSelectedRows] = useState<TableListItem[]>([]);
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 20
	});

	const columns: ProColumns<TableListItem>[] = [
		{
			title: t("userColumn.userId"),
			width: 120,
			dataIndex: "userId",
			key: "keyword",
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
					headerTitle={t("userColumn.userlist")}
					bordered={true}
					params={tableParams}
					request={requestData}
					actionRef={actionRef}
					columns={columns}
					rowKey={record => record.userId}
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

export default UserList;
