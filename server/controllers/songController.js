const {Song} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Sequelize} = require('sequelize')

class songController{
    async create(req,res, next) {
        try {
            const {title, authorId, duration, genre} = req.body
            const song = await Song.create({ title, authorId, duration, genre})
            return res.json(song)
        }catch (e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async get(req,res,next) {
        try{
            let {title, authorId, genre, limit, page, order} = req.query
            if(limit > 100){
                return res.json(null)
            }
            
            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            let filter = {}
            if(authorId){
                filter.authorId = authorId
            }
            if(title){
                filter.title = {[Sequelize.Op.iLike]:title}
            }
            if(genre){
                filter.genre = {[Sequelize.Op.iLike]:genre}
            }

            let orderarr = []
            if(order == 'title'){
                orderarr.push(['title', 'ASC'])
            }
            if(order == 'genre'){
                orderarr.push(['genre', 'ASC'])
            }
            if(order == 'duration'){
                orderarr.push(["duration", 'DESC'])
            }

            let songs = await Song.findAll({
                where:filter,
                order:orderarr,
                limit,
                offset
            })
            
            return res.json(songs)

        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async update(req,res,next){
        try {
            const{id, authorId, title, duration, genre} = req.query

            await Song.update({
                authorId: authorId,
                title: title,
                duration: duration,
                genre: genre },
                { where:{id:id}}
            )
            let songs = await Song.findAll({where: {id}})
            return res.json(songs)
        }catch (e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async delete(req,res,next) {
        try{
            const{id} = req.query

            let songs = await Song.destroy({ where: {id}})
            if(songs == 0){
                return res.json('Не удалось удалить песню с id: ' + id)
            }else{
                return res.json('Удалил песню с id: ' + id)
            }
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }
    }
}

module.exports = new songController()