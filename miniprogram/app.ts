// app.ts

// 头像池
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
  
  
  // dicebear 机器人头像 - 改为PNG格式
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
  
  // dicebear 像素艺术头像 - 改为PNG格式
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
  
  // dicebear 冒险者头像 - 改为PNG格式
  'https://api.dicebear.com/7.x/adventurer/png?seed=Alex&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Jordan&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Taylor&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Casey&size=100',
  'https://api.dicebear.com/7.x/adventurer/png?seed=Riley&size=100',
  
  // dicebear Micah 头像 - 改为PNG格式
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

// 根据用户ID获取固定头像（确保同一用户每次显示相同头像）
function getUserAvatar(userId: string) {
  // 使用用户ID的哈希值来确定头像索引，确保同一用户始终显示相同头像
  let hash = 0
  for (let i = 0; i < userId.length; i++) {
    hash = ((hash << 5) - hash) + userId.charCodeAt(i)
    hash = hash & hash // 转换为32位整数
  }
  const index = Math.abs(hash) % avatarPool.length
  return avatarPool[index]
}

App<IAppOption>({
  globalData: {
    // 用户信息
    userInfo: {
      id: 'user_001',
      nickname: '小明',
      avatar: getUserAvatar('user_001'),
      level: 2,
      points: 150,
      followCount: 25,
      fansCount: 18,
      signature: '热爱生活，分享美好时光'
    },
    // 特色话题 - 专门的数据源
    featuredTopic: {
      id: 'featured_topic_001',
      title: '人工智能时代的机遇与挑战',
      image:'https://picsum.photos/id/1/800/400',
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
          positive: {
            text: '我支持',
            count: 156
          },
          negative: {
            text: '我反对',
            count: 89
          },
          totalVotes: 245,
          userVoted: true,
          userChoice: 'positive'
        }}
      ],
      author: {
        id: 'user_001',
        nickname: '小明',
        avatar: getUserAvatar('user_001')
      },
      createTime: '2025-03-09 08:00',
      likeCount: 156,
      userLiked: true,
      commentCount: 89,
      comments: [
        {
          id: 'comment_001',
          user: {
            id: 'user_009',
            nickname: 'AI工程师小李',
            avatar: getUserAvatar('user_009')
          },
          content: '我是做AI开发的，说实话AI确实会替代一些重复性工作，但也会创造新岗位。我们现在最缺的是懂AI的复合型人才，而不是单纯担心被取代。',
          time: '2025-03-09 09:15',
          likeCount: 34,
          userLiked: true,
          replies: [
            {
              id: 'reply_001',
            user: {
              id: 'user_010',
              nickname: '焦虑的程序员',
              avatar: getUserAvatar('user_010')
            },
            replyTo: {
              id: 'user_009',
              nickname: 'AI工程师小李',
              avatar: getUserAvatar('user_009')
            },
              content: '问题是学习的速度赶不上AI迭代的速度啊，我刚学会的东西AI已经能自动生成了',
              time: '2025-03-09 09:45',
              likeCount: 12,
              userLiked: false
            },
            {
              id: 'reply_002',
            user: {
              id: 'user_009',
              nickname: 'AI工程师小李',
              avatar: getUserAvatar('user_009')
            },
            replyTo: {
              id: 'user_010',
              nickname: '焦虑的程序员',
              avatar: getUserAvatar('user_010')
            },
              content: '那就别学那些容易被替代的，往架构、算法、业务理解这些方向发展，AI是工具不是敌人',
              time: '2025-03-09 10:02',
              likeCount: 8,
              userLiked: false
            }
          ]
        },
        {
          id: 'comment_002',
          user: {
            id: 'user_011',
            nickname: '插画师小美',
            avatar: getUserAvatar('user_011')
          },
          content: '作为插画师，我真的快被AI搞崩溃了。客户拿着AI生成的图来砍价："你看AI几秒钟就画出来了，你凭什么收这么贵？"但AI用的都是我们画师的素材训练的，这公平吗？',
          time: '2025-03-09 10:30',
          likeCount: 56,
          userLiked: false
        },
        {
          id: 'comment_003',
          user: {
            id: 'user_012',
            nickname: '哲学系学生',
            avatar: getUserAvatar('user_012')
          },
          content: '我关心的是伦理问题。如果自动驾驶出车祸，是车主的错还是算法的错？如果AI诊断失误，谁负责？这些法律和伦理框架都还没建立起来，就大规模推广，太危险了。',
          time: '2025-03-09 11:20',
          likeCount: 23,
          userLiked: false
        }
      ]
    },

    // 话题列表 - 图文混排格式
    topics: [
      {
        id: 'topic_001',
        title: '大学教育：究竟是塑造人才还是浪费时间？',
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
            positive: {
              text: '我支持',
              count: 342
            },
            negative: {
              text: '我反对',
              count: 287
            },
            totalVotes: 629,
            userVoted: true,
            userChoice: 'positive'
          }}
        ],
        author: {
          id: 'user_002',
          nickname: '教育观察者',
          avatar: getUserAvatar('user_002')
        },
        createTime: '2025-03-08 20:15',
        likeCount: 234,
        userLiked: true,
        commentCount: 156,
        comments: [
          {
            id: 'comment_004',
            user: {
              id: 'user_013',
              nickname: '大二在读生',
              avatar: getUserAvatar('user_013')
            },
            content: '我现在大二，每天上课就在想：我学的这些东西到底有什么用？高数、线代，以后工作真的用得上吗？还是说只是为了拿个文凭？',
            time: '2025-03-09 08:30',
            likeCount: 45,
            userLiked: true
          },
          {
            id: 'comment_005',
            user: {
              id: 'user_014',
              nickname: 'HR老张',
              avatar: getUserAvatar('user_014')
            },
            content: '我做了十年招聘，说实话学历确实是敲门砖。同样两个应届生，985的和二本的，只要985的不是太差，我们肯定优先选985。这不是歧视，是筛选成本问题。',
            time: '2025-03-09 09:15',
            likeCount: 67,
            userLiked: true,
            replies: [
              {
                id: 'reply_003',
                user: {
                  id: 'user_015',
                  nickname: '自学成才',
                  avatar: getUserAvatar('user_015')
                },
                replyTo: {
                  id: 'user_014',
                  nickname: 'HR老张',
                  avatar: getUserAvatar('user_014')
                },
                content: '这不就是学历歧视吗？我高中毕业自学编程，现在带团队，手下好几个研究生。能力比学历重要多了。',
                time: '2025-03-09 10:05',
                likeCount: 28,
                userLiked: true
              },
              {
                id: 'reply_004',
                user: {
                  id: 'user_014',
                  nickname: 'HR老张',
                  avatar: getUserAvatar('user_014')
                },
                replyTo: {
                  id: 'user_015',
                  nickname: '自学成才',
                  avatar: getUserAvatar('user_015')
                },
                content: '你说得对，但你是特例。大多数没学历的，连展示能力的机会都没有。有学历至少证明你有一定的学习能力和毅力。',
                time: '2025-03-09 10:30',
                likeCount: 31,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_006',
            user: {
              id: 'user_016',
              nickname: '农村孩子',
              avatar: getUserAvatar('user_016')
            },
            content: '我家是农村的，父母种地供我上大学。对我来说，大学是改变命运的唯一出路。虽然现在工作也不咋地，但至少不用像父母那样面朝黄土背朝天。',
            time: '2025-03-09 11:00',
            likeCount: 89,
            userLiked: false
          },
          {
            id: 'comment_007',
            user: {
              id: 'user_017',
              nickname: '留学海归',
              avatar: getUserAvatar('user_017')
            },
            content: '我在国外读过书，感觉国内外大学最大的区别是：国外更注重批判性思维和自主学习，国内还是填鸭式教育居多。不是大学没用，是咱们的教育方式该改革了。',
            time: '2025-03-09 13:20',
            likeCount: 52,
            userLiked: false
          }
        ]
      },
      {
        id: 'topic_002',
        title: '数字游民 vs 朝九晚五：哪种生活方式更适合中国人？',
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
            positive: {
              text: '我支持',
              count: 456
            },
            negative: {
              text: '我反对',
              count: 523
            },
            totalVotes: 979,
            userVoted: false,
            userChoice: null
          }}
        ],
        author: {
          id: 'user_003',
          nickname: '职场观察员',
          avatar: getUserAvatar('user_003')
        },
        createTime: '2025-03-07 14:30',
        likeCount: 512,
        userLiked: false,
        commentCount: 378,
        comments: [
          {
            id: 'comment_008',
            user: {
              id: 'user_018',
              nickname: '大理数字游民',
              avatar: getUserAvatar('user_018')
            },
            content: '我就是你说的那个在大理的UI设计姑娘！哈哈，没想到被写进文章了。说实话，数字游民确实有孤独的时候，但对我来说，自由的快乐远大于孤独的痛苦。',
            time: '2025-03-08 09:20',
            likeCount: 78,
            userLiked: true,
            replies: [
              {
                id: 'reply_005',
                user: {
                  id: 'user_019',
                  nickname: '想辞职的小王',
                  avatar: getUserAvatar('user_019')
                },
                replyTo: {
                  id: 'user_018',
                  nickname: '大理数字游民',
                  avatar: getUserAvatar('user_018')
                },
                content: '姐妹你是怎么找到客户的？我也想试试，但怕收入不稳定',
                time: '2025-03-08 10:15',
                likeCount: 23,
                userLiked: false
              },
              {
                id: 'reply_006',
                user: {
                  id: 'user_018',
                  nickname: '大理数字游民',
                  avatar: getUserAvatar('user_018')
                },
                replyTo: {
                  id: 'user_019',
                  nickname: '想辞职的小王',
                  avatar: getUserAvatar('user_019')
                },
                content: '我是先在upwork上接单积累口碑，慢慢有了固定客户。刚开始确实难，建议先不要辞职，业余时间接点小单试试水。',
                time: '2025-03-08 11:30',
                likeCount: 45,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_009',
            user: {
              id: 'user_020',
              nickname: '国企老员工',
              avatar: getUserAvatar('user_020')
            },
            content: '我在国企干了二十年，虽然工资不高，但公积金高、福利好、稳定。去年女儿结婚，单位还给了婚假和礼金。这种安全感，数字游民给不了。',
            time: '2025-03-08 14:45',
            likeCount: 56,
            userLiked: false
          },
          {
            id: 'comment_010',
            user: {
              id: 'user_021',
              nickname: '自由职业者阿杰',
              avatar: getUserAvatar('user_021')
            },
            content: '我就是文中的阿杰...现在回公司上班了，但说实话，还是怀念自由职业的日子。现在每天开会、写周报、应付办公室政治，感觉在浪费生命。',
            time: '2025-03-08 16:20',
            likeCount: 42,
            userLiked: false,
            replies: [
              {
                id: 'reply_007',
                user: {
                  id: 'user_022',
                  nickname: '职场小白',
                  avatar: getUserAvatar('user_022')
                },
                replyTo: {
                  id: 'user_021',
                  nickname: '自由职业者阿杰',
                  avatar: getUserAvatar('user_021')
                },
                content: '那为什么还要回去呢？自由职业不好吗？',
                time: '2025-03-08 17:05',
                likeCount: 8,
                userLiked: false
              },
              {
                id: 'reply_008',
                user: {
                  id: 'user_021',
                  nickname: '自由职业者阿杰',
                  avatar: getUserAvatar('user_021')
                },
                replyTo: {
                  id: 'user_022',
                  nickname: '职场小白',
                  avatar: getUserAvatar('user_022')
                },
                content: '因为要结婚买房啊，自由职业贷款都批不下来。现实问题，没办法。',
                time: '2025-03-08 17:30',
                likeCount: 34,
                userLiked: true
              }
            ]
          }
        ]
      },
      {
        id: 'topic_003',
        title: '内卷还是躺平：当代年轻人的生存之道',
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
            positive: {
              text: '我支持',
              count: 389
            },
            negative: {
              text: '我反对',
              count: 412
            },
            totalVotes: 801,
            userVoted: false,
            userChoice: null
          }}
        ],
        author: {
          id: 'user_004',
          nickname: '社会观察家',
          avatar: getUserAvatar('user_004')
        },
        createTime: '2025-03-06 09:20',
        likeCount: 678,
        userLiked: true,
        commentCount: 445,
        comments: [
          {
            id: 'comment_011',
            user: {
              id: 'user_023',
              nickname: '房贷狗',
              avatar: getUserAvatar('user_023')
            },
            content: '我也想躺平，可房贷谁帮我还？孩子学费谁出？父母养老钱谁给？我们这些80后，上有老下有小，躺不平也卷不动，卡在中间最难受。',
            time: '2025-03-07 08:30',
            likeCount: 123,
            userLiked: false
          },
          {
            id: 'comment_012',
            user: {
              id: 'user_024',
              nickname: '00后小陈',
              avatar: getUserAvatar('user_024')
            },
            content: '我就是文中小陈的原型！哈哈哈，被写进文章了。现在父母天天催我找对象，说躺平没出息。可我觉得，快乐最重要啊，为什么要用别人的标准衡量自己？',
            time: '2025-03-07 10:15',
            likeCount: 89,
            userLiked: true,
            replies: [
              {
                id: 'reply_009',
                user: {
                  id: 'user_025',
                  nickname: '焦虑的妈妈',
                  avatar: getUserAvatar('user_025')
                },
                replyTo: {
                  id: 'user_024',
                  nickname: '00后小陈',
                  avatar: getUserAvatar('user_024')
                },
                content: '孩子，等你到了我这个年纪就明白了，人不能只看眼前。你现在觉得快乐，老了怎么办？',
                time: '2025-03-07 11:20',
                likeCount: 34,
                userLiked: false
              },
              {
                id: 'reply_010',
                user: {
                  id: 'user_024',
                  nickname: '00后小陈',
                  avatar: getUserAvatar('user_024')
                },
                replyTo: {
                  id: 'user_025',
                  nickname: '焦虑的妈妈',
                  avatar: getUserAvatar('user_025')
                },
                content: '阿姨，我们这代人想通了，与其焦虑未来，不如过好现在。未来什么样谁知道呢？',
                time: '2025-03-07 13:45',
                likeCount: 56,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_013',
            user: {
              id: 'user_026',
              nickname: '清醒的姐姐',
              avatar: getUserAvatar('user_026')
            },
            content: '我就是你说的那个找到平衡点的姐姐！没想到有人把我的话写进文章。其实我就是想通了：工作是为了生活，不是生活为了工作。该努力时努力，该休息时休息，别被任何人绑架。',
            time: '2025-03-07 15:30',
            likeCount: 67,
            userLiked: false
          },
          {
            id: 'comment_014',
            user: {
              id: 'user_027',
              nickname: '创业者老王',
              avatar: getUserAvatar('user_027')
            },
            content: '我就是老王本王！现在胃病严重，每天吃药。说实话，如果能重来，我不会这么拼。但没办法，已经到这个位置了，下不来。年轻人，身体是革命的本钱，别学我。',
            time: '2025-03-07 18:20',
            likeCount: 145,
            userLiked: true
          }
        ]
      },
      {
        id: 'topic_004',
        title: '父母养老：送养老院还是不孝？传统孝道与现代困境的碰撞',
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
            positive: {
              text: '我支持',
              count: 234
            },
            negative: {
              text: '我反对',
              count: 198
            },
            totalVotes: 432,
            userVoted: false,
            userChoice: null
          }}
        ],
        author: {
          id: 'user_005',
          nickname: '80后独生子',
          avatar: getUserAvatar('user_005')
        },
        createTime: '2025-03-05 18:45',
        likeCount: 345,
        userLiked: false,
        commentCount: 289,
        comments: [
          {
            id: 'comment_015',
            user: {
              id: 'user_028',
              nickname: '王阿姨的儿子',
              avatar: getUserAvatar('user_028')
            },
            content: '我就是你文中的小张...看到这篇文章眼泪都下来了。每天被亲戚邻居骂不孝，我妈也怨我。可我真的尽力了，在北京打拼不容易，我也有自己的小家要养。谁能告诉我，到底该怎么办？',
            time: '2025-03-06 08:30',
            likeCount: 156,
            userLiked: true,
            replies: [
              {
                id: 'reply_011',
                user: {
                  id: 'user_029',
                  nickname: '心理咨询师',
                  avatar: getUserAvatar('user_029')
                },
                replyTo: {
                  id: 'user_028',
                  nickname: '王阿姨的儿子',
                  avatar: getUserAvatar('user_028')
                },
                content: '小张，你已经做得很好了。孝道不应该是道德绑架。定期去看妈妈，多视频，让她感受到你的关心，比整天在一起却充满怨气要好。',
                time: '2025-03-06 09:45',
                likeCount: 45,
                userLiked: false
              },
              {
                id: 'reply_012',
                user: {
                  id: 'user_030',
                  nickname: '邻居大妈',
                  avatar: getUserAvatar('user_030')
                },
                replyTo: {
                  id: 'user_029',
                  nickname: '心理咨询师',
                  avatar: getUserAvatar('user_029')
                },
                content: '说得轻巧，父母养你小，你养父母老，这是天经地义的！送养老院就是逃避责任！',
                time: '2025-03-06 10:20',
                likeCount: 12,
                userLiked: false
              },
              {
                id: 'reply_013',
                user: {
                  id: 'user_031',
                  nickname: '养老院护工',
                  avatar: getUserAvatar('user_031')
                },
                replyTo: {
                  id: 'user_030',
                  nickname: '邻居大妈',
                  avatar: getUserAvatar('user_030')
                },
                content: '我在养老院工作十年，很多老人其实在养老院比在家开心，有同龄人聊天，有专业护理。在家反而孤单，子女上班去了，一整天没人说话。',
                time: '2025-03-06 11:05',
                likeCount: 78,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_016',
            user: {
              id: 'user_032',
              nickname: '海归女儿',
              avatar: getUserAvatar('user_032')
            },
            content: '我就是你文中那个在国外工作的女儿。我每年回国两次，平时每天视频。我爸妈说，他们在小区里可自豪了，说女儿在国外很有出息。但我知道，他们生病的时候我都不在身边，心里很愧疚。',
            time: '2025-03-06 13:15',
            likeCount: 67,
            userLiked: false
          },
          {
            id: 'comment_017',
            user: {
              id: 'user_033',
              nickname: '60后老刘',
              avatar: getUserAvatar('user_033')
            },
            content: '我是60后，我想说，我们这代人其实也不想拖累孩子。我和老伴商量好了，以后就去养老院，不给孩子添麻烦。孩子们过好自己的日子，我们就满足了。',
            time: '2025-03-06 15:40',
            likeCount: 89,
            userLiked: false
          }
        ]
      },
      {
        id: 'topic_005',
        title: 'ChatGPT时代，学生还能学到真东西吗？',
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
            positive: {
              text: '我支持',
              count: 512
            },
            negative: {
              text: '我反对',
              count: 487
            },
            totalVotes: 999,
            userVoted: true,
            userChoice: 'negative'
          }}
        ],
        author: {
          id: 'user_006',
          nickname: '教育科技观察者',
          avatar: getUserAvatar('user_006')
        },
        createTime: '2025-03-04 10:30',
        likeCount: 423,
        userLiked: false,
        commentCount: 312,
        comments: [
          {
            id: 'comment_018',
            user: {
              id: 'user_034',
              nickname: '高一学生',
              avatar: getUserAvatar('user_034')
            },
            content: '我就是那个侄子！叔你居然把我写进文章了。其实我说那句话的意思是：现在的作业太无聊了，如果作业有意义，我们也不会想用AI糊弄。',
            time: '2025-03-05 08:20',
            likeCount: 87,
            userLiked: true
          },
          {
            id: 'comment_019',
            user: {
              id: 'user_035',
              nickname: '高中语文老师',
              avatar: getUserAvatar('user_035')
            },
            content: '我是高中老师，现在批改作业像在玩"找AI"游戏。最气的是有些学生连改都不改，直接复制粘贴，一眼就能看出来。但说实话，我也在反思，是不是我们的作业形式该变了？',
            time: '2025-03-05 09:45',
            likeCount: 112,
            userLiked: false,
            replies: [
              {
                id: 'reply_014',
                user: {
                  id: 'user_036',
                  nickname: '教育改革派',
                  avatar: getUserAvatar('user_036')
                },
                replyTo: {
                  id: 'user_035',
                  nickname: '高中语文老师',
                  avatar: getUserAvatar('user_035')
                },
                content: '老师，我觉得可以让学生先用AI写，然后指出AI的问题，再自己优化。这样反而能锻炼批判性思维。',
                time: '2025-03-05 10:30',
                likeCount: 45,
                userLiked: false
              },
              {
                id: 'reply_015',
                user: {
                  id: 'user_035',
                  nickname: '高中语文老师',
                  avatar: getUserAvatar('user_035')
                },
                replyTo: {
                  id: 'user_036',
                  nickname: '教育改革派',
                  avatar: getUserAvatar('user_036')
                },
                content: '有道理，我试试看。不过还得先研究怎么用AI，感觉我们老师也要跟上时代了。',
                time: '2025-03-05 11:15',
                likeCount: 34,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_020',
            user: {
              id: 'user_037',
              nickname: '大学教授',
              avatar: getUserAvatar('user_037')
            },
            content: '我就是文中那个乐观的大学教授。其实我已经在课堂上教学生用AI了，告诉他们怎么提问、怎么甄别、怎么优化。与其禁止，不如教会他们驾驭工具。',
            time: '2025-03-05 14:20',
            likeCount: 76,
            userLiked: false
          },
          {
            id: 'comment_021',
            user: {
              id: 'user_038',
              nickname: '焦虑的家长',
              avatar: getUserAvatar('user_038')
            },
            content: '我孩子才小学六年级，现在写作文就用AI。我担心以后他连基本的写作能力都没有了。可我说他，他还嫌我out了。怎么办啊？',
            time: '2025-03-05 16:10',
            likeCount: 54,
            userLiked: false,
            replies: [
              {
                id: 'reply_016',
                user: {
                  id: 'user_039',
                  nickname: '教育专家',
                  avatar: getUserAvatar('user_039')
                },
                replyTo: {
                  id: 'user_038',
                  nickname: '焦虑的家长',
                  avatar: getUserAvatar('user_038')
                },
                content: '建议您和孩子一起用AI，让他先自己写，然后用AI优化，对比有什么区别。这样既锻炼了写作能力，又学会了使用工具。',
                time: '2025-03-05 17:30',
                likeCount: 42,
                userLiked: false
              }
            ]
          }
        ]
      },
      {
        id: 'topic_006',
        title: '买房还是租房？年轻人的安居选择题',
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
            positive: {
              text: '我支持',
              count: 678
            },
            negative: {
              text: '我反对',
              count: 543
            },
            totalVotes: 1221,
            userVoted: false,
            userChoice: null
          }}
        ],
        author: {
          id: 'user_007',
          nickname: '楼市观察者',
          avatar: getUserAvatar('user_007')
        },
        createTime: '2025-03-03 16:15',
        likeCount: 567,
        userLiked: true,
        commentCount: 432,
        comments: [
          {
            id: 'comment_022',
            user: {
              id: 'user_040',
              nickname: '杭州阿强',
              avatar: getUserAvatar('user_040')
            },
            content: '我就是阿强！说实话，每个月还完房贷真的挺难的，但看到房价涨了，心里又觉得值了。前两天小区同户型卖了350万，感觉自己赚了50万。',
            time: '2025-03-04 09:15',
            likeCount: 67,
            userLiked: false,
            replies: [
              {
                id: 'reply_017',
                user: {
                  id: 'user_041',
                  nickname: '投资客',
                  avatar: getUserAvatar('user_041')
                },
                replyTo: {
                  id: 'user_040',
                  nickname: '杭州阿强',
                  avatar: getUserAvatar('user_040')
                },
                content: '纸面富贵而已，你又没卖。而且现在这个行情，能涨多久还不一定呢。',
                time: '2025-03-04 10:20',
                likeCount: 23,
                userLiked: false
              },
              {
                id: 'reply_018',
                user: {
                  id: 'user_040',
                  nickname: '杭州阿强',
                  avatar: getUserAvatar('user_040')
                },
                replyTo: {
                  id: 'user_041',
                  nickname: '投资客',
                  avatar: getUserAvatar('user_041')
                },
                content: '至少有个盼头吧。租房的话，每个月6000给房东，啥也落不着。',
                time: '2025-03-04 11:05',
                likeCount: 45,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_023',
            user: {
              id: 'user_042',
              nickname: '深圳阿珍',
              avatar: getUserAvatar('user_042')
            },
            content: '我是阿珍！看到被写进文章好惊喜。其实我和男朋友现在过得挺开心的，每年出国玩两次，周末探店、看展。买房的朋友羡慕我们，我们还羡慕他们有房呢，各有各的好吧。',
            time: '2025-03-04 13:30',
            likeCount: 89,
            userLiked: false
          },
          {
            id: 'comment_024',
            user: {
              id: 'user_043',
              nickname: '北漂十年',
              avatar: getUserAvatar('user_043')
            },
            content: '我在北京租房十年了，最大的痛就是搬家。五年搬了7次，每次都被房东涨价或者卖房赶走。真的累了，今年咬牙买了房，虽然远点小点，但再也不用看房东脸色了。',
            time: '2025-03-04 15:45',
            likeCount: 134,
            userLiked: true
          },
          {
            id: 'comment_025',
            user: {
              id: 'user_044',
              nickname: '理财达人',
              avatar: getUserAvatar('user_044')
            },
            content: '从投资角度说，现在买房确实不是好时机。租售比太低，200万的房子一年租金才3万，还不如存银行。但架不住中国人对房子的执念啊。',
            time: '2025-03-04 18:20',
            likeCount: 56,
            userLiked: false
          }
        ]
      },
      {
        id: 'topic_007',
        title: '应不应该让孩子从小就上各种兴趣班？',
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
            positive: {
              text: '我支持',
              count: 389
            },
            negative: {
              text: '我反对',
              count: 467
            },
            totalVotes: 856,
            userVoted: true,
            userChoice: 'negative'
          }}
        ],
        author: {
          id: 'user_008',
          nickname: '育儿那些事儿',
          avatar: getUserAvatar('user_008')
        },
        createTime: '2025-03-02 09:45',
        likeCount: 345,
        userLiked: false,
        commentCount: 289,
        comments: [
          {
            id: 'comment_026',
            user: {
              id: 'user_045',
              nickname: '累坏的小学生',
              avatar: getUserAvatar('user_045')
            },
            content: '我就是那个二年级小朋友！叔叔你发这篇文章，我妈看到了，她说明天给我减掉一个班。谢谢叔叔！',
            time: '2025-03-03 08:10',
            likeCount: 234,
            userLiked: true,
            replies: [
              {
                id: 'reply_019',
                user: {
                  id: 'user_046',
                  nickname: '孩子妈',
                  avatar: getUserAvatar('user_046')
                },
                replyTo: {
                  id: 'user_045',
                  nickname: '累坏的小学生',
                  avatar: getUserAvatar('user_045')
                },
                content: '我是妈妈，看到评论里孩子的话，眼泪下来了。可能我真的太焦虑了，对不起宝贝。',
                time: '2025-03-03 09:20',
                likeCount: 156,
                userLiked: false
              },
              {
                id: 'reply_020',
                user: {
                  id: 'user_045',
                  nickname: '累坏的小学生',
                  avatar: getUserAvatar('user_045')
                },
                replyTo: {
                  id: 'user_046',
                  nickname: '孩子妈',
                  avatar: getUserAvatar('user_046')
                },
                content: '妈妈不哭，我知道你是为我好。只要少上两个班，我就很开心啦！',
                time: '2025-03-03 10:05',
                likeCount: 189,
                userLiked: true
              }
            ]
          },
          {
            id: 'comment_027',
            user: {
              id: 'user_047',
              nickname: '快乐教育爸爸',
              avatar: getUserAvatar('user_047')
            },
            content: '我就是老张！现在真的焦虑了，孩子回来哭着说同学笑他，我也很内疚。但报班又怕孩子太累，太难了。',
            time: '2025-03-03 11:30',
            likeCount: 45,
            userLiked: false
          },
          {
            id: 'comment_028',
            user: {
              id: 'user_048',
              nickname: '钢琴老师',
              avatar: getUserAvatar('user_048')
            },
            content: '我是教钢琴的，见过太多被逼着来的孩子。其实兴趣班的关键在于"兴趣"两个字。如果孩子不喜欢，再好的老师也教不进去。',
            time: '2025-03-03 14:15',
            likeCount: 67,
            userLiked: true,
            replies: [
              {
                id: 'reply_021',
                user: {
                  id: 'user_049',
                  nickname: '琴童家长',
                  avatar: getUserAvatar('user_049')
                },
                replyTo: {
                  id: 'user_048',
                  nickname: '钢琴老师',
                  avatar: getUserAvatar('user_048')
                },
                content: '老师，我家孩子一开始喜欢，学了一年就不想学了，要逼着继续吗？',
                time: '2025-03-03 15:20',
                likeCount: 12,
                userLiked: false
              },
              {
                id: 'reply_022',
                user: {
                  id: 'user_048',
                  nickname: '钢琴老师',
                  avatar: getUserAvatar('user_048')
                },
                replyTo: {
                  id: 'user_049',
                  nickname: '琴童家长',
                  avatar: getUserAvatar('user_049')
                },
                content: '可以和孩子商量，定个小目标，比如再坚持半年，如果还是不想学就停。很多孩子过了瓶颈期又会重新喜欢上的。',
                time: '2025-03-03 16:10',
                likeCount: 34,
                userLiked: false
              }
            ]
          },
          {
            id: 'comment_029',
            user: {
              id: 'user_050',
              nickname: '过来人',
              avatar: getUserAvatar('user_050')
            },
            content: '我小时候被逼着学书法，当时恨死我妈了。现在在公司，领导总夸我字写得好，年会还让我写对联。真的感谢我妈当年的坚持。',
            time: '2025-03-03 18:45',
            likeCount: 78,
            userLiked: false
          }
        ]
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
        content: '小红点赞了你发布的"大学教育：究竟是塑造人才还是浪费时间？"',
        time: '2025-03-09 10:15',
        read: false
      },
      {
        id: 'notify_002',
        type: 'comment',
        title: '小李评论了你的话题',
        content: '小李：我觉得大学教育还是很重要的，不仅是学知识，更是学做人',
        time: '2025-03-09 09:45',
        read: false
      },
      {
        id: 'notify_003',
        type: 'vote',
        title: '你的投票有了新结果',
        content: '你参与的"你支持还是反对躺平的生活态度？"话题投票人数已突破800人',
        time: '2025-03-08 16:30',
        read: true
      },
      {
        id: 'notify_004',
        type: 'follow',
        title: '小张关注了你',
        content: '小张成为了你的新粉丝',
        time: '2025-03-08 11:20',
        read: true
      },
      {
        id: 'notify_005',
        type: 'comment',
        title: '王老师评论了你的话题',
        content: '王老师：关于ChatGPT的使用问题，我觉得可以辩证看待',
        time: '2025-03-07 14:30',
        read: false
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
        console.log(this.globalData.userInfo)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      },
    })
  },
})