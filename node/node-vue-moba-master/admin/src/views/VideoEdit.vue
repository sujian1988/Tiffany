<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}视频</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>

     <el-form-item label="up主">
        <el-input v-model="model.user_name"></el-input>
      </el-form-item>
     
     <el-form-item label="up主user_id">
        <el-input v-model="model.user_id"></el-input>
      </el-form-item>
     
      <el-form-item label="up主头像">
        <el-input v-model="model.user_headimg"></el-input>
      </el-form-item>

      <el-form-item label="点赞">
        <el-input v-model="model.up"></el-input>
      </el-form-item>

      <el-form-item label="踩">
        <el-input v-model="model.down"></el-input>
      </el-form-item>

     <el-form-item label="视频链接">
        <el-input v-model="model.video"></el-input>
      </el-form-item>

      <el-form-item label="gif图">
        <el-input v-model="model.gif"></el-input>
      </el-form-item>
           
      <el-form-item label="视频缩略图">
       <el-input v-model="model.thumbnail"></el-input>
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
        res = await this.$http.put(`rest/videos/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/videos", this.model);
      }
      this.$router.push("/videos/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/videos/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
