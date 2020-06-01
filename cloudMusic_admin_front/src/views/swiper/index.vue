<template>
  <div class="app-container">
    <el-upload
      class="upload-demo"
      action="http://localhost:3000/swiper/upload"
      :on-success="uploadSuccess"
      :show-file-list="false"
      accept=".jpg,.jpeg,.png"
    >
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-table :data="swiperList" stripe border style="width: 100%; margin-top:20px">
      <el-table-column type="index" width="75" label="序号" align="center" />
      <el-table-column label="图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.download_url" alt height="50">
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="onDel(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 确认删除的对话框 -->
    <el-dialog title="提示" :visible.sync="delDialogVisible" width="30%">
      <span>确定删除该图片吗</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="delDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="doDel">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import checkPermission from '@/utils/permission'
export default {
  data() {
    return {
      swiperList: [],
      delDialogVisible: false,
      swiperId: ''
    }
  },
  created() {
    this.getList()
  },
  methods: {
    checkPermission,
    getList() {
      this.$request.swiperFindAll({}).then(res => {
        this.swiperList = res.data
      })
    },
    uploadSuccess(res) {
      if (res.id_list.length > 0) {
        this.$notify({
          title: '成功',
          message: '上传成功',
          type: 'success'
        })
        this.getList()
      } else {
        this.$notify.error({
          title: '错误',
          message: '上传失败'
        })
      }
    },
    onDel(row) {
      this.swiperId = row
      this.delDialogVisible = true
    },
    doDel() {
      this.delDialogVisible = false
      this.loading = true
      this.$request.swiperRemove(this.swiperId).then(res => {
        console.log(res)
        this.getList()
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success'
        })
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
