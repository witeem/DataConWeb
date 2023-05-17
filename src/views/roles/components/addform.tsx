import React, { useState, Ref, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import { useTranslation } from "react-i18next";
import { GetInsertRoleReq } from "@/views/interface";
import { InsertRoleApi } from "@/api/modules/roleinfo";

interface Props {
	innerRef: Ref<{ ShowModal: () => void }>;
}

const AddForm = (props: Props) => {
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
				console.log(values);
				roleReq = values;
			});
			if (roleReq) {
				let res = await InsertRoleApi(GetInsertRoleReq(roleReq));
				if (res.success) {
					form.resetFields();
					message.success("Create Success");
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
		<div>
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
					<Form.Item label="roleName" name="roleName" rules={[{ required: true, message: "Please enter the role Name" }]}>
						<Input />
					</Form.Item>
					<Form.Item label="description" name="description">
						<Input.TextArea placeholder="role description" autoSize={{ minRows: 4, maxRows: 6 }} />
					</Form.Item>
					<Row>
						<Col span={11}>
							<Space>
								Active：
								<Form.Item label=" " name="active">
									<Switch checkedChildren="Enable" unCheckedChildren="Disabled" />
								</Form.Item>
							</Space>
						</Col>
						<Col span={2}></Col>
						<Col span={11}></Col>
					</Row>
				</Form>
			</Modal>
		</div>
	);
};

export default AddForm;
