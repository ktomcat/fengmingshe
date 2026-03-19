// app.ts

// ==================== 头像池 ====================
const avatarPool = [
  // randomuser.me 男性头像
  'https://randomuser.me/api/portraits/men/1.jpg',
  'https://randomuser.me/api/portraits/men/5.jpg',
  'https://randomuser.me/api/portraits/men/12.jpg',
  'https://randomuser.me/api/portraits/men/18.jpg',
  'https://randomuser.me/api/portraits/men/23.jpg',
  'https://randomuser.me/api/portraits/men/27.jpg',
  'https://randomuser.me/api/portraits/men/32.jpg',
  'https://randomuser.me/api/portraits/men/36.jpg',
  'https://randomuser.me/api/portraits/men/41.jpg',
  'https://randomuser.me/api/portraits/men/45.jpg',
  'https://randomuser.me/api/portraits/men/49.jpg',
  'https://randomuser.me/api/portraits/men/52.jpg',
  'https://randomuser.me/api/portraits/men/58.jpg',
  'https://randomuser.me/api/portraits/men/63.jpg',
  'https://randomuser.me/api/portraits/men/67.jpg',
  'https://randomuser.me/api/portraits/men/72.jpg',
  'https://randomuser.me/api/portraits/men/76.jpg',
  'https://randomuser.me/api/portraits/men/81.jpg',
  'https://randomuser.me/api/portraits/men/85.jpg',
  'https://randomuser.me/api/portraits/men/92.jpg',
  
  // randomuser.me 女性头像
  'https://randomuser.me/api/portraits/women/2.jpg',
  'https://randomuser.me/api/portraits/women/7.jpg',
  'https://randomuser.me/api/portraits/women/11.jpg',
  'https://randomuser.me/api/portraits/women/16.jpg',
  'https://randomuser.me/api/portraits/women/20.jpg',
  'https://randomuser.me/api/portraits/women/24.jpg',
  'https://randomuser.me/api/portraits/women/29.jpg',
  'https://randomuser.me/api/portraits/women/33.jpg',
  'https://randomuser.me/api/portraits/women/38.jpg',
  'https://randomuser.me/api/portraits/women/42.jpg',
  'https://randomuser.me/api/portraits/women/46.jpg',
  'https://randomuser.me/api/portraits/women/51.jpg',
  'https://randomuser.me/api/portraits/women/55.jpg',
  'https://randomuser.me/api/portraits/women/59.jpg',
  'https://randomuser.me/api/portraits/women/64.jpg',
  'https://randomuser.me/api/portraits/women/68.jpg',
  'https://randomuser.me/api/portraits/women/73.jpg',
  'https://randomuser.me/api/portraits/women/77.jpg',
  'https://randomuser.me/api/portraits/women/82.jpg',
  'https://randomuser.me/api/portraits/women/88.jpg',
  
  // dicebear 机器人头像
  'https://api.dicebear.com/7.x/bottts/png?seed=Fluffy&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=Robot1&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=CatBot&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=DogBot&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=BearBot&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=Panda&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=Kitty&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=Penguin&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=Monkey&size=100',
  'https://api.dicebear.com/7.x/bottts/png?seed=Elephant&size=100',
  
  // dicebear 像素艺术头像
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Mario&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Luigi&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Peach&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Toad&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Yoshi&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Link&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Zelda&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Samus&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Kirby&size=100',
  'https://api.dicebear.com/7.x/pixel-art/png?seed=Pikachu&size=100',
  
  // dicebear 冒险者头像
  'https://api.dicebear.com/7.x/adventurer/png?seed=Alex&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Jordan&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Taylor&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Casey&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Riley&size=100',
  
  // dicebear Micah 头像
  'https://api.dicebear.com/7.x/micah/png?seed=Emma&size=100',
  'https://api.dicebear.com/7.x/micah/png?seed=Olivia&size=100',
  'https://api.dicebear.com/7.x/micah/png?seed=Noah&size=100',
  'https://api.dicebear.com/7.x/micah/png?seed=Liam&size=100',
  'https://api.dicebear.com/7.x/micah/png?seed=James&size=100',
  
  // picsum 照片头像
  'https://picsum.photos/id/100/200/200',
  'https://picsum.photos/id/101/200/200',
  'https://picsum.photos/id/102/200/200',
  'https://picsum.photos/id/103/200/200',
  'https://picsum.photos/id/104/200/200',
  'https://picsum.photos/id/106/200/200',
  'https://picsum.photos/id/107/200/200',
  'https://picsum.photos/id/108/200/200',
  'https://picsum.photos/id/169/200/200',
  'https://picsum.photos/id/155/200/200'
]

// 根据用户ID获取固定头像
function getUserAvatar(userId: string) {
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i)
    hash = hash & hash
  }
  const index = Math.abs(hash) % avatarPool.length
  return avatarPool[index]
}

// ==================== 初始数据（经过严谨验证的） ====================
const initialUsers = [
  {
    id: 'user_001',
    nickname: '小明',
    avatar: getUserAvatar('user_001'),
    level: 2,
    points: 150,
    followCount: 25,
    fansCount: 18,
    signature: '热爱生活，分享美好时光',
    email: 'xiaoming@example.com',
    phone: '138****1234',
    gender: 'male',
    birthday: '1995-06-15',
    registerTime: '2023-01-15 10:30',
    lastLoginTime: '2025-03-19 08:45',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_002',
    nickname: '教育观察者',
    avatar: getUserAvatar('user_002'),
    level: 3,
    points: 320,
    followCount: 45,
    fansCount: 67,
    signature: '关注教育领域发展',
    email: 'edu@example.com',
    phone: '139****5678',
    gender: 'male',
    birthday: '1990-08-22',
    registerTime: '2023-02-20 14:20',
    lastLoginTime: '2025-03-18 19:30',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_003',
    nickname: '职场观察员',
    avatar: getUserAvatar('user_003'),
    level: 2,
    points: 180,
    followCount: 32,
    fansCount: 28,
    signature: '职场领域观察员',
    email: 'work@example.com',
    phone: '137****9012',
    gender: 'male',
    birthday: '1992-12-03',
    registerTime: '2023-03-10 09:15',
    lastLoginTime: '2025-03-19 10:20',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_004',
    nickname: '社会观察家',
    avatar: getUserAvatar('user_004'),
    level: 5,
    points: 850,
    followCount: 120,
    fansCount: 2300,
    signature: '资深社会观察员',
    email: 'society@example.com',
    phone: '136****3456',
    gender: 'male',
    birthday: '1985-05-18',
    registerTime: '2022-11-05 16:40',
    lastLoginTime: '2025-03-18 22:15',
    status: 'active',
    role: 'expert',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_005',
    nickname: '80后独生子',
    avatar: getUserAvatar('user_005'),
    level: 4,
    points: 560,
    followCount: 85,
    fansCount: 1800,
    signature: '分享生活感悟',
    email: 'post80@example.com',
    phone: '135****7890',
    gender: 'male',
    birthday: '1988-09-27',
    registerTime: '2022-12-12 11:30',
    lastLoginTime: '2025-03-19 09:10',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_006',
    nickname: '教育科技观察者',
    avatar: getUserAvatar('user_006'),
    level: 3,
    points: 420,
    followCount: 56,
    fansCount: 890,
    signature: '关注教育科技发展',
    email: 'edutech@example.com',
    phone: '134****5678',
    gender: 'male',
    birthday: '1991-04-12',
    registerTime: '2023-04-05 10:20',
    lastLoginTime: '2025-03-18 16:30',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_007',
    nickname: '楼市观察者',
    avatar: getUserAvatar('user_007'),
    level: 3,
    points: 380,
    followCount: 67,
    fansCount: 1200,
    signature: '房产领域观察员',
    email: 'house@example.com',
    phone: '133****9012',
    gender: 'male',
    birthday: '1989-11-23',
    registerTime: '2023-05-12 14:45',
    lastLoginTime: '2025-03-19 11:20',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_008',
    nickname: '育儿那些事儿',
    avatar: getUserAvatar('user_008'),
    level: 4,
    points: 620,
    followCount: 134,
    fansCount: 3500,
    signature: '育儿经验分享',
    email: 'parent@example.com',
    phone: '132****3456',
    gender: 'female',
    birthday: '1990-03-18',
    registerTime: '2022-09-15 09:30',
    lastLoginTime: '2025-03-18 21:15',
    status: 'active',
    role: 'expert',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_009',
    nickname: 'AI工程师小李',
    avatar: getUserAvatar('user_009'),
    level: 3,
    points: 380,
    followCount: 78,
    fansCount: 980,
    signature: 'AI工程师，专注大模型应用',
    email: 'ai_li@example.com',
    phone: '131****7890',
    gender: 'male',
    birthday: '1991-04-25',
    registerTime: '2023-05-22 15:30',
    lastLoginTime: '2025-03-18 23:20',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_010',
    nickname: '焦虑的程序员',
    avatar: getUserAvatar('user_010'),
    level: 2,
    points: 120,
    followCount: 34,
    fansCount: 678,
    signature: '35岁危机中，求安慰',
    email: 'coder@example.com',
    phone: '130****1234',
    gender: 'male',
    birthday: '1990-01-30',
    registerTime: '2023-06-15 12:45',
    lastLoginTime: '2025-03-19 08:30',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_011',
    nickname: '插画师小美',
    avatar: getUserAvatar('user_011'),
    level: 3,
    points: 340,
    followCount: 89,
    fansCount: 2300,
    signature: '自由插画师，AI焦虑中',
    email: 'mei@example.com',
    phone: '139****1122',
    gender: 'female',
    birthday: '1994-09-12',
    registerTime: '2023-07-08 16:20',
    lastLoginTime: '2025-03-18 14:10',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_012',
    nickname: '哲学系学生',
    avatar: getUserAvatar('user_012'),
    level: 1,
    points: 65,
    followCount: 23,
    fansCount: 156,
    signature: '思考人生的意义',
    email: 'philosophy@example.com',
    phone: '138****3344',
    gender: 'male',
    birthday: '2001-10-03',
    registerTime: '2024-02-20 10:15',
    lastLoginTime: '2025-03-17 21:40',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_013',
    nickname: '大二在读生',
    avatar: getUserAvatar('user_013'),
    level: 1,
    points: 45,
    followCount: 15,
    fansCount: 89,
    signature: '迷茫的大学生',
    email: 'student@example.com',
    phone: '137****5566',
    gender: 'male',
    birthday: '2003-05-20',
    registerTime: '2024-09-01 09:30',
    lastLoginTime: '2025-03-18 20:15',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_014',
    nickname: 'HR老张',
    avatar: getUserAvatar('user_014'),
    level: 4,
    points: 580,
    followCount: 156,
    fansCount: 2800,
    signature: '十年HR经验，聊聊职场',
    email: 'hr@example.com',
    phone: '136****7788',
    gender: 'male',
    birthday: '1985-08-12',
    registerTime: '2022-08-10 11:20',
    lastLoginTime: '2025-03-19 09:45',
    status: 'active',
    role: 'expert',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_015',
    nickname: '自学成才',
    avatar: getUserAvatar('user_015'),
    level: 3,
    points: 340,
    followCount: 67,
    fansCount: 1500,
    signature: '高中毕业，自学编程',
    email: 'self@example.com',
    phone: '135****9900',
    gender: 'male',
    birthday: '1992-02-28',
    registerTime: '2023-03-18 15:40',
    lastLoginTime: '2025-03-18 22:30',
    status: 'active',
    role: 'user',
    settings: {
      notification: true,
      privacy: 'public'
    }
  },
  {
    id: 'user_016',
    nickname: '农村孩子',
    avatar: getUserAvatar('user_016'),
    level: 1,
    points: 35,
    followCount: 5,
    fansCount: 12,
    signature: '努力改变命运',
    email: 'nongcun@example.com',
    phone: '136****1122',
    gender: 'male',
    birthday: '2000-03-15',
    registerTime: '2024-08-20 14:30',
    lastLoginTime: '2025-03-18 20:15',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_017',
    nickname: '留学海归',
    avatar: getUserAvatar('user_017'),
    level: 3,
    points: 280,
    followCount: 45,
    fansCount: 320,
    signature: '分享留学经验',
    email: 'haigui@example.com',
    phone: '137****3344',
    gender: 'female',
    birthday: '1992-11-08',
    registerTime: '2023-09-12 10:20',
    lastLoginTime: '2025-03-17 22:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_018',
    nickname: '大理数字游民',
    avatar: getUserAvatar('user_018'),
    level: 2,
    points: 145,
    followCount: 67,
    fansCount: 890,
    signature: 'UI设计师，数字游民',
    email: 'dali@example.com',
    phone: '138****5566',
    gender: 'female',
    birthday: '1993-07-22',
    registerTime: '2023-11-05 09:15',
    lastLoginTime: '2025-03-19 10:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_019',
    nickname: '想辞职的小王',
    avatar: getUserAvatar('user_019'),
    level: 1,
    points: 45,
    followCount: 23,
    fansCount: 56,
    signature: '纠结中',
    email: 'wang@example.com',
    phone: '139****7788',
    gender: 'male',
    birthday: '1995-09-30',
    registerTime: '2024-01-18 16:40',
    lastLoginTime: '2025-03-18 14:25',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_020',
    nickname: '国企老员工',
    avatar: getUserAvatar('user_020'),
    level: 4,
    points: 520,
    followCount: 89,
    fansCount: 340,
    signature: '国企二十年',
    email: 'guoqi@example.com',
    phone: '135****9900',
    gender: 'male',
    birthday: '1978-04-12',
    registerTime: '2022-06-20 11:30',
    lastLoginTime: '2025-03-18 19:45',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_021',
    nickname: '自由职业者阿杰',
    avatar: getUserAvatar('user_021'),
    level: 2,
    points: 120,
    followCount: 34,
    fansCount: 210,
    signature: '曾经的数字游民',
    email: 'ajie@example.com',
    phone: '136****1234',
    gender: 'male',
    birthday: '1991-12-05',
    registerTime: '2023-10-10 13:20',
    lastLoginTime: '2025-03-17 21:10',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_022',
    nickname: '职场小白',
    avatar: getUserAvatar('user_022'),
    level: 1,
    points: 28,
    followCount: 12,
    fansCount: 23,
    signature: '刚毕业，求指教',
    email: 'xiaobai@example.com',
    phone: '137****5566',
    gender: 'female',
    birthday: '2002-06-18',
    registerTime: '2024-07-22 15:30',
    lastLoginTime: '2025-03-19 09:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_023',
    nickname: '房贷狗',
    avatar: getUserAvatar('user_023'),
    level: 2,
    points: 180,
    followCount: 15,
    fansCount: 45,
    signature: '80后，有房贷',
    email: 'fangdai@example.com',
    phone: '138****1122',
    gender: 'male',
    birthday: '1985-03-12',
    registerTime: '2023-05-20 10:30',
    lastLoginTime: '2025-03-18 20:15',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_024',
    nickname: '00后小陈',
    avatar: getUserAvatar('user_024'),
    level: 1,
    points: 65,
    followCount: 8,
    fansCount: 23,
    signature: '躺平主义者',
    email: 'chen@example.com',
    phone: '139****2233',
    gender: 'male',
    birthday: '2001-08-25',
    registerTime: '2024-01-15 14:20',
    lastLoginTime: '2025-03-19 09:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_025',
    nickname: '焦虑的妈妈',
    avatar: getUserAvatar('user_025'),
    level: 2,
    points: 145,
    followCount: 23,
    fansCount: 67,
    signature: '为孩子操碎心',
    email: 'mama@example.com',
    phone: '136****3344',
    gender: 'female',
    birthday: '1980-11-03',
    registerTime: '2023-09-10 16:45',
    lastLoginTime: '2025-03-18 22:10',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_026',
    nickname: '清醒的姐姐',
    avatar: getUserAvatar('user_026'),
    level: 3,
    points: 290,
    followCount: 45,
    fansCount: 340,
    signature: '活得明白',
    email: 'sister@example.com',
    phone: '137****4455',
    gender: 'female',
    birthday: '1988-07-19',
    registerTime: '2023-04-22 11:30',
    lastLoginTime: '2025-03-18 15:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_027',
    nickname: '创业者老王',
    avatar: getUserAvatar('user_027'),
    level: 4,
    points: 450,
    followCount: 78,
    fansCount: 890,
    signature: '创业不易',
    email: 'laowang@example.com',
    phone: '138****5566',
    gender: 'male',
    birthday: '1982-12-08',
    registerTime: '2022-10-15 09:20',
    lastLoginTime: '2025-03-18 18:45',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_028',
    nickname: '王阿姨的儿子',
    avatar: getUserAvatar('user_028'),
    level: 2,
    points: 130,
    followCount: 23,
    fansCount: 56,
    signature: '北漂一族',
    email: 'son@example.com',
    phone: '139****6677',
    gender: 'male',
    birthday: '1990-06-25',
    registerTime: '2023-08-18 14:30',
    lastLoginTime: '2025-03-18 20:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_029',
    nickname: '心理咨询师',
    avatar: getUserAvatar('user_029'),
    level: 4,
    points: 520,
    followCount: 89,
    fansCount: 1500,
    signature: '倾听你的心声',
    email: 'psychology@example.com',
    phone: '136****7788',
    gender: 'female',
    birthday: '1985-09-14',
    registerTime: '2022-07-12 10:45',
    lastLoginTime: '2025-03-19 08:15',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_030',
    nickname: '邻居大妈',
    avatar: getUserAvatar('user_030'),
    level: 2,
    points: 95,
    followCount: 12,
    fansCount: 34,
    signature: '热心肠',
    email: 'dama@example.com',
    phone: '135****8899',
    gender: 'female',
    birthday: '1965-04-20',
    registerTime: '2023-12-05 09:15',
    lastLoginTime: '2025-03-17 16:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_031',
    nickname: '养老院护工',
    avatar: getUserAvatar('user_031'),
    level: 2,
    points: 110,
    followCount: 18,
    fansCount: 45,
    signature: '用心照顾老人',
    email: 'hugong@example.com',
    phone: '137****9900',
    gender: 'female',
    birthday: '1988-11-30',
    registerTime: '2023-10-22 13:40',
    lastLoginTime: '2025-03-18 21:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_032',
    nickname: '海归女儿',
    avatar: getUserAvatar('user_032'),
    level: 3,
    points: 260,
    followCount: 34,
    fansCount: 120,
    signature: '海外漂泊中',
    email: 'daughter@example.com',
    phone: '138****1123',
    gender: 'female',
    birthday: '1992-02-14',
    registerTime: '2023-06-08 15:30',
    lastLoginTime: '2025-03-18 23:45',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_033',
    nickname: '60后老刘',
    avatar: getUserAvatar('user_033'),
    level: 3,
    points: 310,
    followCount: 45,
    fansCount: 230,
    signature: '退休生活',
    email: 'laoliu@example.com',
    phone: '139****2244',
    gender: 'male',
    birthday: '1962-07-08',
    registerTime: '2023-05-15 10:20',
    lastLoginTime: '2025-03-18 17:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_034',
    nickname: '高一学生',
    avatar: getUserAvatar('user_034'),
    level: 1,
    points: 25,
    followCount: 8,
    fansCount: 15,
    signature: '努力学习中',
    email: 'gaoyi@example.com',
    phone: '136****3355',
    gender: 'male',
    birthday: '2007-03-21',
    registerTime: '2024-09-10 08:45',
    lastLoginTime: '2025-03-19 07:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_035',
    nickname: '高中语文老师',
    avatar: getUserAvatar('user_035'),
    level: 4,
    points: 480,
    followCount: 67,
    fansCount: 890,
    signature: '教书育人',
    email: 'teacher@example.com',
    phone: '137****4466',
    gender: 'female',
    birthday: '1983-09-17',
    registerTime: '2022-09-05 14:20',
    lastLoginTime: '2025-03-18 22:15',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_036',
    nickname: '教育改革派',
    avatar: getUserAvatar('user_036'),
    level: 3,
    points: 290,
    followCount: 45,
    fansCount: 340,
    signature: '推动教育创新',
    email: 'reform@example.com',
    phone: '138****5577',
    gender: 'male',
    birthday: '1987-12-03',
    registerTime: '2023-04-18 11:30',
    lastLoginTime: '2025-03-18 20:45',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_037',
    nickname: '大学教授',
    avatar: getUserAvatar('user_037'),
    level: 5,
    points: 780,
    followCount: 156,
    fansCount: 4500,
    signature: '传道授业解惑',
    email: 'professor@example.com',
    phone: '139****6688',
    gender: 'male',
    birthday: '1975-05-22',
    registerTime: '2022-03-10 09:30',
    lastLoginTime: '2025-03-19 08:50',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_038',
    nickname: '焦虑的家长',
    avatar: getUserAvatar('user_038'),
    level: 2,
    points: 85,
    followCount: 23,
    fansCount: 45,
    signature: '为孩子操心',
    email: 'parent2@example.com',
    phone: '136****7799',
    gender: 'female',
    birthday: '1982-10-11',
    registerTime: '2023-11-20 15:40',
    lastLoginTime: '2025-03-18 19:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_039',
    nickname: '教育专家',
    avatar: getUserAvatar('user_039'),
    level: 5,
    points: 920,
    followCount: 234,
    fansCount: 12000,
    signature: '专注教育研究',
    email: 'expert@example.com',
    phone: '135****8800',
    gender: 'female',
    birthday: '1978-08-28',
    registerTime: '2022-01-15 10:20',
    lastLoginTime: '2025-03-18 21:30',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_040',
    nickname: '杭州阿强',
    avatar: getUserAvatar('user_040'),
    level: 2,
    points: 95,
    followCount: 15,
    fansCount: 34,
    signature: '房奴一枚',
    email: 'aqiang@example.com',
    phone: '137****9911',
    gender: 'male',
    birthday: '1990-04-17',
    registerTime: '2023-07-25 13:15',
    lastLoginTime: '2025-03-18 18:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_041',
    nickname: '投资客',
    avatar: getUserAvatar('user_041'),
    level: 3,
    points: 340,
    followCount: 56,
    fansCount: 230,
    signature: '理性投资',
    email: 'invest@example.com',
    phone: '138****1123',
    gender: 'male',
    birthday: '1986-06-09',
    registerTime: '2023-05-18 10:45',
    lastLoginTime: '2025-03-18 16:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_042',
    nickname: '深圳阿珍',
    avatar: getUserAvatar('user_042'),
    level: 2,
    points: 110,
    followCount: 23,
    fansCount: 67,
    signature: '租房一族',
    email: 'azhen@example.com',
    phone: '139****2233',
    gender: 'female',
    birthday: '1993-02-28',
    registerTime: '2023-08-14 14:30',
    lastLoginTime: '2025-03-18 20:15',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_043',
    nickname: '北漂十年',
    avatar: getUserAvatar('user_043'),
    level: 3,
    points: 260,
    followCount: 45,
    fansCount: 120,
    signature: '终于买房了',
    email: 'beipiao@example.com',
    phone: '136****3344',
    gender: 'male',
    birthday: '1987-11-11',
    registerTime: '2023-06-22 09:20',
    lastLoginTime: '2025-03-18 23:10',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_044',
    nickname: '理财达人',
    avatar: getUserAvatar('user_044'),
    level: 4,
    points: 560,
    followCount: 89,
    fansCount: 2300,
    signature: '分享理财心得',
    email: 'money@example.com',
    phone: '137****4455',
    gender: 'male',
    birthday: '1988-08-08',
    registerTime: '2022-11-12 15:40',
    lastLoginTime: '2025-03-19 09:15',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_045',
    nickname: '累坏的小学生',
    avatar: getUserAvatar('user_045'),
    level: 1,
    points: 15,
    followCount: 3,
    fansCount: 8,
    signature: '想玩',
    email: 'child@example.com',
    phone: '138****5566',
    gender: 'male',
    birthday: '2014-05-20',
    registerTime: '2024-09-15 16:30',
    lastLoginTime: '2025-03-18 19:45',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_046',
    nickname: '孩子妈',
    avatar: getUserAvatar('user_046'),
    level: 2,
    points: 130,
    followCount: 34,
    fansCount: 89,
    signature: '全职妈妈',
    email: 'mom@example.com',
    phone: '139****6677',
    gender: 'female',
    birthday: '1988-12-12',
    registerTime: '2023-10-08 10:15',
    lastLoginTime: '2025-03-18 21:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_047',
    nickname: '快乐教育爸爸',
    avatar: getUserAvatar('user_047'),
    level: 2,
    points: 95,
    followCount: 23,
    fansCount: 56,
    signature: '佛系育儿',
    email: 'dad@example.com',
    phone: '136****7788',
    gender: 'male',
    birthday: '1985-07-19',
    registerTime: '2023-09-25 14:20',
    lastLoginTime: '2025-03-18 17:50',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_048',
    nickname: '钢琴老师',
    avatar: getUserAvatar('user_048'),
    level: 4,
    points: 480,
    followCount: 67,
    fansCount: 1500,
    signature: '教琴十余年',
    email: 'piano@example.com',
    phone: '137****8899',
    gender: 'female',
    birthday: '1984-03-25',
    registerTime: '2022-12-05 11:30',
    lastLoginTime: '2025-03-18 20:40',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_049',
    nickname: '琴童家长',
    avatar: getUserAvatar('user_049'),
    level: 2,
    points: 75,
    followCount: 18,
    fansCount: 34,
    signature: '陪练中',
    email: 'qintong@example.com',
    phone: '138****9900',
    gender: 'female',
    birthday: '1986-09-30',
    registerTime: '2023-11-18 15:45',
    lastLoginTime: '2025-03-18 19:15',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_050',
    nickname: '过来人',
    avatar: getUserAvatar('user_050'),
    level: 3,
    points: 290,
    followCount: 45,
    fansCount: 230,
    signature: '经验分享',
    email: '过来人@example.com',
    phone: '139****1122',
    gender: 'male',
    birthday: '1980-01-15',
    registerTime: '2023-07-12 10:30',
    lastLoginTime: '2025-03-18 22:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_051',
    nickname: 'UI设计师小王',
    avatar: getUserAvatar('user_051'),
    level: 3,
    points: 320,
    followCount: 56,
    fansCount: 450,
    signature: 'UI设计爱好者',
    email: 'ui_wang@example.com',
    phone: '135****2233',
    gender: 'male',
    birthday: '1992-10-08',
    registerTime: '2023-04-15 13:20',
    lastLoginTime: '2025-03-18 16:45',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_052',
    nickname: '产品经理小李',
    avatar: getUserAvatar('user_052'),
    level: 3,
    points: 350,
    followCount: 67,
    fansCount: 560,
    signature: '产品经理之路',
    email: 'pm_li@example.com',
    phone: '136****3344',
    gender: 'male',
    birthday: '1991-03-22',
    registerTime: '2023-05-20 09:15',
    lastLoginTime: '2025-03-18 17:30',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_053',
    nickname: '活动参与者',
    avatar: getUserAvatar('user_053'),
    level: 1,
    points: 45,
    followCount: 12,
    fansCount: 23,
    signature: '爱参加活动',
    email: 'huodong@example.com',
    phone: '137****4455',
    gender: 'female',
    birthday: '1995-12-05',
    registerTime: '2024-03-18 11:40',
    lastLoginTime: '2025-03-17 20:15',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_054',
    nickname: '资深设计师',
    avatar: getUserAvatar('user_054'),
    level: 4,
    points: 620,
    followCount: 89,
    fansCount: 2300,
    signature: '设计十年',
    email: 'senior@example.com',
    phone: '138****5566',
    gender: 'male',
    birthday: '1986-06-18',
    registerTime: '2022-08-22 14:30',
    lastLoginTime: '2025-03-18 21:10',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_055',
    nickname: '前端工程师',
    avatar: getUserAvatar('user_055'),
    level: 3,
    points: 380,
    followCount: 56,
    fansCount: 670,
    signature: '前端开发',
    email: 'frontend@example.com',
    phone: '139****6677',
    gender: 'male',
    birthday: '1993-09-12',
    registerTime: '2023-06-25 10:45',
    lastLoginTime: '2025-03-18 18:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_056',
    nickname: '小程序开发者',
    avatar: getUserAvatar('user_056'),
    level: 3,
    points: 340,
    followCount: 45,
    fansCount: 450,
    signature: '专注小程序',
    email: 'miniprogram@example.com',
    phone: '136****7788',
    gender: 'male',
    birthday: '1992-11-30',
    registerTime: '2023-07-14 15:30',
    lastLoginTime: '2025-03-18 22:45',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_057',
    nickname: 'React专家',
    avatar: getUserAvatar('user_057'),
    level: 4,
    points: 580,
    followCount: 78,
    fansCount: 3400,
    signature: 'React爱好者',
    email: 'react@example.com',
    phone: '137****8899',
    gender: 'male',
    birthday: '1989-04-25',
    registerTime: '2022-10-18 09:20',
    lastLoginTime: '2025-03-19 08:30',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_058',
    nickname: '前端爱好者',
    avatar: getUserAvatar('user_058'),
    level: 2,
    points: 120,
    followCount: 34,
    fansCount: 89,
    signature: '学习前端',
    email: 'fefan@example.com',
    phone: '138****9900',
    gender: 'male',
    birthday: '1995-07-08',
    registerTime: '2024-01-22 16:15',
    lastLoginTime: '2025-03-18 19:40',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_059',
    nickname: '架构师',
    avatar: getUserAvatar('user_059'),
    level: 5,
    points: 890,
    followCount: 134,
    fansCount: 8900,
    signature: '系统架构',
    email: 'architect@example.com',
    phone: '139****1123',
    gender: 'male',
    birthday: '1984-02-14',
    registerTime: '2022-05-12 11:30',
    lastLoginTime: '2025-03-18 23:15',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_060',
    nickname: '技术经理',
    avatar: getUserAvatar('user_060'),
    level: 4,
    points: 620,
    followCount: 89,
    fansCount: 2300,
    signature: '技术管理',
    email: 'techlead@example.com',
    phone: '136****2233',
    gender: 'male',
    birthday: '1987-09-30',
    registerTime: '2022-09-08 14:45',
    lastLoginTime: '2025-03-18 20:30',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_061',
    nickname: 'TS爱好者',
    avatar: getUserAvatar('user_061'),
    level: 3,
    points: 340,
    followCount: 56,
    fansCount: 450,
    signature: 'TypeScript',
    email: 'ts@example.com',
    phone: '137****3344',
    gender: 'male',
    birthday: '1991-12-18',
    registerTime: '2023-08-15 10:20',
    lastLoginTime: '2025-03-18 17:45',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_062',
    nickname: '全栈开发者',
    avatar: getUserAvatar('user_062'),
    level: 3,
    points: 410,
    followCount: 67,
    fansCount: 890,
    signature: '全栈工程师',
    email: 'fullstack@example.com',
    phone: '138****4455',
    gender: 'male',
    birthday: '1990-05-22',
    registerTime: '2023-06-10 13:15',
    lastLoginTime: '2025-03-18 21:20',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_063',
    nickname: 'AI设计师',
    avatar: getUserAvatar('user_063'),
    level: 4,
    points: 520,
    followCount: 78,
    fansCount: 2100,
    signature: 'AI+设计',
    email: 'ai_design@example.com',
    phone: '139****5566',
    gender: 'female',
    birthday: '1989-08-05',
    registerTime: '2022-11-20 09:30',
    lastLoginTime: '2025-03-18 22:50',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_064',
    nickname: '设计爱好者',
    avatar: getUserAvatar('user_064'),
    level: 2,
    points: 85,
    followCount: 23,
    fansCount: 56,
    signature: '热爱设计',
    email: 'design_lover@example.com',
    phone: '136****6677',
    gender: 'female',
    birthday: '1994-03-12',
    registerTime: '2024-02-18 15:40',
    lastLoginTime: '2025-03-18 18:15',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_065',
    nickname: '云原生专家',
    avatar: getUserAvatar('user_065'),
    level: 5,
    points: 780,
    followCount: 112,
    fansCount: 5600,
    signature: '云原生',
    email: 'cloud@example.com',
    phone: '137****7788',
    gender: 'male',
    birthday: '1986-10-28',
    registerTime: '2022-07-15 11:20',
    lastLoginTime: '2025-03-19 09:45',
    status: 'active',
    role: 'expert',
    settings: { notification: true, privacy: 'public' }
  },
  {
    id: 'user_066',
    nickname: '运维工程师',
    avatar: getUserAvatar('user_066'),
    level: 3,
    points: 380,
    followCount: 45,
    fansCount: 670,
    signature: '运维开发',
    email: 'ops@example.com',
    phone: '138****8899',
    gender: 'male',
    birthday: '1992-12-03',
    registerTime: '2023-09-22 14:30',
    lastLoginTime: '2025-03-18 20:10',
    status: 'active',
    role: 'user',
    settings: { notification: true, privacy: 'public' }
  }
]

const initialTopics = [
  {
    id: 'featured_topic_001',
    title: '人工智能时代的机遇与挑战',
    type: 'featured',
    content: [
      { type: 'text', content: '随着人工智能技术的飞速发展，我们正处在一个前所未有的变革时代。AI不仅改变了我们的生活方式，也在重新定义工作的本质。' },
      { type: 'image', content: 'https://picsum.photos/id/1/800/400' },
      { type: 'text', content: '从自动驾驶到智能医疗，从个性化推荐到智能制造，AI正在各个领域展现其强大的能力。但同时也引发了许多讨论和思考。' },
      { type: 'text', content: '比如，AI绘画工具Midjourney、Stable Diffusion的兴起，让很多插画师感到危机。以前需要几天的创作，现在几分钟就能完成。但同时，AI创作的作品版权归属问题、原创性的争议也层出不穷。' },
      { type: 'image', content: 'https://picsum.photos/id/0/800/400' },
      { type: 'text', content: '在教育领域，ChatGPT等大语言模型的出现，让学生们可以轻松完成作业。老师们开始反思：我们应该如何调整教学方式？是禁止使用AI，还是教会学生如何正确使用AI作为学习工具？' },
      { type: 'text', content: '医疗领域也迎来了AI辅助诊断的革命。在某些医学影像识别上，AI的准确率已经超过了人类医生。但这也带来了责任归属的问题：如果AI误诊，谁来负责？' },
      { type: 'image', content: 'https://picsum.photos/id/42/800/400' },
      { type: 'text', content: '面对这些变革，我们每个人都无法置身事外。你是拥抱AI的乐观派，还是对AI持谨慎态度的保守派？在你看来，AI究竟是解放人类生产力的福音，还是加剧社会不平等的推手？' },
      { type: 'vote', content: {
        title: '你支持还是反对大规模发展人工智能？',
        positive: { text: '我支持', count: 156 },
        negative: { text: '我反对', count: 89 },
        totalVotes: 245
      }}
    ],
    authorId: 'user_001',
    createTime: '2025-03-09 08:00',
    likeCount: 156,
    commentCount: 5,
    viewCount: 2345,
    shareCount: 45,
    status: 'published',
    tags: ['AI', '科技', '社会']
  },
  {
    id: 'topic_001',
    title: '大学教育：究竟是塑造人才还是浪费时间？',
    type: 'normal',
    content: [
      { type: 'text', content: '每年高考季，千军万马过独木桥。但最近几年，"大学无用论"的声音又开始抬头。作为一个经历过大学教育的人，我想分享一些自己的思考和观察。' },
      { type: 'image', content: 'https://picsum.photos/id/20/800/400' },
      { type: 'text', content: '先说说支持大学教育的声音。根据教育部数据，2023年全国高校毕业生人数达到1158万，其中本科生的平均起薪比高中生高出约40%。从数据上看，大学教育确实能带来更高的收入。' },
      { type: 'text', content: '我的学长小张就是典型例子。他从一所211大学计算机专业毕业后，进入互联网大厂，工作三年年薪就达到了50万。他常说，如果没有大学这个敲门砖，他可能连面试的机会都没有。大学不仅给了他专业知识，更重要的是培养了他的学习能力和思维方式。' },
      { type: 'image', content: 'https://picsum.photos/id/26/800/400' },
      { type: 'text', content: '但另一方面，"大学无用论"也不是空穴来风。我的朋友小李就是反面教材。他大学学了四年市场营销，结果毕业后发现，课本上的理论早已过时，企业需要的是实战经验和新媒体运营能力。他最后只能从月薪3000的销售做起，而同龄的高中同学做短视频带货，已经月入过万。' },
      { type: 'text', content: '更让人深思的是，现在很多企业招聘时更看重能力而非学历。马云、马化腾这些商业大佬也不是名校出身。比尔·盖茨、扎克伯格更是直接从哈佛退学创业。这些例子似乎都在说明，成功不一定需要完整的大学教育。' },
      { type: 'image', content: 'https://picsum.photos/id/30/800/400' },
      { type: 'text', content: '还有教育成本的问题。现在普通本科四年学费加生活费至少15万，如果是民办院校可能翻倍。很多农村家庭要倾其所有才能供一个大学生。如果毕业后找不到好工作，这笔投资确实会让人怀疑值不值得。' },
      { type: 'text', content: '但我觉得，评价大学教育的价值，不能只看经济回报。大学四年，是很多人第一次离开家庭独立生活，结识来自五湖四海的朋友，接触不同的思想和文化。这些经历对人格的塑造、视野的开阔，可能比专业知识更重要。' },
      { type: 'image', content: 'https://picsum.photos/id/27/800/400' },
      { type: 'text', content: '说到底，大学教育的价值，可能不在于它给了你多少知识，而在于它给了你一个思考和成长的平台。但在这个竞争激烈的时代，我们真的还有四年时间去慢慢成长吗？还是应该更早进入社会，在实践中学习？' },
      { type: 'vote', content: {
        title: '你支持还是反对每个人都去读大学？',
        positive: { text: '我支持', count: 342 },
        negative: { text: '我反对', count: 287 },
        totalVotes: 629
      }}
    ],
    authorId: 'user_002',
    createTime: '2025-03-08 20:15',
    likeCount: 234,
    commentCount: 7,
    viewCount: 3456,
    shareCount: 78,
    status: 'published',
    tags: ['教育', '社会', '观点']
  },
  {
    id: 'topic_002',
    title: '数字游民 vs 朝九晚五：哪种生活方式更适合中国人？',
    type: 'normal',
    content: [
      { type: 'text', content: '最近"数字游民"这个概念在国内越来越火。大理的咖啡馆里坐满了抱着笔记本电脑的年轻人，泰国的沙滩上也能看到中国面孔在远程工作。这种工作方式真的适合中国人吗？' },
      { type: 'image', content: 'https://picsum.photos/id/15/800/400' },
      { type: 'text', content: '先说说数字游民的优点。我认识一个做UI设计的姑娘，她去年去了12个城市，一边旅行一边工作。她说最大的收获不是看了多少风景，而是摆脱了职场内耗，工作效率反而提高了。不用挤地铁，不用应付无效会议，每天睡到自然醒，想工作就工作。' },
      { type: 'text', content: '她还给我算了一笔账：在北京租个次卧要3000+，在大理租个带院子的房子才2000。再加上不用每天点外卖、买咖啡，一个月能省下不少钱。时间自由、空间自由、财务自由，听起来确实很诱人。' },
      { type: 'image', content: 'https://picsum.photos/id/16/800/400' },
      { type: 'text', content: '但数字游民也有不为人知的一面。我的朋友阿杰尝试了半年数字游民生活后，又乖乖回到公司上班。他说最大的问题是孤独感和不安全感。一个人工作久了，连说话的人都没有，有时候一整天除了外卖小哥，见不到第二个人。' },
      { type: 'text', content: '而且数字游民意味着没有稳定的社保公积金，没有带薪年假，没有病假。收入不稳定的时候，还要面对父母的质疑："你到底有没有正经工作？"在中国传统观念里，没有单位、没有五险一金，就像浮萍一样没有根基。' },
      { type: 'image', content: 'https://picsum.photos/id/18/800/400' },
      { type: 'text', content: '再说说传统的朝九晚五。虽然被吐槽是"社畜"生活，但也有它的价值。固定的工作时间让你有明确的界限感，下班后可以彻底放松。同事之间的社交也是一种情感支持。更重要的是，对于有家庭的人来说，规律的作息对孩子的成长更有利。' },
      { type: 'text', content: '我表姐在一家外企工作，朝九晚五，双休不加班。她说这种生活虽然平淡，但很踏实。周末带孩子上兴趣班，节假日全家出游，生活有规律可循。偶尔也会羡慕数字游民的自由，但想想房贷车贷、孩子的教育费用，还是稳定的工作更让人安心。' },
      { type: 'image', content: 'https://picsum.photos/id/28/800/400' },
      { type: 'text', content: '其实，选择哪种生活方式，可能跟性格和人生阶段有关。有人喜欢冒险和自由，有人追求稳定和安全感。但在中国当前的社会环境下，数字游民可能更适合年轻单身、没有家庭负担的人。一旦要考虑买房、结婚、孩子上学，大多数人还是会被拉回传统的轨道。' },
      { type: 'text', content: '你觉得数字游民的生活方式在中国能成为主流吗？还是说，朝九晚五的稳定工作才是大多数人的归宿？' },
      { type: 'vote', content: {
        title: '你支持还是反对成为数字游民？',
        positive: { text: '我支持', count: 456 },
        negative: { text: '我反对', count: 523 },
        totalVotes: 979
      }}
    ],
    authorId: 'user_003',
    createTime: '2025-03-07 14:30',
    likeCount: 512,
    commentCount: 7,
    viewCount: 5678,
    shareCount: 123,
    status: 'published',
    tags: ['职场', '生活方式', '观点']
  },
  {
    id: 'topic_003',
    title: '内卷还是躺平：当代年轻人的生存之道',
    type: 'normal',
    content: [
      { type: 'text', content: '2023年，"内卷"和"躺平"这两个词依然频繁出现在我们的视野中。作为一个90后，我想聊聊我对这两种生存状态的理解。' },
      { type: 'image', content: 'https://picsum.photos/id/2/800/400' },
      { type: 'text', content: '先说说我的同事老王。他是典型的"卷王"，每天早上8点到公司，晚上10点才走。周末主动加班，节假日也不休息。三年下来，他从普通员工升到了部门主管，工资翻了两倍，但也付出了健康的代价——严重的颈椎病、胃病，还有高血压。' },
      { type: 'text', content: '老王说，他也想停下来，但不敢。房贷还有200万要还，孩子马上要上小学，老婆刚怀了二胎。他不卷，谁来扛起这个家？而且在这个竞争激烈的行业，不进步就是退步，停下来可能就会被淘汰。' },
      { type: 'image', content: 'https://picsum.photos/id/3/800/400' },
      { type: 'text', content: '再说说我的另一个朋友小陈。他选择了"躺平"——在一家小公司做着不咸不淡的工作，月薪6000，够花就行。不买房不买车不结婚，租个小房子，养只猫，周末就打打游戏、看看电影。' },
      { type: 'text', content: '小陈说，他看透了。就算拼命卷，也不一定能买得起房。与其透支身体去追逐一个遥不可及的梦，不如享受当下。他觉得现在的年轻人太累了，从小到大被推着走，好学生、好大学、好工作、好房子...永远没有尽头。' },
      { type: 'image', content: 'https://picsum.photos/id/4/800/400' },
      { type: 'text', content: '但躺平也有躺平的代价。小陈的父母不理解他，觉得他没出息。亲戚聚会时，总会被拿来和那些"成功"的同龄人比较。有时候他自己也会迷茫：如果一直这样下去，老了怎么办？没有积蓄，没有社保，万一病了怎么办？' },
      { type: 'text', content: '其实我觉得，内卷和躺平都不是非此即彼的选择。我认识一个姐姐，她找到了自己的平衡点——工作认真但不拼命，该争取的时候争取，该放手的时候放手。她说这叫"清醒地活着"，知道自己要什么，也知道自己不要什么。' },
      { type: 'image', content: 'https://picsum.photos/id/5/800/400' },
      { type: 'text', content: '但问题是，在这个竞争日益激烈的社会，我们能找到那个平衡点吗？还是说，要么卷死别人，要么被别人卷死，根本没有中间地带？' },
      { type: 'vote', content: {
        title: '你支持还是反对"躺平"的生活态度？',
        positive: { text: '我支持', count: 389 },
        negative: { text: '我反对', count: 412 },
        totalVotes: 801
      }}
    ],
    authorId: 'user_004',
    createTime: '2025-03-06 09:20',
    likeCount: 678,
    commentCount: 6,
    viewCount: 7890,
    shareCount: 234,
    status: 'published',
    tags: ['社会', '职场', '观点']
  },
  {
    id: 'topic_004',
    title: '父母养老：送养老院还是不孝？传统孝道与现代困境的碰撞',
    type: 'normal',
    content: [
      { type: 'text', content: '昨天接到妈妈的电话，说邻居王阿姨被儿子送去了养老院，整个小区都在议论这件事。有人说儿子不孝，也有人说这是没办法的事。这让我开始思考：在现代社会，我们该如何尽孝？' },
      { type: 'image', content: 'https://picsum.photos/id/6/800/400' },
      { type: 'text', content: '先说说王阿姨的情况。72岁，轻度阿尔茨海默症，需要人24小时照顾。她儿子小张是独生子，在北京工作，月薪两万，但每天加班到很晚。媳妇刚生二胎，家里已经请了一个月嫂照顾孩子。' },
      { type: 'text', content: '小张尝试过接母亲来北京住。但问题来了：家里只有两居室，住不下这么多人；母亲不习惯城市生活，整天闷闷不乐；白天没人照顾，老人一个人在家又担心出事。请保姆？好的保姆一个月要七八千，加上房贷、月嫂工资，实在负担不起。' },
      { type: 'image', content: 'https://picsum.photos/id/7/800/400' },
      { type: 'text', content: '最后小张选择了老家最好的养老院，每月5000，有专业的护工和医疗条件。他每周视频，每月回去看一次。但从传统观念来看，送父母去养老院就是不孝。邻居们说："养儿防老，积谷防饥，现在儿子把娘送走了，不是打脸吗？"' },
      { type: 'text', content: '但我想问，什么是真正的孝？是把父母绑在身边，让他们跟着自己过苦日子？还是让他们得到更好的照顾，哪怕自己被人说闲话？' },
      { type: 'image', content: 'https://picsum.photos/id/8/800/400' },
      { type: 'text', content: '再看看我姑姑家的做法。姑姑和姑父都60多岁了，独生女在国外。女儿想接他们去国外，他们不愿意。最后女儿给他们在老家买了套小房子，请了保姆照顾，每年回来两次。周围人都羡慕姑姑命好，女儿孝顺。' },
      { type: 'text', content: '同样的"不在一起生活"，为什么评价差别这么大？可能是因为姑姑是自己住，有保姆伺候，显得体面；而王阿姨是被送进养老院，听起来就可怜。但本质上，都是子女无法亲自照顾，选择了找人代劳。' },
      { type: 'image', content: 'https://picsum.photos/id/9/800/400' },
      { type: 'text', content: '其实我觉得，这个问题背后是传统家庭结构的崩塌。以前是几代同堂，老人帮忙带孩子，子女照顾老人。现在是4-2-1家庭结构，两个年轻人要养四个老人一个孩子，时间和经济上都不堪重负。' },
      { type: 'text', content: '而且现代社会的流动性太大，很多子女都在外地甚至外国工作，不可能像过去那样守在父母身边。这不是不孝，是社会发展的必然结果。' },
      { type: 'text', content: '但话说回来，老人需要的到底是什么？是子女的陪伴，还是专业的照顾？如果两者不能兼得，我们该如何取舍？把老人送进养老院，是真的为他们好，还是我们在给自己的不陪伴找借口？' },
      { type: 'vote', content: {
        title: '你支持还是反对送父母去养老院？',
        positive: { text: '我支持', count: 234 },
        negative: { text: '我反对', count: 198 },
        totalVotes: 432
      }}
    ],
    authorId: 'user_005',
    createTime: '2025-03-05 18:45',
    likeCount: 345,
    commentCount: 5,
    viewCount: 4567,
    shareCount: 167,
    status: 'published',
    tags: ['家庭', '社会', '养老']
  },
  {
    id: 'topic_005',
    title: 'ChatGPT时代，学生还能学到真东西吗？',
    type: 'normal',
    content: [
      { type: 'text', content: '自从ChatGPT爆火以来，教育界就炸开了锅。学生们发现写作业有了"神器"，老师们则在绞尽脑汁思考如何防止学生作弊。' },
      { type: 'image', content: 'https://picsum.photos/id/10/800/400' },
      { type: 'text', content: '我侄子今年上高一，他跟我说："叔，现在写作文太简单了，让ChatGPT生成一篇，稍微改改就能交差。"我问他这样能学到什么？他反问我："那您说，我花两小时憋出一篇60分的作文，和用AI两分钟弄出一篇85分的，哪个更有意义？"' },
      { type: 'text', content: '这个问题真的把我问住了。是啊，如果AI能做得更好更快，我们为什么还要让学生做这些事？' },
      { type: 'image', content: 'https://picsum.photos/id/11/800/400' },
      { type: 'text', content: '但另一方面，我认识的一位大学教授却很乐观。她说："这就像计算器出现后，我们不再用手算开方，但数学并没有消失，反而发展得更好。AI会倒逼教育变革，让学生从死记硬背中解放出来，去思考更有创造性的问题。"' },
      { type: 'text', content: '她举了个例子：以前让学生写一篇关于《红楼梦》的读后感，很多都是网上抄的。现在她会让学生先让AI写一篇，然后点评AI写得怎么样，有什么不足，再自己写一篇更好的。这样反而锻炼了批判性思维。' },
      { type: 'image', content: 'https://picsum.photos/id/12/800/400' },
      { type: 'text', content: '但也有老师很悲观。一位高中老师说："现在的学生，连最基础的阅读理解都不愿意做了，什么都依赖AI。长此以往，独立思考能力会越来越差。"' },
      { type: 'text', content: '其实这个问题背后，是我们对教育本质的思考。教育的目的是传授知识，还是培养能力？是让学生掌握已有的知识，还是学会创造新的知识？' },
      { type: 'text', content: '我查了一些资料，发现国外有些学校已经开始改革。有的允许学生在作业中使用AI，但要注明哪些部分用了AI；有的干脆把AI使用能力作为考核标准之一。' },
      { type: 'image', content: 'https://picsum.photos/id/13/800/400' },
      { type: 'text', content: '但无论如何，一个事实是：AI已经来了，而且不会消失。我们不可能永远禁止学生使用它。关键在于，如何引导他们正确使用。' },
      { type: 'vote', content: {
        title: '你支持还是反对学生在作业中使用ChatGPT？',
        positive: { text: '我支持', count: 512 },
        negative: { text: '我反对', count: 487 },
        totalVotes: 999
      }}
    ],
    authorId: 'user_006',
    createTime: '2025-03-04 10:30',
    likeCount: 423,
    commentCount: 7,
    viewCount: 6543,
    shareCount: 198,
    status: 'published',
    tags: ['教育', 'AI', '科技']
  },
  {
    id: 'topic_006',
    title: '买房还是租房？年轻人的安居选择题',
    type: 'normal',
    content: [
      { type: 'text', content: '周末参加了个同学聚会，发现大家都在聊房子。有人咬牙上了车，月供占收入一半；有人继续租房，被父母催着买房；还有人说这辈子不打算买了，租房也挺好。' },
      { type: 'image', content: 'https://picsum.photos/id/14/800/400' },
      { type: 'text', content: '先说我同学阿强。他在杭州买了套房，总价300万，首付90万是父母掏空积蓄加上借遍亲戚凑的，月供1万2。他说："每个月工资发下来，还完房贷就剩三四千，不敢消费不敢辞职，但有自己的房子，心里踏实。"' },
      { type: 'text', content: '再说我另一个同学阿珍。她和男朋友选择租房，在市中心租了个精装公寓，月租6000。她说："我们算过账，同样的房子，租房比买房每月少花一半。省下的钱可以用来旅行、学习、投资自己。"' },
      { type: 'image', content: 'https://picsum.photos/id/17/800/400' },
      { type: 'text', content: '阿强反驳说："租房是帮房东还贷，买房是给自己存资产。而且房子会升值，租房的钱都打水漂了。"' },
      { type: 'text', content: '阿珍则说："现在房价这么高，谁知道以后是涨是跌？而且买了房就被绑住了，想去别的城市发展都不行。租房多自由，想换工作就换，想换城市就换。"' },
      { type: 'image', content: 'https://picsum.photos/id/19/800/400' },
      { type: 'text', content: '其实两种选择都有道理。买房的人追求安全感和归属感，租房的人追求灵活性和生活质量。' },
      { type: 'text', content: '但有个问题是绕不开的：如果你不买房，老了怎么办？没有自己的房子，退休后靠养老金能租得起房吗？' },
      { type: 'text', content: '阿珍说："我算过，把买房的钱定投指数基金，30年后的收益可能比房子升值还高。到时候想住哪儿租哪儿。"' },
      { type: 'image', content: 'https://picsum.photos/id/21/800/400' },
      { type: 'text', content: '阿强则说："投资有风险，房子至少是看得见摸得着的。而且在中国传统观念里，有自己的房子才叫成家立业。"' },
      { type: 'vote', content: {
        title: '你支持还是反对年轻人一定要买房？',
        positive: { text: '我支持', count: 678 },
        negative: { text: '我反对', count: 543 },
        totalVotes: 1221
      }}
    ],
    authorId: 'user_007',
    createTime: '2025-03-03 16:15',
    likeCount: 567,
    commentCount: 6,
    viewCount: 8765,
    shareCount: 267,
    status: 'published',
    tags: ['房产', '生活', '经济']
  },
  {
    id: 'topic_007',
    title: '应不应该让孩子从小就上各种兴趣班？',
    type: 'normal',
    content: [
      { type: 'text', content: '我姐家孩子今年上小学二年级，周末比上学还忙：周六上午英语、下午钢琴，周日上午奥数、下午游泳。我看着都觉得累。' },
      { type: 'image', content: 'https://picsum.photos/id/22/800/400' },
      { type: 'text', content: '我姐说："现在哪个孩子不报班？不报班就输在起跑线上了。而且多学点东西，以后多条路。"' },
      { type: 'text', content: '但孩子明显很抗拒。有次我去他家，小家伙偷偷跟我说："叔叔，我好累，我想玩。"听了真让人心疼。' },
      { type: 'image', content: 'https://picsum.photos/id/23/800/400' },
      { type: 'text', content: '我同事老张则是另一个极端。他坚持"快乐教育"，什么都不让孩子学，就让他玩。结果上了小学，别人家孩子都会英语、会算术，他家孩子啥都不会，孩子回来哭着说"同学们都笑我笨"。' },
      { type: 'text', content: '老张现在也开始焦虑了，想着是不是该给孩子报点班补一补。' },
      { type: 'image', content: 'https://picsum.photos/id/24/800/400' },
      { type: 'text', content: '还有一个朋友的做法我觉得挺有意思。她让孩子自己选择，喜欢什么就学什么。孩子选了画画和跆拳道，学得很开心，还主动要求加课。' },
      { type: 'text', content: '她说："关键不是学不学，而是学什么、怎么学。如果孩子喜欢，那是兴趣；如果逼着学，那是折磨。"' },
      { type: 'image', content: 'https://picsum.photos/id/25/800/400' },
      { type: 'text', content: '但问题来了：孩子小的时候，根本不知道自己喜欢什么，或者今天喜欢明天就不喜欢了。这时候家长该怎么办？是尊重孩子的选择，还是替孩子做决定？' },
      { type: 'text', content: '有人说过："小时候恨父母逼我学钢琴，现在感谢他们。"也有人说："小时候被逼着学的，长大后全忘了，只记得痛苦的童年。"' },
      { type: 'vote', content: {
        title: '你支持还是反对让孩子从小上兴趣班？',
        positive: { text: '我支持', count: 389 },
        negative: { text: '我反对', count: 467 },
        totalVotes: 856
      }}
    ],
    authorId: 'user_008',
    createTime: '2025-03-02 09:45',
    likeCount: 345,
    commentCount: 7,
    viewCount: 5432,
    shareCount: 145,
    status: 'published',
    tags: ['教育', '育儿', '观点']
  },
  {
    id: 'user_post_001',
    title: '如何利用现代UI设计提升用户留存率？',
    type: 'normal',
    content: [
      { type: 'text', content: '作为一名UI设计师，我经常被问到如何通过设计来提升产品的用户留存率。今天想和大家分享一些实用的经验。' },
      { type: 'image', content: 'https://picsum.photos/id/100/800/400' },
      { type: 'text', content: '首先，用户体验的流畅性至关重要。一个设计精美但操作复杂的界面，往往会让用户望而却步。' },
      { type: 'text', content: '其次，视觉层次感也很重要。通过合理的颜色、字体大小和间距，引导用户的视线流动，让用户能够快速找到他们需要的信息。' },
      { type: 'image', content: 'https://picsum.photos/id/101/800/400' },
      { type: 'vote', content: {
        title: '你觉得UI设计对用户留存率的影响有多大？',
        positive: { text: '影响很大', count: 156 },
        negative: { text: '影响一般', count: 89 },
        totalVotes: 245
      }}
    ],
    authorId: 'user_001',
    createTime: '2023-10-24 14:30',
    likeCount: 85,
    commentCount: 2,
    viewCount: 1234,
    shareCount: 34,
    status: 'published',
    tags: ['UI设计', '用户体验', '产品']
  },
  {
    id: 'user_post_002',
    title: '凤鸣社十周年庆典幕后故事分享',
    type: 'normal',
    content: [
      { type: 'text', content: '上周我们凤鸣社迎来了十周年庆典，作为组织者之一，我想和大家分享一些幕后的故事。' },
      { type: 'image', content: 'https://picsum.photos/id/102/800/400' },
      { type: 'text', content: '从策划到执行，整个活动历时三个月。最让我感动的是大家的团队协作精神。' },
      { type: 'text', content: '特别是最后的灯光秀环节，我们反复调试了十几次，就是为了给观众带来最好的视觉体验。' },
      { type: 'image', content: 'https://picsum.photos/id/103/800/400' }
    ],
    authorId: 'user_001',
    createTime: '2023-10-15 10:15',
    likeCount: 210,
    commentCount: 1,
    viewCount: 2345,
    shareCount: 67,
    status: 'published',
    tags: ['社团', '活动', '幕后']
  },
  {
    id: 'user_post_003',
    title: '设计师如何平衡审美与商业价值',
    type: 'normal',
    content: [
      { type: 'text', content: '在设计工作中，我们经常面临一个难题：如何平衡个人审美与商业需求？' },
      { type: 'image', content: 'https://picsum.photos/id/104/800/400' },
      { type: 'text', content: '我的经验是，首先要理解商业目标，然后在这个框架内发挥创意。' },
      { type: 'text', content: '有时候客户的要求可能不符合我们的审美，但只要能达成商业目标，就是好的设计。' },
      { type: 'image', content: 'https://picsum.photos/id/105/800/400' },
      { type: 'vote', content: {
        title: '你觉得设计师应该坚持自己的审美吗？',
        positive: { text: '应该坚持', count: 78 },
        negative: { text: '应该妥协', count: 65 },
        totalVotes: 143
      }}
    ],
    authorId: 'user_001',
    createTime: '2023-09-28 16:20',
    likeCount: 42,
    commentCount: 1,
    viewCount: 876,
    shareCount: 12,
    status: 'published',
    tags: ['设计', '职场', '观点']
  },
  {
    id: 'user_post_004',
    title: '前端性能优化实战经验总结',
    type: 'normal',
    content: [
      { type: 'text', content: '最近在项目中做了一些前端性能优化，效果显著，分享一下经验。' },
      { type: 'image', content: 'https://picsum.photos/id/106/800/400' },
      { type: 'text', content: '首屏加载时间从3.2秒优化到了1.8秒，主要采用了代码分割和懒加载技术。' },
      { type: 'text', content: '图片优化也很重要，使用WebP格式和适当的压缩可以大幅减小文件体积。' },
      { type: 'image', content: 'https://picsum.photos/id/107/800/400' }
    ],
    authorId: 'user_001',
    createTime: '2023-09-15 09:45',
    likeCount: 156,
    commentCount: 1,
    viewCount: 1876,
    shareCount: 45,
    status: 'published',
    tags: ['前端', '性能优化', '技术']
  },
  {
    id: 'user_post_005',
    title: '小程序开发中的常见问题及解决方案',
    type: 'normal',
    content: [
      { type: 'text', content: '在小程序开发过程中，经常会遇到一些坑，今天总结一下常见问题。' },
      { type: 'image', content: 'https://picsum.photos/id/108/800/400' },
      { type: 'text', content: '比如页面层级过深导致的性能问题，可以通过优化页面结构来解决。' },
      { type: 'text', content: '还有数据缓存策略，合理使用本地存储可以提升用户体验。' },
      { type: 'image', content: 'https://picsum.photos/id/109/800/400' }
    ],
    authorId: 'user_001',
    createTime: '2023-09-02 14:20',
    likeCount: 98,
    commentCount: 1,
    viewCount: 1543,
    shareCount: 28,
    status: 'published',
    tags: ['小程序', '开发', '技术']
  },
  {
    id: 'user_fav_001',
    title: 'React 18新特性深度解析',
    type: 'normal',
    content: [
      { type: 'text', content: 'React 18带来了很多令人兴奋的新特性，今天来深度解析一下。' },
      { type: 'image', content: 'https://picsum.photos/id/110/800/400' },
      { type: 'text', content: '自动批处理、并发特性、新的Suspense功能，都让开发体验更好了。' }
    ],
    authorId: 'user_009',
    createTime: '2023-11-05 11:30',
    likeCount: 156,
    commentCount: 1,
    viewCount: 2345,
    shareCount: 78,
    status: 'published',
    tags: ['React', '前端', '技术']
  },
  {
    id: 'user_fav_002',
    title: '微前端架构实践指南',
    type: 'normal',
    content: [
      { type: 'text', content: '微前端架构在大型项目中越来越流行，分享一下实践心得。' },
      { type: 'image', content: 'https://picsum.photos/id/111/800/400' },
      { type: 'text', content: '主要解决了团队协作和项目维护的难题。' }
    ],
    authorId: 'user_005',
    createTime: '2023-10-30 15:45',
    likeCount: 98,
    commentCount: 1,
    viewCount: 1876,
    shareCount: 45,
    status: 'published',
    tags: ['微前端', '架构', '技术']
  },
  {
    id: 'user_fav_003',
    title: 'TypeScript高级技巧分享',
    type: 'normal',
    content: [
      { type: 'text', content: 'TypeScript有很多高级用法，今天分享一些实用技巧。' },
      { type: 'image', content: 'https://picsum.photos/id/112/800/400' },
      { type: 'text', content: '泛型、类型守卫、条件类型等，都能提升代码质量。' }
    ],
    authorId: 'user_010',
    createTime: '2023-10-18 13:20',
    likeCount: 73,
    commentCount: 1,
    viewCount: 1654,
    shareCount: 34,
    status: 'published',
    tags: ['TypeScript', '前端', '技术']
  },
  {
    id: 'user_fav_004',
    title: '人工智能在UI设计中的应用',
    type: 'normal',
    content: [
      { type: 'text', content: 'AI技术正在改变UI设计的方式，分享一些应用案例。' },
      { type: 'image', content: 'https://picsum.photos/id/113/800/400' },
      { type: 'text', content: '从自动布局到智能配色，AI都能提供很大帮助。' }
    ],
    authorId: 'user_004',
    createTime: '2023-10-05 10:15',
    likeCount: 234,
    commentCount: 1,
    viewCount: 3210,
    shareCount: 123,
    status: 'published',
    tags: ['AI', '设计', '技术']
  },
  {
    id: 'user_fav_005',
    title: '云原生技术架构演进',
    type: 'normal',
    content: [
      { type: 'text', content: '云原生技术正在快速发展，探讨一下架构演进趋势。' },
      { type: 'image', content: 'https://picsum.photos/id/114/800/400' },
      { type: 'text', content: '从单体到微服务，再到云原生，架构在不断进化。' }
    ],
    authorId: 'user_009',
    createTime: '2023-09-22 16:30',
    likeCount: 189,
    commentCount: 1,
    viewCount: 2345,
    shareCount: 89,
    status: 'published',
    tags: ['云原生', '架构', '技术']
  }
]

const initialComments = [
  {
    id: 'comment_001',
    topicId: 'featured_topic_001',
    userId: 'user_009',
    content: '我是做AI开发的，说实话AI确实会替代一些重复性工作，但也会创造新岗位。我们现在最缺的是懂AI的复合型人才，而不是单纯担心被取代。',
    time: '2025-03-09 09:15',
    likeCount: 34,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_001',
    topicId: 'featured_topic_001',
    userId: 'user_010',
    content: '问题是学习的速度赶不上AI迭代的速度啊，我刚学会的东西AI已经能自动生成了',
    time: '2025-03-09 09:45',
    likeCount: 12,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_001',
    replyToId: 'user_009'
  },
  {
    id: 'reply_002',
    topicId: 'featured_topic_001',
    userId: 'user_009',
    content: '那就别学那些容易被替代的，往架构、算法、业务理解这些方向发展，AI是工具不是敌人',
    time: '2025-03-09 10:02',
    likeCount: 8,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_001',
    replyToId: 'user_010'
  },
  {
    id: 'comment_002',
    topicId: 'featured_topic_001',
    userId: 'user_011',
    content: '作为插画师，我真的快被AI搞崩溃了。客户拿着AI生成的图来砍价："你看AI几秒钟就画出来了，你凭什么收这么贵？"但AI用的都是我们画师的素材训练的，这公平吗？',
    time: '2025-03-09 10:30',
    likeCount: 56,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_003',
    topicId: 'featured_topic_001',
    userId: 'user_012',
    content: '我关心的是伦理问题。如果自动驾驶出车祸，是车主的错还是算法的错？如果AI诊断失误，谁负责？这些法律和伦理框架都还没建立起来，就大规模推广，太危险了。',
    time: '2025-03-09 11:20',
    likeCount: 23,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_004',
    topicId: 'topic_001',
    userId: 'user_013',
    content: '我现在大二，每天上课就在想：我学的这些东西到底有什么用？高数、线代，以后工作真的用得上吗？还是说只是为了拿个文凭？',
    time: '2025-03-09 08:30',
    likeCount: 45,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_005',
    topicId: 'topic_001',
    userId: 'user_014',
    content: '我做了十年招聘，说实话学历确实是敲门砖。同样两个应届生，985的和二本的，只要985的不是太差，我们肯定优先选985。这不是歧视，是筛选成本问题。',
    time: '2025-03-09 09:15',
    likeCount: 67,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_003',
    topicId: 'topic_001',
    userId: 'user_015',
    content: '这不就是学历歧视吗？我高中毕业自学编程，现在带团队，手下好几个研究生。能力比学历重要多了。',
    time: '2025-03-09 10:05',
    likeCount: 28,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_005',
    replyToId: 'user_014'
  },
  {
    id: 'reply_004',
    topicId: 'topic_001',
    userId: 'user_014',
    content: '你说得对，但你是特例。大多数没学历的，连展示能力的机会都没有。有学历至少证明你有一定的学习能力和毅力。',
    time: '2025-03-09 10:30',
    likeCount: 31,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_005',
    replyToId: 'user_015'
  },
  {
    id: 'comment_006',
    topicId: 'topic_001',
    userId: 'user_016',
    content: '我家是农村的，父母种地供我上大学。对我来说，大学是改变命运的唯一出路。虽然现在工作也不咋地，但至少不用像父母那样面朝黄土背朝天。',
    time: '2025-03-09 11:00',
    likeCount: 89,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_007',
    topicId: 'topic_001',
    userId: 'user_017',
    content: '我在国外读过书，感觉国内外大学最大的区别是：国外更注重批判性思维和自主学习，国内还是填鸭式教育居多。不是大学没用，是咱们的教育方式该改革了。',
    time: '2025-03-09 13:20',
    likeCount: 52,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_008',
    topicId: 'topic_002',
    userId: 'user_018',
    content: '我就是你说的那个在大理的UI设计姑娘！哈哈，没想到被写进文章了。说实话，数字游民确实有孤独的时候，但对我来说，自由的快乐远大于孤独的痛苦。',
    time: '2025-03-08 09:20',
    likeCount: 78,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_005',
    topicId: 'topic_002',
    userId: 'user_019',
    content: '姐妹你是怎么找到客户的？我也想试试，但怕收入不稳定',
    time: '2025-03-08 10:15',
    likeCount: 23,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_008',
    replyToId: 'user_018'
  },
  {
    id: 'reply_006',
    topicId: 'topic_002',
    userId: 'user_018',
    content: '我是先在upwork上接单积累口碑，慢慢有了固定客户。刚开始确实难，建议先不要辞职，业余时间接点小单试试水。',
    time: '2025-03-08 11:30',
    likeCount: 45,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_008',
    replyToId: 'user_019'
  },
  {
    id: 'comment_009',
    topicId: 'topic_002',
    userId: 'user_020',
    content: '我在国企干了二十年，虽然工资不高，但公积金高、福利好、稳定。去年女儿结婚，单位还给了婚假和礼金。这种安全感，数字游民给不了。',
    time: '2025-03-08 14:45',
    likeCount: 56,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_010',
    topicId: 'topic_002',
    userId: 'user_021',
    content: '我就是文中的阿杰...现在回公司上班了，但说实话，还是怀念自由职业的日子。现在每天开会、写周报、应付办公室政治，感觉在浪费生命。',
    time: '2025-03-08 16:20',
    likeCount: 42,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_007',
    topicId: 'topic_002',
    userId: 'user_022',
    content: '那为什么还要回去呢？自由职业不好吗？',
    time: '2025-03-08 17:05',
    likeCount: 8,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_010',
    replyToId: 'user_021'
  },
  {
    id: 'reply_008',
    topicId: 'topic_002',
    userId: 'user_021',
    content: '因为要结婚买房啊，自由职业贷款都批不下来。现实问题，没办法。',
    time: '2025-03-08 17:30',
    likeCount: 34,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_010',
    replyToId: 'user_022'
  },
  {
    id: 'comment_011',
    topicId: 'topic_003',
    userId: 'user_023',
    content: '我也想躺平，可房贷谁帮我还？孩子学费谁出？父母养老钱谁给？我们这些80后，上有老下有小，躺不平也卷不动，卡在中间最难受。',
    time: '2025-03-07 08:30',
    likeCount: 123,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_012',
    topicId: 'topic_003',
    userId: 'user_024',
    content: '我就是文中小陈的原型！哈哈哈，被写进文章了。现在父母天天催我找对象，说躺平没出息。可我觉得，快乐最重要啊，为什么要用别人的标准衡量自己？',
    time: '2025-03-07 10:15',
    likeCount: 89,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_009',
    topicId: 'topic_003',
    userId: 'user_025',
    content: '孩子，等你到了我这个年纪就明白了，人不能只看眼前。你现在觉得快乐，老了怎么办？',
    time: '2025-03-07 11:20',
    likeCount: 34,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_012',
    replyToId: 'user_024'
  },
  {
    id: 'reply_010',
    topicId: 'topic_003',
    userId: 'user_024',
    content: '阿姨，我们这代人想通了，与其焦虑未来，不如过好现在。未来什么样谁知道呢？',
    time: '2025-03-07 13:45',
    likeCount: 56,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_012',
    replyToId: 'user_025'
  },
  {
    id: 'comment_013',
    topicId: 'topic_003',
    userId: 'user_026',
    content: '我就是你说的那个找到平衡点的姐姐！没想到有人把我的话写进文章。其实我就是想通了：工作是为了生活，不是生活为了工作。该努力时努力，该休息时休息，别被任何人绑架。',
    time: '2025-03-07 15:30',
    likeCount: 67,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_014',
    topicId: 'topic_003',
    userId: 'user_027',
    content: '我就是老王本王！现在胃病严重，每天吃药。说实话，如果能重来，我不会这么拼。但没办法，已经到这个位置了，下不来。年轻人，身体是革命的本钱，别学我。',
    time: '2025-03-07 18:20',
    likeCount: 145,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_015',
    topicId: 'topic_004',
    userId: 'user_028',
    content: '我就是你文中的小张...看到这篇文章眼泪都下来了。每天被亲戚邻居骂不孝，我妈也怨我。可我真的尽力了，在北京打拼不容易，我也有自己的小家要养。谁能告诉我，到底该怎么办？',
    time: '2025-03-06 08:30',
    likeCount: 156,
    replyCount: 3,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_011',
    topicId: 'topic_004',
    userId: 'user_029',
    content: '小张，你已经做得很好了。孝道不应该是道德绑架。定期去看妈妈，多视频，让她感受到你的关心，比整天在一起却充满怨气要好。',
    time: '2025-03-06 09:45',
    likeCount: 45,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_015',
    replyToId: 'user_028'
  },
  {
    id: 'reply_012',
    topicId: 'topic_004',
    userId: 'user_030',
    content: '说得轻巧，父母养你小，你养父母老，这是天经地义的！送养老院就是逃避责任！',
    time: '2025-03-06 10:20',
    likeCount: 12,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_015',
    replyToId: 'user_028'
  },
  {
    id: 'reply_013',
    topicId: 'topic_004',
    userId: 'user_031',
    content: '我在养老院工作十年，很多老人其实在养老院比在家开心，有同龄人聊天，有专业护理。在家反而孤单，子女上班去了，一整天没人说话。',
    time: '2025-03-06 11:05',
    likeCount: 78,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_015',
    replyToId: 'user_028'
  },
  {
    id: 'comment_016',
    topicId: 'topic_004',
    userId: 'user_032',
    content: '我就是你文中那个在国外工作的女儿。我每年回国两次，平时每天视频。我爸妈说，他们在小区里可自豪了，说女儿在国外很有出息。但我知道，他们生病的时候我都不在身边，心里很愧疚。',
    time: '2025-03-06 13:15',
    likeCount: 67,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_017',
    topicId: 'topic_004',
    userId: 'user_033',
    content: '我是60后，我想说，我们这代人其实也不想拖累孩子。我和老伴商量好了，以后就去养老院，不给孩子添麻烦。孩子们过好自己的日子，我们就满足了。',
    time: '2025-03-06 15:40',
    likeCount: 89,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_018',
    topicId: 'topic_005',
    userId: 'user_034',
    content: '我就是那个侄子！叔你居然把我写进文章了。其实我说那句话的意思是：现在的作业太无聊了，如果作业有意义，我们也不会想用AI糊弄。',
    time: '2025-03-05 08:20',
    likeCount: 87,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_019',
    topicId: 'topic_005',
    userId: 'user_035',
    content: '我是高中老师，现在批改作业像在玩"找AI"游戏。最气的是有些学生连改都不改，直接复制粘贴，一眼就能看出来。但说实话，我也在反思，是不是我们的作业形式该变了？',
    time: '2025-03-05 09:45',
    likeCount: 112,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_014',
    topicId: 'topic_005',
    userId: 'user_036',
    content: '老师，我觉得可以让学生先用AI写，然后指出AI的问题，再自己优化。这样反而能锻炼批判性思维。',
    time: '2025-03-05 10:30',
    likeCount: 45,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_019',
    replyToId: 'user_035'
  },
  {
    id: 'reply_015',
    topicId: 'topic_005',
    userId: 'user_035',
    content: '有道理，我试试看。不过还得先研究怎么用AI，感觉我们老师也要跟上时代了。',
    time: '2025-03-05 11:15',
    likeCount: 34,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_019',
    replyToId: 'user_036'
  },
  {
    id: 'comment_020',
    topicId: 'topic_005',
    userId: 'user_037',
    content: '我就是文中那个乐观的大学教授。其实我已经在课堂上教学生用AI了，告诉他们怎么提问、怎么甄别、怎么优化。与其禁止，不如教会他们驾驭工具。',
    time: '2025-03-05 14:20',
    likeCount: 76,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_021',
    topicId: 'topic_005',
    userId: 'user_038',
    content: '我孩子才小学六年级，现在写作文就用AI。我担心以后他连基本的写作能力都没有了。可我说他，他还嫌我out了。怎么办啊？',
    time: '2025-03-05 16:10',
    likeCount: 54,
    replyCount: 1,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_016',
    topicId: 'topic_005',
    userId: 'user_039',
    content: '建议您和孩子一起用AI，让他先自己写，然后用AI优化，对比有什么区别。这样既锻炼了写作能力，又学会了使用工具。',
    time: '2025-03-05 17:30',
    likeCount: 42,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_021',
    replyToId: 'user_038'
  },
  {
    id: 'comment_022',
    topicId: 'topic_006',
    userId: 'user_040',
    content: '我就是阿强！说实话，每个月还完房贷真的挺难的，但看到房价涨了，心里又觉得值了。前两天小区同户型卖了350万，感觉自己赚了50万。',
    time: '2025-03-04 09:15',
    likeCount: 67,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_017',
    topicId: 'topic_006',
    userId: 'user_041',
    content: '纸面富贵而已，你又没卖。而且现在这个行情，能涨多久还不一定呢。',
    time: '2025-03-04 10:20',
    likeCount: 23,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_022',
    replyToId: 'user_040'
  },
  {
    id: 'reply_018',
    topicId: 'topic_006',
    userId: 'user_040',
    content: '至少有个盼头吧。租房的话，每个月6000给房东，啥也落不着。',
    time: '2025-03-04 11:05',
    likeCount: 45,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_022',
    replyToId: 'user_041'
  },
  {
    id: 'comment_023',
    topicId: 'topic_006',
    userId: 'user_042',
    content: '我是阿珍！看到被写进文章好惊喜。其实我和男朋友现在过得挺开心的，每年出国玩两次，周末探店、看展。买房的朋友羡慕我们，我们还羡慕他们有房呢，各有各的好吧。',
    time: '2025-03-04 13:30',
    likeCount: 89,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_024',
    topicId: 'topic_006',
    userId: 'user_043',
    content: '我在北京租房十年了，最大的痛就是搬家。五年搬了7次，每次都被房东涨价或者卖房赶走。真的累了，今年咬牙买了房，虽然远点小点，但再也不用看房东脸色了。',
    time: '2025-03-04 15:45',
    likeCount: 134,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_025',
    topicId: 'topic_006',
    userId: 'user_044',
    content: '从投资角度说，现在买房确实不是好时机。租售比太低，200万的房子一年租金才3万，还不如存银行。但架不住中国人对房子的执念啊。',
    time: '2025-03-04 18:20',
    likeCount: 56,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_026',
    topicId: 'topic_007',
    userId: 'user_045',
    content: '我就是那个二年级小朋友！叔叔你发这篇文章，我妈看到了，她说明天给我减掉一个班。谢谢叔叔！',
    time: '2025-03-03 08:10',
    likeCount: 234,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_019',
    topicId: 'topic_007',
    userId: 'user_046',
    content: '我是妈妈，看到评论里孩子的话，眼泪下来了。可能我真的太焦虑了，对不起宝贝。',
    time: '2025-03-03 09:20',
    likeCount: 156,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_026',
    replyToId: 'user_045'
  },
  {
    id: 'reply_020',
    topicId: 'topic_007',
    userId: 'user_045',
    content: '妈妈不哭，我知道你是为我好。只要少上两个班，我就很开心啦！',
    time: '2025-03-03 10:05',
    likeCount: 189,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_026',
    replyToId: 'user_046'
  },
  {
    id: 'comment_027',
    topicId: 'topic_007',
    userId: 'user_047',
    content: '我就是老张！现在真的焦虑了，孩子回来哭着说同学笑他，我也很内疚。但报班又怕孩子太累，太难了。',
    time: '2025-03-03 11:30',
    likeCount: 45,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_028',
    topicId: 'topic_007',
    userId: 'user_048',
    content: '我是教钢琴的，见过太多被逼着来的孩子。其实兴趣班的关键在于"兴趣"两个字。如果孩子不喜欢，再好的老师也教不进去。',
    time: '2025-03-03 14:15',
    likeCount: 67,
    replyCount: 2,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'reply_021',
    topicId: 'topic_007',
    userId: 'user_049',
    content: '老师，我家孩子一开始喜欢，学了一年就不想学了，要逼着继续吗？',
    time: '2025-03-03 15:20',
    likeCount: 12,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_028',
    replyToId: 'user_048'
  },
  {
    id: 'reply_022',
    topicId: 'topic_007',
    userId: 'user_048',
    content: '可以和孩子商量，定个小目标，比如再坚持半年，如果还是不想学就停。很多孩子过了瓶颈期又会重新喜欢上的。',
    time: '2025-03-03 16:10',
    likeCount: 34,
    replyCount: 0,
    status: 'active',
    parentId: 'comment_028',
    replyToId: 'user_049'
  },
  {
    id: 'comment_029',
    topicId: 'topic_007',
    userId: 'user_050',
    content: '我小时候被逼着学书法，当时恨死我妈了。现在在公司，领导总夸我字写得好，年会还让我写对联。真的感谢我妈当年的坚持。',
    time: '2025-03-03 18:45',
    likeCount: 78,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_user_001',
    topicId: 'user_post_001',
    userId: 'user_051',
    content: '说得很好！我觉得微交互设计也很重要，能给用户带来惊喜感。',
    time: '2023-10-24 15:20',
    likeCount: 12,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_user_002',
    topicId: 'user_post_001',
    userId: 'user_052',
    content: '从产品角度来说，UI设计确实直接影响用户的第一印象。',
    time: '2023-10-24 16:45',
    likeCount: 8,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_user_003',
    topicId: 'user_post_002',
    userId: 'user_053',
    content: '现场效果真的很棒！特别是那个灯光秀，太震撼了！',
    time: '2023-10-15 11:30',
    likeCount: 23,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_user_004',
    topicId: 'user_post_003',
    userId: 'user_054',
    content: '这个问题困扰了很多设计师，我觉得关键在于沟通和理解。',
    time: '2023-09-28 17:15',
    likeCount: 9,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_user_005',
    topicId: 'user_post_004',
    userId: 'user_055',
    content: '很实用的经验！我们项目也在做性能优化，可以借鉴一下。',
    time: '2023-09-15 10:30',
    likeCount: 15,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_user_006',
    topicId: 'user_post_005',
    userId: 'user_056',
    content: '确实，小程序开发有很多需要注意的地方，感谢分享！',
    time: '2023-09-02 15:10',
    likeCount: 7,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_fav_001',
    topicId: 'user_fav_001',
    userId: 'user_058',
    content: 'React 18的并发渲染确实很强大！',
    time: '2023-11-05 12:15',
    likeCount: 23,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_fav_002',
    topicId: 'user_fav_002',
    userId: 'user_060',
    content: '我们团队也在考虑微前端，很有参考价值。',
    time: '2023-10-30 16:30',
    likeCount: 15,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_fav_003',
    topicId: 'user_fav_003',
    userId: 'user_062',
    content: 'TypeScript的类型系统确实很强大！',
    time: '2023-10-18 14:05',
    likeCount: 12,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_fav_004',
    topicId: 'user_fav_004',
    userId: 'user_064',
    content: 'AI设计工具确实越来越强大了！',
    time: '2023-10-05 11:00',
    likeCount: 34,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  },
  {
    id: 'comment_fav_005',
    topicId: 'user_fav_005',
    userId: 'user_066',
    content: '云原生确实让运维工作更高效了！',
    time: '2023-09-22 17:15',
    likeCount: 23,
    replyCount: 0,
    status: 'active',
    parentId: null,
    replyToId: null
  }
]

const initialFollows = [
  { userId: 'user_001', followUserId: 'user_002', followTime: '2025-02-15 10:30' },
  { userId: 'user_001', followUserId: 'user_003', followTime: '2025-02-16 14:20' },
  { userId: 'user_001', followUserId: 'user_004', followTime: '2025-02-18 09:45' },
  { userId: 'user_001', followUserId: 'user_005', followTime: '2025-02-20 16:30' },
  { userId: 'user_001', followUserId: 'user_006', followTime: '2025-02-22 11:15' },
  { userId: 'user_001', followUserId: 'user_007', followTime: '2025-02-25 13:40' },
  { userId: 'user_001', followUserId: 'user_008', followTime: '2025-03-01 15:20' },
  { userId: 'user_001', followUserId: 'user_009', followTime: '2025-03-02 10:10' },
  { userId: 'user_001', followUserId: 'user_010', followTime: '2025-03-03 12:30' },
  
  { userId: 'user_002', followUserId: 'user_001', followTime: '2025-02-16 09:20' },
  { userId: 'user_003', followUserId: 'user_001', followTime: '2025-02-17 14:30' },
  { userId: 'user_004', followUserId: 'user_001', followTime: '2025-02-19 11:45' },
  { userId: 'user_005', followUserId: 'user_001', followTime: '2025-02-21 16:15' },
  { userId: 'user_006', followUserId: 'user_001', followTime: '2025-02-23 10:30' },
  { userId: 'user_007', followUserId: 'user_001', followTime: '2025-02-26 13:50' },
  { userId: 'user_008', followUserId: 'user_001', followTime: '2025-03-02 09:40' },
  { userId: 'user_009', followUserId: 'user_001', followTime: '2025-03-03 15:20' },
  { userId: 'user_010', followUserId: 'user_001', followTime: '2025-03-04 11:10' },
  
  { userId: 'user_002', followUserId: 'user_004', followTime: '2025-02-10 14:30' },
  { userId: 'user_002', followUserId: 'user_005', followTime: '2025-02-12 09:20' },
  { userId: 'user_002', followUserId: 'user_007', followTime: '2025-02-15 16:45' },
  
  { userId: 'user_003', followUserId: 'user_001', followTime: '2025-02-05 11:30' },
  { userId: 'user_003', followUserId: 'user_004', followTime: '2025-02-08 13:20' },
  { userId: 'user_003', followUserId: 'user_008', followTime: '2025-02-12 10:15' },
  
  { userId: 'user_004', followUserId: 'user_001', followTime: '2025-01-20 15:40' },
  { userId: 'user_004', followUserId: 'user_002', followTime: '2025-01-22 09:30' },
  { userId: 'user_004', followUserId: 'user_005', followTime: '2025-01-25 14:20' },
  { userId: 'user_004', followUserId: 'user_007', followTime: '2025-01-28 11:50' },
  { userId: 'user_004', followUserId: 'user_008', followTime: '2025-02-01 16:30' },
  
  { userId: 'user_005', followUserId: 'user_001', followTime: '2025-01-18 10:20' },
  { userId: 'user_005', followUserId: 'user_004', followTime: '2025-01-21 13:45' },
  { userId: 'user_005', followUserId: 'user_009', followTime: '2025-01-24 15:30' },
  
  { userId: 'user_006', followUserId: 'user_001', followTime: '2024-10-05 09:15' },
  { userId: 'user_006', followUserId: 'user_002', followTime: '2024-10-08 14:30' },
  { userId: 'user_006', followUserId: 'user_004', followTime: '2024-10-12 11:20' },
  { userId: 'user_006', followUserId: 'user_005', followTime: '2024-10-15 16:40' },
  
  { userId: 'user_007', followUserId: 'user_001', followTime: '2025-02-05 10:30' },
  { userId: 'user_007', followUserId: 'user_002', followTime: '2025-02-08 13:20' },
  { userId: 'user_007', followUserId: 'user_004', followTime: '2025-02-12 15:45' },
  
  { userId: 'user_008', followUserId: 'user_001', followTime: '2025-01-10 09:30' },
  { userId: 'user_008', followUserId: 'user_004', followTime: '2025-01-15 14:20' },
  { userId: 'user_008', followUserId: 'user_005', followTime: '2025-01-18 11:40' },
  
  { userId: 'user_009', followUserId: 'user_001', followTime: '2025-02-20 16:30' },
  { userId: 'user_009', followUserId: 'user_004', followTime: '2025-02-22 10:15' },
  { userId: 'user_009', followUserId: 'user_005', followTime: '2025-02-25 13:40' },
  
  { userId: 'user_010', followUserId: 'user_001', followTime: '2025-02-18 09:20' },
  { userId: 'user_010', followUserId: 'user_004', followTime: '2025-02-21 14:30' },
  { userId: 'user_010', followUserId: 'user_005', followTime: '2025-02-24 11:50' }
]

const initialLikes = [
  { userId: 'user_001', targetType: 'topic', targetId: 'featured_topic_001', time: '2025-03-09 08:05' },
  { userId: 'user_001', targetType: 'topic', targetId: 'topic_001', time: '2025-03-09 08:20' },
  { userId: 'user_001', targetType: 'topic', targetId: 'topic_003', time: '2025-03-07 09:30' },
  { userId: 'user_001', targetType: 'topic', targetId: 'topic_006', time: '2025-03-04 16:20' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_post_001', time: '2023-10-24 14:35' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_post_002', time: '2023-10-15 10:20' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_post_004', time: '2023-09-15 09:50' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_fav_001', time: '2023-11-05 11:35' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_fav_002', time: '2023-10-30 15:50' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_fav_004', time: '2023-10-05 10:20' },
  { userId: 'user_001', targetType: 'topic', targetId: 'user_fav_005', time: '2023-09-22 16:35' },
  
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_001', time: '2025-03-09 09:20' },
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_005', time: '2025-03-09 09:30' },
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_008', time: '2025-03-08 09:25' },
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_012', time: '2025-03-07 10:20' },
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_user_002', time: '2023-10-24 16:50' },
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_user_004', time: '2023-09-28 17:20' },
  { userId: 'user_001', targetType: 'comment', targetId: 'comment_user_006', time: '2023-09-02 15:15' },
  
  { userId: 'user_002', targetType: 'topic', targetId: 'featured_topic_001', time: '2025-03-09 08:10' },
  { userId: 'user_002', targetType: 'topic', targetId: 'topic_002', time: '2025-03-08 14:35' },
  { userId: 'user_002', targetType: 'topic', targetId: 'topic_004', time: '2025-03-06 18:50' },
  { userId: 'user_002', targetType: 'comment', targetId: 'comment_003', time: '2025-03-09 11:25' },
  
  { userId: 'user_003', targetType: 'topic', targetId: 'topic_001', time: '2025-03-08 20:20' },
  { userId: 'user_003', targetType: 'topic', targetId: 'topic_003', time: '2025-03-07 09:25' },
  { userId: 'user_003', targetType: 'topic', targetId: 'topic_005', time: '2025-03-05 10:35' },
  { userId: 'user_003', targetType: 'comment', targetId: 'comment_006', time: '2025-03-09 11:05' },
  
  { userId: 'user_004', targetType: 'topic', targetId: 'user_post_001', time: '2023-10-24 15:25' },
  { userId: 'user_004', targetType: 'topic', targetId: 'user_fav_001', time: '2023-11-05 11:40' },
  { userId: 'user_004', targetType: 'comment', targetId: 'comment_001', time: '2025-03-09 09:25' },
  
  { userId: 'user_005', targetType: 'topic', targetId: 'user_post_001', time: '2023-10-24 16:50' },
  { userId: 'user_005', targetType: 'topic', targetId: 'user_fav_002', time: '2023-10-30 16:35' },
  { userId: 'user_005', targetType: 'comment', targetId: 'comment_005', time: '2025-03-09 09:40' },
  
  { userId: 'user_006', targetType: 'topic', targetId: 'user_post_004', time: '2023-09-15 10:35' },
  { userId: 'user_006', targetType: 'topic', targetId: 'user_fav_003', time: '2023-10-18 14:10' },
  { userId: 'user_006', targetType: 'comment', targetId: 'comment_012', time: '2025-03-07 10:30' }
]

const initialVotes = [
  { userId: 'user_001', topicId: 'featured_topic_001', choice: 'positive', time: '2025-03-09 08:02' },
  { userId: 'user_001', topicId: 'topic_001', choice: 'positive', time: '2025-03-08 20:18' },
  { userId: 'user_001', topicId: 'topic_005', choice: 'negative', time: '2025-03-04 10:33' },
  { userId: 'user_001', topicId: 'topic_007', choice: 'negative', time: '2025-03-02 09:48' },
  { userId: 'user_001', topicId: 'user_post_001', choice: 'positive', time: '2023-10-24 14:32' },
  { userId: 'user_001', topicId: 'user_post_003', choice: 'positive', time: '2023-09-28 16:22' },
  
  { userId: 'user_002', topicId: 'featured_topic_001', choice: 'positive', time: '2025-03-09 08:12' },
  { userId: 'user_002', topicId: 'topic_002', choice: 'negative', time: '2025-03-07 14:33' },
  { userId: 'user_002', topicId: 'topic_004', choice: 'positive', time: '2025-03-05 18:48' },
  
  { userId: 'user_003', topicId: 'topic_001', choice: 'positive', time: '2025-03-08 20:22' },
  { userId: 'user_003', topicId: 'topic_003', choice: 'negative', time: '2025-03-06 09:23' },
  { userId: 'user_003', topicId: 'topic_006', choice: 'positive', time: '2025-03-03 16:18' },
  
  { userId: 'user_004', topicId: 'topic_001', choice: 'positive', time: '2025-03-08 20:25' },
  { userId: 'user_004', topicId: 'topic_005', choice: 'positive', time: '2025-03-04 10:38' },
  { userId: 'user_004', topicId: 'user_post_001', choice: 'positive', time: '2023-10-24 15:22' },
  
  { userId: 'user_005', topicId: 'topic_001', choice: 'positive', time: '2025-03-08 20:28' },
  { userId: 'user_005', topicId: 'topic_004', choice: 'positive', time: '2025-03-05 18:52' },
  { userId: 'user_005', topicId: 'user_post_001', choice: 'positive', time: '2023-10-24 16:48' },
  
  { userId: 'user_006', topicId: 'topic_001', choice: 'positive', time: '2025-03-08 20:32' },
  { userId: 'user_006', topicId: 'topic_005', choice: 'positive', time: '2025-03-04 10:42' },
  { userId: 'user_006', topicId: 'topic_007', choice: 'negative', time: '2025-03-02 09:52' }
]

const initialFavorites = [
  { userId: 'user_001', topicId: 'user_fav_001', time: '2023-11-05 11:32' },
  { userId: 'user_001', topicId: 'user_fav_002', time: '2023-10-30 15:47' },
  { userId: 'user_001', topicId: 'user_fav_003', time: '2023-10-18 13:22' },
  { userId: 'user_001', topicId: 'user_fav_004', time: '2023-10-05 10:17' },
  { userId: 'user_001', topicId: 'user_fav_005', time: '2023-09-22 16:32' },
  { userId: 'user_001', topicId: 'featured_topic_001', time: '2025-03-09 08:03' },
  { userId: 'user_001', topicId: 'topic_001', time: '2025-03-08 20:16' },
  
  { userId: 'user_002', topicId: 'topic_003', time: '2025-03-06 09:22' },
  { userId: 'user_002', topicId: 'topic_005', time: '2025-03-04 10:32' },
  
  { userId: 'user_003', topicId: 'topic_002', time: '2025-03-07 14:32' },
  { userId: 'user_003', topicId: 'topic_006', time: '2025-03-03 16:17' },
  
  { userId: 'user_004', topicId: 'user_post_001', time: '2023-10-24 15:23' },
  { userId: 'user_004', topicId: 'topic_004', time: '2025-03-05 18:47' },
  
  { userId: 'user_005', topicId: 'user_fav_002', time: '2023-10-30 16:32' },
  { userId: 'user_005', topicId: 'topic_001', time: '2025-03-08 20:20' }
]

const initialNotifications = [
  {
    id: 'notify_001',
    userId: 'user_001',
    type: 'comment',
    title: '资深设计师评论了你的话题',
    content: '资深设计师：这个问题困扰了很多设计师，我觉得关键在于沟通和理解。',
    time: '2023-09-28 17:15',
    read: false,
    sourceId: 'user_post_003',
    sourceType: 'topic',
    fromUserId: 'user_054',
    commentId: 'comment_user_004'
  },
  {
    id: 'notify_002',
    userId: 'user_001',
    type: 'reply',
    title: '焦虑的程序员回复了你的评论',
    content: '焦虑的程序员 回复了你：问题是学习的速度赶不上AI迭代的速度啊',
    time: '2025-03-09 09:45',
    read: false,
    sourceId: 'comment_001',
    sourceType: 'comment',
    fromUserId: 'user_010',
    replyId: 'reply_001',
    topicId: 'featured_topic_001'
  },
  {
    id: 'notify_003',
    userId: 'user_001',
    type: 'comment',
    title: '插画师小美评论了你的话题',
    content: '插画师小美：作为插画师，我真的快被AI搞崩溃了',
    time: '2025-03-09 10:30',
    read: false,
    sourceId: 'featured_topic_001',
    sourceType: 'topic',
    fromUserId: 'user_011',
    commentId: 'comment_002'
  },
  {
    id: 'notify_004',
    userId: 'user_001',
    type: 'comment',
    title: '哲学系学生评论了你的话题',
    content: '哲学系学生：我关心的是伦理问题。如果自动驾驶出车祸，是车主的错还是算法的错？',
    time: '2025-03-09 11:20',
    read: true,
    sourceId: 'featured_topic_001',
    sourceType: 'topic',
    fromUserId: 'user_012',
    commentId: 'comment_003'
  },
  {
    id: 'notify_005',
    userId: 'user_001',
    type: 'comment',
    title: 'UI设计师小王评论了你的话题',
    content: 'UI设计师小王：说得很好！我觉得微交互设计也很重要',
    time: '2023-10-24 15:20',
    read: true,
    sourceId: 'user_post_001',
    sourceType: 'topic',
    fromUserId: 'user_051',
    commentId: 'comment_user_001'
  },
  {
    id: 'notify_006',
    userId: 'user_001',
    type: 'comment',
    title: '产品经理小李评论了你的话题',
    content: '产品经理小李：从产品角度来说，UI设计确实直接影响用户的第一印象',
    time: '2023-10-24 16:45',
    read: false,
    sourceId: 'user_post_001',
    sourceType: 'topic',
    fromUserId: 'user_052',
    commentId: 'comment_user_002'
  },
  {
    id: 'notify_007',
    userId: 'user_001',
    type: 'comment',
    title: '活动参与者评论了你的话题',
    content: '活动参与者：现场效果真的很棒！特别是那个灯光秀，太震撼了！',
    time: '2023-10-15 11:30',
    read: true,
    sourceId: 'user_post_002',
    sourceType: 'topic',
    fromUserId: 'user_053',
    commentId: 'comment_user_003'
  },
  {
    id: 'notify_008',
    userId: 'user_001',
    type: 'comment',
    title: '前端工程师评论了你的话题',
    content: '前端工程师：很实用的经验！我们项目也在做性能优化',
    time: '2023-09-15 10:30',
    read: false,
    sourceId: 'user_post_004',
    sourceType: 'topic',
    fromUserId: 'user_055',
    commentId: 'comment_user_005'
  },
  {
    id: 'notify_009',
    userId: 'user_001',
    type: 'comment',
    title: '小程序开发者评论了你的话题',
    content: '小程序开发者：确实，小程序开发有很多需要注意的地方，感谢分享！',
    time: '2023-09-02 15:10',
    read: false,
    sourceId: 'user_post_005',
    sourceType: 'topic',
    fromUserId: 'user_056',
    commentId: 'comment_user_006'
  },
  {
    id: 'notify_010',
    userId: 'user_001',
    type: 'reply',
    title: 'AI工程师小李回复了你的评论',
    content: 'AI工程师小李 回复了你：那就别学那些容易被替代的，往架构、算法、业务理解这些方向发展',
    time: '2025-03-09 10:02',
    read: false,
    sourceId: 'comment_001',
    sourceType: 'comment',
    fromUserId: 'user_009',
    replyId: 'reply_002',
    topicId: 'featured_topic_001'
  },
  {
    id: 'notify_011',
    userId: 'user_001',
    type: 'like',
    title: '教育观察者点赞了你的话题',
    content: '教育观察者点赞了你发布的"人工智能时代的机遇与挑战"',
    time: '2025-03-09 08:10',
    read: false,
    sourceId: 'featured_topic_001',
    sourceType: 'topic',
    fromUserId: 'user_002'
  },
  {
    id: 'notify_012',
    userId: 'user_001',
    type: 'like',
    title: '职场观察员点赞了你的话题',
    content: '职场观察员点赞了你发布的"如何利用现代UI设计提升用户留存率？"',
    time: '2023-10-24 14:35',
    read: true,
    sourceId: 'user_post_001',
    sourceType: 'topic',
    fromUserId: 'user_003'
  },
  {
    id: 'notify_013',
    userId: 'user_001',
    type: 'like',
    title: '社会观察家点赞了你的话题',
    content: '社会观察家点赞了你发布的"设计师如何平衡审美与商业价值"',
    time: '2023-09-28 16:25',
    read: true,
    sourceId: 'user_post_003',
    sourceType: 'topic',
    fromUserId: 'user_004'
  },
  {
    id: 'notify_014',
    userId: 'user_001',
    type: 'follow',
    title: '焦虑的程序员关注了你',
    content: '焦虑的程序员 成为了你的新粉丝',
    time: '2025-03-04 11:10',
    read: true,
    sourceType: 'follow',
    fromUserId: 'user_010'
  },
  {
    id: 'notify_015',
    userId: 'user_001',
    type: 'follow',
    title: '大二在读生关注了你',
    content: '大二在读生 成为了你的新粉丝',
    time: '2025-02-23 10:30',
    read: true,
    sourceType: 'follow',
    fromUserId: 'user_013'
  },
  {
    id: 'notify_016',
    userId: 'user_001',
    type: 'follow',
    title: 'HR老张关注了你',
    content: 'HR老张 成为了你的新粉丝',
    time: '2025-02-26 13:50',
    read: false,
    sourceType: 'follow',
    fromUserId: 'user_014'
  },
  {
    id: 'notify_017',
    userId: 'user_001',
    type: 'vote',
    title: '你的投票有了新结果',
    content: '你参与的"你支持还是反对躺平的生活态度？"话题投票人数已突破800人',
    time: '2025-03-08 16:30',
    read: true,
    sourceId: 'topic_003',
    sourceType: 'topic'
  },
  {
    id: 'notify_018',
    userId: 'user_001',
    type: 'vote',
    title: '你的投票有了新结果',
    content: '你参与的"你支持还是反对学生在作业中使用ChatGPT？"话题投票人数已突破1000人',
    time: '2025-03-05 14:20',
    read: false,
    sourceId: 'topic_005',
    sourceType: 'topic'
  }
]

const config = {
  appName: '蜂鸣',
  version: '1.0.0',
  theme: 'light',
  defaultSettings: {
    notification: true,
    autoPlayVideo: false,
    language: 'zh-CN'
  },
  features: {
    vote: true,
    comment: true,
    share: true,
    follow: true
  }
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
    return this.users.find(u => u.id === 'user_001')
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

    // 登录
    wx.login({
      success: res => {
        console.log('登录成功', res.code)
        console.log('当前用户:', dataService.getCurrentUser())
      },
    })
  },
})

// 导出类型定义供其他文件使用
export interface IAppOption {
  globalData: DataService
}

export default dataService