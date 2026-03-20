// profile.ts
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
    currentTab: 3, // 当前底部导航索引（我的页面为3，与话题页保持一致）
    
    // 用户信息
    userInfo: {
      name: "Alex Chen",
      signature: "热爱生活，分享美好时光",
      avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuAB_8LaSdCRYc0Y4r_VPWKeP6WiXYzgUARPdnUy5WWg0Gfp4Cm3lKwpIcRnhnMy8GCr8H5v6oRdcqEN_NXH0_N8iyuPqKi-06yZLkAR8689RLooBCI_ODlCXBE3Q_WtgVFGhkTQLFPSYy1fdB3ikj1A7pJRKGFP1e0SnJO5kbhf0chIdmPNK79gCsrsS5r0_s9uyrUEGg_bBm-iIi9olhfCeDXUr0apznaYSmyiQiDEF91AnaId-vD4b236ks3qLlWuQRrmlQy4xA"
    },
    
    // 数据统计
    stats: {
      views: "12.5k",
      likes: "8.2k",
      followers: "1.4k"
    },
    
    // 当前激活的标签页
    activeTab: "posts",
    
    // 我的发布数据
    posts: [
      {
        id: 1,
        title: "如何利用现代UI设计提升用户留存率？",
        date: "2023-10-24",
        views: "1.2k",
        likes: "85"
      },
      {
        id: 2,
        title: "蜂鸣社十周年庆典幕后故事分享",
        date: "2023-10-15",
        views: "2.4k",
        likes: "210"
      },
      {
        id: 3,
        title: "设计师如何平衡审美与商业价值",
        date: "2023-09-28",
        views: "890",
        likes: "42"
      },
      {
        id: 4,
        title: "前端性能优化实战经验总结",
        date: "2023-09-15",
        views: "3.1k",
        likes: "156"
      },
      {
        id: 5,
        title: "小程序开发中的常见问题及解决方案",
        date: "2023-09-02",
        views: "2.2k",
        likes: "98"
      },
      {
        id: 6,
        title: "Vue3组合式API的最佳实践",
        date: "2023-08-20",
        views: "1.8k",
        likes: "73"
      },
      {
        id: 7,
        title: "移动端适配方案对比分析",
        date: "2023-08-05",
        views: "1.5k",
        likes: "64"
      },
      {
        id: 8,
        title: "Node.js后端架构设计思考",
        date: "2023-07-22",
        views: "2.8k",
        likes: "112"
      },
      {
        id: 9,
        title: "Git团队协作规范与流程",
        date: "2023-07-10",
        views: "1.9k",
        likes: "87"
      },
      {
        id: 10,
        title: "Web安全防护策略与实践",
        date: "2023-06-28",
        views: "2.1k",
        likes: "95"
      }
    ],
    
    // 我的收藏数据
    favorites: [
      {
        id: 1,
        title: "React 18新特性深度解析",
        date: "2023-11-05",
        views: "3.1k",
        likes: "156"
      },
      {
        id: 2,
        title: "微前端架构实践指南",
        date: "2023-10-30",
        views: "2.7k",
        likes: "98"
      },
      {
        id: 3,
        title: "TypeScript高级技巧分享",
        date: "2023-10-18",
        views: "1.8k",
        likes: "73"
      },
      {
        id: 4,
        title: "人工智能在UI设计中的应用",
        date: "2023-10-05",
        views: "4.2k",
        likes: "234"
      },
      {
        id: 5,
        title: "云原生技术架构演进",
        date: "2023-09-22",
        views: "3.5k",
        likes: "189"
      },
      {
        id: 6,
        title: "数据可视化最佳实践",
        date: "2023-09-10",
        views: "2.9k",
        likes: "142"
      },
      {
        id: 7,
        title: "移动端用户体验设计原则",
        date: "2023-08-28",
        views: "2.4k",
        likes: "116"
      },
      {
        id: 8,
        title: "Serverless架构的优势与挑战",
        date: "2023-08-15",
        views: "3.2k",
        likes: "178"
      },
      {
        id: 9,
        title: "前端工程化建设指南",
        date: "2023-08-01",
        views: "2.6k",
        likes: "134"
      },
      {
        id: 10,
        title: "跨平台开发技术选型对比",
        date: "2023-07-18",
        views: "3.8k",
        likes: "201"
      }
    ],
    
    // 我的关注数据
    following: []
  },

  onLoad() {
    console.log('【个人中心】页面加载')
    // this.initPage()
  },

  onShow() {
    console.log('【个人中心】页面显示')
    // 每次页面显示时重新加载数据，确保收藏内容能及时更新
    this.initPage()
  },

  // 初始化页面
  initPage() {
    // 从全局数据获取当前用户的帖子和收藏数据
    const app = getApp<IAppOption>()
    const db = app.globalData
    
    // 获取当前用户信息
    const currentUser = db.getCurrentUser()
    
    // 获取当前用户发布的帖子
    const userTopics = db.getUserTopics(currentUser.id)
    
    // 计算浏览量、获赞数、粉丝数
    const totalViews = userTopics.reduce((sum, topic) => sum + (topic.viewCount || 0), 0)
    const totalLikes = userTopics.reduce((sum, topic) => sum + (topic.likeCount || 0), 0)
    
    // 获取当前用户发布的帖子（转换为个人主页需要的简化格式）
    const userPosts = userTopics.map(topic => ({
      id: topic.id,
      title: topic.title,
      date: topic.createTime.split(' ')[0], // 只取日期部分
      views: this.formatNumber(topic.viewCount || 0),
      likes: this.formatNumber(topic.likeCount || 0)
    }))
    
    // 获取当前用户收藏的帖子
    const userFavorites = db.getUserFavorites(currentUser.id).map(topic => {
      // 查找作者信息
      const author = db.users.find(u => u.id === topic.authorId)
      
      return {
        id: topic.id,
        title: topic.title,
        date: topic.createTime.split(' ')[0],
        views: this.formatNumber(topic.viewCount || 0),
        likes: this.formatNumber(topic.likeCount || 0),
        author: {
          id: author?.id || 'unknown',
          nickname: author?.nickname || '未知用户',
          avatar: author?.avatar || 'https://api.dicebear.com/7.x/adventurer/png?seed=default&size=100'
        }
      }
    })
    
    // 获取当前用户关注的用户数据，并添加粉丝数和帖子数
    const userFollowing = db.getUserFollowing(currentUser.id).map(user => ({
      ...user,
      followers: this.formatNumber(user.fansCount || 0),
      posts: db.getUserTopics(user.id).length
    }))
    
    this.setData({
      userInfo: {
        name: currentUser.nickname,
        signature: currentUser.signature || "热爱生活，分享美好时光",
        avatar: currentUser.avatar,
        id: currentUser.id
      },
      stats: {
        views: this.formatNumber(totalViews),
        likes: this.formatNumber(totalLikes),
        followers: this.formatNumber(currentUser.fansCount || 18)
      },
      posts: userPosts,
      favorites: userFavorites,
      following: userFollowing,
      currentUser: currentUser
    })
    
    console.log('初始化个人中心页面，加载用户数据完成', {
      postsCount: userPosts.length,
      favoritesCount: userFavorites.length,
      followingCount: userFollowing.length
    })
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

  // 编辑昵称
  onEditProfile() {
    console.log('点击编辑昵称')
    
    wx.showModal({
      title: '编辑昵称',
      content: '',
      editable: true,
      placeholderText: '最多15个字符',
      confirmText: '保存',
      cancelText: '取消',
      confirmColor: '#D7423D',
      success: (res) => {
        if (res.confirm) {
          const newName = res.content.trim()
          if (newName) {
            // 检查昵称长度
            if (newName.length > 15) {
              wx.showToast({
                title: '昵称不能超过15个字符',
                icon: 'none'
              })
              return
            }
            
            // 更新页面数据
            this.setData({
              'userInfo.name': newName
            })
            
            // 更新全局数据
            const app = getApp<IAppOption>()
            app.globalData.userInfo.nickname = newName
            
            wx.showToast({
              title: '昵称已更新',
              icon: 'success',
              duration: 1500
            })
            
            console.log('昵称更新成功:', newName)
          } else {
            wx.showToast({
              title: '请输入有效昵称',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  // 编辑个性签名
  onEditSignature() {
    console.log('点击编辑个性签名')
    
    wx.showModal({
      title: '编辑个性签名',
      content: '',
      editable: true,
      placeholderText: '最多50个字符',
      confirmText: '保存',
      cancelText: '取消',
      confirmColor: '#D7423D',
      success: (res) => {
        if (res.confirm) {
          const newSignature = res.content.trim()
          if (newSignature) {
            // 检查个性签名长度
            if (newSignature.length > 50) {
              wx.showToast({
                title: '个性签名不能超过50个字符',
                icon: 'none'
              })
              return
            }
            
            // 更新页面数据
            this.setData({
              'userInfo.signature': newSignature
            })
            
            // 更新全局数据
            const app = getApp<IAppOption>()
            app.globalData.userInfo.signature = newSignature
            
            wx.showToast({
              title: '个性签名已更新',
              icon: 'success',
              duration: 1500
            })
            
            console.log('个性签名更新成功:', newSignature)
          } else {
            wx.showToast({
              title: '请输入有效签名',
              icon: 'none'
            })
          }
        }
      }
    })
  },

  // 点击发布内容
  onPostTap(e: any) {
    const post = e.currentTarget.dataset.post
    console.log('点击发布内容:', post)
    
    // 直接跳转到对应的话题详情页
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

  // 点击收藏内容
  onFavoriteTap(e: any) {
    const favorite = e.currentTarget.dataset.favorite
    console.log('点击收藏内容:', favorite)
    
    // 直接跳转到对应的话题详情页
    wx.navigateTo({
      url: `/pages/topic/topic?topicId=${favorite.id}&scrollToComments=false`,
      fail: (err) => {
        console.error('跳转失败:', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 点击关注用户
  onFollowingTap(e: any) {
    const user = e.currentTarget.dataset.user
    console.log('点击关注用户:', user)
    
    // 跳转到用户主页
    wx.navigateTo({
      url: `/pages/user/user?userId=${user.id}`,
      fail: (err) => {
        console.error('跳转到用户主页失败:', err)
        wx.showToast({
          title: '跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 点击已关注按钮
  onUnfollowTap(e: any) {
    const user = e.currentTarget.dataset.user
    const index = e.currentTarget.dataset.index
    console.log('点击取消关注:', user)
    
    wx.showModal({
      title: '确认取消关注',
      content: `确定要取消关注 ${user.nickname} 吗？`,
      confirmText: '取消关注',
      cancelText: '再想想',
      confirmColor: '#D7423D',
      success: (res) => {
        if (res.confirm) {
          // 从关注列表中移除
          const following = [...this.data.following]
          following.splice(index, 1)
          
          // 更新全局数据
          const app = getApp<IAppOption>()
          app.globalData.currentUserFollowing = following
          
          // 更新页面数据
          this.setData({
            following: following
          })
          
          wx.showToast({
            title: '已取消关注',
            icon: 'success',
            duration: 1500
          })
          
          console.log('取消关注成功，更新后的关注列表:', following)
        }
      }
    })
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('【个人中心】下拉刷新')
    
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