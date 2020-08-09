<template>
  <div class="top-bar">
    <el-input placeholder="请输入内容，按回车键搜索..." @keydown.enter.native="handleSearch" v-model="inputValue">
      <template slot="append">
       搜索
      </template>
    </el-input>
    <el-button type="primary" @click="$emit('show')">添加商品</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      inputValue: ''
    }
  },
  methods: {
    handleSearch () {
      this.$emit('handleSearch', this.inputValue)
    }
  }
}
</script>

<style lang="less" scoped>
.top-bar {
  .el-input {
    width: 300px;
  }
  .el-button {
    margin-left: 15px;
  }
}
</style>