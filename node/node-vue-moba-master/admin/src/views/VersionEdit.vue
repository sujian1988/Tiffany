<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}app版本控制</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="更新开关 0：不更新 1：更新">
        <el-input v-model="model.update_flag"></el-input>
      </el-form-item>

     <el-form-item label="最新版本号">
        <el-input v-model="model.latest_version"></el-input>
      </el-form-item>

      <el-form-item label="最新版本code">
        <el-input v-model="model.versionCode"></el-input>
      </el-form-item> 

        <el-form-item label="最小支持版本code"> 
        <el-input v-model="model.minVersionCode"></el-input>
      </el-form-item>
      
      <el-form-item label="已经更新用户"> 
        <el-input v-model="model.done_update_Usernum"></el-input>
      </el-form-item>

      <el-form-item label="更新内容提示">
        <el-input v-model="model.notes"></el-input>
      </el-form-item>

      <el-form-item label="apk下载链接">
        <el-input v-model="model.update_url"></el-input>
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
  data() {
    return {
      model: {
        items: []
      }
    };
  },
  methods: {
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/versions/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/versions", this.model);
      }
      this.$router.push("/versions/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/versions/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
