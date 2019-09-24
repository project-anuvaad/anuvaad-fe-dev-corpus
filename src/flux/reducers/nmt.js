import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.NMT:
            return action.payload[0];

        default:
            return state;
    }
}
