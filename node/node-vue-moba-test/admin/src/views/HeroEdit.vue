<template>
    
    <div class="about">

        <h1>  {{id ? '编辑' : '创建'}} 英雄</h1>

        <el-form label-width="120px" @submit.native.prevent="save">

            <el-tabs value="skills" type="border-card">
                
                <el-tab-pane label="基本信息" name="basic">
                    
                    <el-form-item label="名称">
                        <el-input v-model="model.name"></el-input>
                    </el-form-item>


                    <el-form-item label="称号">
                        <el-input v-model="model.title"></el-input>
                    </el-form-item>

                                <el-form-item label="头像">
                        
                    <el-upload
                            class="avatar-uploader"
                            :action="$http.defaults.baseURL + '/uploadhero'" 
                            :show-file-list="false"
                            :on-success="afterUpload"
                            :before-upload="beforeAvatarUpload">

                            <img v-if="model.avatar" :src="model.avatar" class="avatar">
                            
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        
                        </el-upload>

                    </el-form-item>

                    <el-form-item label="类型">

                        <el-select v-model="model.categories" multiple >
                            <el-option v-for="item of categories"
                                :key="item._id"
                                :label="item.name" 
                                :value="item._id">
                            </el-option>
                        </el-select>

                    </el-form-item>


                    <el-form-item label="难度">
                        <el-rate
                            style="margin-top:0.6rem"    
                            :max="9" 
                            show-score v-model="model.scores.difficult">
                        </el-rate>
                    </el-form-item>

                    <el-form-item label="技能">
                        <el-rate
                            style="margin-top:0.6rem"    
                            :max="9" 
                            show-score v-model="model.scores.skills">
                        </el-rate>
                    </el-form-item>

                    <el-form-item label="攻击">
                        <el-rate
                            style="margin-top:0.6rem"    
                            :max="9" 
                            show-score v-model="model.scores.attack">
                        </el-rate>
                    </el-form-item>

                    <el-form-item label="生存">
                        <el-rate
                            style="margin-top:0.6rem"    
                            :max="9" 
                            show-score v-model="model.scores.survive">
                        </el-rate>
                    </el-form-item>

                    <el-form-item label="顺风出装">

                        <el-select v-model="model.items1" multiple >
                            <el-option v-for="item of items1"
                                :key="item._id"
                                :label="item.name" 
                                :value="item._id">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    
                    <el-form-item label="逆风出装">

                        <el-select v-model="model.items2" multiple >
                            <el-option v-for="item of items2"
                                :key="item._id"
                                :label="item.name" 
                                :value="item._id">
                            </el-option>
                        </el-select>

                    </el-form-item>

                    <el-form-item label="使用技巧">
                        <el-input type="textarea" v-model="model.usageTips"></el-input>
                    </el-form-item>

                    <el-form-item label="对战技巧">
                        <el-input type="textarea" v-model="model.battleTips"></el-input>
                    </el-form-item>

                    <el-form-item label="团战技巧">
                        <el-input type="textarea" v-model="model.teamTips"></el-input>
                    </el-form-item>

                </el-tab-pane>

                <el-tab-pane label="技能" name="skills">
                    
                    <el-button  type="text" @click="model.skills.push({})">  <i class="el-icon-plus"></i> 添加技能</el-button>
                    
                    <el-row type="flex" style="flex-wrap: wrap">
                    
                        <el-col :md="12" v-for="(item, i) in model.skills" :key="i">

                            <el-form-item label="名称">
                                 <el-input v-model="item.name"></el-input>
                            </el-form-item>

                             <el-form-item label="图标">
                                <el-upload
                                    class="avatar-uploader"
                                    :action="$http.defaults.baseURL + '/uploadhero'" 
                                    :show-file-list="false"
                                    :on-success="res => $set(item, 'icon' , res.url) "
                                    :before-upload="beforeAvatarUpload">

                                    <img v-if="item.icon" :src="item.icon" class="avatar">
                                    
                                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                                
                                </el-upload>
                            </el-form-item>

                             <el-form-item label="描述">
                                 <el-input v-model="item.description" type="textarea"></el-input>
                            </el-form-item>

                            <el-form-item label="小提示">
                                 <el-input v-model="item.tips" type="textarea"></el-input>
                            </el-form-item>

                            <el-form-item >
                                <el-buton size="small" type="danger" @click="model.skills.splice(i, 1)"> 
                                    删除
                                 </el-buton>
                            </el-form-item>

                        </el-col>
  
                    </el-row>
  
                </el-tab-pane>

            </el-tabs>

            <el-form-item style="margin-top: 1rem;">
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

            categories: [],
            items1: [],
            items2: [],

            model: {
                name: '',
                avatar: '',
                skills: [],
                partners: [],
                scores: {

                    difficult: 0,

                },
            },  //*** */之后再添加字段是会添加不上***
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
            res = await this.$http.put(`hero/${this.id}`, this.model);   
          }else{ // 新建
            res = await this.$http.post('hero', this.model);   
          }
          this.$router.push('/heros/list')
          this.$message({

            type: 'success',
            message: '保存成功了'

          })
        },

       async fetch(){           
            const res = await this.$http.get(`herosedit/${this.id}`)
            //this.model = res.data; 这么写是完全覆盖model数据
            //                        空对象   model       网络获取的数据
            this.model = Object.assign({},   this.model,res.data); //这样model的模型就会赋值给对象，在把data的赋给空对象，这样model的属性就会保留下来（scores）
         },

        async fetchItems(){
            const res = await this.$http.post('itemslist')
            this.items1 = res.data;
            //todo
            this.items2 = res.data;
        },

        async fetchCategories(){           
            const res = await this.$http.post(`categorielist`)
            this.categories = res.data;
         }, 

    },



    //相当于java的构造方法默认执行
    created(){
        this.fetchItems();
        this.fetchCategories();
        //如果有id就获取分类名字
        this.id && this.fetch()
    }

}
</script>


