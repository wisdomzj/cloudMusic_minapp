<template>
  <div class="app-container">
    <el-table
      border
      :data="playlist"
      fit
      style="margin-top: 20px"
      highlight-current-row
      width="100%"
    >
      <el-table-column label="序号" type="index" width="75" align="center" />
      <el-table-column label="封面" width="150" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.picUrl" alt height="75">
        </template>
      </el-table-column>
      <el-table-column prop="name" label="名称" align="center" />
      <el-table-column prop="copywriter" label="描述" align="center" />
      <el-table-column v-if="checkPermission(['admin'])" align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="onEdit(scope.row)">编辑</el-button>
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
      <span>确定删除该歌单吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="编辑歌单" :visible.sync="editDialogVisible">
      <el-form ref="form" :model="playinfo" label-width="80px">
        <el-form-item label="歌单名称">
          <el-input v-model="playinfo.name" />
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="playinfo.copywriter" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doEdit">确 定</el-button>
      </div>
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
      playlist: [],
      playinfo: {},
      pagination: {
        total: 0,
        page: 1,
        limit: 10
      },
      playId: '',
      editDialogVisible: false,
      delDialogVisible: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.$request.playFindAll({
        start: this.pagination.page,
        count: this.pagination.limit
      }).then(res => {
        const { list, total } = res.data
        this.playlist = list
        this.pagination.total = total
      })
    },
    onEdit(row) {
      this.$request.playGetById({
        id: row._id
      }).then(res => {
        this.playinfo = res.data
        this.editDialogVisible = true
      })
    },
    onDel(row) {
      this.delDialogVisible = true
      this.playId = row._id
    },
    doEdit() {
      this.$request.playEdit(this.playinfo).then(res => {
        if (res.data.modified > 0) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '修改歌单成功',
            type: 'success'
          })
          this.editDialogVisible = false
        } else if (res.data.modified === 0) {
          this.$notify({
            title: '警告',
            message: '你好像没进行修改数据的操作,淘气~',
            type: 'warning'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '修改歌单失败'
          })
        }
        this.$router.push('/play/index')
      })
    },
    doDel() {
      this.$request.playRemove({ id: this.playId }).then(res => {
        this.delDialogVisible = false
        if (res.data.deleted > 0) {
          this.getList()
          this.$notify({
            title: '成功',
            message: '删除歌单成功',
            type: 'success'
          })
        } else {
          this.$notify.error({
            title: '错误',
            message: '删除歌单失败'
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
