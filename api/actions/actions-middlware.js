// add middlewares here related to actions
const Action = require("./actions-model")

const checkActionPayload = (req, res, next) => {
    //req.body
    //either next() or send back 422
    if (req.body.description && req.body.notes && req.body.project_id) {
        next() 
    } else {
        next({
            status: 400,
            message: `Projects require name and description`
        })
    }
}

module.exports = {
    checkActionPayload

}