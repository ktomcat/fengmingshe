// index.ts

Component({
  lifetimes: {
    attached() {
      // 组件挂载时加载测试数据
      const app = getApp()
      const globalData = app.globalData
      
      // 处理特色话题，提取第一个文本内容
      const featuredTopic = globalData.featuredTopic
      if (featuredTopic && featuredTopic.content) {
        const firstTextContent = this.getFirstTextContent(featuredTopic.content)
        featuredTopic.displayContent = firstTextContent
      }
      
      // 处理讨论列表，为每个话题提取第一个文本内容、图片数量和辩题信息
      const discussions = globalData.topics?globalData.topics.map(topic => {
        if (topic && topic.content) {
          const firstTextContent = this.getFirstTextContent(topic.content)
          const imageCount = this.getImageCount(topic.content)
          const hasVote = this.hasVoteContent(topic.content)
          const voteInfo = hasVote ? this.getVoteInfo(topic.content) : null
          return {
            ...topic,
            displayContent: firstTextContent,
            imageCount: imageCount,
            hasVote: hasVote,
            voteInfo: voteInfo
          }
        }
        return topic
      }):[]
      
      this.setData({
        featuredTopic: featuredTopic,
        discussions: discussions,
        userInfo: globalData.userInfo
      })
    }
  },
  data: {
    motto: 'Hello World',
    userInfo: {
      avatarUrl: 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      nickName: '',
    },
    hasUserInfo: false,
    canIUseGetUserProfile: wx.canIUse('getUserProfile'),
    canIUseNicknameComp: wx.canIUse('input.type.nickname'),
    currentTab: 0, // 当前选中的导航项索引
    showBottomSheet: false, // 控制底部菜单栏显示
    searchText: '', // 搜索框内容
    featuredTopic: null as any, // 特色话题
    discussions: [] as any[], // 讨论列表
  },
  methods: {

    onChooseAvatar(e: any) {
      console.log('【首页】选择头像，事件详情:', e.detail)
      const { avatarUrl } = e.detail
      const { nickName } = this.data.userInfo
      this.setData({
        "userInfo.avatarUrl": avatarUrl,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      })
    },
    onInputChange(e: any) {
      console.log('【首页】输入框内容变化，新昵称:', e.detail.value)
      const nickName = e.detail.value
      const { avatarUrl } = this.data.userInfo
      this.setData({
        "userInfo.nickName": nickName,
        hasUserInfo: nickName && avatarUrl && avatarUrl !== 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0',
      })
    },
    getUserProfile() {
      console.log('【首页】点击获取用户信息按钮')
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
      wx.getUserProfile({
        desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          console.log('【首页】获取用户信息成功:', res.userInfo)
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        },
        fail: (err) => {
          console.error('【首页】获取用户信息失败:', err)
        }
      })
    },

    // 底部导航栏切换 - 现在由组件统一处理
    onTabChange(e: any) {
      // 保留事件监听，但页面跳转逻辑已移至组件内部
      const index = e.detail.index
      console.log('【首页】底部导航栏切换，选中索引:', index)
      this.setData({
        currentTab: index
      })
    },

    // 底部菜单栏相关方法
    showBottomSheet(e:any) {
      console.log('【首页】显示底部菜单栏')
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation()
      }
      this.setData({
        showBottomSheet: true
      })
    },

    closeBottomSheet() {
      console.log('【首页】关闭底部菜单栏')
      this.setData({
        showBottomSheet: false
      })
    },

    onReportContent() {
      console.log('【首页】点击举报内容按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '举报成功',
        icon: 'success'
      })
    },

    onBlockUser() {
      console.log('【首页】点击拉黑用户按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '已拉黑用户',
        icon: 'success'
      })
    },

    onSharePost() {
      console.log('【首页】点击分享帖子按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '分享成功',
        icon: 'success'
      })
    },

    onCopyLink() {
      console.log('【首页】点击复制链接按钮')
      this.closeBottomSheet()
      wx.setClipboardData({
        data: 'https://fengming.example.com/post/123',
        success: () => {
          console.log('【首页】复制链接成功')
          wx.showToast({
            title: '链接已复制',
            icon: 'success'
          })
        },
        fail: (err) => {
          console.error('【首页】复制链接失败:', err)
        }
      })
    },

    // 搜索相关方法
    onSearchInput(e: any) {
      const value = e.detail.value
      console.log('【首页】搜索框输入内容:', value)
      this.setData({
        searchText: value
      })
    },

    onSearch() {
      if (this.data.searchText.trim()) {
        console.log('【首页】点击搜索按钮，搜索内容:', this.data.searchText)
        wx.showToast({
          title: '搜索中...',
          icon: 'loading',
          duration: 1000
        })
        
        // 模拟搜索请求
        setTimeout(() => {
          console.log('【首页】搜索完成')
          wx.showToast({
            title: '搜索完成',
            icon: 'success'
          })
          // 这里可以添加实际的搜索逻辑
        }, 1000)
      } else {
        console.log('【首页】搜索内容为空，不执行搜索')
      }
    },

    // 跳转到话题页面
    goToTopic() {
      console.log('【首页】点击跳转到话题页面')
      const { featuredTopic } = this.data
      if (featuredTopic && featuredTopic.id) {
        wx.navigateTo({
          url: `/pages/topic/topic?topicId=${featuredTopic.id}`
        })
      } else {
        wx.navigateTo({
          url: '/pages/topic/topic'
        })
      }
    },

    // 跳转到话题详情页
    goToTopicDetail(e: any) {
      const topicId = e.currentTarget.dataset.topicId
      console.log('【首页】点击跳转到话题详情页，话题ID:', topicId)
      
      // 传递话题ID到详情页
      wx.navigateTo({
        url: `/pages/topic/topic?topicId=${topicId}`
      })
    },

    // 点赞帖子
    onLikePost(e: any) {
      // 安全地阻止事件冒泡
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation()
      }
      const topicId = e.currentTarget.dataset.topicId
      const index = e.currentTarget.dataset.index
      console.log('【首页】点击点赞帖子，话题ID:', topicId, '索引:', index)
      
      // 更新点赞状态
      const { discussions } = this.data
      if (discussions && discussions[index]) {
        const currentItem = discussions[index]
        const isLiked = !currentItem.userLiked
        const likeCountChange = isLiked ? 1 : -1
        
        // 更新数据
        discussions[index] = {
          ...currentItem,
          userLiked: isLiked,
          likeCount: Math.max(0, (currentItem.likeCount || 0) + likeCountChange)
        }
        
        this.setData({
          discussions: discussions
        })
        
        // 显示反馈
        wx.showToast({
          title: isLiked ? '点赞成功' : '取消点赞',
          icon: 'success',
          duration: 1000
        })
      }
    },

    // 评论帖子 - 跳转到话题详情页并滚动到评论列表
    onCommentPost(e: any) {
      // 安全地阻止事件冒泡
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation()
      }
      const topicId = e.currentTarget.dataset.topicId
      console.log('【首页】点击评论帖子，话题ID:', topicId)
      
      // 跳转到话题详情页，并传递参数表示需要滚动到评论列表
      wx.navigateTo({
        url: `/pages/topic/topic?topicId=${encodeURIComponent(topicId)}&scrollToComments=true`
      })
    },

    // 获取第一个文本内容
    getFirstTextContent(contentArray: any[]): string {
      if (!contentArray || !Array.isArray(contentArray)) {
        return ''
      }
      
      // 找到第一个type为'text'的内容
      const textItem = (contentArray as any[]).find((item: any) => item.type === 'text')
      return textItem ? textItem.content : ''
    },

    // 获取图片数量
    getImageCount(contentArray: any[]): number {
      if (!contentArray || !Array.isArray(contentArray)) {
        return 0
      }
      
      // 统计type为'image'的内容数量
      const imageItems = (contentArray as any[]).filter((item: any) => item.type === 'image')
      return imageItems.length
    },

    // 判断是否包含辩题内容
    hasVoteContent(contentArray: any[]): boolean {
      if (!contentArray || !Array.isArray(contentArray)) {
        return false
      }
      
      // 检查是否存在type为'vote'的内容
      return (contentArray as any[]).some((item: any) => item.type === 'vote')
    },

    // 获取辩题信息
    getVoteInfo(contentArray: any[]): any {
      if (!contentArray || !Array.isArray(contentArray)) {
        return null
      }
      
      // 找到第一个type为'vote'的内容
      const voteItem = (contentArray as any[]).find((item: any) => item.type === 'vote')
      if (!voteItem || !voteItem.content) {
        return null
      }
      
      // 根据参与人数计算参与度等级
      const totalVotes = voteItem.content.totalVotes || 0
      let participationLevel = 'low-participation'
      
      if (totalVotes >= 1000) {
        participationLevel = 'very-high-participation'
      } else if (totalVotes >= 500) {
        participationLevel = 'high-participation'
      } else if (totalVotes >= 100) {
        participationLevel = 'medium-participation'
      }
      
      return {
        ...voteItem.content,
        participationLevel: participationLevel
      }
    },

    // 分享帖子（帖子列表中的分享按钮）
    onSharePostInList(e: any) {
      // 安全地阻止事件冒泡
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation()
      }
      const topic = e.currentTarget.dataset.topic
      console.log('【首页】点击分享帖子（列表），帖子信息:', topic)
      
      // 显示分享弹窗
      wx.showActionSheet({
        itemList: ['分享给好友', '分享到朋友圈', '复制链接'],
        success: (res) => {
          const tapIndex = res.tapIndex
          console.log('【首页】分享弹窗选择，索引:', tapIndex)
          switch(tapIndex) {
            case 0:
              console.log('【首页】选择分享给好友')
              wx.showToast({
                title: '已分享给好友',
                icon: 'success'
              })
              break
            case 1:
              console.log('【首页】选择分享到朋友圈')
              wx.showToast({
                title: '已分享到朋友圈',
                icon: 'success'
              })
              break
            case 2:
              console.log('【首页】选择复制链接')
              wx.setClipboardData({
                data: `https://fengming.example.com/topic/${topic.id}`,
                success: () => {
                  console.log('【首页】复制链接成功')
                  wx.showToast({
                    title: '链接已复制',
                    icon: 'success'
                  })
                },
                fail: (err) => {
                  console.error('【首页】复制链接失败:', err)
                }
              })
              break
          }
        },
        fail: (err) => {
          console.error('【首页】分享弹窗失败:', err)
        }
      })
    },
  },
})
