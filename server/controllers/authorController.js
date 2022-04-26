const {Author} = require('../models/models')
const ApiError = require('../error/ApiError')
class authorController{
    async create(req,res, next) {

        try {
            const {name, website} = req.body
            const author = await Author.create({name, website})
            return res.json(author)
        }catch (e){
            next(ApiError.bedRequest(e.message))
        }

    }

    async get(req,res) {
        const{name} = req.query
        let names;
        if(name === ''){
            return res.json('Пустое значение name')
        }
        if(name){
            names = await Author.findAll({where: {name}})
            if(names.length === 0){
                return res.json('Не удалось найти name со значение ' + name)
            }
            return res.json(names)

        }


        function isEmpty(obj) {
            for (let key in obj) {
                return false;
            }
            return true;
        }

        while(isEmpty(req.query)){
            names = await Author.findAll()
            return res.json(names)
        }
        return res.json('Неверное значение')
    }

    async delete(req,res) {
        const{id} = req.query
        let del;
        try {
            del = await Author.destroy({ where: {id}})
        }catch (e){
            return res.json('Вы не можете удалить автора пока не удалите все его песни')
        }

        if(del === 0){
            return res.json('Не удалось удалить автора с id: ' + id)
        }else{
            return res.json('Удалил автора с id: ' + id)
        }

    }
    async update(req,res) {
        try {
            const {id, name, website} = req.query
            let names = await Author.findAll({where: {id}})
            if (names.length === 0) {
                return res.json('Не удалось найти id со значение ' + id)
            }
            await Author.upsert({
                id: id,
                name: name,
                website: website,
            });
            names = await Author.findAll({where: {id}})
            return res.json(names)
        } catch {
            return res.json('Ошибка: для запроса на изменения требуются все данные элемента')
        }


    }
    }

module.exports = new authorController()

