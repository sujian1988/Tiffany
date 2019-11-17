<template>
  <div>
    <h1>物品列表</h1>
    <el-table :data="messages">
      <el-table-column prop="message_id" label="ID" width="240"></el-table-column>
      <el-table-column prop="user_id" label="聊天对象user_id"></el-table-column>
      <el-table-column prop="message" label="消息"></el-table-column>
      <el-table-column prop="user_headimg" label="图标">

        <template slot-scope="scope">
          <img :src="scope.row.user_headimg" style="height:3rem;">
        </template>
      
      </el-table-column>
      <el-table-column fixed="right" label="操作" width="180">
        <template slot-scope="scope">
          <el-button
            type="text"
            size="small"
            @click="$router.push(`/messages/edit/${scope.row._id}`)"
          >编辑</el-button>
          <el-button type="text" size="small" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      messages: []
    };
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("rest/messages");
      this.messages = res.data;
    },
    remove(row) {
      this.$confirm(`是否确定要删除分类 "${row.user_name}"`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        const res = await this.$http.delete(`rest/messages/${row._id}`);
        this.$message({
          type: "success",
          message: "删除成功!"
        });
        this.fetch();
      });
    }
  },
  created() {
    this.fetch();
  }
};
</script>

