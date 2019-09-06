<template>
    
    <div class="about">

        <h1>  {{id ? '编辑' : '创建'}} 广告位</h1>

        <el-form label-width="120px" @submit.native.prevent="save">

            <el-form-item label="名称">
                <el-input v-model="model.name"></el-input>
            </el-form-item>
  
            <el-form-item lable="广告位">
                
                 <el-button  type="text" @click="model.items.push({})">  <i class="el-icon-plus"></i> 添加技能</el-button>
                    
                <el-row type="flex" style="flex-wrap: wrap">
                    
                        <el-col :md="24" v-for="(item, i) in model.items" :key="i">

                            <el-form-item label="跳转链接">
                                 <el-input v-model="item.url"></el-input>
                            </el-form-item>

                             <el-form-item label="图标" style="margin-top: 0.5rem;">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/uploadad'" 
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'image' , res.url) "
                                    :before-upload="beforeAvatarUpload">

                                    <img v-if="item.image" :src="item.image" class="avatar">
                                    
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                
                                </el-upload>
                            </el-form-item>

                            <el-form-item >
                                <el-buton size="small" type="danger" @click="model.items.splice(i, 1)"> 
                                    删除
                                 </el-buton>
                            </el-form-item>

                        </el-col>
  
                    </el-row>

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
            model: {
                items: [],
            },
        }
    },

    methods: {
       async save(){

          let res
          //判读是否有id，有id就是编辑，没有就是创建
          if(this.id){ //编辑
            res = await this.$http.put(`ads/${this.id}`, this.model);   
          }else{ // 新建
            res = await this.$http.post('ads', this.model);   
          }
          this.$router.push('/ads/list')
          this.$message({

            type: 'success',
            message: '保存成功了'

          })
        },

       async fetch(){           
            const res = await this.$http.get(`adsedit/${this.id}`)
            this.model = Object.assign({}, this.model, res.data);
         },
         
    },



    //相当于java的构造方法默认执行
    created(){
        //如果有id就获取分类名字
        this.id && this.fetch()
    }

}
</script>