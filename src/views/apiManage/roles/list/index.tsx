// @ts-ignore
/* eslint-disable */
import { useState, useRef, useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { GetRolePageApi } from "@/api/modules/roleinfo";
import { GetPageBaseReq } from "@/views/interface/index";
import { useTranslation } from "react-i18next";
import Addform from "../components/addform";
import Updateform from "../components/updateform";
import type { ProColumns } from "@ant-design/pro-table";
import SetRoleDrawer from "../components/setroledrawer";
import useAuthButtons from "@/hooks/useAuthButtons";
import SuperTable from "@/views/components/tablelist-template/supertable";

const RoleList: React.FC = () => {
	const { t } = useTranslation();
	interface ModalProps {
		showModal: () => void;
	}

	interface ColumnProps {
		showModal: (params: any) => void;
	}

	// 按钮权限
	const { BUTTONS } = useAuthButtons();
	const setroleRef = useRef<ColumnProps>(null);
	const updateRef = useRef<ColumnProps>(null);
	const addRef = useRef<ModalProps>(null);
	const target = useRef<HTMLDivElement>(null);
	const [optHide, setOptHide] = useState(false);
	const [reload, setReload] = useState(false);

	const columns: ProColumns<any>[] = [
		{
			title: t("roleColumn.roleName"),
			dataIndex: "roleName",
			key: "roleName",
			width: 120,
			align: "center"
		},
		{
			title: t("roleColumn.desc"),
			dataIndex: "description",
			key: "description",
			search: false,
			align: "center"
		},
		{
			title: t("roleColumn.active"),
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
			hideInTable: optHide,
			render: (_, record) => {
				let opts: any = [];
				if (BUTTONS.update) {
					opts.push(
						<Button
							shape="round"
							className="ant-btn-primary"
							key="updateItem"
							onClick={() => {
								updateBtn(record);
							}}
						>
							{t("opt.update")}
						</Button>
					);
				}
				if (BUTTONS.permissions) {
					opts.push(
						<Button
							shape="round"
							className="ant-btn-primary"
							key="setRoleItem"
							onClick={() => {
								setRoleBtn(record);
							}}
						>
							{t("opt.setrole")}
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

	const setRoleBtn = async (params: any) => {
		setReload(false);
		setroleRef.current!.showModal(params);
	};

	const loadTable = async () => {
		setReload(true);
	};

	const fetchData = async (params: any) => {
		let res = await GetRolePageApi(GetPageBaseReq(params));
		if (res.success) {
			return res;
		}

		return [];
	};

	useEffect(() => {
		if (!BUTTONS.update && !BUTTONS.permissions) {
			setOptHide(true);
		}
	}, []);

	return (
		<div ref={target}>
			<Addform innerRef={addRef} loadTable={loadTable} />
			<Updateform innerRef={updateRef} loadTable={loadTable} />
			<SetRoleDrawer innerRef={setroleRef} loadTable={loadTable} />
			<SuperTable
				title={t("roleColumn.rolelist")}
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

export default RoleList;
