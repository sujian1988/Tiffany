<template>
    
    <div>
        <h1>分类列表</h1>
        
        <el-table :data="items" >

             <el-table-column prop="_id" label="ID" with="240"></el-table-column>
             <el-table-column prop="name" label="分类名称" ></el-table-column>
            
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
            const res = await this.$http.post('categorielist')
            this.items = res.data
        }  
    },

    //在created方法中执行fetch
    created(){
        this.fetch();
    }
}


</script>