
async function renderChatRoom(req, res, next) {
    try {
        return res.render('chat.ejs')
    } catch (error) {

    }
}

module.exports = {
    renderChatRoom
}