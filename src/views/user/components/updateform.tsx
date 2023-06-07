import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import type { TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { updateUserApi } from "@/api/modules/userinfo";
import { GetUserUpdateReq } from "@/views/interface";

const UpdateForm = (props: any) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const showModal = (params: TableListItem) => {
		setVisible(true);
		form.setFieldsValue(params);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const updateBtn = async () => {
		try {
			NProgress.start();
			let roleReq = {};
			await form.validateFields().then(values => {
				roleReq = values;
			});
			if (roleReq) {
				let res = await updateUserApi(GetUserUpdateReq(roleReq));
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
		} finally {
			NProgress.done();
		}
	};

	return (
		<Modal
			title={t("userForm.updateUser")}
			open={visible}
			okText={t("opt.update")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={updateBtn}
		>
			<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
				<Form.Item label="" name="id" hidden>
					<Input hidden />
				</Form.Item>
				<Row>
					<Col span={11}>
						<Form.Item label="User Id" name="userId" rules={[{ required: true, message: "Please enter the user Id" }]}>
							<Input disabled />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="User Name" name="userName" rules={[{ required: true, message: "Please enter the user Name" }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Mall Id" name="mallId">
					<Input />
				</Form.Item>

				<Form.Item label="Email" name="emailAdd">
					<Input />
				</Form.Item>

				<Row>
					<Col span={12}>
						<Space>
							<div className="sw-text">Receive Email</div>
							<Form.Item label=" " name="isReceiveEmail" valuePropName="checked">
								<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
							</Form.Item>
						</Space>
					</Col>
					<Col span={12}>
						<Space>
							<div className="sw-text">Receive EOD Mail</div>
							<Form.Item label=" " name="isReceiveEODMail" valuePropName="checked">
								<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
							</Form.Item>
						</Space>
					</Col>
				</Row>

				<Form.Item label="Description" name="designation">
					<Input.TextArea placeholder="Controlled autosize" autoSize={{ minRows: 4, maxRows: 6 }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default UpdateForm;
