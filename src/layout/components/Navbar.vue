<template>
  <div class="navbar">

    <div class="app-breadcrumb">
      课程成绩预发布系统
    </div>
    <!-- <breadcrumb class="breadcrumb-container" /> -->

    <div class="right-menu">
      <el-dropdown class="avatar-container" trigger="click">
        <div class="avatar-wrapper">
          <img :src="image" class="user-avatar">
          <span class="name"></span>
          <span class="name" />
          <i class="el-icon-caret-bottom" />
        </div>
        <el-dropdown-menu slot="dropdown" class="user-dropdown">
          <el-dropdown-item divided @click.native="logout">
            <span style="display:block;">退出登录</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog
        title="修改密码"
        :visible="isShowDialog"
        @close="btnCandel"
      >
        <el-form
          ref="getAdd"
          :model="formData"
          :rules="rules"
          label-width="80px"
        >
          <el-form-item label="用户名称" prop="identifier">
            <el-input v-model="formData.identifier" />
          </el-form-item>
           <el-form-item label="原始密码" prop="password">
            <el-input v-model="formData.password" />
          </el-form-item>
          <el-form-item label="现在密码" prop="password">
            <el-input v-model="formData.password2" />
          </el-form-item>
          <el-form-item size="large">
            <el-button type="primary" @click="btnOk">确定</el-button>
            <el-button @click="btnCandel">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
  </div>
</template>

<script>

export default {
    data() {
    return {
      formData: {
        identifier: 'admin',
        password: '123456',
      },
      tableData: [],
      isShowDialog: false,
    }
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      // 清理数据
      // 跳转到登录页
      await this.$confirm('确定退出吗?')
      this.$store.commit('user/logout')
      this.$router.push('/login')
    },
    mpdifypwd(){
      this.isShowDialog =true;
    },
    btnCandel() {
      //this.$refs.indeximg.fileList = []
      this.isShowDialog = false
    },
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background-image: -webkit-linear-gradient(left, #263445, #5b8cff);
  box-shadow: 0 1px 4px rgba(0,21,41,.08);

  .app-breadcrumb {
    display: inline-block;
    font-size: 18px;
    line-height: 50px;
    margin-left: 10px;
    color: #ffffff;
    cursor: text;
    .breadBtn {
      background: #84a9fe;
      font-size: 14px;
      padding: 0 10px;
      display: inline-block;
      height: 30px;
      line-height: 30px;
      border-radius: 10px;
      margin-left: 15px;
    }
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background .3s;
    -webkit-tap-highlight-color:transparent;

    &:hover {
      background: rgba(0, 0, 0, .025)
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .name {
          color: #fff;
          vertical-align: middle;
          margin-left:5px;
        }
        .user-avatar {
          cursor: pointer;
          width: 32px;
          height: 32px;
          border-radius: 15px;
          vertical-align: middle;

        }
        .name {
          color: #fff;
          vertical-align: middle;
          margin-left:5px;
        }
        .user-dropdown {
          color: #fff;
        }
      }
    }
  }
}
</style>
