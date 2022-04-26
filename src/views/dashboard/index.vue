<template>
  <div class="dashboard-container">
    <div class="dashboard-text">
      <el-card class="page-tools">
        <el-row type="flex">
          <el-col>
            <!--el-button
              type="primary"
              size="medium"
              @click="isShowDialog = true"
            >添加课程</el-button-->
            <el-button
              type="primary"
              size="medium"
              @click="showAllData"
            >查看全部</el-button>
          </el-col>

          <el-col><el-input
            ref="searchval"
            v-model.trim="page.name_contains"
            placeholder="请输入关键字"
            clearable
            size="large"
            @change="search"
          />
          </el-col>
        </el-row>
        <el-divider />
        <el-table :data="tableData" border style="width: 100%">
          <!-- 图片 -->
          </el-table-column>
          <el-table-column prop="courseno" label="课程编号" width="180" />
          <el-table-column prop="coursename" label="课程名称" />
          <el-table-column prop="coursetime" label="上课时间" />
          <el-table-column prop="teacher" label="授课教师" />
          <el-table-column prop="grade" label="成绩" />
          <el-table-column prop="status" label="课程状态" />
          <el-table-column label="操作" width="180">
            <template #default="{ row }">
              <el-button
                size="medium"
                type="primary"
                @click="editorFn(row.id)"
              >成绩详情</el-button>
              <!--el-button
                size="medium"
                type="danger"
                @click="delFn(row.id)"
              >删除</el-button--></template> </el-table-column>>
        </el-table>
        <el-divider />
        <!-- 分页组件 -->
        <!-- <el-row
          type="flex"
          justify="center"
          align="middle"
          style="height: 60px"
        > -->
        <!-- 分页组件 -->
        <!-- <el-pagination
          small
          layout="prev, pager, next"
          :page-size="page._limit"
          :total="total"
          @current-change="changePage"
        /> -->
        <div class="block">
          <el-row type="flex" justify="center" align="middle" style="height:60px">
            <el-pagination
              layout="prev, pager, next"
              :total="total"
              :page-size="page._limit"
              @current-change="changePage"
            />
          </el-row>
        </div>
        <!-- </el-row> -->
      </el-card>
      <el-dialog
        title="确认成绩"
        :visible="isShowDialog"
        @close="btnCandel"
      >
        <el-form
          ref="getAdd"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="课程名称" prop="coursename">
            <el-input v-model="formData.coursename" />
          </el-form-item>
          <el-form-item label="上课时间" prop="coursetime">
            <el-input v-model="formData.coursetime" />
          </el-form-item>
          <el-form-item label="授课教师" prop="teacher">
            <el-input v-model="formData.teacher" />
          </el-form-item>
          <el-form-item label="课程状态" prop="status">
            <el-input v-model="formData.status" />
          </el-form-item>
          <el-form-item label="成绩" prop="grade">
            <el-input v-model="formData.grade" />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="wuyy">无异议</el-button>
            <el-button type="primary" @click="youyy">有异议</el-button>
            <el-button @click="btnCandel">返回</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import indeximg from '@/components/upimage/indeximg.vue'

export default {
  components: { indeximg },

  data() {
    return {
      formData: {
        name: '',
        email: '',
        phone: '',
        address: '',
        desc: '',
        image: ''
      },

      rules: {
        coursename: [{ required: true, message: '课程名称不能为空', trigger: 'blur' }],
        coursetime: [{ required: true, message: '上课时间不能为空', trigger: 'blur' }],
        teacher: [{ required: true, message: '授课教师不能为空', trigger: 'blur' }],
        status: [{ required: true, message: '状态不能为空', trigger: 'blur' }]
      },
      total: 0,

      page: {
        _limit: 2, // 每页条数
        _start: 0, // 开始获取的位置
        name_contains: ''
      },

      tableData: [],
      isShowDialog: false,
      newPage: '',
      courselist:[
        {
          'courseno':20220001,
          'coursename':'计算机网页设计',
          'coursetime':'2022-03-01',
          'teacher':'Jemmia',
          'grade':'80',
          'status':'未出成绩',
        },
        {
          'courseno':20220002,
          'coursename':'java程序设计',
          'coursetime':'2022-04-01',
          'teacher':'Joe',
          'grade':'90',
          'status':'未确认',
        }
      ]
    }
  },
  created() {
    this.getCourseList()
  },
  methods: {
    wuyy(){
       this.$message.success('无异议')
    },
    youyy(){
       this.$message.success('无异议')
    },
    // 渲染页面
    async getCourseList() {
      //const data = await getCourseList(this.page)
      //const tableData = await getPage(this.page)
      // console.log(43, await getCourseList())
      //console.log(data.data)
      console.log(this.courselist)
      this.tableData = this.courselist
      //this.total = tableData.data
    },

    // 翻页
    changePage(newPage) {
      this.newPage = newPage
      // newPage是当前点击的页码
      this.page._start = this.page._limit * (newPage - 1) // 将当前页码赋值给当前的最新页码
      this.getCourseList()
    },
    // 搜索
    async search() {
      this.newPage = 1
      this.page._start = 0
      console.log(this.page)
      this.getCourseList()
    },
    // 图片上传
    shanshan(val) {
      // console.log(val,131);
      this.formData.image = val
    },

    // 编辑按钮
    async editorFn(id) {
      // 弹窗
      this.isShowDialog = true
      // 获取详情
      // 弹窗
      this.isShowDialog = true
      
      this.formData = this.courselist[0]
      console.log(109, this.formData)
    },

    // 删除数据
    async delFn(id) {
      console.log(122, id)
      // 二次询问是否删除（待实现）
      await this.$confirm('确认删除吗？')
      await getDel(id)
      // console.log(33, await getDel(id))
      // 提示用户
      this.$message.success('删除成功')
      // 更新页面
      this.getCourseList()
      if (this.tableData.length === 1) {
        this.newPage = this.newPage - 1
        this.page._start = this.page._limit * (this.newPage - 1) // 将当前页码赋值给当前的最新页码
        this.getCourseList()
      }
    },

    // 弹窗确定按钮
    async btnOk() {
      // 判断编辑还是新增
      // 判断formData是否存在，如果存在就是编辑，不存在就是新增
      //  校验表单
      await this.$refs.getAdd.validate()
      if (this.formData.id) {
        const fileList = this.$refs.indeximg.fileList
        if (fileList[0] && fileList[0].status !== 'success') {
          return this.$message.warning('请耐心等待下载')
        }
        await getEditor({
          ...this.formData,
          // 判断是否有图片
          image: fileList[0] ? fileList[0].url : []
        })
        this.$message.success('修改成功')
      } else {
        console.log(141, this.formData)
        await getAdd({
          ...this.formData,
          image: this.$refs.indeximg.fileList[0]?.url
        })
        this.$message.success('添加成功')
      }

      // 刷新数据
      this.getCourseList()
      console.log()

      // 关闭弹窗
      this.isShowDialog = false
    },
    // 取消按钮
    btnCandel() {
      // 清理绑定过的数据，还有表单错误
      this.$refs.getAdd.resetFields()
      // 关闭弹窗
      // 取消后数据清空
      this.formData = {
        courseno: '',
        coursename: '',
        coursetime: '',
        teacher: '',
        grade: '',
        status: ''
      }
      //this.$refs.indeximg.fileList = []
      this.isShowDialog = false
    },
    // 查看全部
    showAllData() {
      this.page.name_contains = ''
      this.getCourseList()
      // console.log(1)
    }
  }
}
</script>

<style lang="scss" scoped>
.page-tools {
    margin: 10px;
 }

.dashboard {
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
