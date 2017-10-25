var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here
router.post('/options-on-interstitial/check-state-pension-interstitial-1', function (req, res) {
  if (req.body.loginoption === "government-gateway") {
    res.redirect('https://www.tax.service.gov.uk/gg/sign-in?continue=%2Fcheck-your-state-pension%2Faccount&origin=nisp-frontend&accountType=individual')
  } else if (req.body.loginoption === "verify") {
    res.redirect('https://www.signin.service.gov.uk/start')
  } else if (req.body.loginoption === "no-account") {
    res.redirect('/options-on-interstitial/create-new-account-1')
  } else {
    res.render('options-on-interstitial/check-state-pension-interstitial-1', { error: true })
  }
})

module.exports = router
