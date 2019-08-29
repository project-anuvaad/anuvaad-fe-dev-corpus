import C from '../actions/constants';


export default function (state = {}, action) {
    switch (action.type) {
        case C.UPDATE_PASSWORD:
            console.log("------action",action.payload)
            return action.payload;

        default:
            return state;
    }
}