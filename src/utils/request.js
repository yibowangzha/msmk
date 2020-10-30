import axios from "axios"
import {Guid} from '../plugins/guid'
// import {Toast} from 'vant'
let serve=  axios.create({
//  baseURL:"https://wap.365msmk.com"
//    baseURL:"http://120.53.31.103:84"
})
let deviceid = null;
let id = window.localStorage.getItem('deviceid')
if(id){
    deviceid = id
}else{
    deviceid = Guid.NewGuid().ToString('D')
}
window.localStorage.setItem('deviceid',deviceid)
serve.interceptors.request.use((req)=>{
    // 登录之后 再次请求时 会携带token
    let token = sessionStorage.getItem('token')
    if(token){
       req.headers.authorization =  `Bearer${token}`
    }
    req.headers.deviceid = deviceid
    req.headers.devicetype = 'H5'
    
    // Toast.loading({
    //     message: '加载中...',
    //     forbidClick: true,
    //   });
 return req

})

serve.interceptors.response.use((res)=>{


    return res.data
   
   })

   export default serve