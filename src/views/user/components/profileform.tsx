import { useEffect, useImperativeHandle, useState } from "react";
import { TableListItem } from "../list/data";
import { Col, Modal, Row, Transfer } from "antd";
import { useTranslation } from "react-i18next";
import { GetRoleList, InsertUserRoleApi } from "@/api/modules/roleinfo";

interface RecordType {
	key: string;
	title: string;
	description: string;
	chosen: boolean;
}

const ProfileForm = (props: any) => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [itemVal, setItemVal] = useState<TableListItem>();
	const [mockData, setMockData] = useState<RecordType[]>([]);
	const [targetKeys, setTargetKeys] = useState<string[]>([]);

	const showModal = (params: TableListItem) => {
		setVisible(true);
		setItemVal(params);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		showModal
	}));

	const getMock = async (params?: any[]) => {
		const tempMockData: any = [];
		const roleList = await GetRoleList("");
		if (roleList) {
			roleList.forEach(role => {
				const data = {
					key: role.id,
					title: role.roleName,
					description: role.description,
					chosen: false
				};
				tempMockData.push(data);
			});
		}

		setMockData(tempMockData);
		if (params) {
			setTargetKeys(params);
		}
	};

	useEffect(() => {
		setTargetKeys([]);
		getMock(itemVal?.roles);
	}, [itemVal?.roles]);

	const filterOption = (inputValue: string, option: RecordType) => option.description.indexOf(inputValue) > -1;

	const handleChange = (newTargetKeys: string[]) => {
		setTargetKeys(newTargetKeys);
	};

	const submitBtn = async () => {
		let paramReq = {
			userId: itemVal?.id,
			roleIds: targetKeys
		};
		const { data } = await InsertUserRoleApi(paramReq);
		if (data) {
			props.loadTable();
			setVisible(false);
		}
	};

	return (
		<Modal
			title={t("opt.profile")}
			open={visible}
			okText={t("opt.submit")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={submitBtn}
			width={800}
		>
			<Row>
				<Col span={16} offset={4}>
					<Transfer
						titles={["Source", "Target"]}
						dataSource={mockData}
						showSearch
						filterOption={filterOption}
						targetKeys={targetKeys}
						onChange={handleChange}
						render={item => item.title}
						listStyle={{
							width: 300,
							height: 500
						}}
					/>
				</Col>
			</Row>
		</Modal>
	);
};

export default ProfileForm;
