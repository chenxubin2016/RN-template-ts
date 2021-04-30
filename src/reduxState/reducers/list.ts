const list = (list = {
    loading: true,
    data: []
}, action) => {
    switch (action.type) {
        case 'LIST_LOADOVER':
            const {data} = action;
            return {
                ...list,
                data,
                loading: false
            };
        default :
            return list
    }
}
export default list
