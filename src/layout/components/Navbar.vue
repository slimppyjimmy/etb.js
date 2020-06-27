<template>
  <div class="navbar">
    <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container"
      @toggleClick="toggleSideBar" />
    <span class="sidebar-title"> {{ title }}</span>
    <span class="sidebar-version">{{this.$store.getters.version}}</span>
    <div>
      <el-alert v-if="this.$store.getters.warning==null ? false:true" class="lic-alert"
        :title=this.$store.getters.warning center type="error">
      </el-alert>
    </div>
    <div class="right-menu">
      <template v-if="device!=='mobile'">
        <search id="header-search" class="right-menu-item" />

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
        <div class="avatar-wrapper">
          <svg-icon :icon-class="'user'" class="user-avatar"></svg-icon>
          <span trigger="click" class="index-name">{{this.$store.getters.name}}</span>
        </div>
        <el-dropdown-menu slot="dropdown">
          <router-link to="/profile/index">
            <el-dropdown-item>个人信息</el-dropdown-item>
          </router-link>
          <el-dropdown-item divided>
            <span style="display:block;" @click="logout">退出</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import Hamburger from '@/components/Hamburger'
  import ErrorLog from '@/components/ErrorLog'
  import Screenfull from '@/components/Screenfull'
  import Search from '@/components/HeaderSearch'

  export default {
    data() {
      return {
        title: "统 一 应 用 安 全 中 心 "
      }
    },
    components: {
      Hamburger,
      ErrorLog,
      Screenfull,
      Search
    },
    computed: {
      ...mapGetters([
        'sidebar',
        'avatar',
        'device'
      ])
    },
    methods: {
      toggleSideBar() {
        this.$store.dispatch('app/toggleSideBar')
      },
      async logout() {
        await this.$store.dispatch('user/logout')
        this.$router.push(`/login?redirect=${this.$route.fullPath}`)
      }
    }
  }
</script>

<style lang="scss" scoped>
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0, 21, 41, .08);

    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color: transparent;

      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .lic-alert {
      padding: 0 0 0 0 !important;
      line-height: 40px;
      width: 400px;
      height: 40px;
      clear: both;
      margin-left: -300px;
      margin-top: 5px;
      border-radius: 10px;
    }

    .sidebar-title {
      display: inline-block;
      margin: 0;
      margin-left: 10px;
      color: #666;
      font-weight: 600;
      line-height: 50px;
      font-size: 24px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      cursor: pointer;
    }

    .sidebar-version {
      position: relative;
      top: 4px;
      left: 10px;
      color: #666;
      font-weight: 600;
      font-size: 13px;
      font-family: Avenir, Helvetica Neue, Arial, Helvetica, sans-serif;
      vertical-align: middle;
      cursor: pointer;
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
          margin-top: 3px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 24px;
            height: 24px;
            border-radius: 10px;
          }

          .index-name {
            font-size: 18px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>