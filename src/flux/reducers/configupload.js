import C from "../actions/constants";

export default function(state = {}, action) {
  switch (action.type) {
      
    case C.CONFIGUPLOAD:
            console.log("reducer",action.payload)

      return [...state, action.payload];
    default:
      return state;
  }
}
