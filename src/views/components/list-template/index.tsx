import { getDictionariesList } from "@/components/DicSelect/apiclient";
import { List } from "antd";
import { useEffect, useState } from "react";

const ListApp = (props: any) => {
	const { dataType, handleSelected, width, className, title } = props;
	const [listSource, setListSource] = useState<any[]>([]);

	const handleAddSub = (value: any) => {
		handleSelected(value);
	};

	const getList = async () => {
		const list = await getDictionariesList(dataType);
		setListSource(list);
	};

	useEffect(() => {
		getList();
	}, []);

	return (
		<div>
			<div className="dic-list-header">
				<h2>{title}</h2>
			</div>
			<List
				className={className}
				bordered
				split={false}
				style={{ width: width }}
				dataSource={listSource}
				renderItem={item => (
					<List.Item key={item.value} onClick={() => handleAddSub(item)} className="dic-list-item">
						<div>{item.label}</div>
					</List.Item>
				)}
			/>
		</div>
	);
};
export default ListApp;
