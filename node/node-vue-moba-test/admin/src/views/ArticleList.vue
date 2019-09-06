<template>
    
    <div>
        <h1>文章列表</h1>
        
        <el-table :data="items" >

            <el-table-column prop="_id" label="ID" with="240"></el-table-column>
            <el-table-column prop="title" label="标题" ></el-table-column>

            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button 
                        type="text" 
                        size="small" 
                        @click="$router.push(`/articles/edit/${scope.row._id}`)">编辑</el-button>

                    <el-button 
                        type="text" 
                        size= "all"
                        @click="remove(scope.row)">删除</el-button>    
                </template>
            </el-table-column>


        </el-table>

    </div>

</template>

<script>
export default {
    data(){
        return {
            items: []
        }
    },
    //将方法提出来，方便调用
    methods: {
        async fetch(){
            const res = await this.$http.post('articleslist') // 这里post的是server端的router路由里的index.js
            this.items = res.data
        },
        
        async remove(row){
            this.$confirm(`是否要确定删除文章 "${row.title}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async () => {
                const res = await this.$http.delete(`articles/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
                });
                this.fetch()
            })

        }
    },

    //在created方法中执行fetch
    created(){
        this.fetch();
    }
}


</script>