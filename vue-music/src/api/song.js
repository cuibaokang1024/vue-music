import {commonParams} from './config'
import axios from 'axios'
const debug = process.env.NODE_ENV !== 'production'
export function getLyric (mid) {
  const url = debug ? '/api/getLyric' : 'http://39.96.195.160/music/api/getLyric'
  const data = Object.assign({}, commonParams, {
    songmid: mid,
    pcachetime: +new Date(),
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0000,
    g_tk: 67232076,
    format: 'json'
  })
  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}
