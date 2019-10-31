import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.BENCHMARK_TRANSLATE:
            console.log("-----",action.payload)
            return action.payload;

        default:
            return state;
    }
}