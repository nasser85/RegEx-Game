module.exports = {
  "DATABASE_URI": "postgres://localhost:5432/regex",
  "SESSION_SECRET": "Optimus Prime is my real dad",
  "TWITTER": {
    "consumerKey": "4mB5goLnUr2gUlnybwlx6rMLb",
    "consumerSecret": "RJZMoK137pYqNs62UcR3BrrQiEgd23904dxsOjYbcHRCpbYnbl",
    "callbackUrl": "http://127.0.0.1:1337/auth/twitter/callback"
  },
  "FACEBOOK": {
    "clientID": "1113625322051463",
    "clientSecret": "881d217b92ffbff53c2edddb20afda73",
    "callbackURL": "http://localhost:1337/auth/facebook/callback"
  },
  "GOOGLE": {
    "clientID": "674802620761-ucebg494gki5iulfcftsrjq7r1i7kd23.apps.googleusercontent.com",
    "clientSecret": "z5MYQxRtVwayTUJgvtMpjipI",
    "callbackURL": "http://localhost:1337/auth/google/callback"
  },
  "LOGGING": console.log
};
