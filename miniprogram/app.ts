// app.ts
App<IAppOption>({
  globalData: {
    // 用户信息
    userInfo: {
      id: 'user_001',
      nickname: '小明',
      avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png',
      level: 2,
      points: 150,
      followCount: 25,
      fansCount: 18,
      signature: '热爱生活，分享美好时光'
    },
    
    // 特色话题 - 专门的数据源
    featuredTopic: {
      id: 'featured_topic_001',
      title: '热门话题：人工智能时代的机遇与挑战',
      content: [
        { type: 'text', content: '随着人工智能技术的飞速发展，我们正处在一个前所未有的变革时代。AI不仅改变了我们的生活方式，也在重新定义工作的本质。' },
        { type: 'image', content: 'https://example.com/ai_technology.jpg' },
        { type: 'text', content: '从自动驾驶到智能医疗，从个性化推荐到智能制造，AI正在各个领域展现其强大的能力。但同时也引发了许多讨论和思考。' },
        { type: 'vote', content: {
          title: '人工智能是否会取代人类工作？',
          positive: {
            text: '正方：会取代',
            count: 156
          },
          negative: {
            text: '反方：不会取代',
            count: 89
          },
          totalVotes: 245,
          userVoted: false,
          userChoice: null
        }},
        { type: 'text', content: '你认为AI会带来哪些机遇和挑战？欢迎在评论区分享你的观点！' },
        { type: 'image', content: 'https://example.com/ai_discussion.jpg' }
      ],
      author: {
        id: 'user_001',
        nickname: '小明',
        avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
      },
      createTime: '2025-03-09 08:00:00',
      likeCount: 156,
      commentCount: 89
    },

    // 话题列表 - 图文混排格式
    topics: [
      {
        id: 'topic_001',
        title: '今天天气真好，适合出去玩',
        content: [
          { type: 'image', content: 'https://example.com/sunny_day.jpg' },
          { type: 'text', content: '阳光明媚，微风拂面，正是出游的好时机！' },
          { type: 'image', content: 'https://example.com/sunny_day.jpg' },
          { type: 'text', content: '大家今天有什么安排吗？' },
          { type: 'vote', content: {
            title: '人工智能是否会取代人类工作？',
            positive: {
              text: '正方：会取代',
              count: 11111111
            },
            negative: {
              text: '反方：不会取代',
              count: 11111111
            },
            totalVotes: 22222222,
            userVoted: false,
            userChoice: null // 'positive' 或 'negative'
          }},
          { type: 'text', content: '我准备去郊外野餐，带上相机记录美好时光～' },
          { type: 'image', content: 'https://example.com/picnic_setup.jpg' },
          { type: 'image', content: 'https://example.com/camera_gear.jpg' }
        ],
        author: {
          id: 'user_002',
          nickname: '小红',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-06 09:30:00',
        likeCount: 12,
        commentCount: 8
      },
      {
        id: 'topic_002',
        title: '分享一本最近在读的好书',
        content: [
          { type: 'text', content: '最近在读《三体》，科幻小说真的很有意思！' },
          { type: 'image', content: 'https://example.com/three_body_book.jpg' },
          { type: 'text', content: '这本书的想象力非常丰富，特别是关于三体文明的设定。' },
          { type: 'vote', content: {
            title: '纸质书比电子书更有价值吗？',
            positive: {
              text: '正方：纸质书更有价值',
              count: 0
            },
            negative: {
              text: '反方：电子书更方便实用',
              count: 0
            },
            totalVotes: 0,
            userVoted: false,
            userChoice: null
          }},
          { type: 'text', content: '推荐给喜欢科幻的朋友们，绝对值得一读！' },
          { type: 'image', content: 'https://example.com/reading_spot.jpg' }
        ],
        author: {
          id: 'user_003',
          nickname: '小李',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-05 15:20:00',
        likeCount: 25,
        commentCount: 15
      },
      {
        id: 'topic_003',
        title: '美食分享：自制披萨教程',
        content: [
          { type: 'text', content: '今天尝试做了自制披萨，味道超级棒！' },
          { type: 'image', content: 'https://example.com/pizza_dough.jpg' },
          { type: 'text', content: '分享一下制作过程：' },
          { type: 'text', content: '1. 准备面团：高筋面粉200g，酵母3g，温水120ml' },
          { type: 'image', content: 'https://example.com/pizza_toppings.jpg' },
          { type: 'text', content: '2. 添加配料：番茄酱、芝士、香肠、蘑菇、青椒' },
          { type: 'image', content: 'https://example.com/pizza_finished.jpg' },
          { type: 'text', content: '3. 烘烤：预热烤箱220度，烤15分钟即可' }
        ],
        author: {
          id: 'user_004',
          nickname: '小张',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-04 19:45:00',
        likeCount: 38,
        commentCount: 22
        // 这个帖子没有投票模块
      },
      {
        id: 'topic_004',
        title: '周末旅行日记',
        content: [
          { type: 'text', content: '周末去了一个很美的小镇，分享一些照片～' },
          { type: 'image', content: 'https://example.com/town_view.jpg' },
          { type: 'text', content: '这里的建筑很有特色，红砖绿瓦，古色古香。' },
          { type: 'image', content: 'https://example.com/local_food.jpg' },
          { type: 'text', content: '还尝了当地的特色小吃，味道很不错！' },
          { type: 'vote', content: {
            title: '远程办公比办公室办公更好吗？',
            positive: {
              text: '正方：远程办公更自由高效',
              count: 0
            },
            negative: {
              text: '反方：办公室办公更有协作氛围',
              count: 0
            },
            totalVotes: 0,
            userVoted: false,
            userChoice: null
          }},
          { type: 'image', content: 'https://example.com/scenery1.jpg' },
          { type: 'image', content: 'https://example.com/scenery2.jpg' },
          { type: 'image', content: 'https://example.com/scenery3.jpg' },
          { type: 'text', content: '很推荐大家周末来这里放松一下！' }
        ],
        author: {
          id: 'user_005',
          nickname: '小王',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-03 11:20:00',
        likeCount: 42,
        commentCount: 28
      }
    ],
 
    
    // 系统配置
    config: {
      appName: '蜂鸣',
      version: '1.0.0',
      theme: 'light',
      notification: true,
      autoPlayVideo: false,
      language: 'zh-CN'
    },
    
    // 消息通知
    notifications: [
      {
        id: 'notify_001',
        type: 'like',
        title: '小红点赞了你的话题',
        content: '小红点赞了你发布的"今天天气真好"',
        time: '2025-03-06 10:15:00',
        read: false
      },
      {
        id: 'notify_002',
        type: 'comment',
        title: '小李评论了你的话题',
        content: '小李：这本书我也很喜欢！',
        time: '2025-03-06 09:45:00',
        read: true
      },
      {
        id: 'notify_003',
        type: 'follow',
        title: '小张关注了你',
        content: '小张成为了你的粉丝',
        time: '2025-03-05 16:30:00',
        read: true
      }
    ]
  },
  
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        console.log(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})