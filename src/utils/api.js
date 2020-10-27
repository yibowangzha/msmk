import axios from "./request.js"


export function gets(url,data){

    return axios.get(url,{
       params:data
    })

}

export function pots(url,data){

    return axios.get(url,data)

}


// 封装获取数据的接口
export function all(type,pages){
       
    return axios.get("topics",{params:{
          tab:type,
          page:pages
    }})
}



