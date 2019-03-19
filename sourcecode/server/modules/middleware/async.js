module.exports = function(handler) {   // handler as an funciton reference
    return async (req, res, next) => {
        try {
            await handler(req, res)
        }
        catch(ex) {
        console.log('error async from middleware');
           return next(ex);     // this next will to app js function, in which it uses erroHandler function
        }
    }
}