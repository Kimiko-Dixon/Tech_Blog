//Middleware for being logged in
const ifLoggedIn = (req,res,next) =>{
    if(!req.session.LoggedIn){
        res.redirect('/login')
    }
    else{
        next()
    }
}

module.exports = ifLoggedIn