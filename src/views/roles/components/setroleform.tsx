import { useState, Ref, useImperativeHandle } from "react";
import { Modal, Form } from "antd";
import type { TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import TreeTransfer from "./treeTransfer";
import { GetMenuData } from "@/api/modules/menuinfo";

interface Props {
	innerRef: Ref<{ ShowModal: (params: TableListItem) => void }>;
}

const treeData = await GetMenuData();

const SetRoleForm = (props: Props) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [targetKeys, setTargetKeys] = useState<string[]>([]);
	const onChange = (keys: string[]) => {
		console.log(keys);
		setTargetKeys(keys);
	};

	const ShowModal = (params: TableListItem) => {
		setVisible(true);
		form.setFieldsValue(params);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		ShowModal
	}));

	return (
		<div>
			<Modal
				title={t("opt.setrole")}
				visible={visible}
				okText={t("opt.submit")}
				cancelText={t("opt.cancel")}
				onCancel={() => {
					setVisible(false);
				}}
				onOk={() => {
					setVisible(false);
				}}
				width={800}
			>
				{" "}
				<TreeTransfer dataSource={treeData} targetKeys={targetKeys} onChange={onChange} />
			</Modal>
		</div>
	);
};

export default SetRoleForm;
