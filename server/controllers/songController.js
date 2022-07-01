const  {Song} = require('../models/models')
const ApiError = require('../error/ApiError')
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
        let {title, authorId, genre,limit,page,order} = req.query
        page = page || 1
        limit = limit || 10
        if(limit> 100){
            return res.json(null)
        }
        let offset = page * limit - limit

        let filter = {}
        if(title){
            filter.title = title
        }
        if(authorId){
            filter.authorId = authorId
        }
        if(genre){
            filter.genre = genre
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

        let songs
        try{
            songs = await Song.findAll({where:filter,order:orderarr,limit,offset})
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }

        if(songs.length == 0){
            return res.json('Не удалось найти песню')
        }

        return res.json(songs)
    }

    async delete(req,res,next) {
        try{
            const{id} = req.query

            let songs = await Song.findAll({where: {id}})
            if(songs.length == 0){
                return res.json('Не удалось найти id со значение  ' + id)
            }

            let del = await Song.destroy({ where: {id}})
            if(del == 0){
                return res.json('Не удалось удалить песню с id: ' + id)
            }else{
                return res.json('Удалил песню с id: ' + id)
            }
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async update(req,res,next){
        try {
            const{id, authorId, title, duration, genre} = req.query
            let songs = await Song.findAll({where: {id}})
            if(songs.length == 0){
                return res.json('Не удалось найти id со значение  ' + id)
            }
            await Song.upsert({
                id: id,
                authorId: authorId,
                title: title,
                duration: duration,
                genre: genre,
            })
            songs = await Song.findAll({where: {id}})
            return res.json(songs)
        }catch (e){
            return next(ApiError.bedRequest(e.message))
        }
    }
}

module.exports = new songController()