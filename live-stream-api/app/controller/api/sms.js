'use strict'

const { apiFail } = require('../../extend/context');
const Controller = require('egg').Controller

class SmsController extends Controller {
  async sendCode() {
      const { ctx, service } = this
      const { phone } = ctx.request.body
      //调用service发送短信的方法，传入手机号
      let res = await service.sms.sendCode(phone);
      if(res.sta == 1) {
        ctx.apiSuccess('ok')
      }
  }
}

module.exports = SmsController