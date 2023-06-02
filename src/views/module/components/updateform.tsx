import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message } from "antd";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { GetAddmModuleReq } from "@/views/interface";
import { UpdateModuleApi } from "@/api/modules/module";

const UpdateForm = (props: any) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);

	const ShowModal = (params: any) => {
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
			let paramReq = {};
			await form.validateFields().then(values => {
				paramReq = values;
			});
			if (paramReq) {
				let res = await UpdateModuleApi(GetAddmModuleReq(paramReq));
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
		} finally {
			NProgress.done();
		}
	};

	return (
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
			<Row>
				<Col span={24}>
					<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
						<Form.Item label="" name="id" hidden>
							<Input hidden />
						</Form.Item>
						<Form.Item label="MenuId" name="menuId" hidden>
							<Input hidden />
						</Form.Item>
						<Form.Item label="Menu" name="menuTitle">
							<Input disabled />
						</Form.Item>
						<Row>
							<Col span={11}>
								<Form.Item label="Code" name="code" rules={[{ required: true, message: "Please enter the user Id" }]}>
									<Input />
								</Form.Item>
							</Col>
							<Col span={2}></Col>
							<Col span={11}>
								<Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the user Name" }]}>
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={11}>
								<Form.Item label="Controller" name="controller">
									<Input />
								</Form.Item>
							</Col>
							<Col span={2}></Col>
							<Col span={11}>
								<Form.Item label="Action" name="action">
									<Input />
								</Form.Item>
							</Col>
						</Row>
						<Row>
							<Col span={11}>
								<Form.Item label="LinkUrl" name="linkUrl">
									<Input />
								</Form.Item>
							</Col>
							<Col span={2}></Col>
							<Col span={11}>
								<Form.Item label="Enabled" name="enabled" valuePropName="checked">
									<Switch checkedChildren="Enable" unCheckedChildren="Disabled" defaultChecked />
								</Form.Item>
							</Col>
						</Row>
						<Form.Item label="Description" name="description">
							<Input.TextArea placeholder="description" autoSize={{ minRows: 4, maxRows: 6 }} />
						</Form.Item>
					</Form>
				</Col>
			</Row>
		</Modal>
	);
};

export default UpdateForm;
