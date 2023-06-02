import React, { useState, useImperativeHandle } from "react";
import { Modal, Form, Input, Switch, Row, Col, message, Space, DatePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import { useTranslation } from "react-i18next";
import NProgress from "@/config/nprogress";
import { GetOutletReq } from "@/views/interface";
import { InsertOutletApi } from "@/api/modules/outlet";

const AddForm = (props: any) => {
	const { t } = useTranslation();
	const [form] = Form.useForm();
	const [visible, setVisible] = useState(false);
	const [leaseTerm, setLeaseTerm] = useState<[string, string]>(["", ""]);
	const ShowModal = () => {
		setVisible(true);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		ShowModal
	}));

	const CreateBtn = async () => {
		try {
			NProgress.start();
			let userReq = {};
			await form
				.validateFields()
				.then(values => {
					userReq = { ...values, leaseStartDate: leaseTerm[0], leaseEndDate: leaseTerm[1] };
				})
				.catch(err => {
					console.log(err);
				});
			if (userReq) {
				let res = await InsertOutletApi(GetOutletReq(userReq));
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

	const onChange = (value: DatePickerProps["value"] | RangePickerProps["value"], dateString: [string, string]) => {
		setLeaseTerm(dateString);
	};

	return (
		<Modal
			title={t("outletForm.createOutlet")}
			visible={visible}
			okText={t("opt.create")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={CreateBtn}
		>
			<Form name="form_in_modal" layout="vertical" form={form} initialValues={{ modifier: "public" }}>
				<Row>
					<Col span={11}>
						<Form.Item
							label="Outlet Name"
							name="outletName"
							rules={[{ required: true, message: "Please enter the Outlet Name" }]}
						>
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

				<Row>
					<Col span={11}>
						<Form.Item label="Level" name="level" rules={[{ required: true, message: "Please enter the Level" }]}>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item
							label="Outlet Number"
							name="outletNumber"
							rules={[{ required: true, message: "Please enter the Outlet Number" }]}
						>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Row>
					<Col span={11}>
						<Form.Item
							label="Tenant Category"
							name="categoryId"
							rules={[{ required: true, message: "Please enter the Tenant Category" }]}
						>
							<Input />
						</Form.Item>
					</Col>
					<Col span={2}></Col>
					<Col span={11}>
						<Form.Item label="Zone" name="zone" rules={[{ required: true, message: "Please enter the Zone" }]}>
							<Input />
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
						<Form.Item label="Vendor ID" name="vendorId" rules={[{ required: true, message: "Please enter the Vendor ID" }]}>
							<Input />
						</Form.Item>
					</Col>
				</Row>

				<Form.Item label="Lease Term" name="leaseDate">
					<DatePicker.RangePicker showTime={{ format: "HH:mm" }} format="YYYY-MM-DD HH:mm" onChange={onChange} />
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
