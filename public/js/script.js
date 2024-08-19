const username = document.querySelector('.username').value.trim()
const password = document.querySelector('.password').value.trim()

const login = async (event) => {
    event.preventDefault()
    if(username && password){
       const response = await fetch('/api/user/login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'}
        }) 
    }
    
}

const logout = async(event) => {
    event.preventDefault()
    const response = await fetch('/api/user/logout',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
    })
}

const signup = async(event) => {
    event.preventDefault()
    if(username && password){
        const response = await fetch('/api/user/signup',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-Type': 'application/json'}
         }) 
     }
}

const createPost = async(event) => {
    event.preventDefault()

    if(title && content){
        const response = await fetch('/api/posts',{
            method: 'POST',
            body: JSON.stringify({title,content}),
            headers: {'Content-Type': 'application/json'}
        })
    }
    
}

const editPost = async(event) => {
    event.preventDefault()

    if(title || content){
        const response = await fetch(`/api/posts/${id}`,{
            method: 'PUT',
            body: JSON.stringify({title,content}),
            headers: {'Content-Type': 'application/json'}
        })
    }
    
}

const createComment = async(event) => {
    event.preventDefault()
    if(text){
        const response = await fetch(`/api/posts/comment/${id}`,{
            method: 'POST',
            body: JSON.stringify({text}),
            headers: {'Content-Type': 'application/json'}
        })
    }
    
}

document.querySelector('#signup').addeventlistener('click',signup)
document.querySelector('#login').addeventlistener('click',login)
document.querySelector('#logout').addeventlistener('click',logout)
document.querySelector('#myposts').addeventlistener('click',editPost)
document.querySelector('#createpost').addeventlistener('click',createPost)
document.querySelector('#post').addeventlistener('click',createComment)