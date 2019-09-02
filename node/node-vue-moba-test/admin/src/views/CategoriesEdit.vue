<template>
    
    <div class="about">

        <h1>  {{id ? '编辑' : '创建'}} 分类</h1>

        <el-form label-width="120px" @submit.native.prevent="save">

            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
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
            model: {}
        }
    },

    methods: {
       async save(){

          let res
          //判读是否有id，有id就是编辑，没有就是创建
          if(this.id){ //编辑
            res = await this.$http.put(`categories/${this.id}`, this.model);   
          }else{ // 新建
            res = await this.$http.post('categories', this.model);   
          }

           
          this.$router.push('/categories/list')
          this.$message({

            type: 'success',
            message: '保存成功了'

          })
        },

       async fetch(){           
            const res = await this.$http.get(`categoriesedit/${this.id}`)
            this.model = res.data;

            this.$message({

                        type: 'success',
                        message: '获取数据成功'

                    })

         },
    },



    //相当于java的构造方法默认执行
    created(){
        //如果有id就获取分类名字
        this.id && this.fetch()
    }

}
</script>