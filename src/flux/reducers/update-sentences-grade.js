import C from '../actions/constants';

export default function (state = {}, action) {
    console.log(action.type)
    switch (action.type) {
        case C.UPDATE_SENTENCE_GRADE:
            return action.payload;

        default:
            return state;
    }
}