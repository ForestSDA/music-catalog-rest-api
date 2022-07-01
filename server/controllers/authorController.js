const {Author} = require('../models/models')
const ApiError = require('../error/ApiError')
class authorController{
    async create(req,res,next) {

        try {
            const {name, website} = req.body
            const author = await Author.create({name, website})
            return res.json(author)
        }catch (e){
            return next(ApiError.bedRequest(e.message))
        }

    }

    async get(req,res) {
        let {name,limit,page,order} = req.query
        page = page || 1
        limit = limit || 10
        if(limit > 100){
            return res.json(null)
        }
        let offset = page * limit - limit

        let filter = {}
        if(name){
            filter.name = name
        }

        let orderarr = []
        if(order == 'name'){
            orderarr.push(['name', 'ASC'])
        }

        let names
        try{
            names = await Author.findAll({where:filter,order:orderarr,limit,offset})
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }

        if(names.length == 0){
            return res.json('Не удалось найти автора')
        }
        return res.json(names)
    }

    async delete(req,res,next) {
        try {
            const{id} = req.query
            let names = await Author.findAll({where: {id}})
            if (names.length == 0) {
                return res.json('Не удалось найти id со значение ' + id)
            }

            let del = await Author.destroy({ where: {id}})
            if(del == 0){
                return res.json('Не удалось удалить автора с id: ' + id)
            }else{
                return res.json('Удалил автора с id: ' + id)
            }
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async update(req,res,next) {
        try {
            const {id, name, website} = req.query
            let names = await Author.findAll({where: {id}})
            if (names.length == 0) {
                return res.json('Не удалось найти id со значение ' + id)
            }
            await Author.upsert({
                id: id,
                name: name,
                website: website,
            });
            names = await Author.findAll({where: {id}})
            return res.json(names)
        } catch (e){
            return next(ApiError.bedRequest(e.message))
        }
    }
}

module.exports = new authorController()