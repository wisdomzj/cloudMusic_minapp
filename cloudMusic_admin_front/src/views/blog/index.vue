<template>
  <div class="app-container">
    <el-table
      v-loading="loading"
      border
      :data="bloglist"
      fit
      style="margin-top: 20px"
      highlight-current-row
      width="100%"
    >
      <el-table-column type="index" width="75" label="序号" align="center" />
      <el-table-column prop="content" label="内容" align="center" />
      <el-table-column prop="nickName" label="发布人" align="center" />
      <el-table-column v-if="checkPermission(['admin'])" label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <pagination
      v-show="pagination.total>0"
      :total="pagination.total"
      :page.sync="pagination.page"
      :limit.sync="pagination.limit"
      @pagination="getList"
    />
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该博客吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pagination from '@/components/Pagination'
import checkPermission from '@/utils/permission'
export default {
  components: { Pagination },
  data() {
    return {
      bloglist: [],
      pagination: {
        total: 0,
        page: 1,
        limit: 5
      },
      loading: false,
      delblog: {},
      delDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.loading = true
      this.$request.blogFindAll({
        start: this.pagination.page,
        count: this.pagination.limit
      }).then(res => {
        const { list, total } = res.data
        this.bloglist = list.data.map((item) => {
          return JSON.parse(item)
        })
        this.loading = false
        this.pagination.total = total
      })
    },
    onDel(row) {
      this.delDialogVisible = true
      this.delblog = row
    },
    doDel() {
      this.$request.blogRemove({ ...this.delblog }).then(res => {
        this.delDialogVisible = false
        if (res.data.delBlogRes.deleted > 0) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除博客成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '删除博客失败'
          })
        }
      })
    }
  }
}
</script>

<style>
  .app-container{
    background: #ffffff;
  }
</style>
