// 環境設定管理
// Environment configuration management

const ENV = {
  // 開発環境設定
  development: {
    API_BASE_URL: 'http://localhost:8022',
    WS_BASE_URL: 'ws://localhost:8022',
    DEBUG: true
  },
  
  // 本番環境設定  
  production: {
    API_BASE_URL: 'https://your-production-api.com',
    WS_BASE_URL: 'wss://your-production-api.com',
    DEBUG: false
  },
  
  // テスト環境設定
  test: {
    API_BASE_URL: 'http://test-api.com:8022',
    WS_BASE_URL: 'ws://test-api.com:8022',
    DEBUG: true
  }
}

// 現在の環境を取得（デフォルト: development）
function getCurrentEnv() {
  // 本番環境判定ロジック（実際のプロジェクトに合わせて調整）
  if (typeof __wxConfig !== 'undefined' && __wxConfig.envVersion === 'release') {
    return 'production'
  }
  
  if (typeof __wxConfig !== 'undefined' && __wxConfig.envVersion === 'trial') {
    return 'test'
  }
  
  return 'development'
}

const currentEnv = getCurrentEnv()
const config = ENV[currentEnv]

console.log(`[Config] 現在の環境: ${currentEnv}`, config)

module.exports = config