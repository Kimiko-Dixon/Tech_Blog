const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Comment extends Model{}

Comment.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        text:{
            type: DataTypes.STRING,
            allowNull: false
        },
        date:{
            type:DataTypes.DATEONLY,
            defaultValue:DataTypes.NOW
        },
        user_id:{
            type: DataTypes.INTEGER,
            references:{
                model:'user',
                key: 'id'
            }
        },
        post_id:{
            type: DataTypes.INTEGER,
            references:{
                model:'post',
                key: 'id'
            }
        }
    },
    {
        sequelize,
        timestamps:false,
        underscored:true,
        freezeTableName: true,
        modelName:'user'
    }
)

module.exports = Comment