import React, { useRef, useState } from "react";
import { PlusOutlined, RedoOutlined, DeleteOutlined } from "@ant-design/icons";
import { Card, Form, Input, Switch, Row, Col, Button, Space, message } from "antd";
import { useTranslation } from "react-i18next";
import MenuBar from "@/layouts/components/Menu/menubar";
import { GetAddmMenuReq } from "@/views/interface";
import { GetMenuByIdApi, UpdateMenuApi } from "@/api/modules/menuinfo";
import useAuthButtons from "@/hooks/useAuthButtons";

interface ModalProps {
	UpdateMenuTree: () => void;
}

const MenuUpdateForm: React.FC<Record<string, any>> = () => {
	const { t } = useTranslation();
	const { BUTTONS } = useAuthButtons();
	const [form] = Form.useForm();
	const [btnLoading, setBtnLoading] = useState(false);
	const menuBarRef = useRef<ModalProps>(null);

	const SubmitBtn = async () => {
		setBtnLoading(true);
		try {
			let menuReq = {};
			await form.validateFields().then(values => {
				menuReq = values;
			});
			if (menuReq) {
				let res = await UpdateMenuApi(GetAddmMenuReq(menuReq));
				if (res.success) {
					form.resetFields();
					message.success("Success");
					menuBarRef.current!.UpdateMenuTree();
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

	const handleClick = async (params: any) => {
		const { data } = await GetMenuByIdApi({ id: params.key });
		if (data) {
			form.setFieldsValue(data);
		}
	};

	return (
		<Card bordered={false} title="Create Menu">
			<Row>
				<Col span={18} push={5}>
					<Form name="form_in_menu" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
						<Form.Item name="id" hidden>
							<Input hidden />
						</Form.Item>
						<Form.Item label="" name="parentId">
							<Input hidden></Input>
						</Form.Item>
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
								<Form.Item label="Menu Meta" name="meta" rules={[{ required: true, message: "Please enter the Menu Code" }]}>
									<Input disabled />
								</Form.Item>
							</Col>
							<Col span={2}></Col>
							<Col span={11}>
								<Form.Item label="Icon" name="icon">
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
								<Space>
									<div className="sw-text">Hide：</div>
									<Form.Item label=" " name="isHide" valuePropName="checked">
										<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
									</Form.Item>
								</Space>
							</Col>
							<Col span={2}></Col>
							<Col span={11}>
								<Space>
									<div className="sw-text">Button：</div>
									<Form.Item label=" " name="isButton" valuePropName="checked">
										<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
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
									shape="round"
									type="primary"
									key="reset"
									onClick={() => {
										ResetBtn();
									}}
								>
									<RedoOutlined /> {t("opt.reset")}
								</Button>
								{BUTTONS.delete && (
									<Button
										shape="round"
										type="primary"
										className="btn-del"
										danger
										key="del"
										onClick={() => {
											ResetBtn();
										}}
									>
										<DeleteOutlined /> {t("opt.del")}
									</Button>
								)}
								{BUTTONS.update && (
									<Button
										shape="round"
										type="primary"
										key="submit"
										loading={btnLoading}
										onClick={() => {
											SubmitBtn();
										}}
									>
										<PlusOutlined /> {t("opt.submit")}
									</Button>
								)}
							</Space>
						</Col>
					</Row>
				</Col>
				<Col span={4} pull={18} className="right-border-sider">
					<MenuBar onClick={handleClick} innerRef={menuBarRef} />
				</Col>
			</Row>
		</Card>
	);
};

export default MenuUpdateForm;
