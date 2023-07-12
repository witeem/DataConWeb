/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import { Button } from "antd";
import { getUserPageApi } from "@/api/modules/userinfo";
import { GetPageBaseReq } from "@/views/interface/index";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import { useTranslation } from "react-i18next";
import { PlusOutlined } from "@ant-design/icons";
import type { ProColumns } from "@ant-design/pro-table";
import ProfileForm from "../components/profileform";
import useAuthButtons from "@/hooks/useAuthButtons";
import SuperTable from "@/views/components/tablelist-template/supertable";

interface ModalProps {
	showModal: () => void;
}

interface ColumnProps {
	showModal: (params: any) => void;
}

const UserList: React.FC = () => {
	const { t } = useTranslation();
	const { BUTTONS } = useAuthButtons();
	const profileRef = useRef<ColumnProps>(null);
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const target = useRef<HTMLDivElement>(null);
	const [optHide, setOptHide] = useState(false);
	const [reload, setReload] = useState(false);

	const columns: ProColumns<any>[] = [
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
			hideInTable: optHide,
			render: (_, record) => {
				let opts = [];
				if (BUTTONS.update) {
					opts.push(
						<Button
							shape="round"
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
							shape="round"
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
		setReload(false);
		addRef.current!.showModal();
	};

	const updateBtn = async (params: any) => {
		setReload(false);
		updateRef.current!.showModal(params);
	};

	const profileBtn = async (params: any) => {
		setReload(false);
		profileRef.current!.showModal(params);
	};

	const loadTable = async () => {
		setReload(true);
	};

	const fetchData = async (params: any) => {
		let res = await getUserPageApi(GetPageBaseReq(params));
		if (res.success) {
			return res;
		}

		return [];
	};

	useEffect(() => {
		if (!BUTTONS.update && !BUTTONS.profile) {
			setOptHide(true);
		}
	}, []);

	return (
		<div ref={target}>
			<Addform innerRef={addRef} loadTable={loadTable} />
			<Updateform innerRef={updateRef} loadTable={loadTable} />
			<ProfileForm innerRef={profileRef} loadTable={loadTable} />
			<SuperTable
				title={t("userColumn.userlist")}
				fetchData={fetchData}
				columns={columns}
				rowSelection={true}
				reload={reload}
				rowKey="id"
				toolBarRender={() =>
					BUTTONS.add && [
						<Button
							shape="round"
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
				search={true}
			/>
		</div>
	);
};

export default UserList;
