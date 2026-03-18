// chat.ts
Page({
  data: {
    currentTab: 2, // 当前底部导航索引（消息页面为2）
    
    // 当前激活的消息分类
    activeCategory: 'all',
    
    // 全部消息数据
    messages: [
      {
        id: 'msg_001',
        type: 'like',
        sender: '小红',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Alex&size=100',
        preview: '点赞了你的话题"如何利用现代UI设计提升用户留存率？"',
        time: '10:15',
        read: false
      },
      {
        id: 'msg_002',
        type: 'comment',
        sender: '小李',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Jordan&size=100',
        preview: '评论了你的话题：我觉得大学教育还是很重要的，不仅是学知识...',
        time: '09:45',
        read: false
      },
      {
        id: 'msg_003',
        type: 'follow',
        sender: '小张',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Taylor&size=100',
        preview: '关注了你',
        time: '昨天 11:20',
        read: true
      },
      {
        id: 'msg_004',
        type: 'system',
        sender: '系统通知',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Robot1&size=100',
        preview: '你的话题"你支持还是反对躺平的生活态度？"投票人数已突破800人',
        time: '昨天 16:30',
        read: true
      },
      {
        id: 'msg_005',
        type: 'comment',
        sender: '王老师',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Casey&size=100',
        preview: '评论了你的话题：关于ChatGPT的使用问题，我觉得可以辩证看待',
        time: '3月7日',
        read: true
      }
    ],
    
    // 互动消息数据
    interactionMessages: [
      {
        id: 'interact_001',
        type: 'like',
        sender: '小红',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Alex&size=100',
        preview: '点赞了你的话题"如何利用现代UI设计提升用户留存率？"',
        time: '10:15',
        read: false
      },
      {
        id: 'interact_002',
        type: 'comment',
        sender: '小李',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Jordan&size=100',
        preview: '评论了你的话题：我觉得大学教育还是很重要的，不仅是学知识...',
        time: '09:45',
        read: false
      },
      {
        id: 'interact_003',
        type: 'follow',
        sender: '小张',
        avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Taylor&size=100',
        preview: '关注了你',
        time: '昨天 11:20',
        read: true
      }
    ],
    
    // 系统消息数据
    systemMessages: [
      {
        id: 'system_001',
        type: 'system',
        sender: '系统通知',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Robot1&size=100',
        preview: '你的话题"你支持还是反对躺平的生活态度？"投票人数已突破800人',
        time: '昨天 16:30',
        read: true
      },
      {
        id: 'system_002',
        type: 'system',
        sender: '系统通知',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Robot1&size=100',
        preview: '系统维护通知：本周六凌晨2:00-4:00进行系统维护',
        time: '3月5日',
        read: true
      },
      {
        id: 'system_003',
        type: 'system',
        sender: '系统通知',
        avatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Robot1&size=100',
        preview: '版本更新：v1.2.0版本已发布，新增多项功能',
        time: '3月1日',
        read: true
      }
    ]
  },

  onLoad() {
    console.log('【消息】页面加载')
    this.initPage()
  },

  onShow() {
    console.log('【消息】页面显示')
  },

  // 初始化页面
  initPage() {
    console.log('初始化消息页面')
  },

  // 底部导航栏切换 - 与profile页面完全一致
  onTabChange(e: any) {
    const index = e.detail.index
    console.log('【消息】底部导航栏切换，选中索引:', index)
    
    this.setData({
      currentTab: index
    })
    
    // 根据索引跳转到对应页面
    const pages = [
      '/pages/index/index',
      '/pages/featured/featured',
      '/pages/chat/chat',
      '/pages/profile/profile'
    ]
    
    if (index >= 0 && index < pages.length) {
      const url = pages[index]
      
      // 如果不是当前页面，进行跳转
      if (index !== 2) { // 2是"消息"页面
        wx.switchTab({
          url: url,
          fail: (err) => {
            console.error('切换tab失败:', err)
            wx.navigateTo({
              url: url
            })
          }
        })
      }
    }
  },

  // 切换消息分类
  switchCategory(e: any) {
    const category = e.currentTarget.dataset.category
    console.log('切换消息分类:', category)
    
    this.setData({
      activeCategory: category
    })
  },

  // 点击消息
  onMessageTap(e: any) {
    const message = e.currentTarget.dataset.message
    console.log('点击消息:', message)
    
    // 标记为已读
    this.markAsRead(message.id)
    
    // 根据消息类型处理跳转
    switch (message.type) {
      case 'like':
      case 'comment':
        // 跳转到对应话题详情页
        wx.navigateTo({
          url: '/pages/topic/topic?topicId=user_post_001',
          fail: (err) => {
            console.error('跳转失败:', err)
            wx.showToast({
              title: '页面跳转失败',
              icon: 'none'
            })
          }
        })
        break
      case 'follow':
        // 跳转到用户主页
        wx.navigateTo({
          url: '/pages/user/user?userId=user_002',
          fail: (err) => {
            console.error('跳转失败:', err)
            wx.showToast({
              title: '页面跳转失败',
              icon: 'none'
            })
          }
        })
        break
      case 'system':
        // 系统消息，显示详情弹窗
        wx.showModal({
          title: message.sender,
          content: message.preview,
          showCancel: false,
          confirmText: '知道了',
          confirmColor: '#D7423D'
        })
        break
      default:
        wx.showToast({
          title: '消息类型暂不支持',
          icon: 'none'
        })
    }
  },

  // 标记消息为已读
  markAsRead(messageId: string) {
    // 更新消息状态
    const updateMessageStatus = (messages: any[], id: string) => {
      return messages.map(msg => 
        msg.id === id ? { ...msg, read: true } : msg
      )
    }
    
    this.setData({
      messages: updateMessageStatus(this.data.messages, messageId),
      interactionMessages: updateMessageStatus(this.data.interactionMessages, messageId),
      systemMessages: updateMessageStatus(this.data.systemessages, messageId)
    })
    
    console.log('消息标记为已读:', messageId)
  },

  // 下拉刷新
  onPullDownRefresh() {
    console.log('【消息】下拉刷新')
    
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
      title: '蜂鸣社 - 消息中心',
      path: '/pages/chat/chat'
    }
  }
})