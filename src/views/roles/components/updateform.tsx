import { useState, Ref, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space } from "antd";
import type { TableListItem } from "../list/data";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { GetUserUpdateReq } from "@/views/interface";
import { UpdateRoleApi } from "@/api/modules/roleinfo";

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
			let userReq = {};
			await form.validateFields().then(values => {
				console.log(values);
				userReq = values;
			});
			if (userReq) {
				let res = await UpdateRoleApi(GetUserUpdateReq(userReq));
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
								<Form.Item label=" " name="active" valuePropName="checked">
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

export default UpdateForm;
