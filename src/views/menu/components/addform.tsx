import React, { useRef, useState } from "react";
import { PageContainer } from "@ant-design/pro-layout";
import { PlusOutlined, ClearOutlined } from "@ant-design/icons";
import { Card, Form, Input, Switch, Row, Col, Button, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import MenuBar from "@/layouts/components/Menu/menubar";
import { GetAddmMenuReq } from "@/views/interface";
import { InsertMenuApi } from "@/api/modules/menuinfo";

type Props = {
	key: number;
	title: string;
};

interface ModalProps {
	UpdateMenuTree: () => void;
}

const MenuBasicForm: React.FC<Record<string, any>> = () => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const menuBarRef = useRef<ModalProps>(null);

	const CreateBtn = async () => {
		setBtnLoading(true);
		try {
			let menuReq = {};
			await form.validateFields().then(values => {
				menuReq = values;
			});
			if (menuReq) {
				let res = await InsertMenuApi(GetAddmMenuReq(menuReq));
				if (res.success) {
					form.resetFields();
					message.success("Create Success");
					menuBarRef.current!.UpdateMenuTree();
				} else {
					message.error(res.msg);
				}
			}
		} finally {
			setBtnLoading(false);
		}
	};

	const ResetBtn = async () => {
		form.resetFields();
	};

	const handleClick = async (data: Props) => {
		form.setFieldValue("parentTitle", data.title);
		form.setFieldValue("parentId", data.key);
	};

	return (
		<Card bordered={false} title="Create Menu" className="content-box">
			<Row>
				<Col span={18} push={5}>
					<PageContainer>
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
									<Form.Item label="Menu Code" name="code" rules={[{ required: true, message: "Please enter the Menu Code" }]}>
										<Input />
									</Form.Item>
								</Col>
								<Col span={2}></Col>
								<Col span={11}>
									<Form.Item label="Icon" name="Icon">
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
									<Form.Item label="Sort Order" name="orderSort">
										<Input />
									</Form.Item>
								</Col>
								<Col span={2}></Col>
								<Col span={11}></Col>
							</Row>
							<Row>
								<Col span={11}>
									<Form.Item label="Parent Menu" name="parentTitle">
										<Input disabled></Input>
									</Form.Item>
								</Col>
								<Col span={2}></Col>
								<Col span={11}>
									<Form.Item label="" name="parentId">
										<Input hidden disabled></Input>
									</Form.Item>
								</Col>
							</Row>
							<Row>
								<Col span={11}>
									<Space>
										Hide：
										<Form.Item label=" " name="isHide">
											<Switch checkedChildren="Hide" unCheckedChildren="Show" />
										</Form.Item>
									</Space>
								</Col>
								<Col span={2}></Col>
								<Col span={11}>
									<Space>
										Button：
										<Form.Item label=" " name="isButton">
											<Switch checkedChildren="Button" unCheckedChildren="UnButton" />
										</Form.Item>
									</Space>
								</Col>
							</Row>
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
										<ClearOutlined /> {t("opt.reset")}
									</Button>
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
								</Space>
							</Col>
						</Row>
					</PageContainer>
				</Col>
				<Col span={4} pull={18}>
					<MenuBar onClick={handleClick} innerRef={menuBarRef} />
				</Col>
			</Row>
		</Card>
	);
};

export default MenuBasicForm;
