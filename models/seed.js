const bcrypt = require('bcrypt');

module.exports =[
    {
        "username": "newadmin",
        "password": password = bcrypt.hashSync("newadmin", bcrypt.genSaltSync(10)),
        "admin": true,
        "confirm": false,
        "kid": "Teacher Emily",
        "photo": "https://i.imgur.com/ypkhUkT.jpeg",
        "status": [{"date": "01 March 2022", "header": "Admin", "comments": "Dont delete this account"}],
    }
]