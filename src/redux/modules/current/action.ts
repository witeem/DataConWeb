import { Login } from "@/api/interface";
import * as types from "@/redux/mutation-types";

// * setCurrentUser
export const setCurrentUser = (userInfo: Login.CurrentUser) => ({
	type: types.SET_CURRENT_USER,
	userInfo
});
