import React, { useEffect, useState } from "react";
import { getDictionariesList } from "./apiclient";
import { Select } from "antd";

const DictionariesApp = (props?: any) => {
	const { dataType, dicChanged, width, defaultValue } = props;
	const [dictionariesList, setDictionariesList] = useState<any[]>([]);
	const dicChange = (value: string, option: any) => {
		dicChanged(option);
	};

	const getCategorys = async () => {
		const dicList = await getDictionariesList(dataType);
		setDictionariesList(dicList);
	};

	useEffect(() => {
		if (dictionariesList.length === 0) {
			getCategorys();
		}
	}, []);

	return (
		<Select
			showSearch
			allowClear
			style={{ width: width }}
			placeholder={`Select a ${dataType}`}
			optionFilterProp="children"
			onChange={dicChange}
			filterOption={(input, option) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase())}
			defaultValue={defaultValue}
			options={dictionariesList}
		/>
	);
};

export default DictionariesApp;
