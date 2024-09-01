const router = require('express').Router()
const {User, Post, Comment} = require('../../models')

//New user
router.post('/signup', async (req,res) => {
    try{
        const userCredentials = {
            username: req.body.username,
            password: req.body.password
        }

        const newUser = await User.create(
            userCredentials
        )
        req.session.save(() => {
            req.session.LoggedIn = true
            req.session.userInfo = {
                id:newUser.id,
                username: newUser.username
            }
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
        const findUser = await User.findOne({
            where:{
                username: req.body.username
            }
        })
        console.log(findUser)
        if(!findUser){
            res.status(400).json('Your username or Password is incorrect')
            return 
        }
        const isvalidPassword = await findUser.validPassword(req.body.password)
        console.log(isvalidPassword)
        if(!isvalidPassword){
            res.status(400).json('Your username or Password is incorrect')
            return 
        }

        const user = findUser.get({plain:true})
        req.session.save(() => {
            req.session.LoggedIn = true
            req.session.userInfo = {
                id:user.id,
                username: user.username
            }
            console.log(req.session.userInfo.id)
            res.status(200).json(user)
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