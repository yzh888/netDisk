'use strict'

/** @type Egg.EggPlugin */
module.exports = {
  cors: {
    enable: true,
    package: 'egg-cors',
  },
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  valparams: {
    enable: true,
    package: 'egg-valparams',
  },
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
  redis: {
    enable: true,
    package: 'egg-redis',
  },
  io:{
    enable:true,
    package:'egg-socket.io',
  },
  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },
  tenpay: {
    enable: true,
    package: 'egg-tenpay',
  },
}