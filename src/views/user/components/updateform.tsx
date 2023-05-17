import React, { useState, Ref, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message } from "antd";
import type { TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { UpdateUserApi } from "@/api/modules/userinfo";
import { GetUserUpdateReq } from "@/views/interface";

interface Props {
	innerRef: Ref<{ ShowModal: (params: TableListItem) => void }>;
}

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

	const UpdateBtn = async () => {
		try {
			NProgress.start();
			let roleReq = {};
			await form.validateFields().then(values => {
				console.log(values);
				roleReq = values;
			});
			if (roleReq) {
				let res = await UpdateUserApi(GetUserUpdateReq(roleReq));
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
		} finally {
			NProgress.done();
		}
	};

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
				onOk={UpdateBtn}
			>
				<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
					<Form.Item label="" name="id" hidden>
						<Input hidden />
					</Form.Item>
					<Row>
						<Col span={11}>
							<Form.Item label="userId" name="userId" rules={[{ required: true, message: "Please enter the user Id" }]}>
								<Input disabled />
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
							<Form.Item label="isReceiveEmail" name="isReceiveEmail" valuePropName="checked">
								<Switch checkedChildren="Enable" unCheckedChildren="Disabled" />
							</Form.Item>
						</Col>
						<Col span={12}>
							<Form.Item label="isReceiveEODMail" name="isReceiveEODMail" valuePropName="checked">
								<Switch checkedChildren="Enable" unCheckedChildren="Disabled" />
							</Form.Item>
						</Col>
					</Row>

					<Form.Item label="description" name="designation">
						<Input.TextArea placeholder="Controlled autosize" autoSize={{ minRows: 4, maxRows: 6 }} />
					</Form.Item>
				</Form>
			</Modal>
		</div>
	);
};

export default UpdateForm;
