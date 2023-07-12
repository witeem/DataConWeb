import { Card, Col, Row } from "antd";
import { useEffect, useRef, useState } from "react";
import MenuBar from "@/layouts/components/Menu/menubar";
import Addform from "./components/addform";

interface ModalProps {
	UpdateMenuTree: () => void;
}

interface MenuParent {
	parentTitle: string;
	parentId: string;
}

const MenuIndex: React.FC = () => {
	const menuBarRef = useRef<ModalProps>(null);
	const [parentVal, setParentVal] = useState<MenuParent>({ parentTitle: "", parentId: "" });

	const handleClick = async (data: any) => {
		setParentVal({ parentTitle: data.title, parentId: data.key });
	};

	const loadMenu = () => {
		menuBarRef.current!.UpdateMenuTree();
	};

	useEffect(() => {}, []);

	return (
		<Card bordered={false} title="Create Menu" className="content-box">
			<Row>
				<Col span={18} push={5}>
					<Addform parentVal={parentVal} loadMenus={loadMenu} />
				</Col>
				<Col span={4} pull={18} className="right-border-sider">
					<MenuBar onClick={handleClick} innerRef={menuBarRef} />
				</Col>
			</Row>
		</Card>
	);
};

export default MenuIndex;
