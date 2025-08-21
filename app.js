//app.js
// 改善版WeApp - 現代的なベストプラクティス対応
// Improved WeApp - Modern best practices implementation

const config = require('./config/env.js')

App({
  onLaunch: function () {
    console.log('[App] アプリケーション起動')
    
    try {
      // ローカルキャッシュからデータ取得
      const logs = wx.getStorageSync('logs') || []
      logs.unshift(Date.now())
      wx.setStorageSync('logs', logs)
      
      console.log('[App] ログ初期化完了')
    } catch (error) {
      console.error('[App] ログ初期化エラー:', error)
    }
  },

  onError: function(msg) {
    console.error('[App] アプリエラー:', msg)
  },

  onShow: function() {
    console.log('[App] アプリフォアグラウンド')
  },

  onHide: function() {
    console.log('[App] アプリバックグラウンド')  
  },

  // 改善されたユーザー情報取得メソッド
  getUserInfo: function(cb) {
    const that = this
    
    if (this.globalData.userInfo) {
      typeof cb === "function" && cb(this.globalData.userInfo)
      return
    }

    // 新しいAPIを使用してユーザー情報取得
    wx.login({
      success: function(loginRes) {
        console.log('[App] ログイン成功:', loginRes.code)
        
        // getUserProfileを推奨（getUserInfoは非推奨）
        // 実際の実装では getUserProfile を使用することを推奨
        wx.getUserInfo({
          success: function(res) {
            that.globalData.userInfo = res.userInfo
            console.log('[App] ユーザー情報取得成功')
            typeof cb === "function" && cb(that.globalData.userInfo)
          },
          fail: function(error) {
            console.error('[App] ユーザー情報取得失敗:', error)
            typeof cb === "function" && cb(null)
          }
        })
      },
      fail: function(error) {
        console.error('[App] ログイン失敗:', error)
        typeof cb === "function" && cb(null)
      }
    })
  },

  // 改善されたグローバルデータ
  globalData: {
    userInfo: null,
    // 環境設定から動的に取得
    ip: config.API_BASE_URL,
    wsip: config.WS_BASE_URL,
    debug: config.DEBUG,
    version: '2.0.0',
    updateTime: new Date().toISOString()
  }
})