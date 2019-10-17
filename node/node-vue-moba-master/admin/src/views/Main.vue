<template>
  <el-container style="height: 100vh;">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu router  unique-opened :default-active="$route.path">
      
        <el-submenu index="1">
      
          <template slot="title">
            <i class="el-icon-message"></i>内容管理
          </template>
      
          <el-menu-item-group>
            <template slot="title">物品</template>
            <el-menu-item index="/items/create">新建物品</el-menu-item>
            <el-menu-item index="/items/list">物品列表</el-menu-item>
          </el-menu-item-group>
      
          <el-menu-item-group>
            <template slot="title">英雄</template>
            <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
            <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
          </el-menu-item-group>
      
          <el-menu-item-group>
            <template slot="title">文章</template>
            <el-menu-item index="/articles/create">新建文章</el-menu-item>
            <el-menu-item index="/articles/list">文章列表</el-menu-item>
          </el-menu-item-group>
      
        </el-submenu>
      
        <el-submenu index="2">
      
          <template slot="title">
            <i class="el-icon-message"></i>运营管理
          </template>
      
          <el-menu-item-group>
            <template slot="title">广告位</template>
            <el-menu-item index="/ads/create">新建广告位</el-menu-item>
            <el-menu-item index="/ads/list">广告位列表</el-menu-item>
          </el-menu-item-group>
      
        </el-submenu>
      
        <el-submenu index="3">
      
          <template slot="title">
            <i class="el-icon-message"></i>系统设置
          </template>
      
          <el-menu-item-group>
            <template slot="title">分类</template>
            <el-menu-item index="/categories/create">新建分类</el-menu-item>
            <el-menu-item index="/categories/list">分类列表</el-menu-item>
          </el-menu-item-group>
      
          <el-menu-item-group>
            <template slot="title">管理员</template>
            <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
            <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
          </el-menu-item-group>

           <el-menu-item-group>
            <template slot="title">app版本控制</template>
            <el-menu-item index="/versions/create">编辑版本号</el-menu-item>
            <el-menu-item index="/versions/list">历史版本</el-menu-item>
          </el-menu-item-group>
      
        </el-submenu>
      
        <el-submenu index="4">
          <template slot="title">
            <i class="el-icon-message"></i>用户管理
          </template>
          <el-menu-item-group>
            <template slot="title">用户</template>
            <el-menu-item index="/users/create">新建用户</el-menu-item>
            <el-menu-item index="/users/list">用户列表</el-menu-item>
          </el-menu-item-group>   
        </el-submenu>

          
        <el-submenu index="5">
          <template slot="title">
            <i class="el-icon-message"></i>视频管理
          </template>
          <el-menu-item-group>
            <template slot="title">视频</template>
            <el-menu-item index="/videos/create">新建视频</el-menu-item>
            <el-menu-item index="/videos/list">视频列表</el-menu-item>
          </el-menu-item-group>
          
           <el-menu-item-group>
            <template slot="title">评论</template>
            <el-menu-item index="/comments/create">新建评论</el-menu-item>
            <el-menu-item index="/comments/list">评论列表</el-menu-item>
          </el-menu-item-group>   

           <el-menu-item-group>
            <template slot="title">回复评论</template>
            <el-menu-item index="/commentreplyitems/create">新建回复评论</el-menu-item>
            <el-menu-item index="/commentreplyitems/list">回复评论列表</el-menu-item>
          </el-menu-item-group>   

        </el-submenu>

        <el-submenu index="6">
          <template slot="title">
            <i class="el-icon-message"></i>直播live管理
          </template>
          <el-menu-item-group>
            <template slot="title">直播live</template>
            <el-menu-item index="/lives/create">新建直播live</el-menu-item>
            <el-menu-item index="/lives/list">直播live列表</el-menu-item>
          </el-menu-item-group>
      
        </el-submenu>


      
      
      </el-menu>
    </el-aside>
    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>查看</el-dropdown-item>
            <el-dropdown-item>新增</el-dropdown-item>
            <el-dropdown-item>删除</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>王小虎</span>
      </el-header>

      <el-main>
        <router-view :key="$route.path"></router-view>
        
      </el-main>
    </el-container>
  </el-container>
</template>


<style>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>

<script>
export default {
  data() {
    const item = {
      date: "2016-05-02",
      name: "王小虎",
      address: "上海市普陀区金沙江路 1518 弄"
    };
    return {
      tableData: Array(20).fill(item)
    };
  }
};
</script>