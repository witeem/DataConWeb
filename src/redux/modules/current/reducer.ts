import { AnyAction } from "redux";
import { CurrentState } from "@/redux/interface";
import produce from "immer";
import * as types from "@/redux/mutation-types";

const currentState: CurrentState = {
	userInfo: {}
};

// auth reducer
const current = (state: CurrentState = currentState, action: AnyAction) =>
	produce(state, draftState => {
		switch (action.type) {
			case types.SET_CURRENT_USER:
				draftState.userInfo = action.userInfo;
				break;
			default:
				return draftState;
		}
	});

export default current;
