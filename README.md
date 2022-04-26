# music-catalog-rest-api

## Музыкальный катало на основе **REST API**

### Запускается с папки server командой `**npm run server**`

### Настройки подключения к БД лежат в файле **.env**

______

## Основной стек:
+   JavaScript
+ 	NodeJS
+ 	Express для содания API
+ 	СУБД postgres
+ 	ORM sequelize

______

## Функции
Программа может **добавлять, получать, редактировать и удалять музыкальные композиции и их авторов**. Имеется **фильтрацию композиций по названию, автору и жанру, а авторов по имени/названию**. Так же была проведена работа над обработкой ошибок, **неправильные запросы не крашат сервер, а на неверно указанные данные выдаются соответствующие сообщения**.

______

## Запросы:
Все Api запросы проходят через путь **/api**

Песни и авторы содержатся по пути **/song** и **/author** соответственно 

**Для каждого из них есть команды:**

**/create**- добавить

**/get** - получить

**/update** - изменить

**/delete** - удалить

______

## Примеры:

**/create**

POST

http://localhost:5000/api/author/create
Запрос:
```
{
    "name":"noname",
    "website":"@noname"
}
```
Ответ:
```
{
    "id": 1,
    "name": "noname",
    "website": "@noname",
    "updatedAt": "2022-02-26T22:22:22.222Z",
    "createdAt": "2022-02-26T22:22:22.222Z"
}
```
http://localhost:5000/api/author/create
Запрос:
```
{
    "title":"Music",
    "authorId":1,
    "duration":"00:02:53",
    "genre":"Top"
}
```
Ответ:
```
{
    "id": 1,
    "title": "Music",
    "authorId": 1,
    "duration": "00:02:53",
    "genre": "Top",
    "updatedAt": "2022-02-26T22:22:22.222Z",
    "createdAt": "2022-02-26T22:22:22.222Z"
}
```
**/get**

GET

http://localhost:5000/api/author/get

Ответ:
```
[
    {
        "id": 1,
        "name": "noname",
        "website": "@noname",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 2,
        "name": "name",
        "website": "@name",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 3,
        "name": "allname",
        "website": "@allname",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
http://localhost:5000/api/author/get?name=allname

Ответ:
```
[
    {
        "id": 3,
        "name": "allname",
        "website": "@allname",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
http://localhost:5000/api/song/get

Ответ:
```
[
    {
        "id": 1,
        "authorId": 1,
        "title": "Music",
        "duration": "00:02:53",
        "genre": "Top",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 2,
        "authorId": 1,
        "title": "Music2",
        "duration": "00:02:22",
        "genre": "Top2",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 3,
        "authorId": 1,
        "title": "Music3",
        "duration": "00:02:33",
        "genre": "Top3",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 4,
        "authorId": 2,
        "title": "Music21",
        "duration": "00:02:21",
        "genre": "Top1",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 5,
        "authorId": 3,
        "title": "Music221",
        "duration": "00:02:21",
        "genre": "Top2",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
http://localhost:5000/api/song/get?authorId=2

Ответ:
```
[
    {
        "id": 4,
        "authorId": 2,
        "title": "Music21",
        "duration": "00:02:21",
        "genre": "Top1",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
http://localhost:5000/api/song/get?title=Music3

Ответ:
```
[
    {
        "id": 3,
        "authorId": 1,
        "title": "Music3",
        "duration": "00:02:33",
        "genre": "Top3",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
http://localhost:5000/api/song/get?genre=Top2

Ответ:
```
[
    {
        "id": 2,
        "authorId": 1,
        "title": "Music2",
        "duration": "00:02:22",
        "genre": "Top2",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    },
    {
        "id": 5,
        "authorId": 3,
        "title": "Music221",
        "duration": "00:02:21",
        "genre": "Top2",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
**/update**

PATCH

http://localhost:5000/api/author/update?id=1&name=noname&website=@telegram

Ответ:
```
[
    {
        "id": 1,
        "name": "noname",
        "website": "@telegram",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
http://localhost:5000/api/song/update?id=5&authorId=3&title=Cadillac&duration=00:03:11&genre=Рэп

Ответ:
```
[
    {
        "id": 5,
        "authorId": 3,
        "title": "Cadillac",
        "duration": "00:03:11",
        "genre": "Рэп",
        "updatedAt": "2022-02-26T22:22:22.222Z",
  	"createdAt": "2022-02-26T22:22:22.222Z"
    }
]
```
**/delete**

DELETE

http://localhost:5000/api/song/delete?id=5

Ответ:
```
"Удалил песню с id: 5"
```
http://localhost:5000/api/author/delete?id=3

Ответ:
```
"Удалил автора с id: 3"
```