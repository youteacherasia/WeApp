// TypeScript型定義ファイル
// TypeScript type definitions

/**
 * 微信小程序共通型定義
 */

// ユーザー情報型
export interface UserInfo {
  avatarUrl: string
  city: string
  country: string
  gender: number
  language: string
  nickName: string
  province: string
}

// チャットユーザー型
export interface ChatUser {
  id: string
  name: string
  avatar: string
  lastMessage?: string
  lastTime?: string
  count: number
  online?: boolean
}

// メッセージ型
export interface Message {
  id: string
  userId: string
  content: string
  type: 'text' | 'image' | 'audio' | 'video' | 'location'
  timestamp: string
  isOwn: boolean
}

// モーメント投稿型
export interface Moment {
  id: string
  userId: string
  userName: string
  userAvatar: string
  content: string
  images?: string[]
  location?: string
  timestamp: string
  likes: number
  comments: Comment[]
}

// コメント型
export interface Comment {
  id: string
  userId: string
  userName: string
  content: string
  timestamp: string
}

// API レスポンス型
export interface ApiResponse<T = any> {
  code: number
  message: string
  data: T
}

// ページデータ型
export interface PageData {
  [key: string]: any
}

// アプリグローバルデータ型
export interface AppGlobalData {
  userInfo: UserInfo | null
  ip: string
  wsip: string
  debug: boolean
  version: string
  updateTime: string
}

// 環境設定型
export interface EnvConfig {
  API_BASE_URL: string
  WS_BASE_URL: string
  DEBUG: boolean
}

// API オプション型
export interface RequestOptions {
  url: string
  data?: any
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
  header?: Record<string, string>
  timeout?: number
}

// ファイルアップロード型
export interface UploadOptions {
  filePath: string
  name?: string
  formData?: Record<string, any>
}

// WebSocket メッセージ型
export interface WebSocketMessage {
  type: string
  data: any
  timestamp: string
}

// ページライフサイクルオプション型
export interface PageOptions {
  [key: string]: any
}

// 微信API型拡張
declare global {
  const wx: any
  const getApp: () => {
    globalData: AppGlobalData
    getUserInfo: (callback?: (userInfo: UserInfo | null) => void) => void
  }
  const Page: (options: any) => void
  const App: (options: any) => void
  const Component: (options: any) => void
}

export {}