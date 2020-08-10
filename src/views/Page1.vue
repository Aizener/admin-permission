<template>
  <div class="page">
    <v-card :isOperate="isOperate" v-if="cardShow" @close="cardShow = false" @submitAction="submitAction" :isAdd="isAdd" :rowData="rowData"></v-card>
    <v-top-bar @show="showAddCard" @handleSearch="handleSearch"></v-top-bar>
    <el-table
      :data="tableData"
      v-loading="loading"
      border>
      <el-table-column
        type="index"
        label="#"
        width="50">
      </el-table-column>
      <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column>
      <el-table-column
        prop="likes"
        label="爱好">
      </el-table-column>
      <el-table-column
        label="操作"
        width="200"
      >
        <template v-slot:default="scope">
          <div class="btns">
            <el-button type="primary" @click="handleUpdate(scope)">
              <i class="el-icon-edit"></i>
            </el-button>
            <el-button type="danger" @click="handleDelete(scope)">
              <i class="el-icon-delete"></i>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      class="pagi"
      background
      layout="prev, pager, next"
      :total="total"
      @current-change="sizeChange"
    >
    </el-pagination>
  </div>
</template>

<script>
import TopBar from '@/components/main/TopBar.vue'
import Card from '@/components/main/Card.vue'
import { mapMutations } from 'vuex'

export default {
  data () {
    return {
      tableData: [],
      page: {
        size: 10,
        current: 1
      },
      total: 0,
      loading: false,
      title: '添加用户',
      cardShow: false,
      isAdd: true,
      rowData: {},
      isOperate: false
    }
  },
  methods: {
    ...mapMutations(['addBread']),
    sizeChange (data) {
      this.page.current = data
      this.getList(this.page.current)
    },
    initData () {
      this.getList(this.page.current)
      this.getTotal()
    },
    showAddCard () {
      this.isAdd = true
      this.cardShow = true
    },
    submitAction (info) {
      // 添加或修改项目
      this.isOperate = true
      if (info.isAdd) {
        this.$api.addList({
          rowData: info.rowData
        }).then(() => {
          this.initData()
          this.cardShow = false
          this.isOperate = false
          this.$message({
            message: '添加成功！',
            type: 'success',
            customClass: 'v-message',
            offset: 100
          })
        })
      } else {
        this.$api.updateList({
          rowData: info.rowData
        }).then(() => {
          this.initData()
          this.cardShow = false
          this.isOperate = false
          this.$message({
            message: '修改成功！',
            type: 'success',
            customClass: 'v-message',
            offset: 100
          })
        })
      }
    },
    handleSearch (value) {
      if (value === '') {
        this.getList(1)
        return
      }
      this.loading = true
      this.$api.getListByValue({
        value
      }).then(res => {
        this.loading = false
        this.tableData = res.data.list
        this.total = res.data.total
      })
    },
    handleUpdate (scope) {
      this.isAdd = false
      this.cardShow = true
      this.rowData = scope.row
    },
    handleDelete (scope) {
      this.$confirm('你确定要删除这一条数据吗？', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'danger'
      }).then(() => {
        this.$api.deleteList({
          id: scope.row.id
        }).then(res => {
          this.initData()
          this.$message({
            message: '删除成功！',
            type: 'success',
            customClass: 'v-message',
            offset: 100
          })
        })
      }).catch(err => err)
    },
    getList (current) {
      this.loading = true
      this.$api.getList({
        current
      }).then(res => {
        this.tableData = res.data
        this.loading = false
        document.querySelector('.page').scrollTop = 0
      })
    },
    getTotal () {
      this.$api.getTotal().then(res => {
        this.total = res.data
      })
    }
  },
  created () {
    if (this.$route.query.name) {
      this.addBread({
        name: this.$route.query.name,
        path: this.$route.path
      })
    }
    this.initData()
  },
  components: {
    'v-top-bar': TopBar,
    'v-card': Card
  }
}
</script>

<style lang="less">
.page {
  height: 100%;
  overflow-y: scroll;
}
.el-table {
  transform: translateY(15px);
}
.pagi {
  margin: 30px 0;
  text-align: center;
}
.v-message {
  left: 58%;
}
</style>