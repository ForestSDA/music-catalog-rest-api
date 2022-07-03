const {Author} = require('../models/models')
const ApiError = require('../error/ApiError')
const {Sequelize} = require('sequelize')

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

    async get(req,res,next) {
        try{
            let {name, limit, page, order} = req.query
            if(limit > 100){
                return res.json(null)
            }

            page = page || 1
            limit = limit || 10
            let offset = page * limit - limit

            let filter = {}
            if(name){
                filter.name = {[Sequelize.Op.iLike]:name}
            }

            let orderarr = []
            if(order == 'name'){
                orderarr.push(['name', 'ASC'])
            }

            let names = await Author.findAll({
                where:filter,
                order:orderarr,
                limit,
                offset
            })

            return res.json(names)
            
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async update(req,res,next) {
        try {
            const {id, name, website} = req.query

            await Author.update({
                name: name,
                website: website
                },
                { where:{id:id}}
            )
            let names = await Author.findAll({where: {id}})
            return res.json(names)
        } catch (e){
            return next(ApiError.bedRequest(e.message))
        }
    }

    async delete(req,res,next) {
        try {
            const {id} = req.query
 
            let names = await Author.destroy({ where: {id}})
            if(names == 0){
                return res.json('Не удалось удалить автора с id: ' + id)
            }else{
                return res.json('Удалил автора с id: ' + id)
            }
        }catch(e){
            return next(ApiError.bedRequest(e.message))
        }
    }
}

module.exports = new authorController()