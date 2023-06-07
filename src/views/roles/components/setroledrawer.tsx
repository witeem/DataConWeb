import { useImperativeHandle, useState } from "react";
import { TableListItem } from "../list/data";
import { Drawer } from "antd";
import { useTranslation } from "react-i18next";
import SetRoleForm from "./setroleform";

const SetRoleDrawer = (props: any) => {
	const { t } = useTranslation();
	const [open, setOpen] = useState(false);
	const [selectedRole, setSelectedRole] = useState<TableListItem>();
	const showModal = (params: TableListItem) => {
		setOpen(true);
		setSelectedRole(params);
	};

	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const onClose = () => {
		setOpen(false);
	};

	const loadTable = () => {
		setOpen(false);
		props.loadTable();
	};

	return (
		<Drawer title={t("opt.setrole")} placement="right" width={500} onClose={onClose} open={open}>
			<SetRoleForm selectedRole={selectedRole} loadTable={loadTable} />
		</Drawer>
	);
};

export default SetRoleDrawer;
