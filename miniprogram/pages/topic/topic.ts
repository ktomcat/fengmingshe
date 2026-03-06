// topic.ts
// 获取应用实例

Component({
  lifetimes: {
    attached() {
      // 获取页面参数
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const options = currentPage.options || {}
      const topicId = options.topicId
      
      // 组件挂载时加载测试数据
      const app = getApp<IAppOption>()
      const globalData = app.globalData
      
      // 根据话题ID获取对应话题数据，如果没有指定ID则使用第一个话题
      let targetTopic = globalData.topics?.[0] || null
      if (topicId && globalData.topics) {
        targetTopic = globalData.topics.find((topic: any) => topic.id === topicId) || globalData.topics[0]
      }
      
      this.setData({
        topic: targetTopic,
        comments: this.sortComments(this.getCommentsForTopic(targetTopic))
      })
    }
  },
  data: {
    currentTab: 0, // 当前选中的导航项索引
    showBottomSheet: false, // 控制底部菜单栏显示
    activeNav: 'featured', // 当前激活的评论导航：'featured' | 'all'
    sortType: 'time', // 排序类型：'time' | 'hot'
    topic: null as any, // 话题数据
    comments: [] as any[], // 评论列表
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
    showBottomSheet() {
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

    // 评论输入处理
    onCommentInput(e: any) {
      console.log('输入评论', e.detail.value)
    },

    // 发送评论
    onSendComment() {
      console.log('发送评论')
      wx.showToast({
        title: '评论已发送',
        icon: 'success'
      })
    },

    // 评论导航切换
    switchNav(e: any) {
      const nav = e.currentTarget.dataset.nav
      this.setData({
        activeNav: nav,
        comments: this.sortComments(nav === 'featured' ? 
          this.getCommentsForTopic(this.data.topic).filter((comment: any) => comment.isFeatured) :
          this.getCommentsForTopic(this.data.topic))
      })
    },

    // 排序类型切换
    switchSortType(e: any) {
      const sortType = e.currentTarget.dataset.type
      this.setData({
        sortType: sortType,
        comments: this.sortComments(this.data.comments)
      })
    },

    // 评论排序
    sortComments(comments: any[]) {
      if (!comments || comments.length === 0) return comments
      
      const sortedComments = [...comments]
      
      if (this.data.sortType === 'time') {
        // 按时间倒序排列（最新在前）
        sortedComments.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
      } else if (this.data.sortType === 'hot') {
        // 按热度排序（点赞数 + 回复数）
        sortedComments.sort((a, b) => {
          const aHot = a.likeCount + a.replyCount
          const bHot = b.likeCount + b.replyCount
          return bHot - aHot
        })
      }
      
      return sortedComments
    },

    // 生成评论数据
    getCommentsForTopic(topic: any) {
      if (!topic) return []
      
      return [
        {
          id: 'comment_001',
          content: '这个话题很有意思，我也经常关注天气变化！',
          author: {
            id: 'user_005',
            nickname: '旅行达人',
            avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
          },
          createTime: '2025-03-06 10:30:00',
          likeCount: 8,
          replyCount: 2,
          isFeatured: true
        },
        {
          id: 'comment_002',
          content: '今天确实很适合出去走走，推荐去公园散步！',
          author: {
            id: 'user_006',
            nickname: '户外爱好者',
            avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
          },
          createTime: '2025-03-06 11:15:00',
          likeCount: 5,
          replyCount: 1,
          isFeatured: false
        },
        {
          id: 'comment_003',
          content: '三体确实是一部很棒的科幻小说，推荐大家看看！',
          author: {
            id: 'user_007',
            nickname: '科幻迷',
            avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
          },
          createTime: '2025-03-05 16:45:00',
          likeCount: 12,
          replyCount: 3,
          isFeatured: true
        }
      ]
    }
  },
})