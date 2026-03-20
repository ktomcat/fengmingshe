// search.ts

import { recordOperation, OperationType } from '../../utils/testDataStorage'

Page({
  // 分享到微信好友
  onShareAppMessage() {
    return {
      title: '蜂鸣 - 搜索发现精彩内容',
      path: '/pages/search/search',
      imageUrl: '/static/share-logo.png'
    }
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    return {
      title: '蜂鸣 - 搜索发现精彩内容',
      imageUrl: '/static/share-logo.png'
    }
  },
  
  data: {
    userInfo: {
      avatarUrl: '',
      nickName: ''
    },
    searchText: '', // 搜索关键词
    initialKeyword: '', // 初始搜索关键词（从首页传递）
    activeTab: 'topics', // 当前激活的tab：topics | users
    searchResults: {
      topics: [], // 话题搜索结果
      users: []   // 用户搜索结果
    }
  },

  onLoad(options: any) {
    // 页面加载时初始化数据
    const app = getApp()
    const db = app.globalData
    
    // 获取当前用户
    const currentUser = db.getCurrentUser()
    
    console.log('【搜索页】页面参数:', options)
    
    this.setData({
      currentUser: currentUser,
      userInfo: {
        avatarUrl: currentUser.avatar,
        nickName: currentUser.nickname
      },
      initialKeyword: options.keyword || ''
    })
    
    // 如果有初始关键词，自动执行搜索
    if (options.keyword) {
      const keyword = decodeURIComponent(options.keyword)
      console.log('【搜索页】接收到搜索关键词:', keyword)
      
      this.setData({
        searchText: keyword
      })
      
      // 使用 setTimeout 确保数据绑定完成后再执行搜索
      setTimeout(() => {
        this.performAutoSearch(keyword)
      }, 0)
    } else {
      console.log('【搜索页】未接收到搜索关键词')
    }
  },

  // 搜索输入框内容变化
  onSearchInput(e: any) {
    const searchText = e.detail.value
    this.setData({
      searchText: searchText
    })
  },

  // 执行搜索
  onSearch() {
    const { searchText } = this.data
    
    if (!searchText.trim()) {
      wx.showToast({
        title: '请输入搜索关键词',
        icon: 'none'
      })
      return
    }

    console.log('【搜索页】执行搜索，关键词:', searchText)
    
    // 显示加载中
    wx.showLoading({
      title: '搜索中...'
    })

    // 模拟搜索延迟
    setTimeout(() => {
      const results = this.performSearch(searchText)
      
      this.setData({
        searchResults: results
      })
      
      wx.hideLoading()
      
      console.log('【搜索页】搜索完成，结果:', {
        topics: results.topics.length,
        users: results.users.length
      })
      
      // 记录搜索操作到测试数据存储
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      recordOperation(
        OperationType.SEARCH,
        currentUser.id,
        'search',
        searchText,
        {
          keyword: searchText,
          topicCount: results.topics.length,
          userCount: results.users.length
        }
      )
    }, 500)
  },

  // 执行搜索逻辑
  performSearch(keyword: string) {
    const app = getApp()
    const db = app.globalData
    
    // 搜索话题（只匹配标题）
    const topicResults = db.getAllTopics()
      .filter(topic => 
        topic.title.toLowerCase().includes(keyword.toLowerCase())
      )
      .map(topic => {
        const author = db.users.find(user => user.id === topic.authorId)
        const firstTextContent = this.getFirstTextContent(topic.content)
        
        return {
          ...topic,
          author: author || {
            nickname: '未知用户',
            avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Unknown&size=100'
          },
          displayContent: firstTextContent
        }
      })

    // 搜索用户
    const userResults = db.users
      .filter(user => 
        user.nickname.toLowerCase().includes(keyword.toLowerCase()) ||
        (user.signature && user.signature.toLowerCase().includes(keyword.toLowerCase()))
      )
      .map(user => {
        const userTopics = db.getUserTopics(user.id)
        return {
          ...user,
          postsCount: userTopics.length
        }
      })

    return {
      topics: topicResults,
      users: userResults
    }
  },

  // 搜索内容中的文本
  searchContent(contentArray: any[], keyword: string): boolean {
    if (!contentArray || !Array.isArray(contentArray)) {
      return false
    }
    
    return contentArray.some(item => 
      item.type === 'text' && 
      item.content && 
      item.content.toLowerCase().includes(keyword.toLowerCase())
    )
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

  // 自动搜索（从首页跳转过来时执行）
  performAutoSearch(keyword: string) {
    console.log('【搜索页】自动执行搜索，关键词:', keyword)
    
    // 显示加载中
    wx.showLoading({
      title: '搜索中...'
    })

    // 模拟搜索延迟
    setTimeout(() => {
      const results = this.performSearch(keyword)
      
      this.setData({
        searchResults: results
      })
      
      wx.hideLoading()
      
      console.log('【搜索页】自动搜索完成，结果:', {
        topics: results.topics.length,
        users: results.users.length
      })
      
      // 记录自动搜索操作到测试数据存储
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      recordOperation(
        OperationType.SEARCH,
        currentUser.id,
        'search',
        keyword,
        {
          keyword: keyword,
          topicCount: results.topics.length,
          userCount: results.users.length,
          isAutoSearch: true
        }
      )
    }, 500)
  },

  // 点击话题
  onTopicTap(e: any) {
    const topic = e.currentTarget.dataset.topic
    console.log('【搜索页】点击话题:', topic)
    
    // 跳转到话题详情页
    wx.navigateTo({
      url: `/pages/topic/topic?topicId=${topic.id}`,
      fail: (err) => {
        console.error('跳转失败:', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // 点击用户
  onUserTap(e: any) {
    const user = e.currentTarget.dataset.user
    console.log('【搜索页】点击用户:', user)
    
    // 跳转到用户主页
    wx.navigateTo({
      url: `/pages/user/user?userId=${user.id}`,
      fail: (err) => {
        console.error('跳转失败:', err)
        wx.showToast({
          title: '页面跳转失败',
          icon: 'none'
        })
      }
    })
  },

  // Tab切换
  switchTab(e: any) {
    const tab = e.currentTarget.dataset.tab
    console.log('【搜索页】切换Tab:', tab)
    
    if (this.data.activeTab !== tab) {
      this.setData({
        activeTab: tab
      })
    }
  },

  // 底部导航栏切换
  onTabChange(e: any) {
    const index = e.detail.index
    console.log('【搜索页】底部导航栏切换，选中索引:', index)
    
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
})