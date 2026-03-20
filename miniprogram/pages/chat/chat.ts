// chat.ts
Page({
  // 分享到微信好友
  onShareAppMessage() {
    return {
      title: '蜂鸣 - 消息中心',
      path: '/pages/chat/chat',
      imageUrl: '/static/share-logo.png'
    }
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '蜂鸣 - 消息中心',
      imageUrl: '/static/share-logo.png'
    }
  },
  
  data: {
    currentTab: 3, // 当前底部导航索引（消息页面为3）
    
    // 当前激活的消息分类
    activeCategory: 'all',
    
    // 全部消息数据
    messages: [],
    
    // 互动消息数据
    interactionMessages: [],
    
    // 系统消息数据
    systemMessages: []
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
    
    const app = getApp<IAppOption>()
    const db = app.globalData
    const currentUser = db.getCurrentUser()
    
    // 获取用户的所有消息通知
    const userNotifications = db.getUserNotifications(currentUser.id)
    
    // 处理消息数据
    const messages = userNotifications.map(notify => {
      // 获取发送者信息
      const fromUser = notify.fromUserId ? db.users.find(u => u.id === notify.fromUserId) : null
      
      // 格式化时间
      const time = this.formatTime(notify.time)
      
      // 处理发送者名称 - 系统消息使用系统名称，其他消息使用用户名称
      let senderName = ''
      if (notify.type === 'system' || notify.type === 'vote') {
        senderName = '系统通知'
      } else if (fromUser) {
        senderName = fromUser.nickname
      } else {
        senderName = '蜂鸣社'
      }
      
      return {
        id: notify.id,
        type: notify.type,
        sender: senderName,
        avatar: fromUser ? fromUser.avatar : 'https://api.dicebear.com/7.x/bottts/png?seed=Robot1&size=100',
        preview: notify.content,
        time: time,
        read: notify.read,
        sourceId: notify.sourceId,
        sourceType: notify.sourceType,
        fromUserId: notify.fromUserId
      }
    })
    
    // 分类消息
    const interactionMessages = messages.filter(msg => 
      msg.type === 'like' || msg.type === 'comment' || msg.type === 'follow' || msg.type === 'reply'
    )
    
    const systemMessages = messages.filter(msg => 
      msg.type === 'system' || msg.type === 'vote'
    )
    
    this.setData({
      messages: messages,
      interactionMessages: interactionMessages,
      systemMessages: systemMessages
    })
    
    console.log('消息页面初始化完成', {
      totalMessages: messages.length,
      interactionMessages: interactionMessages.length,
      systemMessages: systemMessages.length
    })
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
      case 'reply':
        // 跳转到对应话题详情页
        if (message.sourceId) {
          wx.navigateTo({
            url: `/pages/topic/topic?topicId=${message.sourceId}`,
            fail: (err) => {
              console.error('跳转失败:', err)
              wx.showToast({
                title: '页面跳转失败',
                icon: 'none'
              })
            }
          })
        }
        break
      case 'follow':
        // 跳转到用户主页
        if (message.fromUserId) {
          wx.navigateTo({
            url: `/pages/user/user?userId=${message.fromUserId}`,
            fail: (err) => {
              console.error('跳转失败:', err)
              wx.showToast({
                title: '页面跳转失败',
                icon: 'none'
              })
            }
          })
        }
        break
      case 'system':
      case 'vote':
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
      systemMessages: updateMessageStatus(this.data.systemMessages, messageId)
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

  // 时间格式化函数
  formatTime(timeStr: string): string {
    const now = new Date()
    const time = new Date(timeStr)
    const diff = now.getTime() - time.getTime()
    
    // 计算时间差
    const minutes = Math.floor(diff / (1000 * 60))
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    
    if (minutes < 60) {
      return minutes <= 0 ? '刚刚' : `${minutes}分钟前`
    } else if (hours < 24) {
      return `${hours}小时前`
    } else if (days < 7) {
      return `${days}天前`
    } else {
      // 显示具体日期
      return time.getMonth() + 1 + '月' + time.getDate() + '日'
    }
  },

})