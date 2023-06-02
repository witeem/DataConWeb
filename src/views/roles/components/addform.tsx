import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import { useTranslation } from "react-i18next";
import { GetInsertRoleReq } from "@/views/interface";
import { InsertRoleApi } from "@/api/modules/roleinfo";

const AddForm = (props: any) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const ShowModal = () => {
		setVisible(true);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		ShowModal
	}));

	const CreateBtn = async () => {
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
			message.error(err.msg);
		}
	};

	return (
		<Modal
			title={t("userForm.createUser")}
			visible={visible}
			okText={t("opt.create")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={CreateBtn}
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
