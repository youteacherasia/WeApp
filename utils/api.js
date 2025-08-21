// API管理モジュール
// API management module

const app = getApp()

/**
 * 統一されたHTTPリクエストメソッド
 * @param {Object} options - リクエストオプション
 * @returns {Promise} - レスポンスプロミス
 */
function request(options) {
  return new Promise((resolve, reject) => {
    const {
      url,
      data = {},
      method = 'GET',
      header = {},
      timeout = 10000
    } = options

    // デフォルトヘッダー設定
    const defaultHeader = {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }

    wx.request({
      url: app.globalData.ip + url,
      data: data,
      method: method,
      header: { ...defaultHeader, ...header },
      timeout: timeout,
      success: function(res) {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          console.log(`[API] リクエスト成功: ${method} ${url}`, res.data)
          resolve(res.data)
        } else {
          console.error(`[API] HTTPエラー: ${res.statusCode}`, res)
          reject(new Error(`HTTP ${res.statusCode}: ${res.errMsg}`))
        }
      },
      fail: function(error) {
        console.error(`[API] リクエスト失敗: ${method} ${url}`, error)
        reject(new Error(`ネットワークエラー: ${error.errMsg}`))
      }
    })
  })
}

/**
 * ユーザーリスト取得API
 * @returns {Promise<Array>} - ユーザーリスト
 */
function getUserList() {
  return request({
    url: '/getUser.php',
    method: 'GET'
  })
}

/**
 * メッセージ取得API
 * @param {string} id - ユーザーID
 * @returns {Promise<Array>} - メッセージリスト
 */
function getMessages(id) {
  return request({
    url: '/getMsg.php',
    method: 'POST',
    data: { id }
  })
}

/**
 * モーメント取得API
 * @returns {Promise<Array>} - モーメントリスト
 */
function getMoments() {
  return request({
    url: '/getMoments.php',
    method: 'GET'
  })
}

/**
 * ファイルアップロードAPI
 * @param {string} filePath - ローカルファイルパス
 * @param {string} name - ファイル名
 * @returns {Promise} - アップロード結果
 */
function uploadFile(filePath, name = 'file') {
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: app.globalData.ip + '/upload.php',
      filePath: filePath,
      name: name,
      success: function(res) {
        try {
          const data = JSON.parse(res.data)
          console.log('[API] ファイルアップロード成功', data)
          resolve(data)
        } catch (error) {
          console.error('[API] レスポンス解析エラー', error)
          reject(error)
        }
      },
      fail: function(error) {
        console.error('[API] ファイルアップロード失敗', error)
        reject(error)
      }
    })
  })
}

module.exports = {
  request,
  getUserList,
  getMessages,
  getMoments,
  uploadFile
}