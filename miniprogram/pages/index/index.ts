// index.ts

import { recordOperation, OperationType } from '../../utils/testDataStorage'

Component({
  // 分享配置
  options: {
    addGlobalClass: true
  },
  
  // 页面分享功能
  pageLifetimes: {
    // 分享到微信好友
    onShareAppMessage() {
      return {
        title: '蜂鸣 - 发现有趣的话题讨论',
        path: '/pages/index/index',
        imageUrl: '/static/share-logo.png'
      }
    },
    
    // 分享到朋友圈
    onShareTimeline() {
      return {
        title: '蜂鸣 - 发现有趣的话题讨论',
        imageUrl: '/static/share-logo.png'
      }
    }
  },
  
  lifetimes: {
    attached() {
      // 组件挂载时加载测试数据
      const app = getApp()
      const db = app.globalData
      
      // 获取当前用户信息
      const currentUser = db.getCurrentUser()
      
      // 获取特色话题
      const featuredTopic = db.getFeaturedTopic()
      if (featuredTopic && featuredTopic.content) {
        const firstTextContent = this.getFirstTextContent(featuredTopic.content)
        const firstImage = this.getFirstImage(featuredTopic.content)
        featuredTopic.displayContent = firstTextContent
        featuredTopic.image = firstImage
      }
      
      // 获取所有普通话题
      const normalTopics = db.getNormalTopics()
      
      // 处理讨论列表，为每个话题提取第一个文本内容、图片数量和辩题信息
      const discussions = normalTopics.map(topic => {
        if (topic && topic.content) {
          const firstTextContent = this.getFirstTextContent(topic.content)
          const imageCount = this.getImageCount(topic.content)
          const hasVote = this.hasVoteContent(topic.content)
          const voteInfo = hasVote ? this.getVoteInfo(topic.content) : null
          
          // 获取作者信息
          const author = db.users.find(user => user.id === topic.authorId)
          
          // 检查当前用户是否点赞、投票、收藏
          const isLiked = db.isLiked(currentUser.id, 'topic', topic.id)
          const voteChoice = db.getVote(currentUser.id, topic.id)
          const isFavorited = db.isFavorited(currentUser.id, topic.id)
          
          return {
            ...topic,
            author: author || {
              nickname: '未知用户',
              avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Unknown&size=100'
            },
            displayContent: firstTextContent,
            imageCount: imageCount,
            hasVote: hasVote,
            voteInfo: voteInfo,
            userLiked: isLiked,
            voteChoice: voteChoice,
            isFavorited: isFavorited
          }
        }
        return topic
      })
      
      this.setData({
        featuredTopic: featuredTopic,
        discussions: discussions,
        currentUser: currentUser,
        userInfo: {
          avatarUrl: currentUser.avatar,
          nickName: currentUser.nickname
        }
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
    selectedTopic: null as any, // 当前选中的话题（用于底部菜单栏）
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

    // 底部菜单栏相关方法
    showBottomSheet(e:any) {
      const topic = e.currentTarget.dataset.topic
      console.log('【首页】显示底部菜单栏，话题信息:', topic)
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation()
      }
      
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      // 动态查询最新的收藏状态
      const currentIsFavorited = db.isFavorited(currentUser.id, topic.id)
      console.log('【首页】动态查询收藏状态:', currentIsFavorited)
      
      // 更新话题的收藏状态
      const updatedTopic = {
        ...topic,
        isFavorited: currentIsFavorited
      }
      
      this.setData({
        showBottomSheet: true,
        selectedTopic: updatedTopic
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

    onCollection() {
      console.log('【首页】点击收藏话题按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '收藏成功',
        icon: 'success'
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
        
        // 跳转到搜索结果页面，并传递搜索关键词
        wx.navigateTo({
          url: `/pages/search/search?keyword=${encodeURIComponent(this.data.searchText)}`
        })
      } else {
        console.log('【首页】搜索内容为空，不执行搜索')
        wx.showToast({
          title: '请输入搜索内容',
          icon: 'none'
        })
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
      
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      // 更新点赞状态
      const { discussions } = this.data
      if (discussions && discussions[index]) {
        const currentItem = discussions[index]
        const isLiked = !currentItem.userLiked
        
        // 使用dataService进行数据持久化
        const success = db.toggleLike(currentUser.id, 'topic', topicId)
        
        
        // 更新UI数据
        discussions[index] = {
          ...currentItem,
          userLiked: isLiked,
          likeCount: isLiked ? (currentItem.likeCount || 0) + 1 : Math.max(0, (currentItem.likeCount || 0) - 1)
        }
        
        this.setData({
          discussions: discussions
        })
        
        // 记录操作到测试数据存储
        recordOperation(
          OperationType.LIKE_TOPIC,
          currentUser.id,
          'topic',
          topicId,
          { isLiked }
        )
        
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

    // 获取第一张图片URL
    getFirstImage(contentArray: any[]): string {
      if (!contentArray || !Array.isArray(contentArray)) {
        return 'https://api.dicebear.com/7.x/adventurer/png?seed=default&size=400'
      }
      
      // 找到第一个type为'image'的内容
      const imageItem = (contentArray as any[]).find((item: any) => item.type === 'image')
      return imageItem ? imageItem.content : 'https://api.dicebear.com/7.x/adventurer/png?seed=default&size=400'
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

    // 收藏帖子
    onFavoriteTopic(topic: any) {
      console.log('【首页】收藏话题，话题ID:', topic.id)
      
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      const isFavorited = !topic.isFavorited
      
      // 使用dataService进行数据持久化
      const operationResult = db.toggleFavorite(currentUser.id, topic.id)
      console.log('【首页】toggleFavorite操作结果:', operationResult)
      
      // 记录操作到测试数据存储
      recordOperation(
        OperationType.FAVORITE,
        currentUser.id,
        'topic',
        topic.id,
        { isFavorited }
      )
      
      // 显示操作成功提示
      wx.showToast({
        title: isFavorited ? '收藏成功' : '取消收藏',
        icon: 'success'
      })
    },



    // 收藏帖子（底部菜单栏）
    onCollection() {
      console.log('【首页】点击收藏话题按钮')
      
      const { selectedTopic } = this.data
      if (selectedTopic) {
        this.onFavoriteTopic(selectedTopic)
      }
      
      this.closeBottomSheet()
    },

    // 分享帖子（底部菜单栏）
    // 分享帖子（底部菜单）
    onSharePost() {
      console.log('【首页】点击分享帖子（底部菜单）')
      
      // 关闭底部弹窗
      this.closeBottomSheet()
      
      // 获取话题信息
      const topic = this.data.selectedTopic
      if (!topic) {
        wx.showToast({
          title: '话题信息不存在',
          icon: 'error'
        })
        return
      }
      
      // 启用右上角分享功能
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
      
      // 显示友好的提示
      wx.showModal({
        title: '分享提示',
        content: '请点击右上角的"..."按钮，选择分享给好友或朋友圈',
        showCancel: false,
        confirmText: '知道了'
      })
    },

    // 分享帖子（帖子列表中的分享按钮）
    onSharePostInList(e: any) {
      // 安全地阻止事件冒泡
      if (e && typeof e.stopPropagation === 'function') {
        e.stopPropagation()
      }
      const topic = e.currentTarget.dataset.topic
      console.log('【首页】点击分享帖子（列表），帖子信息:', topic)
      
      // 启用右上角分享功能
      wx.showShareMenu({
        withShareTicket: true,
        menus: ['shareAppMessage', 'shareTimeline']
      })
      
      // 显示友好的提示
      wx.showModal({
        title: '分享提示',
        content: '请点击右上角的"..."按钮，选择分享给好友或朋友圈',
        showCancel: false,
        confirmText: '知道了'
      })
    },

    // 举报内容
    onReportContent() {
      console.log('【首页】点击举报内容按钮')
      wx.showToast({
        title: '举报成功',
        icon: 'success'
      })
      this.closeBottomSheet()
    },

    // 拉黑用户
    onBlockUser() {
      console.log('【首页】点击拉黑用户按钮')
      wx.showToast({
        title: '已拉黑用户',
        icon: 'success'
      })
      this.closeBottomSheet()
    },



    // 跳转到用户主页
    goToUserProfile(e: any) {
      const userId = e.currentTarget.dataset.userId
      console.log('【首页】点击作者信息，用户ID:', userId)
      
      if (userId) {
        wx.navigateTo({
          url: `/pages/user/user?userId=${userId}`
        })
      } else {
        wx.showToast({
          title: '用户信息不存在',
          icon: 'error'
        })
      }
    },
  },
})
