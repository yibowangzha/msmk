import axios from "./request"


export function gets(url,data){

    return axios.get(url,{
       params:data
    })

}

export function post(url,data){

    return axios.post(url,data)

}

export function yanzheng(data){
    return post("http://120.53.31.103:84/api/app/smsCode",data)
}
export function denglu(data){
    return post("http://120.53.31.103:84/api/app/login",data)
}


// 封装获取数据的接口




