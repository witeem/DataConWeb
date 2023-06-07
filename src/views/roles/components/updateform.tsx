import { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import type { TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { GetUserUpdateReq } from "@/views/interface";
import { UpdateRoleApi } from "@/api/modules/roleinfo";

import "../list/index.less";
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
			let userReq = {};
			await form.validateFields().then(values => {
				userReq = values;
			});
			if (userReq) {
				let res = await UpdateRoleApi(GetUserUpdateReq(userReq));
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

export default UpdateForm;
