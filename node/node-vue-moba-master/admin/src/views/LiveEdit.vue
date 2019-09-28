<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}直播live</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="标题">
        <el-input v-model="model.mliveTitle"></el-input>
      </el-form-item>

     <el-form-item label="up主">
        <el-input v-model="model.nickName"></el-input>
      </el-form-item>

      <el-form-item label="房间号">
        <el-input v-model="model.roomId"></el-input>
      </el-form-item>

      <el-form-item label="观看人数">
        <el-input v-model="model.mMemNumber"></el-input>
      </el-form-item>

      <el-form-item label="上传流地址">
        <el-input v-model="model.mRtmpPushUrl"></el-input>
      </el-form-item>

      <el-form-item label="观看流地址">
        <el-input v-model="model.mRtmpPullUrl"></el-input>
      </el-form-item>

     <el-form-item label="up主头像">
        <el-input v-model="model.headerUrl"></el-input>
      </el-form-item>

      <el-form-item label="封面">
        <el-input v-model="model.bgImageUrl"></el-input>
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
        res = await this.$http.put(`rest/lives/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/lives", this.model);
      }
      this.$router.push("/lives/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/lives/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
