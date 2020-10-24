'use strict'

const Service = require('egg').Service

class FileService extends Service {
  // 目录是否存在
  async isDirExist(id) {
    let f = await this.app.model.File.findOne({
      where: {
        id,
        user_id: this.ctx.authUser.id,
        isdir: 1,
      },
    })
    if (!f) {
      return this.ctx.throw(404, '目录不存在')
    }
    return f
  }


  // 根据file_id查询目录名称（无限向上直到根结点）
  async seachDir(id) {
    let files = []
    //先查一次当前目录名
    let f = await this.isDirExist(id)
    files.push(f.name)
    //如果不是顶级目录
    while (f.file_id != 0) {
      //继续向上查
      f = await this.isDirExist(f.file_id)
      files.push(f.name)
    }
    let path = files[files.length - 1]
    path = path.concat('/')
    for (let i = files.length - 2; i >= 0; i--) {
      path = path.concat(files[i])
      path = path.concat('/')
    }
    return path
  }


  // 文件是否存在
  async isExist(id) {
    let f = await this.app.model.File.findOne({
      where: {
        id,
        user_id: this.ctx.authUser.id,
      },
    })
    if (!f) {
      return this.ctx.throw(404, '文件不存在')
    }
    return f
  }
}

module.exports = FileService
