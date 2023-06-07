import LoginForm from "./components/LoginForm";
import SwitchDark from "@/components/SwitchDark";
import logo from "@/assets/images/logo.png";
import "./index.less";
import { SysTitle } from "@/config/config";
import { setToken } from "@/redux/modules/global/action";
import { store } from "@/redux";

const Login = () => {
	store.dispatch(setToken(""));

	return (
		<div className="login-container">
			<SwitchDark />
			<div className="login-box">
				<div className="login-form">
					<div className="login-logo">
						<img className="login-icon" src={logo} alt="logo" />
						<span className="logo-text">{SysTitle}</span>
					</div>
					<LoginForm />
				</div>
			</div>
		</div>
	);
};

export default Login;
