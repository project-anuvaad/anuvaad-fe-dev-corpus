import C from '../actions/constants';

export default function (state = {}, action) {
    console.log(action.type)
    switch (action.type) {
        
        case C.DOCUMENTUPLOAD:
            console.log(action.payload)
            return action.payload;

        default:
            return state;
    }
}