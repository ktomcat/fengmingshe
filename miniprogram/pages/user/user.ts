// user.ts
Page({
  // 分享到微信好友
  onShareAppMessage() {
    return {
      title: '蜂鸣社 - 微弱也要表达',
      path: '/pages/index/index',
      imageUrl: '/static/logo-tmd.png'
    }
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '蜂鸣社 - 微弱也要表达',
      imageUrl: '/static/logo-tmd.png'
    }
  },
  
  data: {
    // 用户信息
    userInfo: {
      name: "",
      signature: "",
      avatar: ""
    },
    
    // 是否当前用户
    isCurrentUser: false,
    
    // 是否已关注
    isFollowing: false,
    
    // 数据统计
    stats: {
      views: "0",
      likes: "0",
      followers: "0"
    },
    
    // 当前激活的标签页
    activeTab: "posts",
    
    // 用户作品数据
    posts: []
  },

  onLoad(options: any) {
    console.log('【用户主页】页面加载，参数:', options)
    
    // 从参数中获取用户ID
    const userId = options.userId || 'user_002'
    
    // 初始化页面
    this.initPage(userId)
  },

  onShow() {
    console.log('【用户主页】页面显示')
  },

  // 初始化页面
  initPage(userId: string) {
    const app = getApp<IAppOption>()
    const db = app.globalData
    
    // 获取当前用户
    const currentUser = db.getCurrentUser()
    
    // 检查是否为当前用户
    const isCurrentUser = userId === currentUser.id
    
    // 获取目标用户信息
    const targetUser = db.users.find(user => user.id === userId)
    if (!targetUser) {
      wx.showToast({
        title: '用户不存在',
        icon: 'none'
      })
      wx.navigateBack()
      return
    }
    
    // 检查是否已关注
    const isFollowing = db.isFollowing(currentUser.id, userId)
    
    // 获取用户作品数据
    const userPosts = this.getUserPosts(userId, db)
    
    // 计算统计数据
    const stats = this.calculateStats(userPosts, targetUser)
    
    this.setData({
      userInfo: {
        name: targetUser.nickname || "用户",
        signature: targetUser.signature || "这个人很懒，什么都没有留下",
        avatar: targetUser.avatar,
        id: targetUser.id
      },
      isCurrentUser: isCurrentUser,
      isFollowing: isFollowing,
      stats: stats,
      posts: userPosts,
      currentUser: currentUser,
      targetUser: targetUser
    })
    
    console.log('初始化用户主页完成:', {
      userId: userId,
      isCurrentUser: isCurrentUser,
      isFollowing: isFollowing,
      postsCount: userPosts.length,
      targetUser: targetUser
    })
  },

  // 查找用户信息
  findUserInfo(userId: string, db: any) {
    // 从用户集合中查找
    const user = db.users.find(user => user.id === userId)
    if (user) {
      return user
    }
    
    // 如果找不到，返回一个默认用户
    return {
      id: userId,
      nickname: "其他用户",
      avatar: "https://api.dicebear.com/7.x/adventurer/png?seed=Alex&size=100",
      signature: "这个人很懒，什么都没有留下",
      followers: "0"
    }
  },

  // 获取用户作品数据
  getUserPosts(userId: string, db: any) {
    // 获取用户的所有帖子
    const userTopics = db.getUserTopics(userId)
    
    // 处理帖子数据
    return userTopics.map(topic => ({
      id: topic.id,
      title: topic.title,
      date: topic.createTime.split(' ')[0],
      views: this.formatNumber(topic.viewCount || 0),
      likes: this.formatNumber(topic.likeCount || 0)
    }))
  },

  // 计算统计数据
  calculateStats(posts: any[], userInfo: any) {
    const totalViews = posts.reduce((sum, post) => {
      return sum + parseInt(post.views) || 0
    }, 0)
    
    const totalLikes = posts.reduce((sum, post) => {
      return sum + parseInt(post.likes) || 0
    }, 0)
    
    return {
      views: this.formatNumber(totalViews),
      likes: this.formatNumber(totalLikes),
      followers: userInfo.followers || "0"
    }
  },

  // 数字格式化函数
  formatNumber(num: number): string {
    if (num >= 10000) {
      return (num / 10000).toFixed(1) + '万'
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'k'
    }
    return num.toString()
  },

  // 切换标签页
  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab
    console.log('切换标签页:', tab)
    
    this.setData({
      activeTab: tab
    })
  },

  // 关注/取消关注
  onFollowToggle() {
    if (this.data.isCurrentUser) {
      wx.showToast({
        title: '不能关注自己',
        icon: 'none',
        duration: 1500
      })
      return
    }
    
    if (this.data.isFollowing) {
      // 取消关注
      wx.showModal({
        title: '确认取消关注',
        content: `确定要取消关注 ${this.data.userInfo.name} 吗？`,
        confirmText: '取消关注',
        cancelText: '再想想',
        confirmColor: '#D7423D',
        success: (res) => {
          if (res.confirm) {
            this.unfollowUser()
          }
        }
      })
    } else {
      // 关注
      this.followUser()
    }
  },

  // 关注用户
  followUser() {
    const app = getApp()
    const db = app.globalData
    const currentUser = this.data.currentUser
    const targetUserId = this.data.userInfo.id || 'user_002'
    
    // 调用数据持久化方法
    const result = db.toggleFollow(currentUser.id, targetUserId)
    
    if (result) {
      // 添加用户到关注列表
      const newFollowing = [...(app.globalData.currentUserFollowing || [])]
      newFollowing.push({
        id: this.data.userInfo.id || 'user_002',
        nickname: this.data.userInfo.name,
        avatar: this.data.userInfo.avatar,
        signature: this.data.userInfo.signature,
        followers: this.data.stats.followers,
        posts: this.data.posts.length
      })
      
      // 更新全局数据
      app.globalData.currentUserFollowing = newFollowing
      
      // 更新页面数据
      this.setData({
        isFollowing: true,
        'stats.followers': this.formatNumber(Number(this.data.stats.followers) + 1)
      })
      
      wx.showToast({
        title: '关注成功',
        icon: 'success',
        duration: 1500
      })
      
      console.log('关注用户成功')
    } else {
      wx.showToast({
        title: '关注失败',
        icon: 'none',
        duration: 1500
      })
    }
  },

  // 取消关注用户
  unfollowUser() {
    const app = getApp()
    const db = app.globalData
    const currentUser = this.data.currentUser
    const targetUserId = this.data.userInfo.id || 'user_002'
    
    // 调用数据持久化方法
    const result = db.toggleFollow(currentUser.id, targetUserId)
    
    if (result === false) {
      // 从关注列表中移除
      const newFollowing = (app.globalData.currentUserFollowing || []).filter(user => user.id !== targetUserId)
      
      // 更新全局数据
      app.globalData.currentUserFollowing = newFollowing
      
      // 更新页面数据
      this.setData({
        isFollowing: false,
        'stats.followers': this.formatNumber(Math.max(0, Number(this.data.stats.followers) - 1))
      })
      
      wx.showToast({
        title: '已取消关注',
        icon: 'success',
        duration: 1500
      })
      
      console.log('取消关注用户成功')
    } else {
      wx.showToast({
        title: '取消关注失败',
        icon: 'none',
        duration: 1500
      })
    }
  },

  // 点击作品
  onPostTap(e: any) {
    const post = e.currentTarget.dataset.post
    console.log('点击作品:', post)
    
    // 跳转到话题详情页
    wx.navigateTo({
      url: `/pages/topic/topic?topicId=${post.id}&scrollToComments=false`,
      fail: (err) => {
        console.error('跳转失败:', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('【用户主页】下拉刷新')
    
    // 模拟数据刷新
    setTimeout(() => {
      wx.stopPullDownRefresh()
      wx.showToast({
        title: '刷新成功',
        icon: 'success'
      })
    }, 1000)
  }
})