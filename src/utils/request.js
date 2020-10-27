import axios from "axios"

let serve=  axios.create({

//  baseURL:"https://cnodejs.org/api/v1/"
  

})

serve.interceptors.request.use((req)=>{


 return req

})

serve.interceptors.response.use((res)=>{


    return res.data
   
   })

   export default serve