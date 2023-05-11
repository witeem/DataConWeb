import { useEffect, useRef, useState } from "react";
import { Table, Input, Button, Space, Row, Col } from "antd";
// import useAuthButtons from "@/hooks/useAuthButtons";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import type { FilterValue, SorterResult } from "antd/es/table/interface";
import type { TableListItem } from "./data";
import { GetUserPageApi } from "@/api/modules/userinfo";
import GetRandomuserParams from "@/views/interface/index";
import type { TbParams } from "@/views/interface/index";
import Addform from "@/views/user/components/addform";
import Updateform from "../components/updateform";
import { message } from "antd";
import { useTranslation } from "react-i18next";

import "./index.less";
import "@/views/table-list.less";

const UserList: React.FC = () => {
	interface ModalProps {
		ShowModal: () => void;
	}

	interface ColumnProps {
		ShowModal: (params: TableListItem) => void;
	}

	const { t } = useTranslation();
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);

	// 按钮权限
	// const { BUTTONS } = useAuthButtons();
	const [userIdvalue, setUserIdvalue] = useState("");
	const [data, setData] = useState<TableListItem[]>();
	const [loading, setLoading] = useState(false);
	const [tableParams, setTableParams] = useState<TbParams>({
		pagination: {
			current: 1,
			pageSize: 10
		},
		filters: {}
	});

	const FetchData = async () => {
		setLoading(true);
		try {
			let dataRes = await GetUserPageApi(GetRandomuserParams(tableParams));
			if (dataRes?.success) {
				setData(dataRes?.data);
				setTableParams({
					...tableParams,
					pagination: {
						...tableParams.pagination
						// total: dataRes.total
						// 200 is mock data, you should read it from server
						// total: data.totalCount,
					}
				});
			}
		} catch (error: any) {
			message.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	const HandleTableChange = (
		pagination: TablePaginationConfig,
		filters: Record<string, FilterValue | null>,
		sorter: SorterResult<TableListItem> | SorterResult<TableListItem>[]
	) => {
		setTableParams({
			pagination,
			filters,
			...sorter
		});

		// `dataSource` is useless since `pageSize` changed
		if (pagination.pageSize !== tableParams.pagination?.pageSize) {
			setData([]);
		}
	};

	useEffect(() => {
		FetchData();
	}, [JSON.stringify(tableParams)]);

	const columns: ColumnsType<TableListItem> = [
		{
			title: t("userColumn.userId"),
			width: 120,
			dataIndex: "userId",
			key: "userId",
			align: "center",
			fixed: "left"
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
			key: "operation",
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

	const SearchBtn = async () => {
		setTableParams({ ...tableParams, pagination: { ...tableParams.pagination }, keyword: userIdvalue });
	};

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
			<Row gutter={[16, 24]}>
				<Col className="gutter-row" span={6}>
					<Space align="center">
						<span>{t("userColumn.userId")} ：</span>
						<Input
							value={userIdvalue}
							onChange={e => {
								setUserIdvalue(e.target.value);
							}}
						/>
					</Space>
				</Col>
				<Col className="gutter-row" span={6}>
					<Space align="center">
						<span>{t("userColumn.userName")} ：</span>
						<Input />
					</Space>
				</Col>
			</Row>
			<Row justify="end" className="table-spance">
				<Col>
					<Button type="primary" onClick={SearchBtn}>
						{t("opt.search")}
					</Button>
					&nbsp;
					<Button type="primary" onClick={CreateBtn}>
						{t("opt.create")}
					</Button>
				</Col>
			</Row>
			{/* <div className="auth">
				<Space>
					{BUTTONS.add && <Button type="primary">我是 Admin && User 能看到的按钮</Button>}
					{BUTTONS.delete && <Button type="primary">我是 Admin 能看到的按钮</Button>}
					{BUTTONS.edit && <Button type="primary">我是 User 能看到的按钮</Button>}
				</Space>
			</div> */}
			<div className="table-spance"></div>
			<Table
				bordered={true}
				dataSource={data}
				columns={columns}
				rowKey={record => record.userId}
				pagination={
					(tableParams.pagination,
					{
						showSizeChanger: true,
						showQuickJumper: true,
						total: data?.length,
						showTotal: total => `Total ${total} items`
					})
				}
				loading={loading}
				onChange={HandleTableChange}
			/>
		</div>
	);
};

export default UserList;
