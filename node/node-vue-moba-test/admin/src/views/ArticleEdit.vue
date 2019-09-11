<template>
    
    <div class="about">

        <h1>  {{id ? '编辑' : '创建'}} 文章</h1>

        <el-form label-width="120px" @submit.native.prevent="save">

            <el-form-item label="所属分类"> 
                <el-select v-model="model.categories" multiple> 
                    
                    <el-option v-for="item in categories" 
                        :key="item._id"
                        :label="item.name" 
                        :value="item._id">
                    
                    </el-option>

                </el-select>
            </el-form-item>

            <el-form-item label="标题">
                <el-input v-model="model.title"></el-input>
            </el-form-item>

            <el-form-item label="详情">
                <!--第三部替换控件-->
                <vue-editor v-model="model.body"
                    useCustomImageHandler 
                    @image-added="handleImageAdded">
                
                </vue-editor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" native-type="submit">保存</el-button>
            </el-form-item>
        
        </el-form>

    </div>

</template>


<script>

//第一步导入vueEditor
import { VueEditor } from "vue2-editor"

export default {
    //接收id参数
    props:{
        id: {}
    },

//第二步获取vueEditor
    components: {
        VueEditor
    },
    

    data(){
        return{
            model: {},
            parents: [],
            categories: [],
        }
    },

    methods: {

        async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
   
        //上传文件要用表单格式的数据
        const formData = new FormData();
        //             字段名
        formData.append("file", file);                      
        //$http.defaults.baseURL + '/uploadhero'             
        // 方法1 http 请求                    接口名       图片二进制数据 
        const res =  await this.$http.post("uploadnew", formData);
        //        根据     光标位置    插入           图片
        Editor.insertEmbed(cursorLocation, "image", res.data.url);
        // 刷新vue2-editor
        resetUploader();

        },

       async save(){

          let res
          //判读是否有id，有id就是编辑，没有就是创建
          if(this.id){ //编辑
            res = await this.$http.put(`articles/${this.id}`, this.model);    
          }else{ // 新建
            res = await this.$http.post('articles', this.model);   
          }
          this.$router.push('/articles/list')
          this.$message({

            type: 'success',
            message: '保存成功了'

          })
        },

       async fetch(){           
            const res = await this.$http.get(`articlesedit/${this.id}`)
            this.model = res.data;
         },
         
       async fetchArticles(){
           const res = await this.$http.post('categorielist')
            this.categories = res.data;
       },  
    },



    //相当于java的构造方法默认执行
    created(){
        this.fetchArticles()
        //如果有id就获取分类名字
        this.id && this.fetch()
    }

}
</script>