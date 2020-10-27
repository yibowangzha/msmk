import axios from "axios"

let serve=  axios.create({

//  baseURL:"https://wap.365msmk.com"
   baseURL:"http://120.53.31.103:84"
 

})

serve.interceptors.request.use((req)=>{


 return req

})

serve.interceptors.response.use((res)=>{


    return res.data
   
   })

   export default serve