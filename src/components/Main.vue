<template>
  <div class="main">
    <div class="bread">
      <v-bread-crumb></v-bread-crumb>
    </div>
    <div class="content">
      <router-view :key="+new Date()"></router-view>
    </div>
  </div>
</template>

<script>
import BreadCrumb from '@/components/BreadCrumb.vue'

export default {
  data () {
    return {
      activeKey: ''
    }
  },
  components: {
    'v-bread-crumb': BreadCrumb
  }
}
</script>

<style lang="less" scoped>
.content {
  width: 100%;
  height: 100%;
  background-color: #fff;
  padding: 20px 15px;
  border-radius: 5px;
  transform: translateY(15px);
}
</style>
