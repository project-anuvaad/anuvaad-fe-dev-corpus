import C from '../actions/constants';

export default function (state = {}, action) {
    switch (action.type) {
        case C.FETCH_CORP:
            if(action.payload && Array.isArray(action.payload)){
                    action.payload.map((t)=>{
                        console.log('output',t.created_on)
                        var myDate = new Date(t.created_on + ' GMT');
                        var format = (myDate.toLocaleString()).split('/')
                        t.created_on = format[1]+'/'+format[0]+'/'+format[2]
                        
                    })
                }
            return action.payload;

        default:
            return state;
    }
}
