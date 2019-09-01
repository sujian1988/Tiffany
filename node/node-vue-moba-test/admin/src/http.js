import axios from 'axios'   

const http = axios.create({

    baseURL:'http://localhost:3000/admin/api'

})

//导出这个变量
export default http