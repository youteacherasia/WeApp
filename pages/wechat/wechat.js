// 微信主页面 - 改善版
// WeChat main page - Improved version

const app = getApp()
const util = require('../../utils/util')

// ユーザー情報初期化
app.getUserInfo()

Page({
  data: {
    list: [],
    modalHidden: true,
    hidden: true,
    toast1Hidden: true,
    toastText: '',
    loading: false,
    error: null
  },

  onLoad: function(options) {
    console.log('[WeChat] ページロード')
    this.initPage()
  },

  onReady: function() {
    console.log('[WeChat] ページ準備完了')
    this.loadUserData()
  },

  onShow: function() {
    console.log('[WeChat] ページ表示')
    // 他のページから戻ってきた時の処理
  },

  onHide: function() {
    console.log('[WeChat] ページ非表示')
  },

  onUnload: function() {
    console.log('[WeChat] ページアンロード')
  },

  /**
   * ページ初期化
   */
  initPage: function() {
    // 初期状態設定
    this.setData({
      list: [],
      loading: true,
      error: null
    })
  },

  /**
   * ユーザーデータ読み込み
   */
  loadUserData: function() {
    util.getUser(this)
  },

  /**
   * モーダル表示
   */
  modalTap: function(e) {
    console.log('[WeChat] モーダル表示')
    this.setData({
      modalHidden: false
    })
  },

  /**
   * モーダル非表示
   */
  modalChange: function(e) {
    console.log('[WeChat] モーダル非表示')
    this.setData({
      modalHidden: true
    })
  },

  /**
   * チャットページ遷移
   */
  goPage: function(e) {
    try {
      const dataset = e.currentTarget.dataset
      const { index, name, id } = dataset
      
      console.log('[WeChat] チャット遷移:', { index, name, id })

      // 未読数リセット
      if (this.data.list && this.data.list[index]) {
        const newList = [...this.data.list]
        newList[index].count = 0
        
        this.setData({
          list: newList
        })
      }

      // ページ遷移
      wx.navigateTo({
        url: `../message/message?name=${encodeURIComponent(name)}&id=${encodeURIComponent(id)}`,
        success: function() {
          console.log('[WeChat] ページ遷移成功')
        },
        fail: function(error) {
          console.error('[WeChat] ページ遷移失敗:', error)
          wx.showToast({
            title: 'ページ遷移に失敗しました',
            icon: 'none'
          })
        }
      })
      
    } catch (error) {
      console.error('[WeChat] チャット遷移エラー:', error)
      wx.showToast({
        title: 'エラーが発生しました',
        icon: 'none'
      })
    }
  },

  /**
   * トースト非表示
   */
  toast1Change: function() {
    this.setData({
      toast1Hidden: true
    })
  },

  /**
   * プルダウンリフレッシュ
   */
  onPullDownRefresh: function() {
    console.log('[WeChat] プルダウンリフレッシュ')
    this.loadUserData()
  },

  /**
   * 検索機能（将来の拡張用）
   */
  onSearchInput: function(e) {
    const searchText = e.detail.value
    console.log('[WeChat] 検索入力:', searchText)
    
    // デバウンス機能付き検索（将来実装）
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce)
    }
    
    this.searchDebounce = setTimeout(() => {
      this.performSearch(searchText)
    }, 300)
  },

  /**
   * 検索実行（将来の拡張用）
   */
  performSearch: function(searchText) {
    if (!searchText.trim()) {
      // 検索テキストが空の場合は全データ表示
      this.loadUserData()
      return
    }
    
    // 検索ロジック実装（将来）
    console.log('[WeChat] 検索実行:', searchText)
  },

  /**
   * エラー再試行
   */
  retryLoad: function() {
    console.log('[WeChat] データ再読み込み')
    this.loadUserData()
  }
})
