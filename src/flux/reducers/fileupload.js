import C from "../actions/constants";

export default function(state = {}, action) {
  switch (action.type) {
    case C.WORKFLOW:
      console.log("reducer-----",action.payload)
      return action.payload;
    default:
      return state;
  }
}
