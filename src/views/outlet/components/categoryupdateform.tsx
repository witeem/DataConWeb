import { useState, useImperativeHandle, useEffect } from "react";
import { Modal, Form, Input, Switch, message, Space, Select } from "antd";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { UpdateTradeCategoryApi } from "@/api/modules/outlet";
import { TableListItem } from "../list/data";

const CategoryUpdateForm = (props: any) => {
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

	const createBtn = async () => {
		try {
			NProgress.start();
			let userReq = {};
			let validates = false;
			await form
				.validateFields()
				.then(values => {
					userReq = values;
					validates = true;
				})
				.catch(err => {
					console.log(err);
					validates = false;
				});
			if (userReq && validates) {
				let res = await UpdateTradeCategoryApi(userReq);
				if (res.success) {
					message.success("Update Success");
					setVisible(false);
					form.resetFields();
					props.loadTable();
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

	const mallIdChange = (value: string) => {
		form.setFieldValue("mallId", value);
	};

	useEffect(() => {
		visible;
	}, [visible]);

	return (
		<Modal
			title={t("outletForm.updateOutlet")}
			open={visible}
			okText={t("opt.submit")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={createBtn}
		>
			<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
				<Form.Item label="Vendor ID" name="vendorId" rules={[{ required: true, message: "Please enter the Vendor ID" }]}>
					<Input disabled />
				</Form.Item>

				<Form.Item label="Mall Id" name="mallId">
					<Select
						showSearch
						placeholder="Select a Mall Id"
						optionFilterProp="children"
						onChange={mallIdChange}
						filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
						options={[
							{
								value: "MBS",
								label: "MBS"
							}
						]}
					/>
				</Form.Item>

				<Space>
					<div className="sw-text">Active</div>
					<Form.Item label=" " name="active" valuePropName="checked">
						<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
					</Form.Item>
				</Space>
			</Form>
		</Modal>
	);
};

export default CategoryUpdateForm;
