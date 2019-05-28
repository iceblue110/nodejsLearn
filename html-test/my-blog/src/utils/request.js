import { Message } from 'element-ui'
// import logTracker from './logTracker'

/*
parse   把xxx=xx&xx=xx 类型字符串转换成{xx: xx, xx: xx} 类型
stringify   把{xx: xx, xx: xx} 类型字符串转换成xxx=xx&xx=xx 类型
 */
const qs = {
    parse(str) {
        if (!str) {
            return {};
        } else {
            let obj = {};
            str.split('&').forEach(item => {
                obj[item.split('=')[0]] = decodeURIComponent(item.split('=')[1]);
            });
            return obj;
        }
    },
    stringify(obj) {
        if (!obj) { return }
        return Object.keys(obj).map(key => `${key}=${obj[key] !== undefined ? format(obj[key]) : ''}`).join('&');
    },
    isArray
};

function format(obj) {
    return isArray(obj) ? JSON.stringify(obj) : encodeURIComponent(obj);
}

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

// 拼接返回完整请求路径
function url(api) {
    api += '?t=' + +new Date()
        // return `http://www.qsc.net/api${api}`
    return `${api}`
        // return `http://qsc_admin_new.site/api${api}`
        // return `http://test.qscadmin.site/api${api}`
}
/*
拦截器, 在每个fetch请求成功后调用, 如果后端返回状态码为401, 则需要跳转到微信登录
*/
function intercepter(response) {
    if (response.status == '401') {
        // window.location.href = `https://account-greencat.qschou.com/passport?redirect_url=${format(window.location.href)}`;
        window.location.href = `https://account-greencat.qschou.com/ldap/signin?redirect_url=${format(window.location.href)}`;
        return;
    }
    return response.json()
}

/*
fetch发送请求默认是不发送cookie的，不管是同域还是跨域,这时可以配置其credentials:
    omit: 默认值，忽略cookie的发送
    same-origin: 表示cookie只能同域发送，不能跨域发送
    include: cookie既可以同域发送，也可以跨域发送

fetch不像大多数ajax库那样对请求设置超时timeout，它没有有关请求超时的feature

真正的fetch请求, 返回Promise对象
    params:     api         api路径
                param       api参数[get 形式为?xx=xx&.., post/put/delete 形式为 body: {...}]
*/
function get(api, param) {
    // 当get请求api 路径 不包含https时, 通过url() 返回完整路径
    const link = api.indexOf('https') > -1 ? api : url(api);
    param = param && Object.keys(param).length > 0 ? `&${qs.stringify(param)}` : '';
    return fetch(`${link}${param}`, {
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        }
    }).then(intercepter)
}

function post(api, param) {
    return fetch(url(api), {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(param)
    }).then(intercepter)
}

function put(api, param) {
    return fetch(url(api), {
        credentials: 'include',
        method: 'put',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify(param)
    }).then(intercepter)
}

function del(api, param) {
    return fetch(url(api), {
        credentials: 'include',
        method: 'delete',
        headers: {
            'Content-Type': 'application/json;',
            'Accept': 'application/json'
        },
        body: JSON.stringify(param)
    }).then(intercepter)
}

function isJson(json){
    var isjson = typeof(json) == "object" && Object.prototype.toString.call(json).toLowerCase() == "[object object]" && !json.length
    return isjson;
}


/* exports  get, post, put, delete method
    params:     api         api路径
                param       api参数[get 形式为?xx=xx&.., post/put/delete 形式为 body: {...}]
                sucess      自定义请求成功回调函数
                fail        自定义请求失败回调函数
    response json: {
        meta: {             请求返回的元信息
            code: xxx,      标识符: code为Error时, 请求报错
            msg: xxx,       后端返回信息[例如 status: 500, msg为 '服务器内部错误']
            next: xxx,      分页信息
            ...
        },
        data: xxx           请求返回所需的数据
    }

    fetch返回的promise在某些错误的http状态下如400、500等不会reject，相反它会被resolve；只有网络错误会导致请求不能完成时，fetch 才会被 reject
*/
export default {
    get(api, param, sucess, fail) {
        return get(api, param).then(json => {
            if (json.erron === '-1') {
                Message({
                    message: meta.msg,
                    type: 'error'
                });
                if (fail) {
                    fail();
                }
            } else {
                if(isJson(json)){
                    sucess(json)
                }
                else{
                    Message({
                        message: '接口数据格式错误',
                        type: "error"
                    }); 
                }
            }
        })
    },
    post(api, param, sucess, fail) {
        return post(api, param).then(json => {
            const { meta } = json;
            if (json.erron === '-1') {
                // logTracker.portError(JSON.stringify(logTrackerInfo))
                Message({
                    message: meta.msg,
                    type: "error"
                });
                if (fail) {
                    fail();
                }
            } else {
                if(isJson(json)){
                    sucess(json)
                }
                else{
                    Message({
                        message: '接口数据格式错误',
                        type: "error"
                    }); 
                }
                
            }
        })
    },
    put(api, param, sucess, fail) {
        return put(api, param).then(json => {
            const { meta } = json;
            if (json.erron === '-1') {
                // logTracker.portError(JSON.stringify(logTrackerInfo))
                Message({
                    message: meta.msg,
                    type: 'error'
                });
                if (fail) {
                    fail();
                }
            } else {
                if(isJson(json)){
                    sucess(json)
                }
                else{
                    Message({
                        message: '接口数据格式错误',
                        type: "error"
                    }); 
                }
            }
        })
    },
    delete(api, param, sucess, fail) {
        return del(api, param).then(json => {
            const { meta } = json;
            if (json.erron === '-1') {
                // logTracker.portError(JSON.stringify(logTrackerInfo))
                Message({
                    message: meta.msg,
                    type: 'error'
                });
                if (fail) {
                    fail();
                }
            } else {
                if(isJson(json)){
                    sucess(json)
                }
                else{
                    Message({
                        message: '接口数据格式错误',
                        type: "error"
                    }); 
                }
            }
        })
    },
    qs
}