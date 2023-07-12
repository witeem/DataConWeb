import { useEffect } from "react";
import { Button, Form, Input, Space, message } from "antd";
import { useNavigate } from "react-router-dom";
import { Login } from "@/api/interface";
import { GetUserInfoApi, LoginApi } from "@/api/modules/login";
import { HOME_URL } from "@/config/config";
import { connect } from "react-redux";
import { setToken } from "@/redux/modules/global/action";
import { setCurrentUser } from "@/redux/modules/current/action";
import { useTranslation } from "react-i18next";
import { setTabsList } from "@/redux/modules/tabs/action";
import { UserOutlined, LockOutlined, CloseCircleOutlined } from "@ant-design/icons";

const LoginForm = (props: any) => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const [form] = Form.useForm();
	const { setToken, setTabsList, setCurrentUser } = props;

	// 登录
	const onFinish = async (loginForm: Login.ReqLoginForm) => {
		try {
			const { data } = await LoginApi(loginForm);
			setToken(data);
			setTabsList([]);

			const { data: res } = await GetUserInfoApi();
			setCurrentUser(res);

			message.success(t("login.loginSuccess"));
			navigate(HOME_URL);
		} catch (err: any) {
			message.error(err.msg);
		}
	};

	const onFinishFailed = (errorInfo: any) => {
		console.log("Failed:", errorInfo);
	};

	useEffect(() => {}, []);

	return (
		<Form
			form={form}
			name="basic"
			labelCol={{ span: 5 }}
			initialValues={{ remember: true }}
			onFinish={onFinish}
			onFinishFailed={onFinishFailed}
			size="large"
			autoComplete="off"
		>
			<Form.Item name="userId" rules={[{ required: true, message: t("login.userId") }]}>
				<Input placeholder="user Id：admin / user" prefix={<UserOutlined />} />
			</Form.Item>
			<Form.Item name="password" rules={[{ required: true, message: t("login.pwd") }]}>
				<Input.Password autoComplete="new-password" placeholder="password：123456" prefix={<LockOutlined />} />
			</Form.Item>
			<Form.Item className="login-btn">
				<Space>
					<Button
						shape="round"
						onClick={() => {
							form.resetFields();
						}}
						icon={<CloseCircleOutlined />}
					>
						{t("login.reset")}
					</Button>
					<Button shape="round" type="primary" htmlType="submit" icon={<UserOutlined />}>
						{t("login.confirm")}
					</Button>
				</Space>
			</Form.Item>
		</Form>
	);
};

const mapDispatchToProps = { setToken, setTabsList, setCurrentUser };
export default connect(null, mapDispatchToProps)(LoginForm);
