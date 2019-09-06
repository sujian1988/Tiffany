<template>
    
    <div class="about">

        <h1>  {{id ? '编辑' : '创建'}} 物品</h1>

        <el-form label-width="120px" @submit.native.prevent="save">


            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>


            <el-form-item label="图标">
                
               <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL + '/upload'"
                    :show-file-list="false"
                    :on-success="afterUpload"
                    :before-upload="beforeAvatarUpload">

                    <img v-if="model.avatar" :src="model.avatar" class="avatar">
                    
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                
                </el-upload>

            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        
        </el-form>

    </div>

</template>

<script>
export default {
    //接收id参数
    props:{
        id: {}
    },
    

    data(){
        return{
            model: {},  //*** */之后再添加字段是会添加不上***
        }
    },

    methods: {

        async afterUpload(res){
            //****显示创建赋值 就是在model上添加属性 */  
            //        赋值的主体   字段      要赋的值
            this.$set(this.model, 'avatar',  res.url)

          
        },


       async save(){

          let res
          //判读是否有id，有id就是编辑，没有就是创建
          if(this.id){ //编辑
            res = await this.$http.put(`items/${this.id}`, this.model);   
          }else{ // 新建
            res = await this.$http.post('items', this.model);   
          }
          this.$router.push('/items/list')
          this.$message({

            type: 'success',
            message: '保存成功了'

          })
        },

       async fetch(){           
            const res = await this.$http.get(`itemsedit/${this.id}`)
            this.model = res.data;
         },
         
    },



    //相当于java的构造方法默认执行
    created(){
        //如果有id就获取分类名字
        this.id && this.fetch()
    }

}
</script>


