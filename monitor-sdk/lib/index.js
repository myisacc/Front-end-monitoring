(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ys = {}));
})(this, (function (exports) { 'use strict';

  /* 全局监控-> JS错误、资源错误、Promise错误 */
  function ErrorTrackerReport() {
      // 资源加载错误上报
      function SourceErrorReport(e) {
          const target = e.target;
          const log = {
              errorType: 'sourceError',
              message: `${target.tagName}资源加载错误`,
              file: target.src || target.href
          };
          console.log('---资源错误---', log);
      }
      // JS错误 【改为捕获阶段】
      window.addEventListener('error', function (e) {
          const target = e.target;
          // 判断是否为资源错误[script  link  img]
          const isSource = target instanceof HTMLImageElement || target instanceof HTMLScriptElement || target instanceof HTMLLinkElement;
          if (isSource)
              return SourceErrorReport(e);
          // 提取一些有效信息 上报给后端
          // errorType 错误类型 file 错误文件  row col 错误位置  error 错误对象  message 错误信息
          const log = {
              errorType: 'jsError',
              message: e.message,
              file: e.filename,
              row: e.lineno,
              col: e.colno,
              error: e.error
          };
          console.log('----js错误----', log);
          // 上报log 给后端服务器即可
      }, true);
      // Promise错误
      window.addEventListener('unhandledrejection', function (e) {
          const log = {
              errorType: 'promiseError',
              message: e.reason,
              error: e.reason
          };
          console.log('----Promise错误----', log);
      });
  }
  /* 手动错误上报 */
  function ErrorCatcher(message, error) {
      const log = {
          errorType: 'jsError',
          message: message,
          error: error
      };
      console.log('---js错误----', log);
  }

  class Tracker {
      constructor(options) {
          this.data = Object.assign(this.defaultOptions(), options);
          // 根据配置加载监控
          this.installTracker();
      }
      // 默认配置加载  private 私有的【仅限该类使用】
      defaultOptions() {
          return {
              appId: '',
              uuId: '',
              requestUrl: '',
              ErrorTracker: false,
              DOMTracker: false,
              HashTracker: false,
              HistoryTracker: false
          };
      }
      // 加载监控
      installTracker() {
          // 判断配置 加载监控
          // 错误监控 ->  前端监听错误 需要监听哪些错误?  JS错误、Promise错误、资源错误
          // 怎么去监控这些错误?  JS错误、异步错误、资源错误  ->  error事件  Promise错误 -> unhandledrejection
          if (this.data.ErrorTracker) {
              ErrorTrackerReport();
          }
          // 用户行为监控
          if (this.data.DOMTracker) ;
          // Hash路由监控
          if (this.data.HashTracker) ;
          // History路由监控
          if (this.data.HistoryTracker) ;
      }
  }

  // 监控内容： 1. 错误   2. 用户行为   3.  PV统计   4. UV统计
  // 分析可得:  返回一个方法,  传入一个配置【根据配置去加载监控内容】
  function init(options) {
      // 实例化监控类
      new Tracker(options);
  }

  exports.ErrorCatcher = ErrorCatcher;
  exports.init = init;

}));
