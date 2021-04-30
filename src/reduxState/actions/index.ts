// 网络请求
import qs from 'qs';
import {get} from '../../utils/request'

export const getList = (search: String) => {
    const {page = 1, tab = 'all', limit = 20, mdrender = false} = qs.parse(search.substr(1))
    return function (dispatch: any) {
        get({
            page,
            tab,
            limit,
            mdrender
        }, '/topics').then(res => {
            if (res.data.success) {
                dispatch({
                    type: 'LIST_LOADOVER',
                    data: res.data.data
                })
            }
        })
    }
}
