// topic.ts

import { recordOperation, OperationType } from '../../utils/testDataStorage'

declare const Object: any;

// 图片查看器常量
const MIN_SCALE = 1.0;
const MAX_SCALE = 3.0;
const ANIMATION_DURATION = 200;
const DOUBLE_TAP_DELAY = 300;
const TAP_THRESHOLD = 10;

Page({
  // 分享到微信好友
  onShareAppMessage() {
    const topic = this.data.topic
    const title = topic ? `${topic.title} - 蜂鸣` : '蜂鸣 - 有趣的话题讨论'
    const content = topic && topic.content ? this.getFirstTextContent(topic.content) : '发现有趣的话题讨论'
    
    return {
      title: title,
      path: `/pages/topic/topic?id=${topic?.id || ''}`,
      imageUrl: topic?.image || '/static/share-logo.png',
      desc: content
    }
  },
  
  // 分享到朋友圈
  onShareTimeline() {
    const topic = this.data.topic
    const title = topic ? `${topic.title} - 蜂鸣` : '蜂鸣 - 有趣的话题讨论'
    
    return {
      title: title,
      imageUrl: topic?.image || '/static/share-logo.png'
    }
  },
  
  data: {
    currentTab: 0,
    showBottomSheet: false,
    activeNav: 'featured',
    sortType: 'time',
    shouldFocusInput: false,
    scrollToComments: false,
    topic: null,
    comments: [],
    
    // 图片查看器相关数据 - 优化版本
    showImageViewer: false,
    currentImage: '',
    currentImageIndex: 0,
    imageList: [],
    imageScale: 1,
    imageTranslateX: 0,
    imageTranslateY: 0,
    isDragging: false,
    isAnimating: false,
    touchStartX: 0,
    touchStartY: 0,
    lastTouchDistance: 0,
    touchStartTime: 0,
    imageViewerBgOpacity: 0,
    imageWidth: 0,
    imageHeight: 0,
    viewportWidth: 0,
    viewportHeight: 0,
    isScaling: false,
    lastTouchX: 0,
    lastTouchY: 0,
    startTranslateX: 0,
    startTranslateY: 0,
    startScale: 1,
    lastSingleTouchX: 0,
    lastSingleTouchY: 0,
    isPinch: false,
    lastTapTime: 0,
    touchMoveThreshold: 5,
    lastTouchPoints: [],
    
    // 回复输入框相关
    replyInput: {
      visible: false,
      targetCommentId: '',
      targetCommentIndex: -1,
      targetReplyId: '',
      placeholder: '写下你的回复...',
      content: '',
      isReplyToComment: false,
    },
    
    // 分页相关
    pagination: {
      currentPage: 1,
      pageSize: 10,
      totalComments: 0,
      hasMore: true,
    },
    
    // 子评论展开状态管理
    expandedComments: [],
    expandedMap: {},
    repliesPagination: {},
    
    // 吸顶相关数据
    isCommentNavSticky: false,
    navbarHeight: 0,
    commentNavHeight: 0,
    commentNavOriginalTop: 0,
    scrollTop: 0,
    
    // 当前用户
    currentUser: null
  },

  onLoad(options: any) {
    console.log('【话题页】页面参数options:', options)
    
    const app = getApp()
    const db = app.globalData
    const currentUser = db.getCurrentUser()
    
    // 获取设备信息
    const systemInfo = wx.getSystemInfoSync()
    this.setData({
      viewportWidth: systemInfo.windowWidth,
      viewportHeight: systemInfo.windowHeight
    })
    
    const topicId = options.topicId
    const focusInput = options.focusInput === 'true'
    const scrollToComments = options.scrollToComments === 'true'
    
    console.log('【话题页】解析后的参数:', { topicId, focusInput, scrollToComments })
    
    // 根据topicId加载对应的话题数据
    let targetTopic = null
    
    if (topicId) {
      // 从全局数据库查找话题
      targetTopic = db.topics.find(topic => topic.id === topicId)
      
      // 如果还没找到，使用默认数据
      if (!targetTopic) {
        targetTopic = db.getFeaturedTopic() || db.getNormalTopics()[0] || null
      }
    } else {
      // 如果没有topicId参数，使用默认数据
      targetTopic = db.getFeaturedTopic() || db.getNormalTopics()[0] || null
    }
    
    // 获取作者信息
    if (targetTopic && targetTopic.authorId) {
      const author = db.users.find(user => user.id === targetTopic.authorId)
      if (author) {
        targetTopic.author = author
      }
    }
    
    // 检查当前用户是否点赞、投票、收藏
    if (targetTopic) {
      targetTopic.userLiked = db.isLiked(currentUser.id, 'topic', targetTopic.id)
      targetTopic.voteChoice = db.getVote(currentUser.id, targetTopic.id)
      targetTopic.isFavorited = db.isFavorited(currentUser.id, targetTopic.id)
    }
    
    // 计算投票百分比
    if (targetTopic && targetTopic.content) {
      targetTopic = this.calculateVotePercentages(targetTopic)
    }
    
    const allComments = this.getCommentsForTopic(targetTopic, db)
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
      expandedComments: [],
      currentUser: currentUser
    })
    
    // 获取导航栏和评论导航的高度
    setTimeout(() => {
      this.getNavbarHeight()
      this.getCommentNavHeight()
      this.calculateCommentNavOriginalTop()
    }, 200)
    
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

  onReady() {
    // 再次确保获取高度
    setTimeout(() => {
      this.getNavbarHeight()
      this.getCommentNavHeight()
      this.calculateCommentNavOriginalTop()
    }, 300)
  },

  // 页面滚动监听
  onPageScroll(e: any) {
    const { scrollTop } = e
    const { commentNavOriginalTop, navbarHeight, isCommentNavSticky } = this.data
    
    // 保存当前滚动位置
    this.setData({
      scrollTop: scrollTop
    })
    
    // 如果还没有计算出原始位置，不处理
    if (!commentNavOriginalTop || !navbarHeight) return
    
    // 计算触发吸顶的阈值（评论导航原始位置 - 导航栏高度）
    const stickyThreshold = Math.max(0, commentNavOriginalTop - navbarHeight)
    
    // 判断是否应该吸顶
    // 当滚动距离 >= 阈值时，开始吸顶
    // 当滚动距离 < 阈值时，取消吸顶
    const shouldSticky = scrollTop >= stickyThreshold
    
    if (shouldSticky !== isCommentNavSticky) {
      console.log('【吸顶效果】状态变化:', { 
        shouldSticky, 
        isCommentNavSticky,
        scrollTop,
        stickyThreshold,
        commentNavOriginalTop,
        navbarHeight
      })
      
      this.setData({
        isCommentNavSticky: shouldSticky
      })
    }
  },

  // 获取导航栏高度
  getNavbarHeight() {
    const query = wx.createSelectorQuery()
    query.select('#fixed-navbar').boundingClientRect()
    query.exec((res: any) => {
      if (res && res[0]) {
        console.log('【吸顶效果】导航栏高度:', res[0].height)
        this.setData({
          navbarHeight: res[0].height
        })
      }
    })
  },

  // 获取评论导航高度
  getCommentNavHeight() {
    const query = wx.createSelectorQuery()
    query.select('#comment-nav').boundingClientRect()
    query.exec((res: any) => {
      if (res && res[0]) {
        console.log('【吸顶效果】评论导航高度:', res[0].height)
        this.setData({
          commentNavHeight: res[0].height
        })
      }
    })
  },

  // 计算评论导航原始距离顶部的距离
  calculateCommentNavOriginalTop() {
    wx.createSelectorQuery()
      .select('.topic-header')
      .boundingClientRect((headerRect: any) => {
        if (!headerRect) {
          console.log('【吸顶效果】获取话题头部高度失败，稍后重试')
          setTimeout(() => {
            this.calculateCommentNavOriginalTop()
          }, 500)
          return
        }
        
        // page-content 的 padding-top 是 88rpx，转换为px
        const systemInfo = wx.getSystemInfoSync()
        const pxPerRpx = systemInfo.windowWidth / 750
        const pageContentPaddingTop = 88 * pxPerRpx
        
        const commentNavOriginalTop = headerRect.height + pageContentPaddingTop
        
        console.log('【吸顶效果】计算原始位置:', {
          headerHeight: headerRect.height,
          pageContentPaddingTop,
          commentNavOriginalTop,
          pxPerRpx
        })
        
        this.setData({
          commentNavOriginalTop: commentNavOriginalTop
        })
      })
      .exec()
  },

  // 底部菜单栏相关方法
  showBottomSheet() {
    console.log('【话题页】显示底部菜单栏')
    
    const { topic } = this.data
    if (!topic) {
      this.setData({
        showBottomSheet: true
      })
      return
    }
    
    // 获取当前用户和数据服务
    const app = getApp()
    const db = app.globalData
    const currentUser = db.getCurrentUser()
    
    // 动态查询最新的收藏状态
    const currentIsFavorited = db.isFavorited(currentUser.id, topic.id)
    console.log('【话题页】动态查询收藏状态:', currentIsFavorited)
    
    // 更新话题的收藏状态
    const updatedTopic = {
      ...topic,
      isFavorited: currentIsFavorited
    }
    
    this.setData({
      showBottomSheet: true,
      topic: updatedTopic
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

  onCollection() {
    console.log('【话题页】点击收藏话题按钮')
    
    const { topic } = this.data
    if (topic) {
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      const isFavorited = !topic.isFavorited
      
      // 使用dataService进行数据持久化
      const success = db.toggleFavorite(currentUser.id, topic.id)

      this.setData({
        topic: Object.assign({}, topic, {
          isFavorited: isFavorited
        })
      })
      
      // 记录操作到测试数据存储
      recordOperation(
        OperationType.FAVORITE,
        currentUser.id,
        'topic',
        topic.id,
        { isFavorited }
      )
      
      wx.showToast({
        title: isFavorited ? '收藏成功' : '取消收藏',
        icon: 'success'
      })
      
    }
    
    this.closeBottomSheet()
  },

  // 点赞话题
  onLikeTopic() {
    console.log('【话题页】点击点赞话题')
    
    const { topic } = this.data
    if (topic) {
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      const isLiked = !topic.userLiked
      
      // 使用dataService进行数据持久化
      const success = db.toggleLike(currentUser.id, 'topic', topic.id)
      
      this.setData({
        topic: Object.assign({}, topic, {
          userLiked: isLiked,
          likeCount: isLiked ? (topic.likeCount || 0) + 1 : Math.max(0, (topic.likeCount || 0) - 1)
        })
      })
      
      // 记录操作到测试数据存储
      recordOperation(
        OperationType.LIKE_TOPIC,
        currentUser.id,
        'topic',
        topic.id,
        { isLiked }
      )
      
      wx.showToast({
        title: isLiked ? '点赞成功' : '取消点赞',
        icon: 'success'
      })
    }
  },

  onShareTopic() {
    console.log('【话题详情页】点击内容下方分享按钮')
    
    // 获取话题信息
    const topic = this.data.topic
    if (!topic) {
      wx.showToast({
        title: '话题信息不存在',
        icon: 'error'
      })
      return
    }
    
    // 启用右上角分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    
    // 显示友好的提示
    wx.showModal({
      title: '分享提示',
      content: '请点击右上角的"..."按钮，选择分享给好友或朋友圈',
      showCancel: false,
      confirmText: '知道了'
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
    if (contentItem.type !== 'vote' || topic.voteChoice) {
      // 如果已经投过票，直接返回
      return
    }

    // 获取当前用户信息
    const app = getApp()
    const db = app.globalData
    const currentUser = db.getCurrentUser()
    
    // 使用dataService进行数据持久化
    const voteResult = db.castVote(currentUser.id, topic.id, choice)
    
    if (voteResult) {
      // 更新投票数据
      const updatedTopic = Object.assign({}, topic)
      const vote = Object.assign({}, updatedTopic.content[contentIndex].content)
      
      vote[choice].count += 1
      vote.totalVotes += 1
      
      // 重新计算百分比
      const updatedVote = this.calculateVotePercentagesForItem(vote)
      updatedTopic.content[contentIndex].content = updatedVote
      
      // 更新话题级别的投票状态
      updatedTopic.voteChoice = choice

      this.setData({
        topic: updatedTopic
      })

      // 记录操作到测试数据存储
      recordOperation(
        OperationType.VOTE,
        currentUser.id,
        'topic',
        topic.id,
        { choice, voteResult }
      )

      wx.showToast({
        title: `你选择了${choice === 'positive' ? '正方' : '反方'}`,
        icon: 'success'
      })
    } else {
      wx.showToast({
        title: '投票失败',
        icon: 'error'
      })
    }
  },

  // 点赞评论
  onLikeComment(e: any) {
    const comment = e.currentTarget.dataset.comment
    const index = e.currentTarget.dataset.index
    
    const { comments } = this.data
    if (comments && comments[index]) {
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      const currentComment = comments[index]
      const isLiked = !currentComment.userLiked
      
      // 使用dataService进行数据持久化
      const success = db.toggleLike(currentUser.id, 'comment', comment.id)
      
      const updatedComments = comments.slice()
      updatedComments[index] = Object.assign({}, currentComment, {
        userLiked: isLiked,
        likeCount: isLiked ? (currentComment.likeCount || 0) + 1 : Math.max(0, (currentComment.likeCount || 0) - 1)
      })
      
      this.setData({
        comments: updatedComments
      })
      
      // 记录操作到测试数据存储
      recordOperation(
        OperationType.LIKE_COMMENT,
        currentUser.id,
        'comment',
        comment.id,
        { isLiked }
      )
      
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
      // 获取当前用户和数据服务
      const app = getApp()
      const db = app.globalData
      const currentUser = db.getCurrentUser()
      
      const replyIndex = comments[index].replies.findIndex((r: any) => r.id === reply.id)
      if (replyIndex >= 0) {
        const currentReply = comments[index].replies[replyIndex]
        const isLiked = !currentReply.userLiked
        
        // 使用dataService进行数据持久化
        const success = db.toggleLike(currentUser.id, 'comment', reply.id)
        const updatedComments = comments.slice()
        const updatedReplies = updatedComments[index].replies.slice()
        
        updatedReplies[replyIndex] = Object.assign({}, currentReply, {
          userLiked: isLiked,
          likeCount: isLiked ? (currentReply.likeCount || 0) + 1 : Math.max(0, (currentReply.likeCount || 0) - 1)
        })
        
        updatedComments[index].replies = updatedReplies
        
        this.setData({
          comments: updatedComments
        })
        
        // 记录操作到测试数据存储
        recordOperation(
          OperationType.LIKE_COMMENT,
          currentUser.id,
          'comment',
          reply.id,
          { isLiked }
        )
        
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
    const db = app.globalData
    const currentUser = db.getCurrentUser() || {
      id: 'user_' + Date.now(),
      nickname: '当前用户',
      avatar: '/static/default-avatar.png'
    }
    
    // 生成新的评论或回复数据
    const commentData = {
      content: replyInput.content.trim(),
      userId: currentUser.id,
      topicId: this.data.topic.id,
      parentId: replyInput.visible && replyInput.targetCommentId ? 
                (replyInput.isReplyToComment ? replyInput.targetCommentId : replyInput.targetReplyId) : 
                null,
      replyToId: replyInput.visible && !replyInput.isReplyToComment ? replyInput.targetReplyId : null
    }
    
    // 使用dataService进行数据持久化
    const savedComment = db.createComment(commentData)
    
    if (!savedComment) {
      wx.showToast({
        title: '评论失败',
        icon: 'error'
      })
      return
    }
    
    // 获取评论作者信息
    const author = db.getUserById(currentUser.id) || {
      id: currentUser.id,
      nickname: currentUser.nickname || '当前用户',
      avatar: currentUser.avatar || 'https://api.dicebear.com/7.x/adventurer/png?seed=default&size=100'
    }
    
    // 生成新的评论或回复
    const newComment = {
      id: savedComment.id,
      content: savedComment.content,
      author: author,
      createTime: savedComment.time,
      likeCount: 0,
      replyCount: 0,
      replies: [],
      userLiked: false,
      isFeatured: false,
      isNew: true // 标记为新评论
    }
    
    // 记录操作到测试数据存储
    const operationType = replyInput.visible && replyInput.targetCommentId ? 
                         OperationType.CREATE_COMMENT : 
                         OperationType.CREATE_COMMENT
    
    recordOperation(
      operationType,
      currentUser.id,
      replyInput.visible && replyInput.targetCommentId ? 'comment' : 'topic',
      replyInput.visible && replyInput.targetCommentId ? replyInput.targetCommentId : this.data.topic.id,
      { content: replyInput.content.trim(), isReply: replyInput.visible }
    )
    
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
    const updatedComments = [newComment].concat(comments)
    
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
      const updatedComments = comments.slice()
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
        targetComment.replies = [newReply].concat(targetComment.replies as any[])
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
          targetComment.replies = [newReply].concat(targetComment.replies as any[])
        }
        
        targetComment.replyCount = (targetComment.replyCount || 0) + 1
        console.log('【处理回复】添加到子评论回复列表，新回复数量:', (targetComment.replies as any[]).length)
      }
      
      // 当添加新的回复时，保持当前的分页状态，但确保新回复可见
      const newRepliesPagination = Object.assign({}, this.data.repliesPagination)
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
      const newExpandedComments = currentExpandedComments.slice()
      const newExpandedMap = Object.assign({}, expandedMap)
      
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
    
    // 移除自动滚动，保持用户体验的连贯性
    // 用户可以在当前浏览位置直接回复，无需页面滚动
  },

  // 滚动到回复输入框
  scrollToReplyInput() {
    const { isCommentNavSticky, navbarHeight, commentNavHeight } = this.data
    
    const query = wx.createSelectorQuery()
    query.select('.reply-input-section').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res: any) => {
      if (res && res[0] && res[1]) {
        const elementTop = res[0].top
        const scrollTop = res[1].scrollTop
        
        // 计算目标滚动位置
        let targetScrollTop = elementTop + scrollTop
        
        // 如果评论导航处于吸顶状态，需要减去导航栏高度和评论导航高度
        if (isCommentNavSticky) {
          targetScrollTop = targetScrollTop - navbarHeight - commentNavHeight - 20
        } else {
          // 如果不在吸顶状态，减去导航栏高度和一点额外空间
          targetScrollTop = targetScrollTop - navbarHeight - 20
        }
        
        console.log('【滚动到回复输入框】计算参数:', {
          elementTop,
          scrollTop,
          targetScrollTop,
          isCommentNavSticky,
          navbarHeight,
          commentNavHeight
        })
        
        wx.pageScrollTo({
          scrollTop: Math.max(0, targetScrollTop),
          duration: 300
        })
      }
    })
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
  
  // 展开/折叠评论的回复
  toggleReplies(e: any) {
    const commentId = e.currentTarget.dataset.commentId
    const { expandedComments, expandedMap } = this.data
  
    // 确保expandedComments是数组
    const currentExpandedComments = Array.isArray(expandedComments) ? expandedComments : []
    
    const newExpandedComments = [...currentExpandedComments]
    const index = newExpandedComments.indexOf(commentId)
  
    if (index > -1) {
      newExpandedComments.splice(index, 1)
    } else {
      newExpandedComments.push(commentId)
    }
    
    // 更新展开映射
    const newExpandedMap = { ...expandedMap }
    newExpandedMap[commentId] = index === -1
    
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
          comments: comments.concat(newComments),
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
    
    const sortedComments = comments.slice()
    
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
  getCommentsForTopic(topic: any, db: any) {
    if (!topic || !topic.id) return []
    
    const currentUser = db.getCurrentUser()
    const topicComments = db.getTopicComments(topic.id)
    
    return topicComments.map((comment: any) => {
      // 获取评论作者信息
      const author = db.users.find(user => user.id === comment.userId)
      
      // 获取回复信息
      const replies = db.getCommentReplies(comment.id).map((reply: any) => {
        const replyAuthor = db.users.find(user => user.id === reply.userId)
        const replyToUser = reply.replyToId ? db.users.find(user => user.id === reply.replyToId) : null
        
        return {
          id: reply.id,
          content: reply.content,
          author: replyAuthor || {
            nickname: '未知用户',
            avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Unknown&size=100'
          },
          authorId: reply.userId, // 添加authorId字段
          replyTo: replyToUser ? {
            nickname: replyToUser.nickname,
            avatar: replyToUser.avatar,
            id: replyToUser.id // 添加被回复者的ID
          } : null,
          createTime: reply.time,
          likeCount: reply.likeCount,
          userLiked: db.isLiked(currentUser.id, 'comment', reply.id)
        }
      })
      
      return {
        id: comment.id,
        content: comment.content,
        author: author || {
          nickname: '未知用户',
          avatar: 'https://api.dicebear.com/7.x/adventurer/png?seed=Unknown&size=100'
        },
        authorId: comment.userId, // 添加authorId字段
        createTime: comment.time,
        likeCount: comment.likeCount,
        replyCount: comment.replyCount,
        userLiked: db.isLiked(currentUser.id, 'comment', comment.id),
        replies: replies,
        isFeatured: comment.likeCount > 10
      }
    })
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
    const { isCommentNavSticky, navbarHeight, commentNavHeight } = this.data
    
    const query = wx.createSelectorQuery()
    query.select('.comment-section').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec((res: any) => {
      if (res && res[0] && res[1]) {
        const elementTop = res[0].top
        const scrollTop = res[1].scrollTop
        
        // 计算目标滚动位置
        let targetScrollTop = elementTop + scrollTop
        
        // 如果评论导航处于吸顶状态，需要减去导航栏高度和评论导航高度
        if (isCommentNavSticky) {
          targetScrollTop = targetScrollTop - navbarHeight - commentNavHeight
        } else {
          // 如果不在吸顶状态，减去导航栏高度和一点额外空间
          targetScrollTop = targetScrollTop - navbarHeight - 20
        }
        
        console.log('【滚动到评论】计算参数:', {
          elementTop,
          scrollTop,
          targetScrollTop,
          isCommentNavSticky,
          navbarHeight,
          commentNavHeight
        })
        
        wx.pageScrollTo({
          scrollTop: Math.max(0, targetScrollTop),
          duration: 300
        })
      } else {
        // 如果找不到.comment-section，尝试使用.comment-nav作为备选
        const backupQuery = wx.createSelectorQuery()
        backupQuery.select('.comment-nav').boundingClientRect()
        backupQuery.selectViewport().scrollOffset()
        backupQuery.exec((backupRes: any) => {
          if (backupRes && backupRes[0] && backupRes[1]) {
            const elementTop = backupRes[0].top
            const scrollTop = backupRes[1].scrollTop
            
            let targetScrollTop = elementTop + scrollTop
            
            // 如果评论导航处于吸顶状态，需要减去导航栏高度
            if (isCommentNavSticky) {
              targetScrollTop = targetScrollTop - navbarHeight
            } else {
              targetScrollTop = targetScrollTop - navbarHeight - 20
            }
            
            wx.pageScrollTo({
              scrollTop: Math.max(0, targetScrollTop),
              duration: 300
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
  },

  // 跳转到用户主页
  goToUserProfile(e: any) {
    const userId = e.currentTarget.dataset.userId
    console.log('【话题详情页】点击作者信息，用户ID:', userId)
    
    if (userId) {
      wx.navigateTo({
        url: `/pages/user/user?userId=${userId}`
      })
    } else {
      wx.showToast({
        title: '用户信息不存在',
        icon: 'error'
      })
    }
  },

  // 分享帖子 - 启用右上角分享功能
  onSharePost() {
    console.log('【话题详情页】点击分享帖子')
    
    // 关闭底部弹窗
    this.closeBottomSheet()
    
    // 获取话题信息
    const topic = this.data.topic
    if (!topic) {
      wx.showToast({
        title: '话题信息不存在',
        icon: 'error'
      })
      return
    }
    
    // 启用右上角分享功能
    wx.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline']
    })
    
    // 显示友好的提示
    wx.showModal({
      title: '分享提示',
      content: '请点击右上角的"..."按钮，选择分享给好友或朋友圈',
      showCancel: false,
      confirmText: '知道了'
    })
  },

  // ============= 图片查看器相关方法 =============
  
  // 优化后的图片点击事件 - 使用原生预览
  onImageTap(e: any) {
    const imageSrc = e.currentTarget.dataset.imageSrc
    if (!imageSrc) return

    console.log('【话题详情页】点击图片:', imageSrc)
    
    // 收集当前话题的所有图片
    const imageList = this.collectAllImages()
    
    // 使用微信原生图片预览API（最流畅的方案）
    wx.previewImage({
      current: imageSrc, // 当前显示图片的url
      urls: imageList, // 需要预览的图片url列表
      success: () => {
        console.log('【图片预览】成功打开')
      },
      fail: (error) => {
        console.error('【图片预览】失败:', error)
        // 降级处理：使用自定义预览
        this.customPreviewImage(imageSrc, imageList)
      }
    })
  },

  // 收集话题中的所有图片
  collectAllImages() {
    const images: string[] = []
    const { topic } = this.data
    
    if (topic && topic.content) {
      topic.content.forEach((item: any) => {
        if (item.type === 'image' && item.content) {
          images.push(item.content)
        }
      })
    }
    
    return images
  },

  // 自定义图片预览（降级方案）
  customPreviewImage(currentImage: string, imageList: string[]) {
    const currentIndex = imageList.findIndex(url => url === currentImage)
    
    this.setData({
      showImageViewer: true,
      currentImage: currentImage,
      currentImageIndex: currentIndex >= 0 ? currentIndex : 0,
      imageList: imageList,
      imageScale: 1,
      imageTranslateX: 0,
      imageTranslateY: 0,
      imageViewerBgOpacity: 0
    })
    
    // 触发进入动画
    setTimeout(() => {
      this.setData({
        imageViewerBgOpacity: 1
      })
    }, 10)
    
    // 获取图片尺寸
    this.getImageSize(currentImage)
    
    // 禁用页面滚动
    this.setData({
      pageScrollable: false
    })
  },

  // 获取图片尺寸
  getImageSize(src: string) {
    wx.getImageInfo({
      src: src,
      success: (res) => {
        this.setData({
          imageWidth: res.width,
          imageHeight: res.height
        })
      },
      fail: () => {
        // 如果获取失败，使用默认值
        this.setData({
          imageWidth: this.data.viewportWidth,
          imageHeight: this.data.viewportHeight
        })
      }
    })
  },

  // 切换上一张图片
  switchPrevImage() {
    this.switchImage('prev')
  },

  // 切换下一张图片
  switchNextImage() {
    this.switchImage('next')
  },

  // 切换图片（左右滑动）
  switchImage(direction: 'prev' | 'next') {
    const { imageList, currentImageIndex } = this.data
    
    if (!imageList || imageList.length === 0) return
    
    let newIndex = currentImageIndex
    if (direction === 'prev' && currentImageIndex > 0) {
      newIndex = currentImageIndex - 1
    } else if (direction === 'next' && currentImageIndex < imageList.length - 1) {
      newIndex = currentImageIndex + 1
    } else {
      return
    }
    
    // 重置缩放状态
    this.setData({
      isAnimating: true,
      imageScale: 1,
      imageTranslateX: 0,
      imageTranslateY: 0,
      currentImage: imageList[newIndex],
      currentImageIndex: newIndex
    })
    
    setTimeout(() => {
      this.setData({
        isAnimating: false
      })
    }, ANIMATION_DURATION)
    
    // 获取新图片尺寸
    this.getImageSize(imageList[newIndex])
  },

  // 关闭图片查看器
  closeImageViewer() {
    this.setData({
      isAnimating: true,
      imageViewerBgOpacity: 0
    })
    
    setTimeout(() => {
      this.setData({
        showImageViewer: false,
        currentImage: '',
        imageScale: 1,
        imageTranslateX: 0,
        imageTranslateY: 0,
        isAnimating: false,
        pageScrollable: true
      })
    }, ANIMATION_DURATION)
  },

  // 保存当前图片
  saveCurrentImage() {
    const { currentImage } = this.data
    
    wx.showLoading({
      title: '保存中...'
    })
    
    // 下载图片到本地
    wx.downloadFile({
      url: currentImage,
      success: (res) => {
        // 保存到相册
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: () => {
            wx.hideLoading()
            wx.showToast({
              title: '保存成功',
              icon: 'success'
            })
          },
          fail: (error) => {
            wx.hideLoading()
            console.error('【保存图片】失败:', error)
            wx.showToast({
              title: '保存失败',
              icon: 'error'
            })
          }
        })
      },
      fail: (error) => {
        wx.hideLoading()
        console.error('【下载图片】失败:', error)
        wx.showToast({
          title: '下载失败',
          icon: 'error'
        })
      }
    })
  },

  // 触摸开始
  onImageTouchStart(e: any) {
    if (this.data.isAnimating) return
    
    const touches = e.touches
    const now = Date.now()
    
    this.setData({
      isTouching: true,
      touchStartTime: now,
      lastTouchPoints: touches
    })
    
    if (touches.length === 1) {
      // 单指触摸 - 记录起始位置用于拖动
      this.setData({
        lastTouchX: touches[0].clientX,
        lastTouchY: touches[0].clientY,
        startTranslateX: this.data.imageTranslateX,
        startTranslateY: this.data.imageTranslateY,
        isDragging: false
      })
    } else if (touches.length === 2) {
      // 双指触摸 - 记录起始距离用于缩放
      const dx = touches[1].clientX - touches[0].clientX
      const dy = touches[1].clientY - touches[0].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      this.setData({
        lastTouchDistance: distance,
        startScale: this.data.imageScale,
        startTranslateX: this.data.imageTranslateX,
        startTranslateY: this.data.imageTranslateY,
        isPinch: true
      })
    }
  },

  // 触摸移动
  onImageTouchMove(e: any) {
    if (!this.data.isTouching || this.data.isAnimating) return
    
    const touches = e.touches
    e.preventDefault() // 阻止默认滚动
    
    if (touches.length === 1 && !this.data.isPinch) {
      // 单指移动 - 拖动图片
      const currentX = touches[0].clientX
      const currentY = touches[0].clientY
      
      // 计算移动距离
      const deltaX = currentX - this.data.lastTouchX
      const deltaY = currentY - this.data.lastTouchY
      
      // 检查是否达到移动阈值
      const moveDistance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)
      if (moveDistance > this.data.touchMoveThreshold || this.data.isDragging) {
        // 开始拖动
        this.setData({
          isDragging: true,
          imageTranslateX: this.data.startTranslateX + deltaX,
          imageTranslateY: this.data.startTranslateY + deltaY,
          lastTouchX: currentX,
          lastTouchY: currentY
        })
      }
    } else if (touches.length === 2) {
      // 双指移动 - 缩放图片
      const dx = touches[1].clientX - touches[0].clientX
      const dy = touches[1].clientY - touches[0].clientY
      const distance = Math.sqrt(dx * dx + dy * dy)
      
      if (this.data.lastTouchDistance > 0) {
        // 计算缩放比例
        const scaleChange = distance / this.data.lastTouchDistance
        let newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, this.data.startScale * scaleChange))
        
        // 计算缩放中心点
        const centerX = (touches[0].clientX + touches[1].clientX) / 2
        const centerY = (touches[0].clientY + touches[1].clientY) / 2
        const viewportWidth = this.data.viewportWidth
        const viewportHeight = this.data.viewportHeight
        
        // 计算基于中心点的位移
        const scaleRatio = newScale / this.data.imageScale
        let translateX = centerX - (centerX - this.data.imageTranslateX) * scaleRatio
        let translateY = centerY - (centerY - this.data.imageTranslateY) * scaleRatio
        
        // 边界限制（当缩放大于1时）
        if (newScale > 1) {
          const maxTranslateX = (newScale - 1) * viewportWidth / 2
          const maxTranslateY = (newScale - 1) * viewportHeight / 2
          translateX = Math.min(maxTranslateX, Math.max(-maxTranslateX, translateX))
          translateY = Math.min(maxTranslateY, Math.max(-maxTranslateY, translateY))
        } else {
          translateX = 0
          translateY = 0
        }
        
        this.setData({
          imageScale: newScale,
          imageTranslateX: translateX,
          imageTranslateY: translateY,
          lastTouchDistance: distance,
          isScaling: true
        })
      }
    }
  },

  // 触摸结束
  onImageTouchEnd(e: any) {
    if (!this.data.isTouching) return
    
    const touches = e.changedTouches
    const now = Date.now()
    const touchDuration = now - this.data.touchStartTime
    
    // 检查是否是双击
    if (touches.length === 1 && !this.data.isDragging && !this.data.isScaling && touchDuration < 300) {
      const currentTime = now
      const lastTapTime = this.data.lastTapTime
      
      if (currentTime - lastTapTime < DOUBLE_TAP_DELAY) {
        // 双击 - 切换缩放
        this.handleDoubleTap()
      }
      
      this.setData({
        lastTapTime: currentTime
      })
    }
    
    // 重置状态
    this.setData({
      isTouching: false,
      isDragging: false,
      isScaling: false,
      isPinch: false,
      lastTouchDistance: 0
    })
  },

  // 触摸取消
  onImageTouchCancel(e: any) {
    this.setData({
      isTouching: false,
      isDragging: false,
      isScaling: false,
      isPinch: false,
      lastTouchDistance: 0
    })
  },

  // 处理双击
  handleDoubleTap() {
    const { imageScale } = this.data
    
    // 切换缩放状态
    const newScale = imageScale > 1.1 ? 1 : 2
    
    this.setData({
      isAnimating: true,
      imageScale: newScale,
      imageTranslateX: 0,
      imageTranslateY: 0
    })
    
    setTimeout(() => {
      this.setData({
        isAnimating: false
      })
    }, ANIMATION_DURATION)
  },

  // 阻止事件冒泡
  preventBubble() {
    return false
  },

  // 阻止触摸移动（用于遮罩层）
  preventTouchMove() {
    return false
  },

  // 获取第一个文本内容（用于分享）
  getFirstTextContent(content: any[]) {
    if (!content || !content.length) return ''
    const textItem = content.find(item => item.type === 'text')
    return textItem ? textItem.content.substring(0, 50) : ''
  }
})