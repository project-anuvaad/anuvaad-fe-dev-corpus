import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.FETCH_LANGUAGE:
                console.log("===+++",action.payload)
            return action.payload;
        default:
            return state;
    }
}