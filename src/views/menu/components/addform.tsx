import { Card } from "antd";
import { useEffect, useState } from "react";
import MenuBasicForm from "./menuform";
import ButtonForm from "./buttonform";

const tabList = [
	{
		key: "Menu",
		tab: "Menu"
	},
	{
		key: "Button",
		tab: "Button"
	}
];

const Addform = (props: any) => {
	const { parentVal, loadMenus } = props;
	const [activeTabKey1, setActiveTabKey1] = useState<string>("Menu");

	const onTab1Change = (key: string) => {
		setActiveTabKey1(key);
	};

	useEffect(() => {
		onTab1Change(activeTabKey1);
		fomReturn(parentVal);
	}, [parentVal]);

	const fomReturn = (params: any) => {
		switch (activeTabKey1) {
			case "Menu":
				return <MenuBasicForm parentVal={params} loadMenus={loadMenus} />;

			case "Button":
				return <ButtonForm parentVal={params} loadMenus={loadMenus} />;
		}
	};

	return (
		<Card style={{ width: "100%", border: "none" }} tabList={tabList} activeTabKey={activeTabKey1} onTabChange={onTab1Change}>
			{fomReturn(parentVal)}
		</Card>
	);
};

export default Addform;
