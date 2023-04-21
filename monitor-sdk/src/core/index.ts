import { Options } from '../type/core'
import Tracker from './Tracker'
import { ErrorCatcher } from './ErrorTracker'

// 监控内容： 1. 错误   2. 用户行为   3.  PV统计   4. UV统计

// 分析可得:  返回一个方法,  传入一个配置【根据配置去加载监控内容】

export function init(options: Options) {
  // 实例化监控类
  new Tracker(options)
}

// 手动错误上报
export { ErrorCatcher }