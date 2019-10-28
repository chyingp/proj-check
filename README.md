# proj-check

`proj-check` 用来完成项目的自动化检查，包括：

1. monitor 上报检查
2. badjs 上报检查
3. TODO

>更多检查模式，需要脚手架做相应调整，将配置项进一步收归+模式统一

## usage

```bash
npm install -g @tencent/proj-check
proj-check
```

输出类似：

```bash
[monitor配置检查] 开始.
[1] 配置文件路径：src/pages/index/business/report/config.js
[1] 检查结论：不通过.
[1] 有问题的上报项：PV, OFFLINE_PV, BADJS_PV, LOAD_SUCCESS, LOAD_FAIL, LOAD_SUCCESS_RETRY, LOAD_FAIL_RETRY.
[monitor配置检查] 结束.

[badjs配置检查] 开始.
[1] 配置文件路径：src/pages/index/business/window-gConfig
[1] 检查结论：不通过.
[1] 错误id：badjsId.
[badjs配置检查] 结束.
```