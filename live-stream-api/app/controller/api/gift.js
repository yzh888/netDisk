'use strict'

const await = require('await-stream-ready/lib/await')

const Controller = require('egg').Controller

class GiftController extends Controller{
    async list(){
        const{ctx,app} = this
        //const ctx: Egg.Context
        ctx.apiSuccess(await app.model.Gift.findAll())
    }
}

module.exports=GiftController