import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.UPDATE_SENTENCE_GRADE:
            return action.payload;

        default:
            return state;
    }
}