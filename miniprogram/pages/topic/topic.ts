// topic.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    currentTab: 0, // 当前选中的导航项索引
    showBottomSheet: false, // 控制底部菜单栏显示
  },
  methods: {
    // 底部导航栏切换
    onTabChange(e: any) {
      const index = e.detail.index
      this.setData({
        currentTab: index
      })
      
      // 根据不同的标签页进行页面跳转或内容切换
      switch(index) {
        case 0: // 首页
          wx.navigateBack()
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
        data: 'https://fengming.example.com/topic/123',
        success: () => {
          wx.showToast({
            title: '链接已复制',
            icon: 'success'
          })
        }
      })
    },

    // 投票相关方法
    onSupportVote() {
      console.log('支持观点')
      wx.showToast({
        title: '已支持该观点',
        icon: 'success'
      })
    },

    onOpposeVote() {
      console.log('反对观点')
      wx.showToast({
        title: '已反对该观点',
        icon: 'success'
      })
    },

    // 评论相关方法
    onLikeComment(e: any) {
      console.log('点赞评论', e)
      wx.showToast({
        title: '点赞成功',
        icon: 'success'
      })
    },

    onComment(e: any) {
      console.log('评论', e)
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      })
    },

    // 发送评论
    onSendComment() {
      console.log('发送评论')
      wx.showToast({
        title: '评论已发送',
        icon: 'success'
      })
    }
  },
})