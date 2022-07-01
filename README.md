# music-catalog-rest-api

## Музыкальный каталог на основе **REST API**

### Запускается с папки server командой     `npm run server`

### Настройки подключения к БД лежат в файле `.env`

______

## Основной стек:
+   JavaScript
+ 	NodeJS
+ 	Express для создания API
+ 	СУБД postgres
+ 	ORM sequelize

______

## Функции
Программа может **добавлять, получать, редактировать и удалять музыкальные композиции и их авторов**. Имеется **фильтрацию и сортировку композиций по названию, автору и жанру, а авторов по имени/названию**, умеет их сочитать между собой. Так же была проведена работа над обработкой ошибок, **неправильные запросы не крашат сервер, а на неверно указанные данные выдаются соответствующие сообщения**.

______

## Запросы:
Запросы для песен:

http://localhost:5000/api/song

Запросы для авторов:

http://localhost:5000/api/author

**Для каждого из них есть команды:**

**POST**- добавить

**GET** - получить

**PATCH** - изменить

**DELETE** - удалить

______

## Примеры:


`POST`

http://localhost:5000/api/author

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

http://localhost:5000/api/song

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

`GET`

http://localhost:5000/api/author

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
http://localhost:5000/api/author?name=allname

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
http://localhost:5000/api/song

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
    }
]
```
http://localhost:5000/api/song?authorId=2

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
http://localhost:5000/api/song?title=Music3

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
http://localhost:5000/api/song?genre=Top2

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

`PATCH`

http://localhost:5000/api/author?id=1&name=noname&website=@telegram

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
http://localhost:5000/api/song?id=5&authorId=3&title=Cadillac&duration=00:03:11&genre=Рэп

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

`DELETE`

http://localhost:5000/api/song?id=5

Ответ:
```
"Удалил песню с id: 5"
```
http://localhost:5000/api/author?id=3

Ответ:
```
"Удалил автора с id: 3"
```
