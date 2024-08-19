const router = require('express').Router()
const {User, Post, Comment} = require('../../models')

//New user
router.post('/signup', async (req,res) => {
    try{
        const userCredentials = {
            username: req.body.username,
            password: req.body.password
        }
       /*  const findCreds = await User.findAll({
            where:{
                [Op.or]:{
                   username:userCredentials.username, 
                   password: userCredentials.password
                }
            }
        })
        if(findCreds){
            return res.render('signup',{message: 'Your username or password has alerady been taken'})
        } */
        const newUser = await User.create(
                userCredentials
        )
        req.session.save(() => {
            req.session.LoggedIn = true
            const userInfo = {
                id:newUser.id,
                username: newUser.username
            }
            console.log(userInfo)
            res.status(200).json(newUser)
        }   
        )   
        
    }
    catch{
        res.status(500).json('failed to create new user')
    }
    
})

//login
router.post('/login',async (req,res) => {
    try{
        const user = await User.findOne({
            where:{
                username: req.body.username
            }
        })
        if(!user){
            res.status(400).json('Your username or Password is incorrect')
            return 
        }
        //await not working?
        const isvalidPassword = await user.validPassword(req.body.password)
        if(!isvalidPassword){
            res.status(400).json('Your username or Password is incorrect')
            return 
        }

        req.session.save(() => {
            req.session.LoggedIn = true
            const userInfo = {
                id:newUser.id,
                username: newUser.username
            }
            console.log(userInfo)
            res.status(200).json(newUser)
        }
        )

    }
    catch{
        res.status(500).json('failed to log in')
    }
})

//logout
router.post('/logout',async (req,res) => {
    if (req.session.LoggedIn){
        req.session.destroy(() => res.status(204).end())
    }
    else {
        res.status(404).end()
    }
})

module.exports = router