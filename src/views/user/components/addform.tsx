import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { RegisterApi } from "@/api/modules/login";
import { GetRegisterReq } from "@/views/interface";

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
			NProgress.start();
			let userReq = {};
			await form.validateFields().then(values => {
				userReq = values;
			});
			if (userReq) {
				let res = await RegisterApi(GetRegisterReq(userReq));
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
				<Row>
					<Col span={11}>
						<Form.Item label="User Id" name="userId" rules={[{ required: true, message: "Please enter the user Id" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="User Name" name="userName" rules={[{ required: true, message: "Please enter the user Name" }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={11}>
						<Form.Item label="Password" name="password" rules={[{ required: true, message: "Please enter the password" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="Mall Id" name="mallId" rules={[{ required: true, message: "Please enter the mallId" }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>

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

				<Form.Item label="Designation" name="designation">
					<Input.TextArea placeholder="designation" autoSize={{ minRows: 4, maxRows: 6 }} />
				</Form.Item>
			</Form>
		</Modal>
	);
};

export default AddForm;
