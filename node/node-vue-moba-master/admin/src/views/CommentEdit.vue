<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}评论</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="评论的用户">
       
        <el-select v-model="model.parent">
          <el-option 
            v-for="item in parents" 
            :key="item.user_id"
            :label="item.user_name" 
            :value="item.user_id">
            </el-option>
        </el-select>
      
      </el-form-item>

      <el-form-item label="视频id">
        <el-input v-model="model.video_id"></el-input>
      </el-form-item>

      <el-form-item label="评论">
        <el-input v-model="model.comment"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    id: {}
  },
  data(){
    return {
      model: {},
      parents: [],
    }
  },
  methods: {
    async save(){
      let res
      if (this.id) {
        res = await this.$http.put(`rest/comments/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/comments', this.model)
      }
      this.$router.push('/comments/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`rest/comments/${this.id}`)
      this.model = res.data
    },
    async fetchParents(){
      const res = await this.$http.get(`rest/users`)
      this.parents = res.data
    },
    
  },
  created(){
    this.fetchParents()
    this.id && this.fetch()
  }
}
</script>
