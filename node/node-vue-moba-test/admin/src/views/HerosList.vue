<template>
    
    <div>
        <h1>英雄列表</h1>
        
        <el-table :data="heros" >

            <el-table-column prop="_id" label="ID" with="240"></el-table-column>
            <el-table-column prop="name" label="英雄名称" ></el-table-column>
            <el-table-column prop="title" label="称号" ></el-table-column>
            <el-table-column prop="avatar" label="图标" >
                <template slot-scope="scope">
                    <img :src="scope.row.avatar"  style="height:3rem;">
                </template>
            </el-table-column>
            
            <el-table-column fixed="right" label="操作" width="180">
                <template slot-scope="scope">
                    <el-button 
                        type="text" 
                        size="small" 
                        @click="$router.push(`/heros/edit/${scope.row._id}`)">编辑</el-button>

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
            heros: []
        }
    },
    //将方法提出来，方便调用
    methods: {
        async fetch(){
            const res = await this.$http.post('heroslist')
            this.heros = res.data
        },
        
        async remove(row){
            this.$confirm(`是否要确定删除物品 "${row.name}"`, '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            })
            .then(async () => {
                const res = await this.$http.delete(`hero/${row._id}`)
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