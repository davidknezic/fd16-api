import path from 'path'
import express from 'express'
import passport from 'passport'
import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import serveStatic from 'serve-static'
import auth0Strategy from './strategies/auth0'

const app = express()

app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())
app.use(cookieParser())

app.set('views', path.resolve(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  name: 'sessionId',
  secure: true,
  httpOnly: true,
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(auth0Strategy)

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

app.get('/passaxa/login',
  passport.authenticate('auth0', {}), (req, res) => {
    res.redirect('/')
  }
)

app.get('/passaxa/logout',
  (req, res) => {
    req.session.passaxa = null
    res.redirect('/')
  }
)

app.get('/passaxa/callback', (req, res, next) => {
  passport.authenticate('auth0', {
    successRedirect: '/',
    failureRedirect: '/error',
    failureFlash: true
  }, (err, user, info) => {
    if (err) return next(err)
    if (!user) return res.redirect('/login')
    req.session.passaxa = {
      token: 'token',
      info: info,
      user: user
    }
    res.redirect('/')
  })(req, res, next)
})

app.get('*',
  serveStatic(path.resolve(__dirname, '..', 'src'))
)

app.get('/',
  (req, res) => {
    res.render('index', {
      passaxa: req.session.passaxa,
    })
  }
)

export default app
