'use strict';

const Controller = require('egg').Controller;

class ManagerController extends Controller {
    // 创建管理员表单
    async create(){
        const { ctx } = this;
        await ctx.render('admin/manager/create.html');
    }
    // 创建管理员逻辑
    async save(){
        const { ctx,app } = this;
        ctx.validate({
            username:{
                type:"string",
                required:true,
                desc:"管理员账户"
            },
            password:{
                type:"string",
                required:true,
                desc:"密码"
            }
        })


        let { username,password } = ctx.request.body;


        if(await app.model.Manager.findOne({
            where:{
                username
            }
        })){
            return ctx.apiFail('该管理员已存在');
        }


        let manager = await app.model.Manager.create({
            username,password
        })


        ctx.apiSuccess(manager)
    }

    // 编辑表单页
  async edit() {
    const { ctx, app } = this
    const id = ctx.params.id


    let data = await app.model.Manager.findOne({
      where: {
        id,
      },
    })
    if (!data) {
      return await ctx.pageFail('该记录不存在')
    }


    data = JSON.parse(JSON.stringify(data))
    delete data.password


    await ctx.renderTemplate({
      id,
      title: '修改管理员',
      tempType: 'form',
      form: {
        // 提交地址
        action: '/admin/manager/' + id,
        // 字段配置
        fields: [
          {
            label: '用户名',
            type: 'text',
            name: 'username',
            placeholder: '用户名',
          },
          {
            label: '密码',
            type: 'text',
            name: 'password',
            placeholder: '密码',
          },
        ],
        // 默认值
        data,
      },
    })
  }


  // 更新逻辑
  async update() {
    const { ctx, app } = this
    ctx.validate({
      id: {
        type: 'int',
        required: true,
      },
      username: {
        type: 'string',
        required: true,
        desc: '管理员名称',
      },
      password: {
        type: 'string',
        required: false,
        desc: '密码',
      },
    })


    let id = ctx.params.id
    let { username, password } = ctx.request.body


    let manager = await app.model.Manager.findOne({
      where: {
        id,
      },
    })
    if (!manager) {
      return ctx.apiFail('该记录不存在')
    }


    const Op = app.Sequelize.Op


    if (
      await app.model.Manager.findOne({
        where: {
          id: {
            [Op.ne]: id,
          },
          username,
        },
      })
    ) {
      return ctx.apiFail('管理员名称已存在')
    }


    manager.username = username
    if (password) {
      manager.password = password
    }


    ctx.apiSuccess(await manager.save())
  }
}

module.exports = ManagerController;