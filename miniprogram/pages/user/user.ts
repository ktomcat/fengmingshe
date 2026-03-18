// user.ts
Page({
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
    
    // 检查是否为当前用户
    const isCurrentUser = userId === app.globalData.userInfo.id
    
    // 获取用户信息
    let targetUserInfo
    if (isCurrentUser) {
      // 当前用户，使用全局数据
      targetUserInfo = app.globalData.userInfo
    } else {
      // 其他用户，从关注列表或其他数据源查找
      targetUserInfo = this.findUserInfo(userId, app)
    }
    
    // 检查是否已关注
    const isFollowing = app.globalData.currentUserFollowing.some(user => user.id === userId)
    
    // 获取用户作品数据
    const userPosts = this.getUserPosts(userId, app)
    
    // 计算统计数据
    const stats = this.calculateStats(userPosts, targetUserInfo)
    
    this.setData({
      userInfo: {
        name: targetUserInfo.nickname || targetUserInfo.name || "用户",
        signature: targetUserInfo.signature || "这个人很懒，什么都没有留下",
        avatar: targetUserInfo.avatar
      },
      isCurrentUser: isCurrentUser,
      isFollowing: isFollowing,
      stats: stats,
      posts: userPosts
    })
    
    console.log('初始化用户主页完成:', {
      userId: userId,
      isCurrentUser: isCurrentUser,
      isFollowing: isFollowing,
      postsCount: userPosts.length
    })
  },

  // 查找用户信息
  findUserInfo(userId: string, app: any) {
    // 从关注列表中查找
    const userInFollowing = app.globalData.currentUserFollowing.find(user => user.id === userId)
    if (userInFollowing) {
      return userInFollowing
    }
    
    // 从其他数据源查找（这里可以扩展）
    // 暂时返回一个默认用户
    return {
      id: userId,
      nickname: "其他用户",
      avatar: "https://api.dicebear.com/7.x/adventurer/png?seed=Alex&size=100",
      signature: "这个人很懒，什么都没有留下",
      followers: "0"
    }
  },

  // 获取用户作品数据
  getUserPosts(userId: string, app: any) {
    // 如果是当前用户，使用currentUserPosts
    if (userId === app.globalData.userInfo.id) {
      return app.globalData.currentUserPosts.map(post => ({
        id: post.id,
        title: post.title,
        date: post.createTime.split(' ')[0],
        views: Math.floor(Math.random() * 5000 + 500) + '',
        likes: post.likeCount + ''
      }))
    }
    
    // 其他用户，返回一些示例数据，确保每个作品有唯一的ID
    return [
      {
        id: 'other_post_001',
        title: '用户体验设计原则分享',
        date: '2023-11-20',
        views: '1.2k',
        likes: '56'
      },
      {
        id: 'other_post_002',
        title: '前端开发最佳实践',
        date: '2023-11-15',
        views: '890',
        likes: '34'
      },
      {
        id: 'other_post_003',
        title: '产品思维培养方法',
        date: '2023-11-10',
        views: '1.5k',
        likes: '78'
      },
      {
        id: 'other_post_004',
        title: '移动端适配方案对比分析',
        date: '2023-11-05',
        views: '1.3k',
        likes: '65'
      },
      {
        id: 'other_post_005',
        title: 'Node.js后端架构设计思考',
        date: '2023-10-28',
        views: '2.1k',
        likes: '98'
      }
    ]
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
    const app = getApp<IAppOption>()
    const newFollowing = [...app.globalData.currentUserFollowing]
    
    // 添加用户到关注列表
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
      'stats.followers': this.formatNumber(parseInt(this.data.stats.followers) + 1)
    })
    
    wx.showToast({
      title: '关注成功',
      icon: 'success',
      duration: 1500
    })
    
    console.log('关注用户成功')
  },

  // 取消关注用户
  unfollowUser() {
    const app = getApp<IAppOption>()
    const userId = this.data.userInfo.id || 'user_002'
    
    // 从关注列表中移除
    const newFollowing = app.globalData.currentUserFollowing.filter(user => user.id !== userId)
    
    // 更新全局数据
    app.globalData.currentUserFollowing = newFollowing
    
    // 更新页面数据
    this.setData({
      isFollowing: false,
      'stats.followers': this.formatNumber(Math.max(0, parseInt(this.data.stats.followers) - 1))
    })
    
    wx.showToast({
      title: '已取消关注',
      icon: 'success',
      duration: 1500
    })
    
    console.log('取消关注用户成功')
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
  },

  // 分享功能
  onShareAppMessage() {
    return {
      title: `${this.data.userInfo.name} - 凤鸣社用户主页`,
      path: `/pages/user/user?userId=${this.data.userInfo.id || 'user_002'}`
    }
  }
})