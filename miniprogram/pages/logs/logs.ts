// logs.ts
// const util = require('../../utils/util.js')
import { formatTime } from '../../utils/util'

Component({
  // 分享配置
  options: {
    addGlobalClass: true
  },
  
  // 页面分享功能
  pageLifetimes: {
    // 分享到微信好友
    onShareAppMessage() {
      return {
        title: '蜂鸣 - 日志记录',
        path: '/pages/logs/logs',
        imageUrl: '/static/share-logo.png'
      }
    },
    
    // 分享到朋友圈
    onShareTimeline() {
      return {
        title: '蜂鸣 - 日志记录',
        imageUrl: '/static/share-logo.png'
      }
    }
  },
  
  data: {
    logs: [],
  },
  lifetimes: {
    attached() {
      this.setData({
        logs: (wx.getStorageSync('logs') || []).map((log: string) => {
          return {
            date: formatTime(new Date(log)),
            timeStamp: log
          }
        }),
      })
    }
  },
})
