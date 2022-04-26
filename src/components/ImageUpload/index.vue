<template>
  <div>
    <el-upload
      action="#"
      :file-list="fileList"

      list-type="picture-card"
      :class="{disable:fileList.length > 0}"

      :on-remove="onRemove"
      :on-change="onChange"
      :on-preview="onPreview"

      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-progress
      v-if="isShowProgress"
      :text-inside="true"
      :stroke-width="20"
      :percentage="percentage"
      style="width:146px"
    />

    <el-dialog title="预览" :visible="isShow" @close="isShow = false">
      <el-row type="flex" justify="center">
        <img :src="imgURL" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKID0pNfgQt50f3f16uQfdKktlMgjUyC9pEM',
  SecretKey: 'sTmpb5IEuIPFo67rLYT7UaPxDCuKTMy9'
})

export default {
  data() {
    return {
      fileList: [], // 存入图片
      imgURL: '',
      isShow: false, // 弹窗
      percentage: 0, // 进度
      isShowProgress: false // 进度条
    }
  },
  methods: {
    // 文件列表移出文件时的钩子
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    // 文件改变时的钩子
    onChange(file, fileList) {
      this.fileList = fileList
    },
    // 点击文件列表中已上传的文件时的钩子
    onPreview(file) {
      // console.log(file)
      this.isShow = true
      this.imgURL = file.url
    },
    // 上传前校验
    beforeUpload(file) {
      // 文件大小校验
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.warning('文件大小不能超过2MB')
        return false
      }
      // 文件类型校验
      const whiteList = ['image/jpeg', 'image/png']
      if (!whiteList.includes(file.type)) {
        this.$message.warning('文件格式只能为 jpeg 或 png')
        return false
      }
    },
    // 实现真正上传
    httpRequest(params) {
      this.isShowProgress = true
      // 调用腾讯云 sdk 进行上传
      cos.putObject({
        Bucket: 'hr-1309020544', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-beijing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        // 文件上传进度
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        // 腾讯云上传完毕 element 不知道, 需要手动进行后续操作

        // 腾讯云上传完毕 element 不知道 需要手动进行后续操作

        if (!err) {
          this.fileList[0].status = 'success' // 绿色小钩子图标
          this.fileList[0].url = 'http://' + data.Location
          this.$emit('image', this.fileList[0].url)
        }
        // 进度条隐藏
        setTimeout(() => {
          this.isShowProgress = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disable{
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
