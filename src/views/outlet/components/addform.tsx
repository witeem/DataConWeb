import React, { useState, useImperativeHandle, useEffect } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space, DatePicker, Select } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { GetOutletReq } from "@/views/interface";
import { InsertOutletApi } from "@/api/modules/outlet";
import { getLevelList, getTenantCategorys, getZoneList } from "../interface/index";

const AddForm = (props: any) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [leaseTerm, setLeaseTerm] = useState<[string, string]>(["", ""]);
	const [tenantCategorys, setTenantCategorys] = useState<any[]>([]);

	const showModal = () => {
		setVisible(true);
		if (tenantCategorys.length === 0) {
			getCategorys();
		}
		form.setFieldValue("active", true);
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
					userReq = { ...values, leaseStartDate: leaseTerm[0], leaseEndDate: leaseTerm[1] };
					validates = true;
				})
				.catch(err => {
					console.log(err);
					validates = false;
				});
			if (userReq && validates) {
				let res = await InsertOutletApi(GetOutletReq(userReq));
				if (res.success) {
					message.success("Create Success");
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

	const onChange = (value: DatePickerProps["value"] | RangePickerProps["value"], dateString: [string, string]) => {
		setLeaseTerm(dateString);
	};

	const levelChange = (value: string) => {
		form.setFieldValue("level", value);
	};

	const zoneChange = (value: string) => {
		form.setFieldValue("zone", value);
	};

	const categoryChange = (value: string) => {
		form.setFieldValue("categoryId", value);
	};

	const mallIdChange = (value: string) => {
		form.setFieldValue("mallId", value);
	};

	const getCategorys = async () => {
		const categoryList = await getTenantCategorys();
		setTenantCategorys(categoryList);
	};

	useEffect(() => {
		visible;
	}, [visible]);

	return (
		<Modal
			title={t("outletForm.createOutlet")}
			open={visible}
			okText={t("opt.submit")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={createBtn}
		>
			<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
				<Row>
					<Col span={11}>
						<Form.Item label="Vendor ID" name="vendorId" rules={[{ required: true, message: "Please enter the Vendor ID" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						{" "}
						<Form.Item
							label="Outlet Name"
							name="outletName"
							rules={[{ required: true, message: "Please enter the Outlet Name" }]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={11}>
						<Form.Item label="Level" name="level" rules={[{ required: true, message: "Please selected the Level" }]}>
							<Select
								showSearch
								placeholder="Select a person"
								optionFilterProp="children"
								onChange={levelChange}
								filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								options={getLevelList()}
							/>
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="Zone" name="zone" rules={[{ required: true, message: "Please enter the Zone" }]}>
							<Select
								showSearch
								placeholder="Select a Zone"
								optionFilterProp="children"
								onChange={zoneChange}
								filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								options={getZoneList()}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={11}>
						<Form.Item
							label="Outlet Number"
							name="outletNumber"
							rules={[{ required: true, message: "Please enter the Outlet Number" }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item
							label="Tenant Category"
							name="categoryId"
							rules={[{ required: true, message: "Please enter the Tenant Category" }]}
						>
							<Select
								showSearch
								placeholder="Select a Tenant Category"
								optionFilterProp="children"
								onChange={categoryChange}
								filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
								options={tenantCategorys}
							/>
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={11}>
						<Form.Item label="Lease ID" name="leaseId" rules={[{ required: true, message: "Please enter the Lease ID" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="Trade" name="trade" rules={[{ required: true, message: "Please enter the user Trade" }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Lease Term" name="leaseDate">
					<DatePicker.RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" onChange={onChange} />
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

				<Row>
					<Col span={12}>
						<Space>
							<div className="sw-text">Allow Reimbursement</div>
							<Form.Item label=" " name="allowReimburse" valuePropName="checked">
								<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
							</Form.Item>
						</Space>
					</Col>
					<Col span={12}>
						<Space>
							<div className="sw-text">Active</div>
							<Form.Item label=" " name="active" valuePropName="checked">
								<Switch checkedChildren={t("opt.yes")} unCheckedChildren={t("opt.no")} />
							</Form.Item>
						</Space>
					</Col>
				</Row>
			</Form>
		</Modal>
	);
};

export default AddForm;
