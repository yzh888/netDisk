'use strict'

const await = require('await-stream-ready/lib/await')

const Service = require('egg').Service

class UserService extends Service {
    //用户是否存在
    async exist(id){
        const{app} = this

        return await app.model.User.findOne({
            where:{
                id,
            },
        })
    }
}