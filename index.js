const express = require('express')
const app = express()
const port = 4000
const baseUrl ="https://investor-adventure.herokuapp.com/"
var session = require('express-session');
app.use(session({
  secret: 'random string',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(express.urlencoded({extended: true}));
app.use(express.json())
//const baseUrl = "https://investor-adventure.herokuapp.com/"
app.set("view engine","ejs")
app.get('/', (req, res) => {
  if(req.session && req.session.userNamee){
    console.log("Session Found")
    res.render("index",{urlBase:baseUrl,userName:req.session.userNamee,lStreak:req.session.longestStreak})
  }else{
      console.log("No Session Founf")

    res.render("signup",{urlBase:baseUrl})
  }
})
app.post('/signup', (req, res) => {
  const userName = req.body.userName;
  req.session.userNamee = userName
  req.session.currentStreak = 0;
  req.session.longestStreak = 0;
  if(req.session){
    res.redirect("/")
  }
  
})
app.get('/logout', (req, res) => {
  req.session.destroy()
  res.redirect("/")
})

app.get('/1/:currentBalance', (req, res) => {
  if(req.session && req.session.userNamee){
  var balance = req.params["currentBalance"]
  res.render("stageOne",{currentBalance:balance,urlBase:baseUrl})
} else{
  res.redirect("/")
}
})
app.get('/2/:currentBalance', (req, res) => {
   if(req.session && req.session.userNamee){
  var balance = req.params["currentBalance"]
  res.render("stageTwo",{currentBalance:balance,urlBase:baseUrl})
}else{
  res.redirect("/'")
}
})
app.get('/3/:currentBalance', (req, res) => {
   if(req.session && req.session.userNamee){
  var balance = req.params["currentBalance"]
  res.render("stageThree",{currentBalance:balance,urlBase:baseUrl})
}else{
  res.redirect("/")
}
})
app.get('/:ticker/:amountInvested/:currentBalance/:nextStage', (req, res) => {
   if(req.session && req.session.userNamee){
  var tickerSymbol = req.params["ticker"]
  var investmentAmount = req.params["amountInvested"]
  var stage = req.params["nextStage"]
  var decider = Math.random()
  var result ="";
  var balance = parseInt(req.params["currentBalance"])

  if(decider < 0.5){
    req.session.currentStreak = 0;
    var currentStreak= req.session.currentStreak
    var longestStreak = req.session.longestStreak

    result = "You lost on this investment :( -$" +investmentAmount
    balance = balance - parseInt(investmentAmount)
  }else{
     req.session.currentStreak = req.session.currentStreak + 1;
      var currentStreak= req.session.currentStreak
      if(req.session.longestStreak < req.session.currentStreak){
        req.session.longestStreak = req.session.currentStreak
      }
      var longestStreak = req.session.longestStreak
    result = "You won on this investment :) +$" +investmentAmount
    balance = balance + parseInt(investmentAmount)

  }
  if(balance < 0){
    res.render("lost",{urlBase:baseUrl,urlBase:baseUrl})

  }
  if(balance >= 2000){
      
      res.render("won",{urlBase:baseUrl})

  }
  res.render("investmentResult",{ticker:tickerSymbol,amountInvested:investmentAmount,nextStage:stage,currentBalance:balance,result:result,urlBase:baseUrl,cStreak:currentStreak,lStreak:longestStreak})
}else{
  res.redirect("/")
}
})
app.listen(process.env.PORT || 4000, function(){
    console.log('Your node js server is running');
});