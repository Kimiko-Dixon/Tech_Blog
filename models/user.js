const {Model,DataTypes} = require('sequelize')
const sequelize = require('../config/connection')
const bcrypt = require('bcrypt')

class User extends Model{
    async validPassword(password){
        return await bcrypt.compare(password,this.password)
    }
}

User.init(
    {
        id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        username:{
            type:DataTypes.STRING,
            // allowNull: false,
            unique: true
        },
        password:{
            type: DataTypes.STRING,
            allowNull:false,
            unique:true
        }
    },
    {
        sequelize,
        timestamps:false,
        underscored:true,
        freezeTableName: true,
        modelName:'user',
        hooks:{
            beforeCreate: async (userData) => {
                const encryptPassword = await bcrypt.hash(userData.password,10)
                userData.password = encryptPassword
                return userData
            },
            
        }
    }
)

module.exports = User