import { Ref, useEffect, useImperativeHandle, useState } from "react";
import { TableListItem } from "../list/data";
import { Col, Modal, Row, Transfer } from "antd";
import { TransferDirection } from "antd/es/transfer";
import { useTranslation } from "react-i18next";

interface Props {
	innerRef: Ref<{ ShowModal: (params: TableListItem) => void }>;
}

interface RecordType {
	key: string;
	title: string;
	description: string;
	chosen: boolean;
}

const ProfileForm = (props: Props) => {
	const { t } = useTranslation();
	const [visible, setVisible] = useState(false);
	const [itemVal, setItemVal] = useState<TableListItem>();
	const [mockData, setMockData] = useState<RecordType[]>([]);
	const [targetKeys, setTargetKeys] = useState<string[]>([]);

	const ShowModal = (params: TableListItem) => {
		setVisible(true);
		setItemVal(params);
	};

	// 将子组件中需要调用的方法绑定到 ref
	useImperativeHandle(props.innerRef, () => ({
		ShowModal
	}));

	const getMock = () => {
		const tempTargetKeys = [];
		const tempMockData = [];
		for (let i = 0; i < 12; i++) {
			const data = {
				key: i.toString(),
				title: `角色${i + 1}`,
				description: `description of content${i + 1}`,
				chosen: i % 2 === 0
			};
			if (data.chosen) {
				tempTargetKeys.push(data.key);
			}
			tempMockData.push(data);
		}
		setMockData(tempMockData);
		setTargetKeys(tempTargetKeys);
	};

	useEffect(() => {
		getMock();
		console.log(itemVal);
	}, []);

	const filterOption = (inputValue: string, option: RecordType) => option.description.indexOf(inputValue) > -1;

	const handleChange = (newTargetKeys: string[]) => {
		setTargetKeys(newTargetKeys);
	};

	const handleSearch = (dir: TransferDirection, value: string) => {
		console.log("search:", dir, value);
	};

	return (
		<Modal
			title={t("opt.profile")}
			visible={visible}
			okText={t("opt.submit")}
			cancelText={t("opt.cancel")}
			onCancel={() => {
				setVisible(false);
			}}
			onOk={() => {
				setVisible(false);
			}}
			width={800}
		>
			<Row>
				<Col span={16} offset={4}>
					<Transfer
						dataSource={mockData}
						showSearch
						filterOption={filterOption}
						targetKeys={targetKeys}
						onChange={handleChange}
						onSearch={handleSearch}
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
