// topic.ts
// 获取应用实例

Component({
  lifetimes: {
    attached() {
      // 组件挂载时先加载默认数据，ready中会根据参数更新
      const app = getApp<IAppOption>()
      const globalData = app.globalData
      let targetTopic = globalData.featuredTopic || globalData.topics?.[0] || null
      
      // 计算投票百分比
      if (targetTopic && targetTopic.content) {
        targetTopic = this.calculateVotePercentages(targetTopic)
      }
      
      this.setData({
        topic: targetTopic,
        comments: this.sortComments(this.getCommentsForTopic(targetTopic))
      })
    },
    
    ready() {
      // 在ready生命周期中获取页面参数
      const pages = getCurrentPages()
      const currentPage = pages[pages.length - 1]
      const options = currentPage.options || {}
      
      console.log('【话题页】页面参数options:', options)
      
      const topicId = options.topicId
      const focusInput = options.focusInput === 'true'
      const scrollToComments = options.scrollToComments === 'true'
      
      console.log('【话题页】解析后的参数:', { topicId, focusInput, scrollToComments })
      
    // 根据topicId加载对应的话题数据
    const app = getApp<IAppOption>()
    const globalData = app.globalData
    let targetTopic = null
    
    if (topicId) {
      // 根据topicId查找对应的话题，优先查找featuredTopic，然后是topics
      targetTopic = globalData.featuredTopic?.id === topicId ? globalData.featuredTopic : 
                   globalData.topics?.find(topic => topic.id === topicId) || 
                   globalData.topics?.[0]
    } else {
      // 如果没有topicId参数，优先使用featuredTopic，然后使用第一个话题
      targetTopic = globalData.featuredTopic || globalData.topics?.[0] || null
    }
    
    // 计算投票百分比
    if (targetTopic && targetTopic.content) {
      targetTopic = this.calculateVotePercentages(targetTopic)
    }
    
    // 更新数据
    this.setData({
      topic: targetTopic,
      comments: this.sortComments(this.getCommentsForTopic(targetTopic)),
      shouldFocusInput: focusInput,
      scrollToComments: scrollToComments
    })
      
      console.log('【话题页】页面ready，检查是否需要滚动到评论列表:', this.data.scrollToComments)
      
      // 如果需要滚动到评论列表，延迟执行滚动操作
      if (scrollToComments) {
        setTimeout(() => {
          console.log('【话题页】开始执行滚动到评论列表')
          this.scrollToCommentsList()
        }, 400)
      }
      
      // 如果需要聚焦输入框，延迟执行聚焦操作
      if (focusInput) {
        setTimeout(() => {
          this.focusCommentInput()
        }, 500)
      }
    }
  },
  data: {
    currentTab: 0, // 当前选中的导航项索引
    showBottomSheet: false, // 控制底部菜单栏显示
    activeNav: 'featured', // 当前激活的评论导航：'featured' | 'all'
    sortType: 'time', // 排序类型：'time' | 'hot'
    shouldFocusInput: false, // 是否应该聚焦输入框
    scrollToComments: false, // 是否需要滚动到评论列表
    topic: null as any, // 话题数据
    comments: [] as any[], // 评论列表
  },
  methods: {
    // 底部导航栏切换 - 现在由组件统一处理
    onTabChange(e: any) {
      // 保留事件监听，但页面跳转逻辑已移至组件内部
      const index = e.detail.index
      console.log('【话题页】底部导航栏切换，选中索引:', index)
      this.setData({
        currentTab: index
      })
    },

    // 底部菜单栏相关方法
    showBottomSheet() {
      console.log('【话题页】显示底部菜单栏')
      this.setData({
        showBottomSheet: true
      })
    },

    closeBottomSheet() {
      console.log('【话题页】关闭底部菜单栏')
      this.setData({
        showBottomSheet: false
      })
    },

    onReportContent() {
      console.log('【话题页】点击举报内容按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '举报成功',
        icon: 'success'
      })
    },

    onBlockUser() {
      console.log('【话题页】点击拉黑用户按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '已拉黑用户',
        icon: 'success'
      })
    },

    onSharePost() {
      console.log('【话题页】点击分享帖子按钮')
      this.closeBottomSheet()
      wx.showToast({
        title: '分享成功',
        icon: 'success'
      })
    },

    onCopyLink() {
      console.log('【话题页】点击复制链接按钮')
      this.closeBottomSheet()
      wx.setClipboardData({
        data: 'https://fengming.example.com/topic/123',
        success: () => {
          console.log('【话题页】复制链接成功')
          wx.showToast({
            title: '链接已复制',
            icon: 'success'
          })
        },
        fail: (err) => {
          console.error('【话题页】复制链接失败:', err)
        }
      })
    },

    // 话题内容操作相关方法
    onLikeTopic() {
      console.log('【话题页】点击点赞话题按钮')
      const { topic } = this.data
      if (!topic) return
      
      // 更新点赞状态
      const updatedTopic = { ...topic }
      updatedTopic.likeCount = updatedTopic.likeCount + 1
      
      this.setData({
        topic: updatedTopic
      })
      
      wx.showToast({
        title: '点赞成功',
        icon: 'success'
      })
    },


    onShareTopic() {
      console.log('【话题页】点击分享话题按钮')
      wx.showToast({
        title: '分享成功',
        icon: 'success'
      })
    },

    // 投票相关方法
    onVotePositive(e: any) {
      console.log('【话题页】点击正方投票按钮', e)
      const contentIndex = e.currentTarget.dataset.contentIndex
      this.handleVote('positive', contentIndex)
    },

    onVoteNegative(e: any) {
      console.log('【话题页】点击反方投票按钮', e)
      const contentIndex = e.currentTarget.dataset.contentIndex
      this.handleVote('negative', contentIndex)
    },

    handleVote(choice: 'positive' | 'negative', contentIndex: number) {
      const { topic } = this.data
      if (!topic || !topic.content || !topic.content[contentIndex]) {
        return
      }

      const contentItem = topic.content[contentIndex]
      if (contentItem.type !== 'vote' || contentItem.content.userVoted) {
        return
      }

      // 更新投票数据
      const updatedTopic = { ...topic }
      const vote = { ...updatedTopic.content[contentIndex].content }
      
      // 增加对应选项的票数
      vote[choice].count += 1
      vote.totalVotes += 1
      
      // 标记用户已投票
      vote.userVoted = true
      vote.userChoice = choice
      
      // 重新计算百分比
      const updatedVote = this.calculateVotePercentagesForItem(vote)
      
      // 更新数据
      updatedTopic.content[contentIndex].content = updatedVote

      this.setData({
        topic: updatedTopic
      })

      wx.showToast({
        title: `你选择了${choice === 'positive' ? '正方' : '反方'}`,
        icon: 'success'
      })
    },

    // 评论相关方法
    onLikeComment(e: any) {
      console.log('【话题页】点击点赞评论，事件详情:', e)
      wx.showToast({
        title: '点赞成功',
        icon: 'success'
      })
    },

    onComment(e: any) {
      console.log('【话题页】点击评论按钮，事件详情:', e)
      wx.showToast({
        title: '评论成功',
        icon: 'success'
      })
    },

    // 评论输入处理
    onCommentInput(e: any) {
      console.log('【话题页】评论输入框内容变化:', e.detail.value)
    },

    // 发送评论
    onSendComment() {
      console.log('【话题页】点击发送评论按钮')
      wx.showToast({
        title: '评论已发送',
        icon: 'success'
      })
    },

    // 评论导航切换
    switchNav(e: any) {
      const nav = e.currentTarget.dataset.nav
      console.log('【话题页】切换评论导航，选中:', nav)
      this.setData({
        activeNav: nav,
        comments: this.sortComments(nav === 'featured' ? 
          this.getCommentsForTopic(this.data.topic).filter((comment: any) => comment.isFeatured) :
          this.getCommentsForTopic(this.data.topic))
      })
    },

    // 排序类型切换
    switchSortType(e: any) {
      const sortType = e.currentTarget.dataset.type
      console.log('【话题页】切换排序类型，选中:', sortType)
      this.setData({
        sortType: sortType,
        comments: this.sortComments(this.data.comments)
      })
    },

    // 评论排序
    sortComments(comments: any[]) {
      if (!comments || comments.length === 0) return comments
      
      const sortedComments = [...comments]
      
      if (this.data.sortType === 'time') {
        // 按时间倒序排列（最新在前）
        sortedComments.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
      } else if (this.data.sortType === 'hot') {
        // 按热度排序（点赞数 + 回复数）
        sortedComments.sort((a, b) => {
          const aHot = a.likeCount + a.replyCount
          const bHot = b.likeCount + b.replyCount
          return bHot - aHot
        })
      }
      
      return sortedComments
    },

    // 生成评论数据
    getCommentsForTopic(topic: any) {
      if (!topic || !topic.comments) return []
      
      // 转换评论数据格式，适配前端显示
      return topic.comments.map((comment: any) => ({
        id: comment.id,
        content: comment.content,
        author: {
          id: comment.user.id,
          nickname: comment.user.nickname,
          avatar: comment.user.avatar
        },
        createTime: comment.time,
        likeCount: comment.likeCount,
        replyCount: comment.replies ? comment.replies.length : 0,
        replies: comment.replies || [],
        isFeatured: comment.likeCount > 10 // 点赞数超过10的设为精选评论
      }))
    },

    // 聚焦评论输入框
    focusCommentInput() {
      // 创建输入框的查询选择器
      const query = wx.createSelectorQuery()
      query.select('.comment-input').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        if (res[0]) {
          // 滚动到输入框位置
          wx.pageScrollTo({
            scrollTop: res[0].top + res[1].scrollTop - 100,
            duration: 300
          })
          
          // 延迟聚焦输入框
          setTimeout(() => {
            // 这里需要通过微信小程序的API来聚焦输入框
            // 由于微信小程序限制，无法直接聚焦，需要用户手动点击
            // 可以显示一个提示引导用户点击输入框
            wx.showToast({
              title: '请输入评论',
              icon: 'none',
              duration: 600
            })
          }, 400)
        }
      })
    },

    // 计算投票百分比
    calculateVotePercentages(topic: any) {
      if (!topic || !topic.content) return topic
      
      const updatedTopic = { ...topic }
      updatedTopic.content = updatedTopic.content.map((item: any) => {
        if (item.type === 'vote' && item.content) {
          return {
            ...item,
            content: this.calculateVotePercentagesForItem(item.content)
          }
        }
        return item
      })
      
      return updatedTopic
    },
    
    // 计算单个投票项的百分比
    calculateVotePercentagesForItem(vote: any) {
      if (!vote) return vote
      
      const updatedVote = { ...vote }
      const totalVotes = updatedVote.totalVotes || 0
      
      if (totalVotes > 0) {
        updatedVote.positivePercent = Math.round((updatedVote.positive.count / totalVotes) * 100)
        updatedVote.negativePercent = Math.round((updatedVote.negative.count / totalVotes) * 100)
      } else {
        // 当票数为0时，显示为50%对50%的平局状态
        updatedVote.positivePercent = 50
        updatedVote.negativePercent = 50
      }
      
      return updatedVote
    },

    // 滚动到评论列表
    scrollToCommentsList() {
      console.log('【话题页】开始滚动到评论列表')
      
      // 创建评论列表的查询选择器
      const query = wx.createSelectorQuery()
      query.select('.comment-section').boundingClientRect()
      query.selectViewport().scrollOffset()
      query.exec((res) => {
        console.log('【话题页】查询结果:', res)
        if (res[0]) {
          const elementTop = res[0].top
          const scrollTop = res[1].scrollTop
          const targetScrollTop = elementTop + scrollTop - 50
          
          console.log('【话题页】元素位置:', elementTop, '滚动位置:', scrollTop, '目标位置:', targetScrollTop)
          
          // 滚动到评论列表位置
          wx.pageScrollTo({
            scrollTop: targetScrollTop,
            duration: 500,
            success: () => {
              console.log('【话题页】滚动到评论列表成功')
            },
            fail: (err) => {
              console.error('【话题页】滚动失败:', err)
            }
          })
        } else {
          console.warn('【话题页】未找到评论列表元素，尝试使用备用选择器')
          
          // 尝试备用选择器
          const backupQuery = wx.createSelectorQuery()
          backupQuery.select('.comment-nav').boundingClientRect()
          backupQuery.selectViewport().scrollOffset()
          backupQuery.exec((backupRes) => {
            console.log('【话题页】备用查询结果:', backupRes)
            if (backupRes[0]) {
              const elementTop = backupRes[0].top
              const scrollTop = backupRes[1].scrollTop
              const targetScrollTop = elementTop + scrollTop - 50
              
              console.log('【话题页】备用元素位置:', elementTop, '滚动位置:', scrollTop, '目标位置:', targetScrollTop)
              
              // 滚动到评论导航位置
              wx.pageScrollTo({
                scrollTop: targetScrollTop,
                duration: 500,
                success: () => {
                  console.log('【话题页】滚动到评论导航成功')
                  
                  // 显示提示信息
                  wx.showToast({
                    title: '已定位到评论区域',
                    icon: 'success',
                    duration: 1500
                  })
                }
              })
            } else {
              console.error('【话题页】备用选择器也找不到元素')
            }
          })
        }
      })
    }
  },
})