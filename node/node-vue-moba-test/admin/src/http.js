import axios from 'axios'   
import Vue from 'vue'

const http = axios.create({

    baseURL:'http://localhost:3000/admin/api'

})

//=> 箭头函数
http.interceptors.response.use( res=>{
     
    return res

}, err=>{ // 大于等于400 都会走错误这里   

    if (err.response.data.message) {
        
        Vue.prototype.$message({
        
            type: 'error',
            message: err.response.data.message
        
        })
        
        if (err.response.status === 401) {
          router.push('/login')
        }
     }
    
    return Promise.reject(err)

})

//导出这个变量
export default http