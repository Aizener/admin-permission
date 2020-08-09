<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item, idx) in breads" :key="idx" :to="{ path: item.path }">
      {{ item.name }}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState(['breads'])
  }
}
</script>

<style>

</style>