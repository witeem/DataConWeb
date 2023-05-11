import React, { useState, Ref, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col } from "antd";
import { useTranslation } from "react-i18next";

interface Props {
	innerRef: Ref<{ ShowModal: () => void }>;
}

const { TextArea } = Input;
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
				onOk={() => {
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
				}}
			>
				<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
					<Row>
						<Col span={11}>
							<Form.Item
								label="authorityScope"
								name="authorityScope"
								rules={[{ required: true, message: "Please enter the authorityScope" }]}
							>
								<Input />
							</Form.Item>
						</Col>
						<Col span={2}></Col>
						<Col span={11}>
							<Form.Item label="roleName" name="roleName" rules={[{ required: true, message: "Please enter the role Name" }]}>
								<Input />
							</Form.Item>
						</Col>
					</Row>

					<Row>
						<Col span={12}>
							<Form.Item label="active" name="active">
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

export default AddForm;
