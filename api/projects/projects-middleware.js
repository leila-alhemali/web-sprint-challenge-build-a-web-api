// add middlewares here related to projects


const checkProjectPayload = (req, res, next) => {
    //req.body
    //either next() or send back 422
    if (req.body.name && req.body.description) {
        next() 
    } else {
        next({
            status: 400,
            message: `Projects require name and description`
        })
    }
}

const checkProjectCompleted = (req, res, next) => {
    //req.body
    //either next() or send back 422
    if (req.body.completed === false || req.body.completed === true) {
        next() 
    } else {
        next({
            status: 400,
            message: `Projects require name and description`
        })
    }
}



module.exports = {
    checkProjectPayload,
    checkProjectCompleted
}