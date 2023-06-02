import { Login } from "@/api/interface";
import * as types from "@/redux/mutation-types";

// * setAuthButtons
export const setAuthButtons = (authButtons: Login.ResAuthButtons) => ({
	type: types.SET_AUTH_BUTTONS,
	authButtons
});

// * setAuthRouter
export const setAuthRouter = (authRouter: string[]) => ({
	type: types.SET_AUTH_ROUTER,
	authRouter
});
