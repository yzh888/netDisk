'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller, io } = app;
  router.get("/", controller.home.index);
  router.get("/list", controller.home.list);
  // 用户注册
  router.post('/api/reg', controller.api.user.reg);
  // 用户登录
  router.post('/api/login', controller.api.user.login);
  // 创建直播间
  router.post('/api/live/create', controller.api.live.save);
  // 退出登录
  router.post('/api/logout', controller.api.user.logout);
  //获取当前用户信息 
  router.get('/api/user/info', controller.api.user.info);
  //修改直播间状态
  router.post('/api/live/changestatus', controller.api.live.changeStatus);
  //直播间列表
  router.get('/api/live/list/:page', controller.api.live.list);
  //查看指定直播间
  router.get('/api/live/read/:id', controller.api.live.read);
  //获取验证码
  router.post('/api/sendcode', controller.api.sms.sendCode);
  router.post('/api/phoneLogin', controller.api.user.phoneLogin);
  //微信登录
  router.post('/api/wxLogin', controller.api.user.wxLogin);

  //socket路由配置测试
  //io.of('/').route('test', io.controller.nsp.test);
  //进入直播间
  io.of('/').route('joinLive', io.controller.nsp.joinLive)
  //离开直播间
  io.of('/').route('leaveLive', io.controller.nsp.leaveLive)
  //增加弹幕
  io.of('/').route('comment', io.controller.nsp.comment)
  //查看礼物列表接口
  io.of('/').route('gift', io.controller.nsp.gift)
  router.get('/api/gift/list', controller.api.gift.list)
  //router.get('/test',controller.admin.test.page);
  //新增管理员
  router.get('/admin/manager/create', controller.admin.manager.create);
  router.post('/admin/manager', controller.admin.manager.save);
  //管理员列表
  router.get('/admin/manager', controller.admin.manager.index);
};