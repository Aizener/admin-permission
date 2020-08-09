<template>
  <div class="home">
    <el-container>
      <el-header>
        <v-header></v-header>
      </el-header>
      <el-container class="v-container">
        <el-aside width="200px">
          <v-aside></v-aside>
        </el-aside>
        <el-main>
          <v-main></v-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Aside from '@/components/Aside.vue'
import Main from '@/components/Main.vue'

export default {
  name: 'Home',
  components: {
    'v-header': Header,
    'v-aside': Aside,
    'v-main': Main
  }
}
</script>

<style lang="less" scoped>
.home {
  height: 100%;
}
.el-container {
  height: 100%;
}
.v-container {
  height: calc(100% - 60px);
}
.el-header {
  padding: 0;
  z-index: 9;
}
.el-aside {
  height: 100%;
  background-color: #00BFFF;
}
.el-main {
  height: 100%;
  background-color: #eee;
  .main {
    height: 100%;
    overflow: hidden;
  }
}
</style>
