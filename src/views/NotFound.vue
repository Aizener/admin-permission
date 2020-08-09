<template>
  <div class="not-found">
    <h1>啊哦！找不到相关页面o(╥﹏╥)o。</h1>
    <router-link to>
      <p @click="$router.back(-1)">返回上一级页面</p>
    </router-link>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
.not-found {
  width: 100%;
  height: 100vh;
  background-color: #6495ED;
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    margin: 0;
    color: #fff;
  }
  a {
    color: #E0FFFF;
    font-size: 14px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    transform: translateY(10px);
  }
}
</style>
