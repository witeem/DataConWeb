import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Menu, Spin, message } from "antd";
import { getOpenKeys, handleRouter, searchRoute } from "@/utils/util";
import { setMenuList } from "@/redux/modules/menu/action";
import { setAuthRouter } from "@/redux/modules/auth/action";
import { GetAuthorMenusApi } from "@/api/modules/login";
import { connect } from "react-redux";
import type { MenuProps } from "antd";
import Logo from "./components/Logo";
import "./index.less";
import { handleMenuList } from "./menu-util";
import { MenuItem } from "./menudata";

const LayoutMenu = (props: any) => {
	const { pathname } = useLocation();
	const { isCollapse, setAuthRouter, setMenuList } = props;
	const [selectedKeys, setSelectedKeys] = useState<string[]>([pathname]);
	const [openKeys, setOpenKeys] = useState<string[]>([]);

	// 获取菜单列表并处理成 antd menu 需要的格式
	const [menuDatas, setMenuDatas] = useState<MenuItem[]>([]);
	const [loading, setLoading] = useState(false);

	// 刷新页面菜单保持高亮
	useEffect(() => {
		setSelectedKeys([pathname]);
		isCollapse ? null : setOpenKeys(getOpenKeys(pathname));
	}, [pathname, isCollapse]);

	useEffect(() => {
		getMenuData();
	}, []);

	// 设置当前展开的 subMenu
	const onOpenChange = (openKeys: string[]) => {
		if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
		const latestOpenKey = openKeys[openKeys.length - 1];
		if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
		setOpenKeys([latestOpenKey]);
	};

	const getMenuData = async () => {
		setLoading(true);
		try {
			const { data } = await GetAuthorMenusApi();
			if (!data) return;
			setMenuDatas(handleMenuList(data));
			const dynamicRouter = handleRouter(data);
			setAuthRouter(dynamicRouter);
			setMenuList(data);
		} catch (error: any) {
			message.error(error);
		} finally {
			setLoading(false);
		}
	};

	// 点击当前菜单跳转页面
	const navigate = useNavigate();
	const clickMenu: MenuProps["onClick"] = ({ key }: { key: string }) => {
		const route = searchRoute(key, props.menuList);
		if (route.isLink) window.open(route.isLink, "_blank");
		navigate(key);
	};

	return (
		<div className="menu">
			<Spin spinning={loading} tip="Loading...">
				<Logo></Logo>
				<Menu
					mode="inline"
					triggerSubMenuAction="click"
					openKeys={openKeys}
					selectedKeys={selectedKeys}
					items={menuDatas}
					onClick={clickMenu}
					onOpenChange={onOpenChange}
				></Menu>
			</Spin>
		</div>
	);
};

const mapStateToProps = (state: any) => state.menu;
const mapDispatchToProps = { setMenuList, setAuthRouter };
export default connect(mapStateToProps, mapDispatchToProps)(LayoutMenu);
