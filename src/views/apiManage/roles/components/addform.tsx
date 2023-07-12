import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import { useTranslation } from "react-i18next";
import { GetInsertRoleReq } from "@/views/interface";
import { InsertRoleApi } from "@/api/modules/roleinfo";

const AddForm = (props: any) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const showModal = () => {
		setVisible(true);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const createBtn = async () => {
		try {
			let roleReq = {};
			await form.validateFields().then(values => {
				roleReq = values;
			});
			if (roleReq) {
				let res = await InsertRoleApi(GetInsertRoleReq(roleReq));
				if (res.success) {
					form.resetFields();
					message.success("Create Success");
					props.loadTable();
					setVisible(false);
				} else {
					message.error(res.msg);
				}
			}
		} catch (err: any) {
			message.error(err.message);
		}
	};

	return (
		<Modal
			title={t("userForm.createUser")}
			open={visible}
			okText={t("opt.create")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={createBtn}
		>
			<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
				<Form.Item label="Role Name" name="roleName" rules={[{ required: true, message: "Please enter the role Name" }]}>
					<Input />
				</Form.Item>
				<Form.Item label="Description" name="description">
					<Input.TextArea placeholder="role description" autoSize={{ minRows: 4, maxRows: 6 }} />
				</Form.Item>
				<Row>
					<Col span={11}>
						<Space>
							<div className="sw-text">Active：</div>
							<Form.Item label=" " name="active" valuePropName="checked">
								<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
							</Form.Item>
						</Space>
					</Col>
					<Col span={2}></Col>
					<Col span={11}></Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default AddForm;
