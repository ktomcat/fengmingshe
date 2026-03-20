
// ==================== 导入模拟数据 ====================
import { 
  initialUsers, 
  initialTopics, 
  initialComments, 
  initialFollows, 
  initialLikes, 
  initialVotes, 
  initialFavorites, 
  initialNotifications 
} from './mockData'

// ==================== 应用配置 ====================
const config = {
  appName: '蜂鸣社',
  version: '1.0.0',
  apiBaseUrl: 'https://api.fengming.com',
  maxUploadSize: 10 * 1024 * 1024, // 10MB
  enableDarkMode: true,
  defaultAvatar: 'https://api.dicebear.com/7.x/bottts/png?seed=Default&size=100'
}

// ==================== 数据服务层（内存持久化） ====================
class DataService {
  private users: any[]
  private topics: any[]
  private comments: any[]
  private follows: any[]
  private likes: any[]
  private votes: any[]
  private favorites: any[]
  private notifications: any[]
  private config: any
  private listeners: Map<string, Function[]>

  constructor() {
    // 初始化数据（深拷贝，避免引用问题）
    this.users = JSON.parse(JSON.stringify(initialUsers))
    this.topics = JSON.parse(JSON.stringify(initialTopics))
    this.comments = JSON.parse(JSON.stringify(initialComments))
    this.follows = JSON.parse(JSON.stringify(initialFollows))
    this.likes = JSON.parse(JSON.stringify(initialLikes))
    this.votes = JSON.parse(JSON.stringify(initialVotes))
    this.favorites = JSON.parse(JSON.stringify(initialFavorites))
    this.notifications = JSON.parse(JSON.stringify(initialNotifications))
    this.config = JSON.parse(JSON.stringify(config))
    this.listeners = new Map()
    
    console.log('📦 数据服务初始化完成')
    console.log(`📊 数据统计: 用户 ${this.users.length}人, 帖子 ${this.topics.length}篇, 评论 ${this.comments.length}条, 关注 ${this.follows.length}对, 点赞 ${this.likes.length}个, 投票 ${this.votes.length}个, 收藏 ${this.favorites.length}个, 通知 ${this.notifications.length}条`)
  }

  // ==================== 事件监听 ====================
  on(event: string, callback: Function) {
    if (!this.listeners.has(event)) {
      this.listeners.set(event, [])
    }
    this.listeners.get(event)?.push(callback)
  }

  off(event: string, callback: Function) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      const index = callbacks.indexOf(callback)
      if (index > -1) {
        callbacks.splice(index, 1)
      }
    }
  }

  private emit(event: string, data?: any) {
    const callbacks = this.listeners.get(event)
    if (callbacks) {
      callbacks.forEach(cb => cb(data))
    }
  }

  // ==================== ID生成器 ====================
  private generateId(prefix: string): string {
    return `${prefix}_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  private getCurrentTime(): string {
    const now = new Date()
    const year = now.getFullYear()
    const month = String(now.getMonth() + 1).padStart(2, '0')
    const day = String(now.getDate()).padStart(2, '0')
    const hour = String(now.getHours()).padStart(2, '0')
    const minute = String(now.getMinutes()).padStart(2, '0')
    return `${year}-${month}-${day} ${hour}:${minute}`
  }

  // ==================== 用户操作 ====================
  getCurrentUser() {
    // 优先返回第一个用户（模拟当前登录用户）
    return this.users.length > 0 ? this.users[0] : null
  }

  // 创建或更新用户信息
  createOrUpdateUser(openid: string, userInfo: any) {
    console.log('🚀 开始创建/更新用户，openid:', openid)
    console.log('📝 本地存储的用户信息:', userInfo)
    
    const existingUser = this.users.find(u => u.openid === openid)
    
    if (existingUser) {
      // 更新现有用户 - 完整同步所有用户信息
      console.log('📝 更新现有用户:', existingUser.id)
      
      // 构建完整的更新数据，确保所有字段都同步
      const updateData = {
        nickname: userInfo.nickname || existingUser.nickname,
        avatar: userInfo.avatar || existingUser.avatar,
        signature: userInfo.signature || existingUser.signature || '这个人很懒，什么都没有留下',
        // 保留原有的统计信息
        followCount: existingUser.followCount || 0,
        fansCount: existingUser.fansCount || 0,
        topicCount: existingUser.topicCount || 0,
        level: existingUser.level || 1,
        points: existingUser.points || 0,
        status: existingUser.status || 'active',
        role: existingUser.role || 'user',
        settings: existingUser.settings || {
          notification: true,
          privacy: 'public'
        }
      }
      
      console.log('📝 更新数据:', updateData)
      return this.updateUser(existingUser.id, updateData)
    } else {
      // 创建新用户 - 插入到测试数据中，使用本地存储的完整信息
      const newUser = {
        id: this.generateId('user'),
        openid: openid,
        nickname: userInfo.nickname,
        avatar: userInfo.avatar,
        createTime: this.getCurrentTime(),
        followCount: 0,
        fansCount: 0, // 新用户粉丝数为0
        topicCount: 0,
        level: 1, // 新用户等级为1
        points: 0, // 新用户积分为0
        signature: userInfo.signature || '这个人很懒，什么都没有留下', // 使用本地存储的签名
        status: 'active',
        role: 'user',
        settings: {
          notification: true,
          privacy: 'public'
        }
      }
      
      // 插入到用户数组开头（作为当前登录用户）
      this.users.unshift(newUser)
      this.emit('userCreated', newUser)
      
      console.log('✅ 创建新用户成功，粉丝数:', newUser.fansCount)
      console.log('📊 当前用户信息:', JSON.stringify(newUser, null, 2))
      return newUser
    }
  }

  getUserById(userId: string) {
    return this.users.find(u => u.id === userId)
  }

  getAllUsers() {
    return [...this.users]
  }

  updateUser(userId: string, updates: any) {
    const index = this.users.findIndex(u => u.id === userId)
    if (index > -1) {
      this.users[index] = { ...this.users[index], ...updates }
      this.emit('userUpdated', this.users[index])
      return this.users[index]
    }
    return null
  }

  // ==================== 帖子操作 ====================
  getTopicById(topicId: string) {
    return this.topics.find(t => t.id === topicId)
  }

  getAllTopics() {
    return [...this.topics]
  }

  getNormalTopics() {
    return this.topics
      .filter(t => t.type === 'normal' && t.status === 'published')
      .sort((a, b) => new Date(b.createTime).getTime() - new Date(a.createTime).getTime())
  }

  getFeaturedTopic() {
    return this.topics.find(t => t.type === 'featured')
  }

  getUserTopics(userId: string) {
    return this.topics.filter(t => t.authorId === userId)
  }

  createTopic(topicData: any) {
    const newTopic = {
      id: this.generateId('topic'),
      ...topicData,
      createTime: this.getCurrentTime(),
      likeCount: 0,
      commentCount: 0,
      viewCount: 0,
      shareCount: 0,
      status: 'published'
    }
    this.topics.push(newTopic)
    this.emit('topicCreated', newTopic)
    return newTopic
  }

  updateTopic(topicId: string, updates: any) {
    const index = this.topics.findIndex(t => t.id === topicId)
    if (index > -1) {
      this.topics[index] = { ...this.topics[index], ...updates }
      this.emit('topicUpdated', this.topics[index])
      return this.topics[index]
    }
    return null
  }

  deleteTopic(topicId: string) {
    const index = this.topics.findIndex(t => t.id === topicId)
    if (index > -1) {
      const deleted = this.topics.splice(index, 1)[0]
      // 删除相关的评论
      this.comments = this.comments.filter(c => c.topicId !== topicId)
      // 删除相关的点赞
      this.likes = this.likes.filter(l => !(l.targetType === 'topic' && l.targetId === topicId))
      // 删除相关的投票
      this.votes = this.votes.filter(v => v.topicId !== topicId)
      // 删除相关的收藏
      this.favorites = this.favorites.filter(f => f.topicId !== topicId)
      this.emit('topicDeleted', deleted)
      return deleted
    }
    return null
  }

  incrementTopicView(topicId: string) {
    const topic = this.getTopicById(topicId)
    if (topic) {
      topic.viewCount = (topic.viewCount || 0) + 1
      this.emit('topicViewed', topic)
    }
  }

  // ==================== 评论操作 ====================
  getCommentById(commentId: string) {
    return this.comments.find(c => c.id === commentId)
  }

  getTopicComments(topicId: string) {
    return this.comments
      .filter(c => c.topicId === topicId)
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  }

  getCommentReplies(commentId: string) {
    return this.comments
      .filter(c => c.parentId === commentId)
      .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
  }

  getCommentTree(topicId: string) {
    const topicComments = this.comments.filter(c => c.topicId === topicId)
    const rootComments = topicComments.filter(c => !c.parentId)
    const replies = topicComments.filter(c => c.parentId)
    
    return rootComments.map(root => ({
      ...root,
      replies: replies
        .filter(r => r.parentId === root.id)
        .sort((a, b) => new Date(a.time).getTime() - new Date(b.time).getTime())
    })).sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  }

  getUserComments(userId: string) {
    return this.comments
      .filter(c => c.userId === userId)
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  }

  createComment(commentData: any) {
    const newComment = {
      id: this.generateId('comment'),
      ...commentData,
      time: this.getCurrentTime(),
      likeCount: 0,
      replyCount: 0,
      status: 'active'
    }
    this.comments.push(newComment)
    
    // 更新帖子的评论计数
    const topic = this.getTopicById(commentData.topicId)
    if (topic) {
      topic.commentCount = (topic.commentCount || 0) + 1
    }
    
    // 如果是回复，更新父评论的回复计数
    if (commentData.parentId) {
      const parentComment = this.getCommentById(commentData.parentId)
      if (parentComment) {
        parentComment.replyCount = (parentComment.replyCount || 0) + 1
      }
    }
    
    this.emit('commentCreated', newComment)
    return newComment
  }

  deleteComment(commentId: string) {
    const index = this.comments.findIndex(c => c.id === commentId)
    if (index > -1) {
      const deleted = this.comments.splice(index, 1)[0]
      
      // 更新帖子的评论计数
      const topic = this.getTopicById(deleted.topicId)
      if (topic) {
        topic.commentCount = Math.max(0, (topic.commentCount || 0) - 1)
      }
      
      // 删除所有回复
      const replies = this.comments.filter(c => c.parentId === commentId)
      replies.forEach(reply => this.deleteComment(reply.id))
      
      // 删除相关的点赞
      this.likes = this.likes.filter(l => !(l.targetType === 'comment' && l.targetId === commentId))
      
      this.emit('commentDeleted', deleted)
      return deleted
    }
    return null
  }

  // ==================== 点赞操作 ====================
  isLiked(userId: string, targetType: string, targetId: string) {
    return this.likes.some(l => 
      l.userId === userId && 
      l.targetType === targetType && 
      l.targetId === targetId
    )
  }

  toggleLike(userId: string, targetType: string, targetId: string) {
    const existing = this.likes.find(l => 
      l.userId === userId && 
      l.targetType === targetType && 
      l.targetId === targetId
    )
    
    if (existing) {
      // 取消点赞
      this.likes = this.likes.filter(l => l !== existing)
      
      // 更新目标对象的点赞计数
      if (targetType === 'topic') {
        const topic = this.getTopicById(targetId)
        if (topic) {
          topic.likeCount = Math.max(0, (topic.likeCount || 0) - 1)
        }
      } else if (targetType === 'comment') {
        const comment = this.getCommentById(targetId)
        if (comment) {
          comment.likeCount = Math.max(0, (comment.likeCount || 0) - 1)
        }
      }
      
      this.emit('likeRemoved', { userId, targetType, targetId })
      return false
    } else {
      // 添加点赞
      const newLike = {
        userId,
        targetType,
        targetId,
        time: this.getCurrentTime()
      }
      this.likes.push(newLike)
      
      // 更新目标对象的点赞计数
      if (targetType === 'topic') {
        const topic = this.getTopicById(targetId)
        if (topic) {
          topic.likeCount = (topic.likeCount || 0) + 1
        }
        
        // 如果点赞的是别人的帖子，创建通知
        if (topic && topic.authorId !== userId) {
          this.createNotification({
            userId: topic.authorId,
            type: 'like',
            title: `${this.getUserById(userId)?.nickname}点赞了你的话题`,
            content: `${this.getUserById(userId)?.nickname}点赞了你发布的"${topic.title}"`,
            sourceId: targetId,
            sourceType: 'topic',
            fromUserId: userId
          })
        }
      } else if (targetType === 'comment') {
        const comment = this.getCommentById(targetId)
        if (comment) {
          comment.likeCount = (comment.likeCount || 0) + 1
          
          // 如果点赞的是别人的评论，创建通知
          if (comment.userId !== userId) {
            this.createNotification({
              userId: comment.userId,
              type: 'like',
              title: `${this.getUserById(userId)?.nickname}点赞了你的评论`,
              content: `${this.getUserById(userId)?.nickname}点赞了你的评论`,
              sourceId: targetId,
              sourceType: 'comment',
              fromUserId: userId
            })
          }
        }
      }
      
      this.emit('likeAdded', newLike)
      return true
    }
  }

  // ==================== 投票操作 ====================
  getVote(userId: string, topicId: string) {
    const vote = this.votes.find(v => v.userId === userId && v.topicId === topicId)
    return vote ? vote.choice : null
  }

  castVote(userId: string, topicId: string, choice: string) {
    const topic = this.getTopicById(topicId)
    if (!topic || !topic.content) return null
    
    // 查找投票内容
    let voteContent = null
    for (const item of topic.content) {
      if (item.type === 'vote') {
        voteContent = item.content
        break
      }
    }
    
    if (!voteContent) return null
    
    const existingVote = this.votes.find(v => v.userId === userId && v.topicId === topicId)
    
    if (existingVote) {
      // 更新现有投票
      const oldChoice = existingVote.choice
      existingVote.choice = choice
      existingVote.time = this.getCurrentTime()
      
      // 更新投票计数
      if (oldChoice === 'positive') {
        voteContent.positive.count = Math.max(0, (voteContent.positive.count || 0) - 1)
      } else if (oldChoice === 'negative') {
        voteContent.negative.count = Math.max(0, (voteContent.negative.count || 0) - 1)
      }
      
      if (choice === 'positive') {
        voteContent.positive.count = (voteContent.positive.count || 0) + 1
      } else if (choice === 'negative') {
        voteContent.negative.count = (voteContent.negative.count || 0) + 1
      }
      
      voteContent.totalVotes = (voteContent.positive.count || 0) + (voteContent.negative.count || 0)
    } else {
      // 创建新投票
      const newVote = {
        userId,
        topicId,
        choice,
        time: this.getCurrentTime()
      }
      this.votes.push(newVote)
      
      // 更新投票计数
      if (choice === 'positive') {
        voteContent.positive.count = (voteContent.positive.count || 0) + 1
      } else if (choice === 'negative') {
        voteContent.negative.count = (voteContent.negative.count || 0) + 1
      }
      
      voteContent.totalVotes = (voteContent.positive.count || 0) + (voteContent.negative.count || 0)
    }
    
    this.emit('voteCast', { userId, topicId, choice })
    return voteContent
  }

  // ==================== 收藏操作 ====================
  isFavorited(userId: string, topicId: string) {
    return this.favorites.some(f => f.userId === userId && f.topicId === topicId)
  }

  getUserFavorites(userId: string) {
    const favoriteIds = this.favorites
      .filter(f => f.userId === userId)
      .map(f => f.topicId)
    return this.topics.filter(t => favoriteIds.includes(t.id))
  }

  toggleFavorite(userId: string, topicId: string) {
    console.log('【app.ts】toggleFavorite 调用，用户ID:', userId, '话题ID:', topicId)
    
    const existing = this.favorites.find(f => f.userId === userId && f.topicId === topicId)
    
    if (existing) {
      // 取消收藏
      console.log('【app.ts】取消收藏，用户ID:', userId, '话题ID:', topicId)
      this.favorites = this.favorites.filter(f => f !== existing)
      this.emit('favoriteRemoved', { userId, topicId })
      console.log('【app.ts】取消收藏成功，当前收藏总数:', this.favorites.length)
      return false
    } else {
      // 添加收藏
      console.log('【app.ts】添加收藏，用户ID:', userId, '话题ID:', topicId)
      const newFavorite = {
        userId,
        topicId,
        time: this.getCurrentTime()
      }
      this.favorites.push(newFavorite)
      this.emit('favoriteAdded', newFavorite)
      console.log('【app.ts】添加收藏成功，当前收藏总数:', this.favorites.length)
      return true
    }
  }

  // ==================== 关注操作 ====================
  isFollowing(userId: string, targetUserId: string) {
    return this.follows.some(f => f.userId === userId && f.followUserId === targetUserId)
  }

  getUserFollowing(userId: string) {
    const followingIds = this.follows
      .filter(f => f.userId === userId)
      .map(f => f.followUserId)
    return this.users.filter(u => followingIds.includes(u.id))
  }

  getUserFollowers(userId: string) {
    const followerIds = this.follows
      .filter(f => f.followUserId === userId)
      .map(f => f.userId)
    return this.users.filter(u => followerIds.includes(u.id))
  }

  toggleFollow(userId: string, targetUserId: string) {
    if (userId === targetUserId) return false
    
    const existing = this.follows.find(f => f.userId === userId && f.followUserId === targetUserId)
    
    if (existing) {
      // 取消关注
      this.follows = this.follows.filter(f => f !== existing)
      
      // 更新计数
      const user = this.getUserById(userId)
      if (user) {
        user.followCount = Math.max(0, (user.followCount || 0) - 1)
      }
      const targetUser = this.getUserById(targetUserId)
      if (targetUser) {
        targetUser.fansCount = Math.max(0, (targetUser.fansCount || 0) - 1)
      }
      
      this.emit('followRemoved', { userId, targetUserId })
      return false
    } else {
      // 添加关注
      const newFollow = {
        userId,
        followUserId: targetUserId,
        followTime: this.getCurrentTime()
      }
      this.follows.push(newFollow)
      
      // 更新计数
      const user = this.getUserById(userId)
      if (user) {
        user.followCount = (user.followCount || 0) + 1
      }
      const targetUser = this.getUserById(targetUserId)
      if (targetUser) {
        targetUser.fansCount = (targetUser.fansCount || 0) + 1
      }
      
      // 创建通知
      this.createNotification({
        userId: targetUserId,
        type: 'follow',
        title: `${this.getUserById(userId)?.nickname}关注了你`,
        content: `${this.getUserById(userId)?.nickname}成为了你的新粉丝`,
        sourceType: 'follow',
        fromUserId: userId
      })
      
      this.emit('followAdded', newFollow)
      return true
    }
  }

  // ==================== 通知操作 ====================
  getUserNotifications(userId: string) {
    return this.notifications
      .filter(n => n.userId === userId)
      .sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime())
  }

  getUnreadNotificationCount(userId: string) {
    return this.notifications.filter(n => n.userId === userId && !n.read).length
  }

  createNotification(notificationData: any) {
    const newNotification = {
      id: this.generateId('notify'),
      ...notificationData,
      time: this.getCurrentTime(),
      read: false
    }
    this.notifications.push(newNotification)
    this.emit('notificationCreated', newNotification)
    return newNotification
  }

  markNotificationAsRead(notificationId: string) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification) {
      notification.read = true
      this.emit('notificationRead', notification)
    }
  }

  markAllNotificationsAsRead(userId: string) {
    this.notifications.forEach(n => {
      if (n.userId === userId && !n.read) {
        n.read = true
      }
    })
    this.emit('allNotificationsRead', userId)
  }

  // ==================== 数据统计 ====================
  getUserStats(userId: string) {
    const userTopics = this.topics.filter(t => t.authorId === userId)
    const userComments = this.comments.filter(c => c.userId === userId)
    const userLikes = this.likes.filter(l => l.userId === userId)
    const userFavorites = this.favorites.filter(f => f.userId === userId)
    const userFollowers = this.follows.filter(f => f.followUserId === userId)
    const userFollowing = this.follows.filter(f => f.userId === userId)
    
    return {
      topicCount: userTopics.length,
      commentCount: userComments.length,
      likeGivenCount: userLikes.length,
      favoriteCount: userFavorites.length,
      followerCount: userFollowers.length,
      followingCount: userFollowing.length,
      totalLikesReceived: userTopics.reduce((sum, t) => sum + t.likeCount, 0) + 
                         userComments.reduce((sum, c) => sum + c.likeCount, 0),
      totalViewsReceived: userTopics.reduce((sum, t) => sum + (t.viewCount || 0), 0)
    }
  }

  getHotTopics(limit: number = 10) {
    return this.topics
      .filter(t => t.status === 'published')
      .map(topic => ({
        ...topic,
        hotScore: topic.likeCount * 2 + topic.commentCount * 3 + topic.viewCount * 0.5 + topic.shareCount * 5
      }))
      .sort((a, b) => b.hotScore - a.hotScore)
      .slice(0, limit)
  }

  getRecommendedTopics(limit: number = 10) {
    return this.topics
      .filter(t => t.status === 'published')
      .map(topic => ({
        ...topic,
        score: topic.likeCount * 1.5 + topic.commentCount * 2 + Math.random() * 10
      }))
      .sort((a, b) => b.score - a.score)
      .slice(0, limit)
  }

  // ==================== 数据重置 ====================
  resetToInitial() {
    this.users = JSON.parse(JSON.stringify(initialUsers))
    this.topics = JSON.parse(JSON.stringify(initialTopics))
    this.comments = JSON.parse(JSON.stringify(initialComments))
    this.follows = JSON.parse(JSON.stringify(initialFollows))
    this.likes = JSON.parse(JSON.stringify(initialLikes))
    this.votes = JSON.parse(JSON.stringify(initialVotes))
    this.favorites = JSON.parse(JSON.stringify(initialFavorites))
    this.notifications = JSON.parse(JSON.stringify(initialNotifications))
    this.config = JSON.parse(JSON.stringify(config))
    
    this.emit('dataReset')
    console.log('🔄 数据已重置为初始状态')
  }

  // ==================== 数据导出 ====================
  exportData() {
    return {
      users: this.users,
      topics: this.topics,
      comments: this.comments,
      follows: this.follows,
      likes: this.likes,
      votes: this.votes,
      favorites: this.favorites,
      notifications: this.notifications,
      config: this.config
    }
  }
}

// ==================== 创建数据服务实例 ====================
const dataService = new DataService()

// ==================== App 实例 ====================
App<IAppOption>({
  globalData: dataService,
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 检查本地是否有登录信息
    const localUserInfo = wx.getStorageSync('userInfo')
    
    if (localUserInfo && localUserInfo.openid) {
      console.log('🚀 从本地存储恢复用户信息:', localUserInfo)
      
      // 使用本地存储的用户信息（确保包含所有字段）
      const userInfo = {
        nickname: localUserInfo.nickname || '微信用户' + localUserInfo.openid.slice(-4),
        avatar: localUserInfo.avatar || 'https://api.dicebear.com/7.x/bottts/png?seed=WeChat&size=100',
        signature: localUserInfo.signature || '这个人很懒，什么都没有留下',
        openid: localUserInfo.openid
      }
      
      console.log('📝 完整用户信息:', userInfo)
      const currentUser = this.globalData.createOrUpdateUser(localUserInfo.openid, userInfo)
      console.log('✅ 恢复用户成功:', JSON.stringify(currentUser, null, 2))
    } else {
      console.log('🔐 本地无用户信息，开始登录流程')
      
      // 登录
      wx.login({
        success: res => {
          console.log('登录成功，获取到:', res)
          
          // 模拟获取openid（实际开发中需要调用后端接口）
          // 这里使用code作为openid的模拟，实际应该是后端返回的openid
          const openid = res.code
          const openidSuffix = openid.slice(-4) // 获取openid后4位
          const nickname = '微信用户' + openidSuffix
          
          console.log('生成的openid:', openid)
          console.log('生成昵称:', nickname)
          
          // 使用默认头像
          const defaultAvatar = 'https://api.dicebear.com/7.x/bottts/png?seed=WeChat&size=100'
          
          // 创建或更新用户信息
          const userInfo = {
            nickname: nickname,
            avatar: defaultAvatar,
            openid: openid
          }
          
          // 保存到本地存储
          wx.setStorageSync('userInfo', userInfo)
          console.log('💾 用户信息已保存到本地存储')
          
          const currentUser = this.globalData.createOrUpdateUser(openid, userInfo)
          console.log('✅ 创建用户成功:', JSON.stringify(currentUser, null, 2))
        },
        fail: err => {
          console.log('登录失败:', err)
        }
      })
    }
  },

  // 简化的登录逻辑，使用wx.login获取openid作为用户ID
})

// 导出类型定义供其他文件使用
export interface IAppOption {
  globalData: DataService
}

export default dataService