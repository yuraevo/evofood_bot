const bot = require("./bot") 
const bot_command = require("./bot_commands")
const keyboards = require("./keyboard")
const keyboard_text = require("./keyboard_text")
const func = require("./functions/findUser")
const adress = require("./functions/choiceAdress")

bot_command()

bot.on("message", msg => {
    const { id } = msg.chat
    const { username } = msg.chat
    const { first_name } = msg.chat
    const { last_name } = msg.chat

    console.log("Зашло")
    switch(msg.text) {
        case keyboard_text.main.personal_accaunt:
            console.log("Пользователь " + username + " заходит в личный аккаунт")
            func.findUser(id, first_name, last_name, username, bot).then(()=>{
                console.log("Успешно")
            })
        break
        case keyboard_text.back:
            console.log("Пользователь " + username + " заходит в общее меню")
            bot.sendMessage(id, "Вы вернулись в меню", {
                parse_mode: 'HTML',
                reply_markup: {
                    keyboard: keyboards.main
                }
            })
        break       
    }
})

bot.on("callback_query", query => {
    //bot.answerCallbackQuery(query.id, "Вы выбрали горо")
    const { id } = query.message.chat
    const { data } = query
    const { username } = query.message.chat
    console.log(data)
    adress.choiceAdress(id, data, username, bot, query)
})