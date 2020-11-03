'use strict';
const Service = require('egg').Service
const SMSClient = require('@alicloud/sms-sdk');
const await = require('await-stream-ready/lib/await');

const config = {
  AccessKeyId: 'LTAI4FpzLFy8uA2PWAXH8cwQ', // 访问密钥编号
  AccessKeySecret: 'XLTomRADcglUJ5IgRrHxWKJMjPqg8b', // 密钥
};

// 签名模板
const sign = {
  REG_CODE: {
    SignName: '蜂王', // 签名
    TemplateCode: 'SMS_179226026', // 模板
  },
};

/**
 * 阿里云短信发送类
 */
class SmsService extends Service {  // 标注1：BaseService文件自己创建一个

  /**
   * 短信发送接口
   * @param {*} phone 发送手机号
   * @param {*} code 验证码
   */
  async sendCode(phone, code) {

    const { ctx, service } = this;

    const signCode = sign.REG_CODE;
    const codeRandom = Math.random().toFixed(6).slice(-6); // 标注2：随机数生成方法，自己写一个即可
    const templateParam = JSON.stringify({ code: codeRandom.toString() });
    service.cache.set('code', codeRandom, 60*5);
    var result = await service.cache.get('code')
    console.log("验证码是: " + result)
    const accessKeyId = config.AccessKeyId;
    const secretAccessKey = config.AccessKeySecret;
    const smsClient = new SMSClient({ accessKeyId, secretAccessKey }); // 实例化SDK

    const params = {
      //手机号
      PhoneNumbers: phone,
      //签名
      SignName: signCode.SignName,
      //模板手机号
      TemplateCode: signCode.TemplateCode,
      //验证码
      TemplateParam: templateParam,
    };

    try {
      const rs = await this.sendSms(smsClient, params);
      if (rs.Code === 'OK') {
        return { code: codeRandom, sta: 1 };
      }
      return { msg: '操作失败', sta: -1 };

    } catch (err) {

      if (err.data.Code === 'isv.BUSINESS_LIMIT_CONTROL') { // 短信限制
        return { msg: err.data.Message.match(/(\S*)Permits/)[1], sta: 0 };
      }
      return { msg: '操作失败', sta: -1 };
    }

  }

  /**
   * 发送短信
   * @param {*} smsClient SDK实例
   * @param {*} params 参数信息
   */
  async sendSms(smsClient, params) {
    return new Promise((resolve, reject) => {
      smsClient.sendSMS(params).then(result => {
        resolve(result);
      }, ex => {
        reject(ex);
      });
    });
  }
}

module.exports = SmsService;