// ユーティリティモジュール - 改善版
// Utility module - Improved version

const api = require('./api.js')

/**
 * 日付フォーマット関数
 * @param {Date} date - フォーマットする日付
 * @param {string} format - フォーマット形式
 * @returns {string} - フォーマット済み日付文字列
 */
function formatTime(date, format = 'YYYY/MM/DD HH:mm:ss') {
  if (!date || !(date instanceof Date)) {
    console.warn('[Util] 無効な日付:', date)
    return ''
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  // カスタムフォーマット対応
  return format
    .replace('YYYY', year)
    .replace('MM', formatNumber(month))
    .replace('DD', formatNumber(day))
    .replace('HH', formatNumber(hour))
    .replace('mm', formatNumber(minute))
    .replace('ss', formatNumber(second))
}

/**
 * 相対時間表示
 * @param {Date} date - 基準日付
 * @returns {string} - 相対時間文字列
 */
function formatRelativeTime(date) {
  const now = new Date()
  const diff = now - date
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))

  if (minutes < 1) return 'たった今'
  if (minutes < 60) return `${minutes}分前`
  if (hours < 24) return `${hours}時間前`
  if (days < 7) return `${days}日前`
  
  return formatTime(date, 'MM/DD')
}

/**
 * 改善されたメッセージ取得関数
 * @param {string} id - ユーザーID
 * @param {Object} pageObj - ページオブジェクト
 */
async function getMessage(id, pageObj) {
  try {
    console.log('[Util] メッセージ取得開始:', id)
    
    const messages = await api.getMessages(id)
    
    pageObj.setData({
      message: messages,
      loading: false
    })
    
    console.log('[Util] メッセージ取得完了')
  } catch (error) {
    console.error('[Util] メッセージ取得エラー:', error)
    
    pageObj.setData({
      message: [],
      loading: false,
      error: error.message
    })
    
    // エラートースト表示
    wx.showToast({
      title: 'メッセージ取得に失敗しました',
      icon: 'none',
      duration: 2000
    })
  }
}

/**
 * 改善されたユーザーリスト取得関数
 * @param {Object} pageObj - ページオブジェクト
 */
async function getUser(pageObj) {
  try {
    console.log('[Util] ユーザーリスト取得開始')
    
    // ローディング表示
    pageObj.setData({
      hidden: false,
      loading: true
    })
    
    const userList = await api.getUserList()
    
    // 成功時の処理（不要なsetTimeoutを削除）
    pageObj.setData({
      list: userList,
      hidden: true,
      loading: false,
      toast1Hidden: false,
      toastText: "データ取得完了"
    })
    
    // プルダウンリフレッシュ停止
    wx.stopPullDownRefresh()
    
    console.log('[Util] ユーザーリスト取得完了:', userList.length, '件')
    
  } catch (error) {
    console.error('[Util] ユーザーリスト取得エラー:', error)
    
    pageObj.setData({
      list: [],
      hidden: true,
      loading: false,
      toast1Hidden: false,
      toastText: "サーバー接続を確認してください"
    })
    
    wx.stopPullDownRefresh()
    
    // エラートースト表示
    wx.showToast({
      title: 'データ取得に失敗しました',
      icon: 'none',
      duration: 2000
    })
  }
}

/**
 * 改善されたモーメント取得関数
 * @param {Object} pageObj - ページオブジェクト
 */
async function getMoments(pageObj) {
  try {
    console.log('[Util] モーメント取得開始')
    
    const moments = await api.getMoments()
    
    pageObj.setData({
      moments: moments
    })
    
    console.log('[Util] モーメント取得完了:', moments.length, '件')
    
  } catch (error) {
    console.error('[Util] モーメント取得エラー:', error)
    
    pageObj.setData({
      moments: []
    })
    
    wx.showToast({
      title: 'モーメント取得に失敗しました',
      icon: 'none',
      duration: 2000
    })
  }
}

/**
 * 数字の0埋めフォーマット
 * @param {number} n - 数字
 * @returns {string} - 0埋め文字列
 */
function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * デバウンス関数
 * @param {Function} func - 実行する関数
 * @param {number} wait - 待機時間（ミリ秒）
 * @returns {Function} - デバウンスされた関数
 */
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

/**
 * ローカルストレージ管理
 */
const storage = {
  set(key, value) {
    try {
      wx.setStorageSync(key, value)
      console.log(`[Storage] 保存成功: ${key}`)
    } catch (error) {
      console.error(`[Storage] 保存エラー: ${key}`, error)
    }
  },
  
  get(key, defaultValue = null) {
    try {
      const value = wx.getStorageSync(key)
      return value || defaultValue
    } catch (error) {
      console.error(`[Storage] 取得エラー: ${key}`, error)
      return defaultValue
    }
  },
  
  remove(key) {
    try {
      wx.removeStorageSync(key)
      console.log(`[Storage] 削除成功: ${key}`)
    } catch (error) {
      console.error(`[Storage] 削除エラー: ${key}`, error)
    }
  }
}

module.exports = {
  formatTime,
  formatRelativeTime,
  getMessage,
  getUser,
  getMoments,
  formatNumber,
  debounce,
  storage
}
