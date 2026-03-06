Component({
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
      value: '#f44343'
    }
  },

  data: {
    // 导航项配置
    navItems: [
      { icon: '🏠', text: '首页' },
      { icon: '🔍', text: '圈子' },
      { icon: '💬', text: '消息' },
      { icon: '👤', text: '我的' }
    ]
  },

  methods: {
    // 切换标签页
    onTabChange(e: any) {
      const index = e.currentTarget.dataset.index
      this.setData({
        current: index
      })
      
      // 触发切换事件
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