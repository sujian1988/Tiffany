<template>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}秀秀圈</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="说说">
        <el-input v-model="model.comment"></el-input>
      </el-form-item>

     <el-form-item label="up主">
        <el-input v-model="model.user_name"></el-input>
      </el-form-item>

      <el-form-item label="点赞">
        <el-input v-model="model.up"></el-input>
      </el-form-item>

      <el-form-item label="踩">
        <el-input v-model="model.down"></el-input>
      </el-form-item>

      <el-form-item label="图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUpload">
            <img v-if="model.image" :src="model.image" class="image">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

        <el-form-item label="gif图片">
          <el-upload
            class="avatar-uploader"
            :action="uploadUrl"
            :headers="getAuthHeaders()"
            :show-file-list="false"
            :on-success="afterUploadGif">
            <img v-if="model.gif" :src="model.gif" class="gif">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
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

    afterUpload(res){
          this.$set(this.model, 'image', res.url)  
        },

  afterUploadGif(res){
          this.$set(this.model, 'gif', res.url)  
        },
    async save() {
      let res
      if (this.id) {
        res = await this.$http.put(`rest/xcircles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("rest/xcircles", this.model);
      }
      this.$router.push("/xcircles/list");
      this.$message({
        type: "success",
        message: "保存成功"
      });
    },
    async fetch() {
      const res = await this.$http.get(`rest/xcircles/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    }
  },
  created() {
    this.id && this.fetch();
  }
};
</script>
