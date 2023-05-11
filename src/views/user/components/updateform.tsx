import React, { useState, Ref, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col } from "antd";
import type { TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";

interface Props {
	innerRef: Ref<{ ShowModal: (params: TableListItem) => void }>;
}

const { TextArea } = Input;
const UpdateForm = (props: Props) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

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
				title={t("userForm.updateUser")}
				visible={visible}
				okText={t("opt.update")}
				cancelText={t("opt.cancel")}
				onCancel={() => {
					setVisible(false);
				}}
				onOk={() => {
					NProgress.start();
					form
						.validateFields()
						.then(values => {
							form.resetFields();
							console.log(values);
							setVisible(false);
						})
						.catch(error => {
							console.log(error);
						});
					NProgress.done();
				}}
			>
				<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
					<Row>
						<Col span={11}>
							<Form.Item label="userId" name="userId" rules={[{ required: true, message: "Please enter the user Id" }]}>
								<Input />
							</Form.Item>
						</Col>
						<Col span={2}></Col>
						<Col span={11}>
							<Form.Item label="userName" name="userName" rules={[{ required: true, message: "Please enter the user Name" }]}>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label="mallid" name="mallId">
						<Input />
					</Form.Item>

					<Form.Item label="email" name="emailAdd">
						<Input />
					</Form.Item>

					<Row>
						<Col span={12}>
							<Form.Item label="isReceiveEmail" name="isReceiveEmail">
								<Switch checkedChildren="开启" unCheckedChildren="关闭" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="isReceiveEODMail" name="isReceiveEODMail">
								<Switch checkedChildren="开启" unCheckedChildren="关闭" />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label="designation" name="designation">
						<TextArea placeholder="Controlled autosize" autoSize={{ minRows: 4, maxRows: 6 }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default UpdateForm;