import columnsEn from "./columns-en";
import formsEn from "./forms.en";
export default {
	login: {
		confirm: "Login",
		reset: "Reset",
		loginSuccess: "Login Success",
		userId: "Please enter the user Id",
		pwd: "Please Enter Password"
	},
	home: {
		welcome: "Welcome"
	},
	router: {
		createMenu: "Create Menu"
	},
	opt: {
		opt: "Operation",
		search: "Search",
		create: "Create",
		update: "Update",
		cancel: "Cancel",
		del: "Delete",
		read: "Read",
		reset: "Reset",
		profile: "Profile",
		setrole: "Permission",
		submit: "Submit",
		yes: "Yes",
		no: "No"
	},
	tabs: {
		more: "More",
		closeCurrent: "Current",
		closeOther: "Other",
		closeAll: "All"
	},
	header: {
		componentSize: "Component Size",
		language: "Language",
		theme: "Theme",
		themeSetting: "Theme Setting",
		darkMode: "Dark Mode",
		lightMode: "Light Mode",
		fullScreen: "Full Screen",
		exitFullScreen: "Exit Full Screen",
		personalData: "Personal Data",
		changePassword: "Change Password",
		logout: "Logout"
	},
	...columnsEn,
	...formsEn
};
