// topic.ts

Page({
  data: {
    currentTab: 0,
    showBottomSheet: false,
    activeNav: 'featured',
    sortType: 'time',
    shouldFocusInput: false,
    scrollToComments: false,
    topic: null,
    comments: [],
    replyInput: {
      visible: false,
      targetCommentId: '',
      targetCommentIndex: -1,
      targetReplyId: '',
      placeholder: '写下你的回复...',
      content: '',
      isReplyToComment: false,
    },
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalComments: 0,
      hasMore: true,
    },
    // 子评论展开状态管理
    expandedComments: [],
    expandedMap: {},
    // 子评论分页显示
    repliesPagination: {}, // 格式: {commentId: {currentPage: 1, pageSize: 10, hasMore: true}}
  },

  onLoad(options: any) {
    console.log('【话题页】页面参数options:', options)
    
    const app = getApp()
    const topicId = options.topicId
    const focusInput = options.focusInput === 'true'
    const scrollToComments = options.scrollToComments === 'true'
    
    console.log('【话题页】解析后的参数:', { topicId, focusInput, scrollToComments })
    
    // 根据topicId加载对应的话题数据
    const globalData = app.globalData
    let targetTopic = null
    
    if (topicId) {
      // 根据topicId查找对应的话题
      if (globalData.featuredTopic && globalData.featuredTopic.id === topicId) {
        targetTopic = globalData.featuredTopic
      } else if (globalData.topics) {
        targetTopic = globalData.topics.find((topic: any) => topic.id === topicId) || globalData.topics[0]
      }
    } else {
      // 如果没有topicId参数，使用默认数据
      targetTopic = globalData.featuredTopic || (globalData.topics ? globalData.topics[0] : null)
    }
    
    // 确保userLiked字段正确初始化
    if (targetTopic && targetTopic.userLiked === undefined) {
      targetTopic.userLiked = false
    }
    
    // 计算投票百分比
    if (targetTopic && targetTopic.content) {
      targetTopic = this.calculateVotePercentages(targetTopic)
    }
    
    const allComments = this.getCommentsForTopic(targetTopic)
    const initialComments = allComments.slice(0, 10)
    
    // 更新数据
    this.setData({
      topic: targetTopic,
      comments: this.sortComments(initialComments),
      shouldFocusInput: focusInput,
      scrollToComments: scrollToComments,
      'pagination.totalComments': allComments.length,
      'pagination.hasMore': allComments.length > 10,
      'replyInput.visible': false,
      'replyInput.content': '',
      expandedComments: []
    })
    
    // 如果需要滚动到评论列表，延迟执行滚动操作
    if (scrollToComments) {
      setTimeout(() => {
        this.scrollToCommentsList()
      }, 400)
    }
    
    // 如果需要聚焦输入框，延迟执行聚焦操作
    if (focusInput) {
      setTimeout(() => {
        this.focusCommentInput()
      }, 500)
    }
  },

  // 底部导航栏切换
  onTabChange(e: any) {
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
        wx.showToast({
          title: '链接已复制',
          icon: 'success'
        })
      }
    })
  },

  // 点赞话题
  onLikeTopic() {
    console.log('【话题页】点击点赞话题')
    
    const { topic } = this.data
    if (topic) {
      const isLiked = !topic.userLiked
      const likeCountChange = isLiked ? 1 : -1
      
      this.setData({
        topic: {
          ...topic,
          userLiked: isLiked,
          likeCount: Math.max(0, (topic.likeCount || 0) + likeCountChange)
        }
      })
      
      wx.showToast({
        title: isLiked ? '点赞成功' : '取消点赞',
        icon: 'success'
      })
    }
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
    const contentIndex = e.currentTarget.dataset.contentIndex
    this.handleVote('positive', contentIndex)
  },

  onVoteNegative(e: any) {
    const contentIndex = e.currentTarget.dataset.contentIndex
    this.handleVote('negative', contentIndex)
  },

  handleVote(choice: any, contentIndex: number) {
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
    
    vote[choice].count += 1
    vote.totalVotes += 1
    vote.userVoted = true
    vote.userChoice = choice
    
    // 重新计算百分比
    const updatedVote = this.calculateVotePercentagesForItem(vote)
    updatedTopic.content[contentIndex].content = updatedVote

    this.setData({
      topic: updatedTopic
    })

    wx.showToast({
      title: `你选择了${choice === 'positive' ? '正方' : '反方'}`,
      icon: 'success'
    })
  },

  // 点赞评论
  onLikeComment(e: any) {
    const comment = e.currentTarget.dataset.comment
    const index = e.currentTarget.dataset.index
    
    const { comments } = this.data
    if (comments && comments[index]) {
      const currentComment = comments[index]
      const isLiked = !currentComment.userLiked
      const likeCountChange = isLiked ? 1 : -1
      
      const updatedComments = [...comments]
      updatedComments[index] = {
        ...currentComment,
        userLiked: isLiked,
        likeCount: Math.max(0, (currentComment.likeCount || 0) + likeCountChange)
      }
      
      this.setData({
        comments: updatedComments
      })
      
      wx.showToast({
        title: isLiked ? '点赞成功' : '取消点赞',
        icon: 'success'
      })
    }
  },

  // 点赞子评论（回复）
  onLikeReply(e: any) {
    const comment = e.currentTarget.dataset.comment // 父评论
    const reply = e.currentTarget.dataset.reply // 子评论
    const index = e.currentTarget.dataset.index // 父评论索引
    
    const { comments } = this.data
    if (comments && comments[index] && comments[index].replies) {
      const replyIndex = comments[index].replies.findIndex((r: any) => r.id === reply.id)
      if (replyIndex >= 0) {
        const currentReply = comments[index].replies[replyIndex]
        const isLiked = !currentReply.userLiked
        const likeCountChange = isLiked ? 1 : -1
        
        const updatedComments = [...comments]
        const updatedReplies = [...updatedComments[index].replies]
        
        updatedReplies[replyIndex] = {
          ...currentReply,
          userLiked: isLiked,
          likeCount: Math.max(0, (currentReply.likeCount || 0) + likeCountChange)
        }
        
        updatedComments[index].replies = updatedReplies
        
        this.setData({
          comments: updatedComments
        })
        
        wx.showToast({
          title: isLiked ? '点赞成功' : '取消点赞',
          icon: 'success'
        })
      }
    }
  },

  // 评论输入处理
  onCommentInput(e: any) {
    const value = e.detail.value
    this.setData({
      'replyInput.content': value
    })
  },

  // 发送评论
  onSendComment() {
    const { replyInput } = this.data
    if (!replyInput.content.trim()) {
      wx.showToast({
        title: '请输入评论内容',
        icon: 'none'
      })
      return
    }
    
    // 获取当前用户信息
    const app = getApp()
    const currentUser = app.globalData.userInfo
    
    // 生成新的评论或回复
    const newComment = {
      id: 'comment_' + Date.now(),
      content: replyInput.content.trim(),
      author: {
        id: currentUser.id,
        nickname: currentUser.nickname,
        avatar: currentUser.avatar
      },
      createTime: this.formatTime(new Date()),
      likeCount: 0,
      replyCount: 0,
      replies: [],
      userLiked: false,
      isFeatured: false,
      isNew: true // 标记为新评论
    }
    
    if (replyInput.visible && replyInput.targetCommentId) {
      // 回复评论
      this.handleReplyComment(newComment)
    } else {
      // 评论帖子
      this.handleAddComment(newComment)
    }
  },
  
  // 处理添加评论
  handleAddComment(newComment: any) {
    const { comments, pagination } = this.data
    const updatedComments = [newComment, ...comments]
    
    this.setData({
      comments: updatedComments,
      'replyInput.content': '',
      'pagination.totalComments': pagination.totalComments + 1
    })
    
    wx.showToast({
      title: '评论已发送',
      icon: 'success'
    })
  },
  
  // 处理回复评论
  handleReplyComment(newReply: any) {
    const { comments, replyInput, pagination } = this.data
    
    console.log('【处理回复】开始处理回复，参数:', { 
      targetCommentId: replyInput.targetCommentId, 
      targetCommentIndex: replyInput.targetCommentIndex,
      targetReplyId: replyInput.targetReplyId,
      isReplyToComment: replyInput.isReplyToComment 
    })
    
    // 使用评论ID来准确定位，而不是依赖索引
    const targetCommentIndex = comments.findIndex((comment: any) => comment.id === replyInput.targetCommentId)
    
    if (targetCommentIndex >= 0 && targetCommentIndex < comments.length) {
      const updatedComments = [...comments]
      const targetComment = updatedComments[targetCommentIndex]
      
      console.log('【处理回复】找到目标评论:', { targetCommentIndex, targetComment })
      
      // 设置replyTo字段
      if (replyInput.isReplyToComment) {
        // 回复评论本身，replyTo指向评论作者
        newReply.replyTo = {
          id: targetComment.author.id,
          nickname: targetComment.author.nickname,
          avatar: targetComment.author.avatar
        }
      } else {
        // 回复评论的评论，replyTo指向被回复的用户
        const targetReply = targetComment.replies.find((reply: any) => reply.id === replyInput.targetReplyId)
        if (targetReply) {
          newReply.replyTo = {
            id: targetReply.author.id,
            nickname: targetReply.author.nickname,
            avatar: targetReply.author.avatar
          }
          console.log('【处理回复】找到目标回复:', targetReply)
        }
      }
      
      // 确保新回复被标记
      newReply.isNew = true
      
      if (replyInput.isReplyToComment) {
        // 回复评论本身 - 插入到最前面
        targetComment.replies = targetComment.replies || []
        targetComment.replies = [newReply, ...(targetComment.replies as any[])]
        targetComment.replyCount = (targetComment.replyCount || 0) + 1
        console.log('【处理回复】添加到评论回复列表，新回复数量:', (targetComment.replies as any[]).length)
      } else {
        // 回复评论的评论 - 插入到被回复的子评论下方
        targetComment.replies = targetComment.replies || []
        
        // 找到被回复的子评论的索引
        const targetReplyIndex = (targetComment.replies as any[]).findIndex((reply: any) => reply.id === replyInput.targetReplyId)
        
        if (targetReplyIndex >= 0) {
          // 插入到被回复的子评论后面
          (targetComment.replies as any[]).splice(targetReplyIndex + 1, 0, newReply)
        } else {
          // 如果找不到被回复的子评论，插入到最前面
          targetComment.replies = [newReply, ...(targetComment.replies as any[])]
        }
        
        targetComment.replyCount = (targetComment.replyCount || 0) + 1
        console.log('【处理回复】添加到子评论回复列表，新回复数量:', (targetComment.replies as any[]).length)
      }
      
      // 当添加新的回复时，保持当前的分页状态，但确保新回复可见
      const newRepliesPagination = { ...this.data.repliesPagination }
      if (!newRepliesPagination[targetComment.id]) {
        // 如果没有分页信息，创建新的分页信息（默认显示6条）
        newRepliesPagination[targetComment.id] = {
          currentPage: 1,
          pageSize: 6,
          hasMore: targetComment.replies.length > 6
        }
      } else {
        // 如果有分页信息，保持当前状态，但更新hasMore
        const pagination = newRepliesPagination[targetComment.id]
        pagination.hasMore = pagination.currentPage * pagination.pageSize < targetComment.replies.length
      }
      
    // 获取当前评论的展开状态
    const { expandedComments, expandedMap } = this.data
    const currentExpandedComments = Array.isArray(expandedComments) ? expandedComments : []
    const newExpandedComments = [...currentExpandedComments]
    const newExpandedMap = { ...(expandedMap as any) }
      
      // 如果目标评论之前没有回复（replyCount为0或1），自动展开
      const originalReplyCount = targetComment.replyCount - 1 // 减去刚添加的新回复
      if (originalReplyCount <= 0) {
        // 如果之前没有回复，自动展开该评论
        if (!newExpandedComments.includes(targetComment.id)) {
          newExpandedComments.push(targetComment.id)
          newExpandedMap[targetComment.id] = true
          console.log('【处理回复】自动展开评论，因为之前没有回复，评论ID:', targetComment.id)
        }
      }
      
      this.setData({
        comments: updatedComments,
        'replyInput.visible': false,
        'replyInput.content': '',
        'replyInput.targetCommentId': '',
        'replyInput.targetCommentIndex': -1,
        'replyInput.targetReplyId': '',
        'pagination.totalComments': pagination.totalComments + 1,
        repliesPagination: newRepliesPagination,
        expandedComments: newExpandedComments,
        expandedMap: newExpandedMap
      })
      
      wx.showToast({
        title: '回复已发送',
        icon: 'success'
      })
    } else {
      console.error('【处理回复】找不到目标评论，评论ID:', replyInput.targetCommentId)
      wx.showToast({
        title: '回复失败，请重试',
        icon: 'error'
      })
    }
  },
  
  // 显示回复输入框
  showReplyInput(e: any) {
    const comment = e.currentTarget.dataset.comment
    const index = e.currentTarget.dataset.index
    const reply = e.currentTarget.dataset.reply
    
    console.log('【回复输入框】显示回复输入框，参数:', { comment, index, reply })
    
    const placeholder = reply ? 
      `回复 @${reply.author.nickname}` : 
      `回复 @${comment.author.nickname}`
    
    this.setData({
      'replyInput.visible': true,
      'replyInput.targetCommentId': comment.id,
      'replyInput.targetCommentIndex': index,
      'replyInput.targetReplyId': reply ? reply.id : '',
      'replyInput.placeholder': placeholder,
      'replyInput.isReplyToComment': !reply,
      'replyInput.content': ''
    })
    
    // 移除自动滚动，保持用户当前阅读位置
    // 让用户自己决定是否需要滚动到输入框
  },
  
  // 取消回复
  cancelReply() {
    this.setData({
      'replyInput.visible': false,
      'replyInput.targetCommentId': '',
      'replyInput.targetCommentIndex': -1,
      'replyInput.targetReplyId': '',
      'replyInput.content': ''
    })
  },
  
  // 滚动到回复输入框
  scrollToReplyInput() {
    const query = wx.createSelectorQuery()
    query.select('.reply-input-section').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res: any) => {
      if (res[0]) {
        wx.pageScrollTo({
          scrollTop: res[0].top + res[1].scrollTop - 50,
          duration: 300
        })
      }
    })
  },

  // 展开/折叠评论的回复
  toggleReplies(e: any) {
    console.log('【展开/折叠】点击事件触发，参数:', e.currentTarget.dataset)
    
    const commentId = e.currentTarget.dataset.commentId
    const { expandedComments, expandedMap } = this.data
    
    console.log('【展开/折叠】当前展开状态:', expandedComments, '目标评论ID:', commentId)
    
    // 确保expandedComments是数组
    const currentExpandedComments = Array.isArray(expandedComments) ? expandedComments : []
    
    const newExpandedComments = [...currentExpandedComments]
    const index = newExpandedComments.indexOf(commentId)
    
    console.log('【展开/折叠】当前评论ID在数组中的索引:', index)
    
    if (index > -1) {
      newExpandedComments.splice(index, 1)
      console.log('【展开/折叠】收起评论:', commentId)
    } else {
      newExpandedComments.push(commentId)
      console.log('【展开/折叠】展开评论:', commentId)
    }
    
    // 更新展开映射
    const newExpandedMap = { ...expandedMap }
    newExpandedMap[commentId] = index === -1
    
    console.log('【展开/折叠】更新后展开状态:', newExpandedComments)
    
    this.setData({
      expandedComments: newExpandedComments,
      expandedMap: newExpandedMap
    }, () => {
      console.log('【展开/折叠】setData完成，当前展开状态:', this.data.expandedComments)
      console.log('【展开/折叠】当前展开映射:', this.data.expandedMap)
    })
  },

  // 获取当前可见的子评论列表
  getVisibleReplies(comment: any) {
    const { repliesPagination } = this.data
    const commentId = comment.id
    
    // 当有分页信息时，直接显示所有回复（新回复总是可见）
    if (repliesPagination[commentId]) {
      return comment.replies
    }
    
    // 如果没有分页信息，默认显示前6条（遵循一次只展开6条的规则）
    return comment.replies.slice(0, 6)
  },

  // 判断是否还有更多子评论可以加载
  getRepliesHasMore(comment: any) {
    const { repliesPagination } = this.data
    const commentId = comment.id
    
    if (!repliesPagination[commentId]) {
      return comment.replies.length > 6
    }
    
    const pagination = repliesPagination[commentId]
    const currentEndIndex = pagination.currentPage * pagination.pageSize
    
    return currentEndIndex < comment.replies.length
  },

  // 加载更多子评论
  loadMoreReplies(e: any) {
    const commentId = e.currentTarget.dataset.commentId
    const { repliesPagination, comments } = this.data
    
    console.log('【加载更多子评论】开始加载，评论ID:', commentId)
    
    // 找到对应的评论
    const commentIndex = comments.findIndex((comment: any) => comment.id === commentId)
    if (commentIndex === -1) {
      console.error('【加载更多子评论】找不到评论:', commentId)
      return
    }
    
    const comment = comments[commentIndex]
    
    // 更新分页信息
    const newRepliesPagination = { ...repliesPagination }
    if (!newRepliesPagination[commentId]) {
      // 初始化分页信息，当前页码为1（已经显示了6条），点击后显示下一页（再显示6条）
      newRepliesPagination[commentId] = {
        currentPage: 1, // 初始状态：已经显示了6条
        pageSize: 6,
        hasMore: comment.replies.length > 6
      }
    }
    
    const pagination = newRepliesPagination[commentId]
    pagination.currentPage += 1
    pagination.hasMore = pagination.currentPage * pagination.pageSize < comment.replies.length
    
    // 更新数据
    this.setData({
      repliesPagination: newRepliesPagination
    }, () => {
      console.log('【加载更多子评论】加载完成，当前页码:', pagination.currentPage, '显示数量:', pagination.currentPage * pagination.pageSize)
    })
  },

  // 分页加载更多评论
  loadMoreComments() {
    const { pagination, comments } = this.data
    
    if (!pagination.hasMore) {
      wx.showToast({
        title: '没有更多评论了',
        icon: 'none'
      })
      return
    }
    
    wx.showLoading({
      title: '加载中...'
    })
    
    setTimeout(() => {
      const allComments = this.getCommentsForTopic(this.data.topic)
      const startIndex = pagination.currentPage * pagination.pageSize
      const newComments = allComments.slice(startIndex, startIndex + pagination.pageSize)
      
      if (newComments.length > 0) {
        this.setData({
          comments: [...comments, ...newComments],
          'pagination.currentPage': pagination.currentPage + 1,
          'pagination.hasMore': startIndex + pagination.pageSize < allComments.length
        })
      } else {
        this.setData({
          'pagination.hasMore': false
        })
      }
      
      wx.hideLoading()
    }, 500)
  },

  // 评论导航切换
  switchNav(e: any) {
    const nav = e.currentTarget.dataset.nav
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
    console.log('【话题页】切换排序方式:', sortType)
    
    if (this.data.sortType === sortType) {
      return // 如果已经是当前排序方式，不做任何操作
    }
    
    this.setData({
      sortType: sortType
    })
    
    // 重新排序评论列表
    this.sortCommentsAndUpdate()
  },

  // 排序并更新评论列表
  sortCommentsAndUpdate() {
    const { comments } = this.data
    if (!comments || (comments as any[]).length === 0) return
    
    const sortedComments = this.sortComments([...(comments as any[])])
    
    this.setData({
      comments: sortedComments
    })
    
    console.log('【话题页】评论排序完成，当前排序方式:', this.data.sortType)
  },

  // 评论排序
  sortComments(comments: any[]) {
    if (!comments || comments.length === 0) return comments
    
    const sortedComments = [...comments]
    
    if (this.data.sortType === 'time') {
      sortedComments.sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
    } else if (this.data.sortType === 'hot') {
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
      replies: comment.replies ? comment.replies.map((reply: any) => ({
        id: reply.id,
        content: reply.content,
        author: {
          id: reply.user.id,
          nickname: reply.user.nickname,
          avatar: reply.user.avatar
        },
        replyTo: reply.replyTo ? {
          id: reply.replyTo.id,
          nickname: reply.replyTo.nickname,
          avatar: reply.replyTo.avatar
        } : null,
        createTime: reply.time,
        likeCount: reply.likeCount,
        userLiked: false
      })) : [],
      isFeatured: comment.likeCount > 10
    }))
  },

  // 聚焦评论输入框
  focusCommentInput() {
    const query = wx.createSelectorQuery()
    query.select('.comment-input').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res: any) => {
      if (res[0]) {
        wx.pageScrollTo({
          scrollTop: res[0].top + res[1].scrollTop - 100,
          duration: 300
        })
        
        setTimeout(() => {
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
      updatedVote.positivePercent = 50
      updatedVote.negativePercent = 50
    }
    
    return updatedVote
  },

  // 滚动到评论列表
  scrollToCommentsList() {
    const query = wx.createSelectorQuery()
    query.select('.comment-section').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res: any) => {
      if (res[0]) {
        const elementTop = res[0].top
        const scrollTop = res[1].scrollTop
        const targetScrollTop = elementTop + scrollTop - 50
        
        wx.pageScrollTo({
          scrollTop: targetScrollTop,
          duration: 500
        })
      } else {
        const backupQuery = wx.createSelectorQuery()
        backupQuery.select('.comment-nav').boundingClientRect()
        backupQuery.selectViewport().scrollOffset()
        backupQuery.exec((backupRes: any) => {
          if (backupRes[0]) {
            const elementTop = backupRes[0].top
            const scrollTop = backupRes[1].scrollTop
            const targetScrollTop = elementTop + scrollTop - 50
            
            wx.pageScrollTo({
              scrollTop: targetScrollTop,
              duration: 500
            })
          }
        })
      }
    })
  },
  
  // 格式化时间
  formatTime(date: any): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    
    if (diff < 60000) {
      return '刚刚'
    } else if (diff < 3600000) {
      return Math.floor(diff / 60000) + '分钟前'
    } else if (diff < 86400000) {
      return Math.floor(diff / 3600000) + '小时前'
    } else if (diff < 604800000) {
      return Math.floor(diff / 86400000) + '天前'
    } else {
      return date.getFullYear() + '-' + 
             (date.getMonth() + 1).toString().padStart(2, '0') + '-' + 
             date.getDate().toString().padStart(2, '0') + ' ' +
             date.getHours().toString().padStart(2, '0') + ':' +
             date.getMinutes().toString().padStart(2, '0')
    }
  }
})