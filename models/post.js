const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/connection')

class Post extends Model{}

Post.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        title:{
            type: DataTypes.STRING,
            allowNull: false,
        },
        content:{
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
        }

    },
    {
        sequelize,
        timestamps:false,
        underscored:true,
        freezeTableName: true,
        modelName:'post'
    }
)

module.exports = Post