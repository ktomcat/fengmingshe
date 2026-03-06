// index.ts
// 获取应用实例
const app = getApp<IAppOption>()
const defaultAvatarUrl = 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'

Component({
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: defaultAvatarUrl,
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    currentTab: 0, // 当前选中的导航项索引
    showBottomSheet: false, // 控制底部菜单栏显示
    searchText: '', // 搜索框内容
  },
  methods: {
    // 事件处理函数
    bindViewTap() {
      wx.navigateTo({
        url: '../logs/logs',
      })
    },
    onChooseAvatar(e: any) {
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    onInputChange(e: any) {
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== defaultAvatarUrl,
      })
    },
    getUserProfile() {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log(res)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    },

    // 底部导航栏切换
    onTabChange(e: any) {
      const index = e.detail.index
      this.setData({
        currentTab: index
      })
      
      // 根据不同的标签页进行页面跳转或内容切换
      switch(index) {
        case 0: // 首页
          // 已经是首页，无需操作
          break
        case 1: // 圈子
          wx.navigateTo({
            url: '/pages/circle/circle'
          })
          break
        case 2: // 消息
          wx.navigateTo({
            url: '/pages/message/message'
          })
          break
        case 3: // 我的
          wx.navigateTo({
            url: '/pages/profile/profile'
          })
          break
      }
    },

    // 底部菜单栏相关方法
    showBottomSheet(e: any) {
      this.setData({
        showBottomSheet: true
      })
    },

    closeBottomSheet() {
      this.setData({
        showBottomSheet: false
      })
    },

    onReportContent() {
      console.log('举报内容')
      this.closeBottomSheet()
      wx.showToast({
        title: '举报成功',
        icon: 'success'
      })
    },

    onBlockUser() {
      console.log('拉黑用户')
      this.closeBottomSheet()
      wx.showToast({
        title: '已拉黑用户',
        icon: 'success'
      })
    },

    onSharePost() {
      console.log('分享帖子')
      this.closeBottomSheet()
      wx.showToast({
        title: '分享成功',
        icon: 'success'
      })
    },

    onCopyLink() {
      console.log('复制链接')
      this.closeBottomSheet()
      wx.setClipboardData({
        data: 'https://fengming.example.com/post/123',
        success: () => {
          wx.showToast({
            title: '链接已复制',
            icon: 'success'
          })
        }
      })
    },

    // 搜索相关方法
    onSearchInput(e: any) {
      const value = e.detail.value
      this.setData({
        searchText: value
      })
    },

    onSearch() {
      if (this.data.searchText.trim()) {
        console.log('搜索内容:', this.data.searchText)
        wx.showToast({
          title: '搜索中...',
          icon: 'loading',
          duration: 1000
        })
        
        // 模拟搜索请求
        setTimeout(() => {
          wx.showToast({
            title: '搜索完成',
            icon: 'success'
          })
          // 这里可以添加实际的搜索逻辑
        }, 1000)
      }
    },

    // 跳转到话题页面
    goToTopic() {
      wx.navigateTo({
        url: '/pages/topic/topic'
      })
    },
  },
})
