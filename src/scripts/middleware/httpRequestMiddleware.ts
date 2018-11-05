import axios, { AxiosPromise, AxiosInstance } from 'axios'
import { stringify } from 'qs'
import { Dispatch } from 'redux'

/**
 * getAxiosInstance
 * @type {() => AxiosInstance}
 */
const getAxiosInstance = (() => {
  let instance: AxiosInstance
  return (): AxiosInstance => {
    // インスタンスが既に生成された場合はそのインスタンスを返す
    if (instance) {
      return instance
    }
    instance = axios.create({
      // HTTP通信時の共通デフォルト設定はここでする
      timeout: 1000,
      baseURL: '',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
      },
      responseType: 'json',
      paramsSerializer(params) {
        return stringify(params, { arrayFormat: 'brackets' })
      },
    })
    return instance
  }
})()

/**
 * fetch
 * @param action
 * @param {string} csrfToken
 * @returns {AxiosPromise<any>}
 */
const fetch = (action: any, csrfToken: string = ''): AxiosPromise<any> => {
  const axiosInstance = getAxiosInstance()
  if (action.payload.request.method.toUpperCase() !== 'GET') {
    axiosInstance.defaults.headers['X-CSRF-TOKEN'] = csrfToken
  }
  return axiosInstance.request(action.payload.request.url)
}

interface IHttpRequestMiddlewareProps {
  dispatch: Dispatch<any>
  getState: any
}

/**
 * httpRequestMiddleware
 * HTTPリクエスト時の共通処理のミドルウェア
 * @param {Dispatch<any>} dispatch
 * @param {any} getState
 * @returns {(next: any) => (action_: any) => Promise<any>}
 */
const httpRequestMiddleware = ({
  dispatch,
  getState,
}: IHttpRequestMiddlewareProps) => {
  return (next: any) => {
    return async (action_: any) => {
      const action = action_

      // HTTPリクエストのアクションでない場合は処理をスルー
      if (!action.payload || !action.payload.request) {
        return next(action)
      }

      // TODO CSRFトークンの設定をする
      // const state = getState();
      // const csrfToken = state.app.get('csrfToken')
      const csrfToken = ''

      // 自身のアクションを発行
      // HTTPリクエスト開始を通知してローディングなどを表示するため
      next(action)

      // HTTPリクエストを実行する
      return fetch(action, csrfToken)
        .then((response: any) => {
          // リクエスト成功時のアクションを発行
          const nextAction = {
            type: `${action.type}_SUCCESS`,
            payload: response,
          }
          // 成功時コールバック
          if (action.payload && action.payload.success) {
            action.payload.success()
          }
          next(nextAction)
          return nextAction
        })
        .catch(error => {
          // リクエスト失敗時のアクションを発行
          const nextAction = {
            type: `${action.type}_FAILURE`,
            payload: error,
          }
          // 失敗時コールバック
          if (action.payload && action.payload.failure) {
            action.payload.failure()
          }
          next(nextAction)
          return Promise.reject(nextAction)
        })
    }
  }
}

export default httpRequestMiddleware
