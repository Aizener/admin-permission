<template>
  <div class="card animate__animated animate__zoomIn" v-loading="isOperate">
    <div class="card-header">
      <div class="card-header__title">
        {{ isAdd ? '添加信息' : '删除信息' }}
      </div>
      <div class="card-header__close" @click="$emit('close')">
        <i class="el-icon-close"></i>
      </div>
    </div>
    <div class="card-content">
      <el-form :model="formData" :rules="rules" ref="form">
        <el-form-item label="姓名：" prop="name">
          <el-input v-model="formData.name"></el-input>
        </el-form-item>
        <el-form-item label="地址：" prop="address">
          <el-input v-model="formData.address"></el-input>
        </el-form-item>
        <el-form-item label="爱好：" prop="likes">
          <el-input  v-model="formData.likes"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="$emit('close')" type="info">取消</el-button>
          <el-button @click="submitForm" type="primary">{{ isAdd ? '添加' : '修改' }}</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isAdd: Boolean,
    isOperate: Boolean,
    rowData: {
      type: Object,
      default () {
        return {}
      }
    }
  },
  data () {
    return {
      formData: {
        name: '',
        address: '',
        likes: ''
      },
      rules: {
        name: { required: true, message: '请输入姓名', trigger: 'blur' },
        address: { required: true, message: '请输入地址', trigger: 'blur' },
        likes: { required: true, message: '请输入爱好', trigger: 'blur' }
      }
    }
  },
  created () {
    if (Object.keys(this.rowData).length && !this.isAdd) {
      this.formData = { ...this.rowData }
    } else {
      this.formData = {
        name: '',
        address: '',
        likes: ''
      }
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$emit('submitAction', {
            isAdd: this.isAdd,
            rowData: this.formData
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  transform-origin: 0 0;
  z-index: 99;
  background: #fff;
  box-shadow: 0 0 20px gray;
  border-radius: 5px;
  padding: 15px 80px;
  &-header {
    display: flex;
    justify-content: space-between;
    margin: 0 -50px 30px;
    &__title {
      font-size: 20px;
    }
    &__close {
      cursor: pointer;
      transition: all .5s;
      &:hover {
        transform: rotate(-15deg);
      }
    }
  }
  .el-form-item {
    display: flex;
    &:last-child {
      display: block;
      text-align: right;
    }
  }
  .el-input {
    width: 200px;
  }
}
.animate__animated.animate__zoomIn {
  --animate-duration: .8s;
}
</style>