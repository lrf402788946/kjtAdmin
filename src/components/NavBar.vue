<template>
  <el-menu class="navbar" mode="horizontal">
    <div class="user-profile-container">
      <div class="user-profile-content">
        <!-- <div class="menu-icons">
          <span class="menu-icon"><i class="el-icon-search icon"></i></span>
          <span class="menu-icon"><i class="el-icon-message icon"></i></span>
          <span class="menu-icon">
            <el-badge is-dot class="item">
              <i class="el-icon-bell icon"></i>
            </el-badge>
          </span>
        </div> -->
        <el-dropdown>
          <div class="user-profile-body">
            <img class="user-avatar" src="https://img.alicdn.com/tfs/TB1ONhloamWBuNjy1XaXXXCbXXa-200-200.png" />
            <span class="user-name" v-if="isLogin">欢迎,{{ (user && user.user_name) || '' }}</span>
            <span class="user-name" v-else @click="$router.push({ path: '/login' })">请登录</span>
          </div>
          <el-dropdown-menu class="user-dropdown" slot="dropdown">
            <router-link to="/updatePw" v-if="isLogin">
              <el-dropdown-item>
                修改密码
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item v-if="isLogin">
              <span @click="toLogout()" style="display:block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </el-menu>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import _ from 'lodash';
export default {
  name: 'NavBar',
  computed: {
    ...mapState({
      user: state => state.publics.user,
    }),
  },
  data() {
    return {
      isLogin: false,
    };
  },
  async created() {
    await this.login();
    let token = _.get(this.user, `token`, undefined);
    token ? (this.isLogin = true) : '';
  },
  methods: {
    ...mapActions(['login', 'logout']),
    async toLogout() {
      await this.logout();
      this.$router.push({ path: '/login' });
    },
  },
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 64px;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  .user-profile-container {
    position: absolute;
    right: 20px;
    cursor: pointer;
    .user-profile-content {
      display: flex;
      padding: 20px 0;
    }
    .menu-icons {
      display: flex;
      align-items: center;
      .menu-icon {
        padding: 0 12px;
        .icon {
          display: inline-block;
          font-size: 18px;
          text-align: center;
        }
      }
    }
    .user-profile-body {
      position: relative;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding-right: 14px;
    }
    .user-avatar {
      width: 24px;
      height: 24px;
      margin: 0 8px 0 12px;
      border-radius: 4px;
    }
    .user-name {
      color: rgba(0, 0, 0, 0.65);
    }
    .user-department {
      font-size: 12px;
      color: rgba(102, 102, 102, 0.65);
    }
    .el-icon-caret-bottom {
      position: absolute;
      right: 0;
      top: 13px;
      font-size: 12px;
    }
  }
}
</style>
