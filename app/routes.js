var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here
router.post('/check-state-pension-options-1', function (req, res) {
  if (req.body.loginoption === "government-gateway") {
    res.redirect('https://www.tax.service.gov.uk/gg/sign-in?continue=%2Fcheck-your-state-pension%2Faccount&origin=nisp-frontend&accountType=individual')
  } else if (req.body.loginoption === "verify") {
    res.redirect('https://www.tax.service.gov.uk/check-your-state-pension/signin/verify')
  } else {
    res.redirect('/')
  }
})

module.exports = router
