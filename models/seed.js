const bcrypt = require('bcrypt');

module.exports =[
    {
        "username": "newadmin",
        "password": password = bcrypt.hashSync("newadmin", bcrypt.genSaltSync(10)),
        "admin": false,
        "confirm": false,
        "kid": "Jason",
        "photo": "https://i.imgur.com/ypkhUkT.jpeg",
        "status": [{"date": "01 March 2022", "header": "Behavior", "comments": "Jason was bad today"},
        {"date": "05 March 2022", "header": "Behavior", "comments": "Jason was better today"}],
    },
    // {
    //     "username": "Karen",
    //     "password": "1234",
    //     "admin": false,
    //     "confirm": false,
    //     "kid": "Phillip",
    //     "photo": "https://i.imgur.com/zFocKSF.jpeg",
    //     "status": [{"date": "08 March 2022", "header": "Behavior", "comments": "Phillip read at an 7th grade level today"},
    //     {"date": "08 March 2022", "header": "Behavior", "comments": "Phillip read at an 8th grade level today"},
    //     {"date": "09 March 2022", "header": "Behavior", "comments": "Phillip read at an 9th grade level today"}],
    // },
    // {
    //     "username": "Sue",
    //     "password": "1234",
    //     "admin": false,
    //     "confirm": false,
    //     "kid": "Ashley",
    //     "photo": "https://i.imgur.com/JHRGdXR.jpeg",
    //     "status": [{"date": "06 March 2022", "header": "Goal Reached", "comments": "Ashley read at a 7th grade level today"},
    //     {"date": "08 March 2022", "header": "Behavior", "comments": "Ashley read at an 8th grade level today"},
    //     {"date": "09 March 2022", "header": "Behavior", "comments": "Ashley read at an 9th grade level today"}],
    // },
]