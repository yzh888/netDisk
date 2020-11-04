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
  router.post('/api/live/changestatus',controller.api.live.changeStatus);
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
  io.of('/').route('test',io.controller.nsp.test);

};