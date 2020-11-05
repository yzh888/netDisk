module.exports = (app) => {
    const { STRING, INTEGER, DATE, ENUM, TEXT } = app.Sequelize
    const LiveGift = app.model.define('live_gift', {
      id: {
        type: INTEGER(20),
        primaryKey: true,
        autoIncrement: true,
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
        onUpdate: 'restrict'
      },
      gift_id: {
        type: INTEGER,
        allowNull: false,
        defaultValue: 0,
        comment: '礼物id',
        references: {
          model: 'gift',
          key: 'id'
        },
        onDelete: 'cascade',
        onUpdate: 'restrict',
      },
      created_time: DATE,
      updated_time: DATE,
    })
    LiveGift.associate = function(models){
      LiveGift.belongsTo(app.model.User)
      LiveGift.belongsTo(app.model.Live)
      LiveGift.belongsTo(app.model.Gift)
    }
    return LiveGift
  }