import jsonp from 'common/js/jsonp'
import {commonParams, options} from './config'
import axios from 'axios/index'
const debug = process.env.NODE_ENV !== 'production'
export function getSingerList () {
  const url = 'https://c.y.qq.com/v8/fcg-bin/v8.fcg'
  const data = Object.assign({}, commonParams, {
    channel: 'singer',
    page: 'list',
    key: 'all_all_all',
    pagesize: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq'
  })
  return jsonp(url, data, options)
}

export function getSingerDetail (singerId) {
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    num: 100,
    pagenum: 1,
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    songstatus: 1,
    singermid: singerId
  })
  return jsonp(url, data, options)
}
export function getSongUrl (songmid) {
  const url = debug ? '/api/getSongUrl' : 'http://39.96.195.160/music/api/getSongUrl'
  const data = Object.assign({}, commonParams, {
    g_tk: 5381,
    loginUin: 0,
    hostUin: 0,
    format: 'json',
    notice: 0,
    platform: 'yqq',
    needNewCode: 0,
    data: {
      req:
        {
          module: 'CDN.SrfCdnDispatchServer',
          method: 'GetCdnDispatch',
          param: {guid: '8732176273', calltype: 0, userip: ''}},
      req_0: {
        module: 'vkey.GetVkeyServer',
        method: 'CgiGetVkey',
        param: {
          guid: '8732176273',
          songmid: [songmid],
          songtype: [0],
          uin: '0',
          loginflag: 1,
          platform: '20'
        }
      },
      comm: {'uin': 0, 'format': 'json', 'ct': 20, 'cv': 0}
    }
  })
  return axios.get(url, {params: data}).then((res) => {
    return Promise.resolve(res.data.req_0.data)
  })
}
