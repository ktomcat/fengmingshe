/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: {
      id: string;
      nickname: string;
      avatar: string;
      level: number;
      points: number;
      followCount: number;
      fansCount: number;
      signature: string;
    };
    featuredTopic?: any;
    topics?: any[];
    config?: any;
    notifications?: any[];
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}