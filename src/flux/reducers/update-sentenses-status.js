import C from '../actions/constants';


export default function (state = {}, action) {
    switch (action.type) {
        case C.UPDATE_SENTENCE_STATUS:
            console.log(action.payload)
            return action.payload;

        default:
            return state;
    }
}
