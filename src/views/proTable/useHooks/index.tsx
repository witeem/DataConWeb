/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Table, DatePicker, Button, Space } from "antd";
import useAuthButtons from "@/hooks/useAuthButtons";
import { PlusOutlined } from "@ant-design/icons";

import "./index.less";
import { useTranslation } from "react-i18next";
import { ActionType, ProColumns, ProTable } from "@ant-design/pro-table";
import { TableListItem } from "@/views/user/list/data";
import { TableListPagination } from "@/views/components/tablelist";
import { GetUserPageApi } from "@/api/modules/userinfo";
import { GetPageBaseReq } from "@/views/interface";

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
	return await GetUserPageApi(GetPageBaseReq(params));
}

const UseHooks = () => {
	// 按钮权限
	const { t } = useTranslation();
	const { BUTTONS } = useAuthButtons();
	const { RangePicker } = DatePicker;
	const actionRef = useRef<ActionType>();
	const [tableParams, setTableParams] = useState<TableListPagination>({
		current: 1,
		pageSize: 20
	});

	const CreateBtn = async () => {
		console.log(tableParams);
	};

	useEffect(() => {
		console.log(BUTTONS);
	}, []);

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
				</a>,
				<a
					key="setRole"
					onClick={() => {
						ProfileBtn(record);
					}}
				>
					{t("opt.profile")}
				</a>
			]
		}
	];

	const UpdateBtn = async (params: TableListItem) => {
		console.log(params);
	};

	const ProfileBtn = async (params: TableListItem) => {
		console.log(params);
	};

	return (
		<div className="card content-box">
			<div className="date">
				<span>切换国际化的时候看我 😎 ：</span>
				<RangePicker />
			</div>
			<div className="auth">
				<Space>
					{BUTTONS.add && <Button type="primary">我是 Admin && User 能看到的按钮</Button>}
					{BUTTONS.delete && <Button type="primary">我是 Admin 能看到的按钮</Button>}
					{BUTTONS.edit && <Button type="primary">我是 User 能看到的按钮</Button>}
				</Space>
			</div>
			{/* <Table bordered={true} dataSource={dataSource} columns={columns} /> */}
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
			/>
		</div>
	);
};

export default UseHooks;
