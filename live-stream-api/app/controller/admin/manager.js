'use strict';


const Controller = require('egg').Controller;


const fields = [{
    label: "用户名",
    type: "text",
    name: "username",
    placeholder: "用户名",
}, {
    label: "密码",
    type: "text",
    name: "password",
    placeholder: "密码"
}]


class ManagerController extends Controller {


    async index() {
        const { ctx, app } = this;


        let data = await ctx.page('Manager')


        await ctx.renderTemplate({
            title: "管理员管理",
            tempType: "table",
            table: {
                // 按钮
                buttons: {
                    add: "/admin/manager/create"
                },
                // 表头
                columns: [{
                    title: '管理员',
                    fixed: 'left',
                    key: "username"
                }, {
                    title: '时间',
                    key: 'created_time',
                    width: 180,
                    fixed: 'center'
                }, {
                    title: "操作",
                    width: 200,
                    fixed: 'center',
                    action:{
                        edit:function(id){
                            return `/admin/manager/edit/${id}`
                        },
                        delete:function(id){
                            return `/admin/manager/delete/${id}`
                        },
                    }
                }],
                data
            }
        })
    }


    async create() {
        const { ctx, app } = this;
        await ctx.renderTemplate({
            title: "创建管理员",
            tempType: "form",
            form: {
                // 提交地址
                action: "/admin/manager",
                fields
            },
            // 新增成功跳转路径
            successUrl:"/admin/manager"
        })
    }


    async save() {
        const { ctx, app } = this;


        // 参数验证
        ctx.validate({
            username: {
                type: 'string',
                required: true,
                desc: '用户名'
            },
            password: {
                type: 'string',
                required: true,
                desc: '密码'
            },
        });
        let { username, password } = ctx.request.body;


        // 验证用户是否已经存在
        if (await app.model.Manager.findOne({
            where: { username }
        })) {
            ctx.throw(400, '用户名已存在');
        }
        // 创建用户
        let manager = await app.model.Manager.create({
            username,
            password,
        });
        if (!manager) {
            ctx.throw(400, '创建用户失败');
        }
        ctx.apiSuccess(manager);
    }
   
}


module.exports = ManagerController;
