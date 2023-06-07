import React, { useEffect, useState } from "react";
import { PlusOutlined, RedoOutlined } from "@ant-design/icons";
import { Form, Input, Switch, Row, Col, Button, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import { GetAddmMenuReq } from "@/views/interface";
import { InsertMenuApi } from "@/api/modules/menuinfo";
import useAuthButtons from "@/hooks/useAuthButtons";

const MenuBasicForm: React.FC<Record<string, any>> = (props: any) => {
	const { t } = useTranslation();
	const { parentVal, loadMenus } = props;
	const { BUTTONS } = useAuthButtons();
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);

	const CreateBtn = async () => {
		setBtnLoading(true);
		try {
			let menuReq = {};
			await form.validateFields().then(values => {
				menuReq = values;
			});
			if (menuReq) {
				menuReq = { ...menuReq, isButton: false };
				let res = await InsertMenuApi(GetAddmMenuReq(menuReq));
				if (res.success) {
					form.resetFields();
					message.success("Create Success");
					loadMenus();
				} else {
					message.error(res.msg);
				}
			}
		} catch (err: any) {
			message.error(err.msg);
		} finally {
			setBtnLoading(false);
		}
	};

	const ResetBtn = async () => {
		form.resetFields();
	};

	useEffect(() => {
		setBtnLoading;
		form.setFieldValue("parentTitle", parentVal.parentTitle);
		form.setFieldValue("parentId", parentVal.parentId);
	}, [setBtnLoading, parentVal]);

	return (
		<div>
			<Form name="form_in_menu" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
				<Row>
					<Col span={11}>
						<Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter the title" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="Description" name="description">
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Row>
					<Col span={11}>
						<Form.Item label="Icon" name="icon">
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="Menu Meta" name="meta" rules={[{ required: true, message: "Please enter the Menu Meta" }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="Path" name="path">
					<Input />
				</Form.Item>
				<Form.Item label="Link" name="link">
					<Input />
				</Form.Item>
				<Row>
					<Col span={11}>
						<Form.Item label="Parent Menu" name="parentTitle">
							<Input disabled></Input>
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						{" "}
						<Form.Item label="Sort Order" name="orderSort">
							<Input />
						</Form.Item>
					</Col>
				</Row>
				<Form.Item label="" name="parentId" hidden>
					<Input />
				</Form.Item>
				<Space>
					<div className="sw-text">Hide：</div>
					<Form.Item label=" " name="isHide" valuePropName="checked">
						<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
					</Form.Item>
				</Space>
			</Form>
			<br />
			<Row>
				<Col span={24} offset={9}>
					<Space>
						<Button
							type="primary"
							key="re"
							onClick={() => {
								ResetBtn();
							}}
						>
							<RedoOutlined /> {t("opt.reset")}
						</Button>
						{BUTTONS.add && (
							<Button
								type="primary"
								key="submit"
								loading={btnLoading}
								onClick={() => {
									CreateBtn();
								}}
							>
								<PlusOutlined /> {t("opt.create")}
							</Button>
						)}
					</Space>
				</Col>
			</Row>
		</div>
	);
};

export default MenuBasicForm;
