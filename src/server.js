const express = require('express')
const session = require('express-session')

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(session({
  secret: 'my-secret',  // a secret string used to sign the session ID cookie
  resave: false,  // don't save session if unmodified
  saveUninitialized: false  // don't create session until something stored
}))


app.post('/login', (req, res) => {
    const {username, password} = req.body
    console.log(req.body)
    req.session.user = {username: username}
    res.status(200).json({msg:username})
})

const checkAuth = (req, res, next) => {
    if (req.session.user) {
        next()
    } else {
        return res.status(422).json({msg:'not logged in'})
    }
}

app.get('/checkuser', checkAuth, (req, res) => {
    console.log("/checkuser")
    return res.status(200).json({msg: req.session.user.username})
})

app.delete('/logout', (req, res) => {
    req.session.destroy()
    return res.status(204).json({msg: 'No content'})
})

app.listen(3009, ()=>console.log('Listening on Port 3009'))
