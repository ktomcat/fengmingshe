// publish.ts
// 获取应用实例
const app = getApp<IAppOption>()

Component({
  data: {
    title: '', // 话题标题
    activeTool: 'text', // 当前激活的工具类型
    contentBlocks: [ // 内容块数组
      {
        type: 'text',
        content: '',
        id: Date.now()
      }
    ] as any[],
    canPublish: false // 是否可以发布
  },

  methods: {
    // 标题输入处理
    onTitleInput(e: any) {
      const title = e.detail.value
      this.setData({
        title: title
      })
      this.checkPublishStatus()
    },

    // 切换工具类型
    switchToText() {
      this.setData({
        activeTool: 'text'
      })
    },

    switchToImage() {
      this.setData({
        activeTool: 'image'
      })
    },

    switchToVote() {
      this.setData({
        activeTool: 'vote'
      })
    },

    // 添加内容块
    addTextBlock() {
      const newBlock = {
        type: 'text',
        content: '',
        id: Date.now()
      }
      this.setData({
        contentBlocks: [...this.data.contentBlocks, newBlock]
      })
    },

    addImageBlock() {
      const newBlock = {
        type: 'image',
        content: '', // 图片URL
        id: Date.now()
      }
      this.setData({
        contentBlocks: [...this.data.contentBlocks, newBlock]
      })
    },

    addVoteBlock() {
      const newBlock = {
        type: 'vote',
        options: [
          { text: '', id: Date.now() + 1 },
          { text: '', id: Date.now() + 2 }
        ],
        isSingleChoice: true, // 默认单选
        id: Date.now()
      }
      this.setData({
        contentBlocks: [...this.data.contentBlocks, newBlock]
      })
    },

    // 文本内容输入处理
    onTextInput(e: any) {
      const index = e.currentTarget.dataset.index
      const content = e.detail.value
      const contentBlocks = this.data.contentBlocks.map((block, i) => {
        if (i === index) {
          return { ...block, content: content }
        }
        return block
      })
      this.setData({ contentBlocks })
      this.checkPublishStatus()
    },

    // 选择图片
    chooseImage(e: any) {
      const index = e.currentTarget.dataset.index
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'],
        sourceType: ['album', 'camera'],
        success: (res) => {
          const tempFilePath = res.tempFiles[0].tempFilePath
          const contentBlocks = this.data.contentBlocks.map((block, i) => {
            if (i === index) {
              return { ...block, content: tempFilePath }
            }
            return block
          })
          this.setData({ contentBlocks })
          this.checkPublishStatus()
        },
        fail: (err) => {
          console.error('选择图片失败:', err)
          wx.showToast({
            title: '选择图片失败',
            icon: 'none'
          })
        }
      })
    },

    // 移除图片
    removeImage(e: any) {
      const index = e.currentTarget.dataset.index
      const contentBlocks = this.data.contentBlocks.map((block, i) => {
        if (i === index) {
          return { ...block, content: '' }
        }
        return block
      })
      this.setData({ contentBlocks })
      this.checkPublishStatus()
    },

    // 投票选项输入处理
    onOptionInput(e: any) {
      const blockIndex = e.currentTarget.dataset.blockIndex
      const optionIndex = e.currentTarget.dataset.optionIndex
      const text = e.detail.value
      
      const contentBlocks = this.data.contentBlocks.map((block, i) => {
        if (i === blockIndex && block.type === 'vote') {
          const options = block.options.map((option: any, j: number) => {
            if (j === optionIndex) {
              return { ...option, text: text }
            }
            return option
          })
          return { ...block, options }
        }
        return block
      })
      
      this.setData({ contentBlocks })
      this.checkPublishStatus()
    },

    // 添加投票选项
    addOption(e: any) {
      const index = e.currentTarget.dataset.index
      const contentBlocks = this.data.contentBlocks.map((block, i) => {
        if (i === index && block.type === 'vote') {
          const newOption = {
            text: '',
            id: Date.now() + i
          }
          return { ...block, options: [...block.options, newOption] }
        }
        return block
      })
      this.setData({ contentBlocks })
    },

    // 移除投票选项
    removeOption(e: any) {
      const blockIndex = e.currentTarget.dataset.blockIndex
      const optionIndex = e.currentTarget.dataset.optionIndex
      
      const contentBlocks = this.data.contentBlocks.map((block, i) => {
        if (i === blockIndex && block.type === 'vote') {
          const options = block.options.filter((_: any, j: number) => j !== optionIndex)
          // 至少保留两个选项
          if (options.length < 2) {
            wx.showToast({
              title: '至少需要两个选项',
              icon: 'none'
            })
            return block
          }
          return { ...block, options }
        }
        return block
      })
      
      this.setData({ contentBlocks })
      this.checkPublishStatus()
    },

    // 切换投票类型
    toggleVoteType(e: any) {
      const index = e.currentTarget.dataset.index
      const isSingleChoice = e.detail.value
      
      const contentBlocks = this.data.contentBlocks.map((block, i) => {
        if (i === index && block.type === 'vote') {
          return { ...block, isSingleChoice: !isSingleChoice }
        }
        return block
      })
      
      this.setData({ contentBlocks })
    },

    // 移动内容块
    moveBlockUp(e: any) {
      const index = e.currentTarget.dataset.index
      if (index <= 0) return
      
      const contentBlocks = [...this.data.contentBlocks]
      const temp = contentBlocks[index]
      contentBlocks[index] = contentBlocks[index - 1]
      contentBlocks[index - 1] = temp
      
      this.setData({ contentBlocks })
    },

    moveBlockDown(e: any) {
      const index = e.currentTarget.dataset.index
      if (index >= this.data.contentBlocks.length - 1) return
      
      const contentBlocks = [...this.data.contentBlocks]
      const temp = contentBlocks[index]
      contentBlocks[index] = contentBlocks[index + 1]
      contentBlocks[index + 1] = temp
      
      this.setData({ contentBlocks })
    },

    // 删除内容块
    deleteBlock(e: any) {
      const index = e.currentTarget.dataset.index
      wx.showModal({
        title: '确认删除',
        content: '确定要删除这个内容块吗？',
        success: (res) => {
          if (res.confirm) {
            const contentBlocks = this.data.contentBlocks.filter((_, i) => i !== index)
            // 如果删除了所有内容块，添加一个默认的文本块
            if (contentBlocks.length === 0) {
              contentBlocks.push({
                type: 'text',
                content: '',
                id: Date.now()
              })
            }
            this.setData({ contentBlocks })
            this.checkPublishStatus()
          }
        }
      })
    },

    // 检查是否可以发布
    checkPublishStatus() {
      const { title, contentBlocks } = this.data
      
      // 标题不能为空
      if (!title.trim()) {
        this.setData({ canPublish: false })
        return
      }
      
      // 至少有一个有效的内容块
      const hasValidContent = contentBlocks.some(block => {
        if (block.type === 'text') {
          return block.content.trim() !== ''
        } else if (block.type === 'image') {
          return block.content !== ''
        } else if (block.type === 'vote') {
          // 投票块至少有两个有效选项
          const validOptions = block.options.filter((option: any) => option.text.trim() !== '')
          return validOptions.length >= 2
        }
        return false
      })
      
      this.setData({ canPublish: hasValidContent })
    },

    // 取消发布
    onCancel() {
      wx.showModal({
        title: '确认取消',
        content: '确定要取消发布吗？所有编辑内容将会丢失。',
        success: (res) => {
          if (res.confirm) {
            wx.navigateBack()
          }
        }
      })
    },

    // 发布话题
    onPublish() {
      if (!this.data.canPublish) return
      
      const { title, contentBlocks } = this.data
      
      // 构建话题数据
      const topicData = {
        id: Date.now().toString(),
        title: title.trim(),
        content: contentBlocks.map(block => {
          if (block.type === 'text') {
            return {
              type: 'text',
              content: block.content.trim()
            }
          } else if (block.type === 'image') {
            return {
              type: 'image',
              content: block.content
            }
          } else if (block.type === 'vote') {
            return {
              type: 'vote',
              options: block.options.filter((option: any) => option.text.trim() !== ''),
              isSingleChoice: block.isSingleChoice,
              totalVotes: 0
            }
          }
          return null
        }).filter(Boolean),
        author: {
          nickname: app.globalData.userInfo?.nickName || '匿名用户',
          avatar: app.globalData.userInfo?.avatarUrl || 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
        },
        createTime: new Date().toLocaleString('zh-CN'),
        likeCount: 0,
        commentCount: 0,
        share: 0
      }
      
      console.log('【发布页面】发布话题数据:', topicData)
      
      // 模拟发布成功
      wx.showLoading({
        title: '发布中...'
      })
      
      setTimeout(() => {
        wx.hideLoading()
        
        // 将新话题添加到全局数据
        if (!app.globalData.topics) {
          app.globalData.topics = []
        }
        app.globalData.topics.unshift(topicData)
        
        wx.showToast({
          title: '发布成功',
          icon: 'success',
          duration: 2000
        })
        
        // 返回首页
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index'
          })
        }, 2000)
        
      }, 1500)
    }
  }
})