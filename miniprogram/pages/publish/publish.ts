// publish.ts
// 获取应用实例
const app = getApp()

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
    canPublish: true // 发布按钮常亮
  },

  methods: {
    // 标题输入处理
    onTitleInput(e: any) {
      const title = e.detail.value
      this.setData({
        title: title
      })
      // 实时验证已移除，发布时统一验证
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
        contentBlocks: [...(this.data as any).contentBlocks, newBlock]
      })
    },

    addImageBlock() {
      const newBlock = {
        type: 'image',
        content: '', // 图片URL
        id: Date.now()
      }
      this.setData({
        contentBlocks: [...(this.data as any).contentBlocks, newBlock]
      })
    },

    addVoteBlock() {
      const newBlock = {
        type: 'vote',
        title: '', // 辩论问题
        positive: { 
          text: '正方：支持观点',
          count: 0 
        }, // 正方票数
        negative: { 
          text: '反方：反对观点', 
          count: 0 
        }, // 反方票数
        totalVotes: 0, // 总票数
        userVoted: false, // 用户是否已投票
        userChoice: null, // 用户选择
        id: Date.now()
      }
      this.setData({
        contentBlocks: [...(this.data as any).contentBlocks, newBlock]
      })
    },

    // 文本内容输入处理
    onTextInput(e: any) {
      const index = e.currentTarget.dataset.index
      const content = e.detail.value
      const contentBlocks = (this.data as any).contentBlocks.map((block: any, i: number) => {
        if (i === index) {
          return { ...block, content: content }
        }
        return block
      })
      this.setData({ contentBlocks })
      // 实时验证已移除，发布时统一验证
    },

    // 选择图片
    chooseImage(e: any) {
      const index = e.currentTarget.dataset.index
      wx.chooseMedia({
        count: 1,
        mediaType: ['image'] as ('image' | 'video')[],
        sourceType: ['album', 'camera'] as ('album' | 'camera')[],
        success: (res) => {
          const tempFilePath = res.tempFiles[0].tempFilePath
          const contentBlocks = (this.data as any).contentBlocks.map((block: any, i: number) => {
            if (i === index) {
              return { ...block, content: tempFilePath }
            }
            return block
          })
          this.setData({ contentBlocks })
          // 实时验证已移除，发布时统一验证
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
      const contentBlocks = (this.data as any).contentBlocks.map((block: any, i: number) => {
        if (i === index) {
          return { ...block, content: '' }
        }
        return block
      })
      this.setData({ contentBlocks })
      // 实时验证已移除，发布时统一验证
    },

    // 投票标题输入处理
    onVoteTitleInput(e: any) {
      const index = e.currentTarget.dataset.index
      const title = e.detail.value
      
      const contentBlocks = (this.data as any).contentBlocks.map((block: any, i: number) => {
        if (i === index && block.type === 'vote') {
          return { ...block, title: title }
        }
        return block
      })
      
      this.setData({ contentBlocks })
      // 实时验证已移除，发布时统一验证
    },

    // 添加投票选项
    addOption(e: any) {
      const index = e.currentTarget.dataset.index
      const contentBlocks = (this.data as any).contentBlocks.map((block: any, i: number) => {
        if (i === index && block.type === 'vote') {
          const newOption = {
            text: '',
            id: Date.now() + i
          }
          return { ...block, options: [...(block.options || []), newOption] }
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
      // 实时验证已移除，发布时统一验证
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
            // 实时验证已移除，发布时统一验证
          }
        }
      })
    },

    // 验证发布内容是否完整
    validatePublishContent() {
      const { title, contentBlocks } = (this.data as any)
      
      // 标题不能为空
      if (!title.trim()) {
        wx.showToast({
          title: '请输入话题标题',
          icon: 'none'
        })
        return false
      }
      
      // 所有内容模块都不能为空
      const allBlocksValid = (contentBlocks as any[]).every((block: any) => {
        if (block.type === 'text') {
          return block.content.trim() !== ''
        } else if (block.type === 'image') {
          return block.content !== ''
        } else if (block.type === 'vote') {
          // 辩论投票块只需要标题不为空即可
          return block.title.trim() !== ''
        }
        return false
      })
      
      if (!allBlocksValid) {
        wx.showToast({
          title: '请填写完整所有内容模块',
          icon: 'none'
        })
        return false
      }
      
      return true
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
      // 点击时验证内容是否完整
      if (!this.validatePublishContent()) return
      
      const { title, contentBlocks } = (this.data as any)
      
      // 构建话题数据
      const topicData = {
        id: Date.now().toString(),
        title: title.trim(),
        content: (contentBlocks as any[]).map((block: any) => {
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
              content: {
                title: block.title.trim(),
                positive: {
                  text: block.positive.text || '正方：支持观点',
                  count: block.positive.count || 0
                },
                negative: {
                  text: block.negative.text || '反方：反对观点',
                  count: block.negative.count || 0
                },
                totalVotes: block.totalVotes || 0,
                userVoted: false,
                userChoice: null
              }
            }
          }
          return null
        }).filter(Boolean),
        author: {
          nickname: app.globalData.userInfo?.nickname || '匿名用户',
          avatar: app.globalData.userInfo?.avatar || 'https://mmbiz.qpic.cn/mmbiz/icTdbqWNOwNRna42FI242Lcia07jQodd2FJGIYQfG0LAJGFxM4FbnQP6yfMxBgJ0F3YRqJCJ1aPAK2dQagdusBZg/0'
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
      (app.globalData.topics as any[]).unshift(topicData)
        
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