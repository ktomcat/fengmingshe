Component({
  lifetimes: {
    attached() {
      // 组件挂载时自动识别当前页面并设置选中状态
      // this.setCurrentTabByRoute()
    }
  },

  properties: {
    // 当前选中的索引
    current: {
      type: Number,
      value: 0
    },
    // 是否固定在底部
    fixed: {
      type: Boolean,
      value: true
    },
    // 自定义颜色
    color: {
      type: String,
      value: '#D7423D'
    }
  },

  data: {
    // 导航项配置
    navItems: [
      { icon: '🏠', text: '首页', page: 'index' },
      { icon: '🔍', text: '精选', page: 'featured' },
      { icon: '🔈', text: '发布', page: 'publish' },
      { icon: '💬', text: '消息', page: 'chat' },
      { icon: '👤', text: '我的', page: 'profile' }
    ]
  },

  methods: {
    // 根据当前路由自动设置选中状态
    // setCurrentTabByRoute() {
    //   const pages = getCurrentPages()
    //   if (pages.length === 0) return
      
    //   const currentPage = pages[pages.length - 1]
    //   const currentRoute = currentPage.route
      
    //   // 查找对应的导航项索引
    //   const navIndex = this.data.navItems.findIndex(item => {
    //     return currentRoute.includes(item.page)
    //   })
      
    //   if (navIndex !== -1) {
    //     console.log('【底部导航】自动识别当前页面:', currentRoute, '选中索引:', navIndex)
    //     this.setData({
    //       current: navIndex
    //     })
    //   }
    // },

    // 切换标签页 - 统一处理页面跳转逻辑
    onTabChange(e: any) {
      const index = e.currentTarget.dataset.index
      const navItem = this.data.navItems[index]
      
      console.log('【底部导航】切换标签页，索引:', index, '目标页面:', navItem.page)
      
      // 检查是否已经是当前页面
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const currentRoute = currentPage.route
      
      // 如果是当前页面，不做任何操作
      if (currentRoute.includes(navItem.page)) {
        console.log('【底部导航】已经是当前页面，不进行跳转')
        return
      }
      
      // 立即更新当前选中状态
      // this.setData({
      //   current: index
      // })
      
      // 使用switchTab方式切换，避免页面重新加载
      const url = `/pages/${navItem.page}/${navItem.page}`
      
      // 特殊处理发布页面，使用navigateTo
      if (navItem.page === 'publish') {
        // 发布页面不更新底部导航选中状态，保持当前状态
        this.setData({
          current: this.data.current
        })
        
        wx.navigateTo({
          url: url
        })
      } else {
        // 其他页面使用switchTab，但需要确保页面栈中只有一个页面
        const pageStackLength = getCurrentPages().length
        
        if (pageStackLength > 1) {
          // 如果页面栈中有多个页面，先返回首页
          wx.reLaunch({
            url: '/pages/index/index'
          })
          
          // 延迟切换到目标页面
          setTimeout(() => {
            wx.reLaunch({
              url: url
            })
          }, 100)
        } else {
          // 页面栈中只有一个页面，直接切换
          wx.reLaunch({
            url: url
          })
        }
      }
      
      // 仍然触发切换事件，保持向后兼容
      this.triggerEvent('change', { index })
    },

    // 外部调用方法：设置当前选中项
    setCurrent(index: number) {
      this.setData({
        current: index
      })
    }
  }
})