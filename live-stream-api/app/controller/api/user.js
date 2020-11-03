'use strict'


const Controller = require('egg').Controller


class UserController extends Controller {
  // 注册
  async reg() {
    let { ctx, app } = this
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        range: {
          min: 5,
          max: 20,
        },
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
      repassword: {
        type: 'string',
        required: true,
        desc: '确认密码',
      },
    })


    let { username, password, repassword } = ctx.request.body


    if (password !== repassword) {
      ctx.throw(422, '密码和确认密码不一致')
    }


    // 验证用户是否已经存在
    if (
      await app.model.User.findOne({
        where: {
          username,
        },
      })
    ) {
      ctx.throw(400, '该用户名已存在')
    }


    let user = await app.model.User.create({
      username,
      password,
    })


    if (!user) {
      ctx.throw(400, '创建用户失败')
    }


    ctx.apiSuccess(user)
  }


  // 登录
  async login() {
    const { ctx, app } = this
    // 参数验证
    ctx.validate({
      username: {
        type: 'string',
        required: true,
        desc: '用户名',
      },
      password: {
        type: 'string',
        required: true,
        desc: '密码',
      },
    })


    let { username, password } = ctx.request.body


    let user = await app.model.User.findOne({
      where: {
        username,
      },
    })


    if (!user) {
      ctx.throw(400, '该用户不存在')
    }


    // 验证密码
    await ctx.checkPassword(password, user.password)


    user = JSON.parse(JSON.stringify(user))


    console.log(user)


    // 生成token
    user.token = ctx.getToken(user)
    delete user.password


    // 加入到存储中
    if (!(await this.service.cache.set('user_' + user.id, user.token))) {
      ctx.throw(400, '登录失败')
    }


    ctx.apiSuccess(user)
  }

  // 退出登录
  async logout() {
    const { ctx, service } = this;
    const current_user_id = ctx.authUser.id;
    if (!(await service.cache.remove('user_' + current_user_id))) {
      ctx.throw(400, '退出登录失败');
    }
    ctx.apiSuccess('退出登录成功');
  }

  //获取当前用户信息
  async info() {
    const { ctx } = this
    let user = JSON.parse(JSON.stringify(ctx.authUser))
    delete user.password
    ctx.apiSuccess(user)
  }

  // 手机短信验证登录
  async phoneLogin() {
    const { ctx, app, service } = this
    let { phone, code, username } = ctx.request.body
    // 参数验证
    ctx.validate({

      code: {
        type: 'number',
        required: true,
        desc: '验证码',
      },
      username: {
        type: 'string',
        required: true,
        desc: '账号'
      }
    })

    let user = await app.model.User.findOne({
      where: {
        username,
      },
    })
    //取出redis中的验证码
    let res = await service.cache.get('code');
    console.log("redis中的code" + res.toString())
    console.log('code的值是' + code)
    console.log(res.toString() == code.toString())
    if (res.toString() !== code.toString()) {
      ctx.throw(400, "验证码不正确")
    }
    if (!user) {
      user = await app.model.User.create({

        username: username,
        password: '123123',
        avatar: 'http://ww1.sinaimg.cn/large/007YO3iLgy1gcvrr2bfxfj31hc0xcn2u.jpg',
        coin: 0
      })
      //ctx.throw(400, '该用户不存在')
    }
    user = JSON.parse(JSON.stringify(user))
    console.log(user)
    // 生成token
    user.token = ctx.getToken(user)
    delete user.password

    // 加入到存储中
    if (!(await this.service.cache.set('user_' + user.id, user.token))) {
      ctx.throw(400, '登录失败')
    }
    ctx.apiSuccess(user)
  }

  // 微信登录
  async wxLogin() {
    const { ctx, app } = this
    // 参数验证
    ctx.validate({
      openId: {
        type: 'string',
        required: true,
        desc: '微信识别id',
      },
      avatar: {
        type: 'string',
        required: true,
        desc: ''
      }
    })
    let { openId, avatar } = ctx.request.body
    let user = await app.model.User.findOne({
      where: {
        wx_open_id: openId,
      },
    })
    if (!user) {
      user = await app.model.User.create({
        wx_open_id: openId,
        avatar: avatar,
      })
    }
    user = JSON.parse(JSON.stringify(user))
    // 生成token
    user.token = ctx.getToken(user)
    delete user.password
    // 加入到存储中
    if (!(await this.service.cache.set('user_' + user.id, user.token))) {
      ctx.throw(400, '登录失败')
    }
    ctx.apiSuccess(user)
  }


}

module.exports = UserController