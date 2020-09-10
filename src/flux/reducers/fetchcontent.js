import C from "../actions/constants";
import { act } from "react-test-renderer";

const initialUserState = {

    result:[]
}
export default function(state = initialUserState, action) {
  switch (action.type) {
    case C.FETCH_CONTENT:
    let result = state.result
    if(result !== null && result.data) {
        result.data = result.data.concat(action.payload.data)
    } else {
        result = action.payload
    }
    return { 
        ...state,
        result:result
   }
   case C.CLEAR_CONTENT:
     return initialUserState
    default:
      return state;
  }
}
