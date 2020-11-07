'use strict';

const PREFIX = 'room';

module.exports = () => {
    return async (ctx, next) => {
        // const { app, socket, logger, helper } = ctx;
        // const id = socket.id;
        // const query = socket.handshake.query;
        // // 强制下线
        // const nsp = app.io.of('/');
        // const tick = (id, msg) => {
        //     console.log('#tick', id, msg);


        //     // 踢出用户前发送消息
        //     socket.emit(id, helper.parseMsg('error', msg));


        //     // 调用 adapter 方法踢出用户，客户端触发 disconnect 事件
        //     nsp.adapter.remoteDisconnect(id, true, err => {
        //         logger.error(err);
        //     });
        // };
        // // 用户验证
        // //1. 获取 header 头token
        // let token = query.token;
        // if (!token) {
        //     tick(id, '您没有权限访问该接口!')
        //     return
        // }
        // //2. 根据token解密，换取用户信息
        // let user = {};
        // try {
        //     user = ctx.checkToken(token);
        // } catch (error) {
        //     let fail = error.name === 'TokenExpiredError' ? 'token 已过期! 请重新获取令牌' : 'Token 令牌不合法!';
        //     tick(id, fail)
        //     return
        // }
        // //3. 判断当前用户是否登录
        // let t = await ctx.service.cache.get('user_' + user.id);
        // if (!t || t !== token) {
        //     tick(id, 'Token 令牌不合法!')
        //     return
        // }


        // //4. 获取当前用户，验证当前用户是否被禁用
        // user = await app.model.User.findByPk(user.id);
        // if (!user) {
        //     tick(id, '用户不存在或已被禁用')
        //     return
        // }


        // // 存储当前用户socket对应的用户信息
        // await ctx.service.cache.set('user_' + id, user);





        /**
        // 用户信息
        const { room, userId } = query;
        const rooms = [room];
        console.log('#user_info', id, room, userId);
        // 检查房间是否存在，不存在则踢出用户
        // 备注：此处 app.redis 与插件无关，可用其他存储代替
        const hasRoom = await app.redis.get(`${PREFIX}:${room}`);
        console.log('#has_exist', hasRoom);
        if (!hasRoom) {
            tick(id, {
                type: 'deleted',
                message: 'deleted, room has been deleted.',
            });
            return;
        }
        // 用户加入
        console.log('#join', room);
        socket.join(room);
        // 在线列表
        nsp.adapter.clients(rooms, (err, clients) => {
            console.log('#online_join', clients);
            // 更新在线用户列表
            nsp.to(room).emit('online', {
                clients,
                action: 'join',
                target: 'participator',
                message: `User(${id}) joined.`,
            });
        });
        */


        await next();


        // // 清除当前用户socket对应的用户信息
        // ctx.service.cache.remove('user_' + id);



        /**
        // 用户离开
        console.log('#leave', room);
        // 在线列表
        nsp.adapter.clients(rooms, (err, clients) => {
            console.log('#online_leave', clients);
            // 获取 client 信息
            // const clientsDetail = {};
            // clients.forEach(client => {
            //   const _client = app.io.sockets.sockets[client];
            //   const _query = _client.handshake.query;
            //   clientsDetail[client] = _query;
            // });
            // 更新在线用户列表
            nsp.to(room).emit('online', {
                clients,
                action: 'leave',
                target: 'participator',
                message: `User(${id}) leaved.`,
            });
        });
         */
    };
};