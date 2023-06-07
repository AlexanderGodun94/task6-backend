module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    senderId: {type: DataTypes.BIGINT, allowNull: false},
    receiverName: {type: DataTypes.STRING, allowNull: false},
    title: {type: DataTypes.STRING, allowNull: true},
    message: {type: DataTypes.TEXT, allowNull: false},
  }, {
    paranoid: true,
    tableName: 'message'
  });


  Message.associate = function (models) {
    Message.belongsTo(models.User, {foreignKey: 'senderId', onDelete: 'CASCADE', as: 'sender'});

  };

  Message.prototype.toJSON = function () {

    return {
      id: this.id,
      senderId: this.senderId,
      receiverName: this.receiverName,
      title: this.title,
      message: this.message,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  };

  return Message;
};
