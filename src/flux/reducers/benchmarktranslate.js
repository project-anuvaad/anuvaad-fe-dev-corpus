import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.BENCHMARK_TRANSLATE:
            return action.payload;

        default:
            return state;
    }
}