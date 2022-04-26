const  {Song, Author} = require('../models/models')
const ApiError = require('../error/ApiError')
class songController{
    async create(req,res, next) {
        try {
            const {title, authorId, duration, genre} = req.body
            const song = await Song.create({ title, authorId, duration, genre})
            return res.json(song)
        }catch (e){
            next(ApiError.bedRequest(e.message))
        }

    }

    async get(req,res) {
        const{title, authorId, genre} = req.query
        let songs;
        if(title === ''){
            return res.json('Пустое значение title')
        }
        if(title){
            songs = await Song.findAll({where: {title}})
            if(songs.length === 0){
                return res.json('Не удалось найти title со значение ' + title)
            }
            return res.json(songs)

        }
        if(authorId === ''){
            return res.json('Пустое значение authorId')
        }
        if(authorId){
            songs = await Song.findAll({where: {authorId}})
            if(songs.length === 0){
                return res.json('Не удалось найти authorId со значение ' + authorId)
            }
            return res.json(songs)

        }
        if(genre  === ''){
            return res.json('Пустое значение genre')
        }
        if(genre){
            songs = await Song.findAll({where: {genre}})
            if(songs.length === 0){
                return res.json('Не удалось найти genre со значение ' + genre)
            }
            return res.json(songs)

        }

        function isEmpty(obj) {
            for (let key in obj) {
                return false;
            }
            return true;
        }

        while(isEmpty(req.query)){
            songs = await Song.findAll()
            return res.json(songs)
        }
        return res.json('Неверное значение')
    }

    async delete(req,res) {
        const{id} = req.query
        let del = await Song.destroy({ where: {id}})
        if(del == 0){
            return res.json('Не удалось удалить песню с id: ' + id)
        }else{
            return res.json('Удалил песню с id: ' + id)
        }

    }

    async update(req,res){
        try {
            const{id, authorId, title, duration, genre} = req.query
            let songs = await Song.findAll({where: {id}})
            if(songs.length === 0){
                return res.json('Не удалось найти id со значение  ' + id)
            }
            await Song.upsert({
                id: id,
                authorId: authorId,
                title: title,
                duration: duration,
                genre: genre,
            });
            songs = await Song.findAll({where: {id}})
            return res.json(songs)
        }catch {
            return res.json('Ошибка: для запроса на изменения требуются все данные элемента')
        }

    }


}

module.exports = new songController()