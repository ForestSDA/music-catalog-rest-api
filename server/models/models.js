const sequelize = require('../db')
const {DataTypes} = require('sequelize')

const Author = sequelize.define('author',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    name:{type: DataTypes.STRING, allowNull: false},
    website:{type: DataTypes.STRING, allowNull: true},
})

const Song = sequelize.define('song',{
    id:{type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    authorId:{type: DataTypes.INTEGER, primaryKey: true, allowNull: true},
    title:{type: DataTypes.STRING, allowNull: false},
    duration:{type: DataTypes.TIME, allowNull: false},
    genre:{type: DataTypes.STRING, allowNull: false},
})

Author.hasMany(Song)
Song.belongsTo(Author)

module.exports = {
    Author,
    Song,
}
