<template>
  <div class="aside">
    <el-menu
      background-color="#00BFFF"
      text-color="#fff"
    >
      <el-submenu v-for="(item, idx) in menus" :key="idx" class="nav-title" :index="String(idx)">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">{{ item.authName }}</span>
        </template>
        <el-menu-item v-for="(item, idx) in item.children" :key="idx" @click="$router.push({ path: item.path, query: { name: item.authName }})">{{ item.authName }}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  data () {
    return {
      menus: []
    }
  },
  computed: {
    ...mapState(['user'])
  },
  mounted () {
    this.menus = this.user.rights
  }
}
</script>

<style lang="less" scoped>
.nav-title {
  & /deep/ i {
    color: #fff;
  }
  .el-menu-item {
    color: #fff;
  }
}
</style>
