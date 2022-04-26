<template>
  <div>
    <!--
      必备
        action 上传地址必填, 现在没有放个 # 即可
        file-list 管理文件数组, 必备
      样式
        list-type 控制显示的样式, 给个 picture-card
        :class 可以绑定动态类名, 根据图片存在与否决定是否显示上传图标

      其他钩子
        on-preview 绑定后会出现放大镜, 点击弹窗逻辑需要自己实现
     -->
    <el-upload
      action="#"
      :file-list="fileList"

      list-type="picture-card"
      :class="{disable: fileList.length>0}"

      :on-preview="onPreview"
      :on-remove="onRemove"
      :on-change="onChange"

      :before-upload="beforeUpload"
      :http-request="httpRequest"
    >
      <i class="el-icon-plus" />
    </el-upload>

    <el-progress
      v-if="isShowProgress"
      :text-inside="true"
      :stroke-width="26"
      :percentage="percentage"
      style="width: 146px"
    />

    <el-dialog title="预览" :visible="isShowDialog" @close="isShowDialog = false">
      <el-row type="flex" justify="center">
        <img :src="imgUrl" alt="">
      </el-row>
    </el-dialog>
  </div>
</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDAATaQ0JL6bolRr0sUpuiFVVEgsoTryoO',
  SecretKey: 'LPCjzyg8JDqGQJvFJ6bpnUKtBDySfcHf'
})
// 这个实例带上了我们的 SecretId 和 SecretKey 可以验证我们的身份

export default {
  data() {
    return {
      fileList: [],
      isShowDialog: false,
      imgUrl: '',
      percentage: 0,
      isShowProgress: false
    }
  },
  methods: {
    onPreview(file) {
      this.imgUrl = file.url
      this.isShowDialog = true
      console.log(file)
    },
    onRemove(file, fileList) {
      // 由于没有双向绑定, 删除图片this.fileList会遗留
      // 这个函数就把最新列表传进来, 覆盖即可
      this.fileList = fileList
    },
    onChange(file, fileList) {
      this.fileList = fileList
    },
    beforeUpload(file) {
      console.log('上传前的校验', file)
      // 文件大小校验
      const maxSize = 2 * 1024 * 1024
      if (file.size > maxSize) {
        this.$message.warning('只能上传小于2M图片')
        return false
      }

      const whiteList = ['image/jpeg', 'image/png']
      if (!whiteList.includes(file.type)) {
        this.$message.warning('暂时只支持 jpeg / png 格式图片')
        return false
      }
    },
    httpRequest(params) {
      // 此处替代默认上传行为
      // console.log('上传逻辑', params)
     
      this.isShowProgress = true
      // 调用腾讯云 sdk 进行上传
      cos.putObject({
        Bucket: 'hr70-1300310660', /* 填入您自己的存储桶，必须字段 */
        Region: 'ap-nanjing', /* 存储桶所在地域，例如ap-beijing，必须字段 */
        Key: params.file.name, /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */
        StorageClass: 'STANDARD',
        Body: params.file, // 上传文件对象
        onProgress: (progressData) => {
          console.log(JSON.stringify(progressData))
          this.percentage = progressData.percent * 100
        }
      }, (err, data) => {
        console.log(err || data)
        // 腾讯云上传完毕 element 完全不知道
        // 需要手动进行后续操作
        if (!err) {
          this.fileList[0].status = 'success'
          this.fileList[0].url = 'http://' + data.Location
          //  console.log(97,this.fileList);
           this.$emit('liuming',this.fileList[0].url)
        }

        // 上传完毕隐藏进度条
        setTimeout(() => {
          this.isShowProgress = false
        }, 1000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.disable {
  ::v-deep .el-upload--picture-card {
    display: none;
  }
}
</style>
