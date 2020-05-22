import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        
        case C.MERGEINTERACTIVESENTENCE:
            console.log("----response----",action.payload)
            return action.payload;

            

        default:
            return state;
    }
}
