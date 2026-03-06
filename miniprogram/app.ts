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
    
    // 话题列表
    topics: [
      {
        id: 'topic_001',
        title: '今天天气真好，适合出去玩',
        content: '阳光明媚，微风拂面，正是出游的好时机！大家今天有什么安排吗？',
        author: {
          id: 'user_002',
          nickname: '小红',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-06 09:30:00',
        likeCount: 12,
        commentCount: 8,
        images: [
          'https://example.com/image1.jpg',
          'https://example.com/image2.jpg'
        ],
        tags: ['生活', '出游', '天气']
      },
      {
        id: 'topic_002',
        title: '分享一本最近在读的好书',
        content: '最近在读《三体》，科幻小说真的很有意思，推荐给大家！',
        author: {
          id: 'user_003',
          nickname: '小李',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-05 15:20:00',
        likeCount: 25,
        commentCount: 15,
        images: [
          'https://example.com/book1.jpg'
        ],
        tags: ['读书', '科幻', '推荐']
      },
      {
        id: 'topic_003',
        title: '美食分享：自制披萨教程',
        content: '今天尝试做了自制披萨，味道超级棒！分享一下制作过程～',
        author: {
          id: 'user_004',
          nickname: '小张',
          avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJyVv5qYJw4KqgK0H5UcX9T6P7R8S9T0V1W2X3Y4Z5A6B7C8D9E0F.png'
        },
        createTime: '2025-03-04 19:45:00',
        likeCount: 38,
        commentCount: 22,
        images: [
          'https://example.com/pizza1.jpg',
          'https://example.com/pizza2.jpg',
          'https://example.com/pizza3.jpg'
        ],
        tags: ['美食', '教程', '披萨']
      }
    ],
    
    // 分类标签
    categories: [
      { id: 'cat_001', name: '生活', count: 156 },
      { id: 'cat_002', name: '美食', count: 89 },
      { id: 'cat_003', name: '读书', count: 67 },
      { id: 'cat_004', name: '旅行', count: 45 },
      { id: 'cat_005', name: '科技', count: 32 },
      { id: 'cat_006', name: '运动', count: 28 }
    ],
    
    // 热门标签
    hotTags: [
      { id: 'tag_001', name: '美食推荐', count: 123 },
      { id: 'tag_002', name: '读书分享', count: 98 },
      { id: 'tag_003', name: '生活技巧', count: 76 },
      { id: 'tag_004', name: '旅行攻略', count: 65 },
      { id: 'tag_005', name: '健身打卡', count: 54 }
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