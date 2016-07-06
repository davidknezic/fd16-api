import Auth0Strategy from 'passport-auth0'
import 'colors'

const debug = require('debug')('fd16-api')

const strategy = new Auth0Strategy({
   domain: process.env.PASSAXA_DOMAIN,
   clientID: process.env.PASSAXA_CLIENT_ID,
   clientSecret: process.env.PASSAXA_CLIENT_SECRET,
   callbackURL: process.env.PASSAXA_CALLBACK_URL || '/passaxa/callback'
  },
  (accessToken, refreshToken, extraParams, profile, done) => {
    debug(`Authorization request from ${profile.displayName}`)
    return done(null, profile)
  }
)

export default strategy
