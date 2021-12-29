const express = require('express')
const app = express()
const port = 4000
app.set("view engine","ejs")
app.get('/', (req, res) => {
  res.render("index")
})

app.get('/1/:currentBalance', (req, res) => {
  var balance = req.params["currentBalance"]
  res.render("stageOne",{currentBalance:balance})
})
app.get('/2/:currentBalance', (req, res) => {
  var balance = req.params["currentBalance"]
  res.render("stageTwo",{currentBalance:balance})
})
app.get('/3/:currentBalance', (req, res) => {
  var balance = req.params["currentBalance"]
  res.render("stageThree",{currentBalance:balance})
})
app.get('/:ticker/:amountInvested/:currentBalance/:nextStage', (req, res) => {
  var tickerSymbol = req.params["ticker"]
  var investmentAmount = req.params["amountInvested"]
  var stage = req.params["nextStage"]
  var decider = Math.random()
  var result ="";
  var balance = parseInt(req.params["currentBalance"])

  if(decider < 0.5){
    result = "You lost on this investment :( -$" +investmentAmount
    balance = balance - parseInt(investmentAmount)
  }else{
    result = "You won on this investment :) +$" +investmentAmount
    balance = balance + parseInt(investmentAmount)

  }
  if(balance < 0){
      res.render("lost")

  }
  if(balance >= 2000){
      res.render("won")

  }



  res.render("investmentResult",{ticker:tickerSymbol,amountInvested:investmentAmount,nextStage:stage,currentBalance:balance,result:result})
})
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})