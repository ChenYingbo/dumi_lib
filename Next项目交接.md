# next 项目

游戏学院 next 前端上线检查：

1. constants -> api.js -> BASE_URL 参数
2. constants -> urs.js 配置
3. 升级版本号 + 1
4. 若修改导航信息 或者底部信息
   需要运行 npm run build:layout
   修改 SSI -> include -> menu.html ->
   <script charset="utf-8" src="/static/exports/react_layout.js?t=20191231"></script> 修改时间消除缓存

游戏学院存在的弊端：

1. 游戏学院首页轮播插件，目前比较繁琐， 需要后续优化
2. 游戏学院首页的数据请求，目前采用递归拉取的方式，后续可以考虑改进
3. 游戏学院存在空数据未处理的情况：
   - 首页轮播空态
4. 学院的下拉加载， 目前都是全量更新
5. 学院的某些页面 tab 切换没有更新 query， 刷新会跳转初始状态
6. 个人中心修改头像， 曾因为上传没做限制 被攻击过， 已做过处理， 后面可以注意。

文档：
游戏学院 APP 的接口稳当（旧版）： https://km.netease.com/article/260815

Native Bridge 接口文档： https://km.netease.com/article/275506

旧交互稿： https://axure.yixin.im/#/preview?id=476641096602963968&pid=261&mid=1087&type=INTERACTION

游戏学院 SSI 项目：

网站组 组件库： http://webpack.nie.netease.com/index.html

基本上已不再迭代， 目前还在迭代的模块：

- 实习生展板: https://game.academy.163.com/ssi/chase-dream/interns/project-2020.html
- MINI 项目展示：https://game.academy.163.com/ssi/fresh/mini/2020.html
- 中大合作活动： https://game.academy.163.com/chase-dream/campus/zd/
- 清华必修课： https://game.academy.163.com/chase-dream/campus/qh/
- 技术启示录： https://game.academy.163.com/chase-dream/live/20190312/

还有一些活动历史代码：包括美术大赛 MG 大赛 绘梦计划 活动等， 目前还在主站设有入口；

游戏学院项目 -1 部分 已经被迭代。 其余模块都是一些常规操作，除了代码很烂 复用性差之外， 目前我这边没有接到其余反馈。
