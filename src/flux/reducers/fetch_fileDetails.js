import C from "../actions/constants";

export default function(state = {}, action) {
  switch (action.type) {
    case C.FETCHFILEDETAILS:
        console.log(action.payload)
      return action.payload;
    default:
      return state;
  }
}