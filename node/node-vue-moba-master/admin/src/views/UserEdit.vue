<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}用户</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      
      <el-form-item label="用户名">
        <el-input v-model="model.user_name"></el-input>
      </el-form-item>

       <el-form-item label="称号">
            <el-input v-model="model.buyer_name"></el-input>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="uploadUrl"
              :headers="getAuthHeaders()"
              :show-file-list="false"
              :on-success="res => $set(model, 'user_headimg', res.url)"
            >
              <img v-if="model.user_headimg" :src="model.user_headimg" class="user_headimg">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>

      <el-form-item label="密码">
        <el-input type="text" v-model="model.user_password"></el-input>
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
      
    }
  },
  methods: {
    async save(){
      let res
      if (this.id) {
        res = await this.$http.put(`rest/users/${this.id}`, this.model)
      } else {
        res = await this.$http.post('rest/users', this.model)
      }
      this.$router.push('/users/list')
      this.$message({
        type: 'success',
        message: '保存成功'
      })
    },
    async fetch(){
      const res = await this.$http.get(`rest/users/${this.id}`)
      this.model = res.data
    },
    
    
  },
  created(){
    this.id && this.fetch()
  }
}
</script>
