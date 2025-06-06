module.exports = (app) => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize
    const Comment = app.model.define('comment', {
        id: {
            type: INTEGER(20),
            primaryKey: true,
            autoIncrement: true,
        },
        content: {
            type: TEXT,
            allowNull: false,
            defaultValue: '',
            comment: '评论内容'
        },
        live_id: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '直播间id',
            references: {
                model: 'live',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'restrict',
        },
        user_id: {
            type: INTEGER,
            allowNull: false,
            defaultValue: 0,
            comment: '用户id',
            references: {
                model: 'user',
                key: 'id',
            },
            onDelete: 'cascade',
            onUpdate: 'restrict',
        },
        create_time: DATE,
        updated_time: DATE,
    })
    Comment.associate = function (models) {
        Comment.belongsTo(app.model.User)
        Comment.belongsTo(app.model.Live)
    }
    return Comment
}