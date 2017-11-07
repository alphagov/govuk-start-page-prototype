var express = require('express')
var router = express.Router()

// Route index page
router.get('/', function (req, res) {
  res.render('index')
})

// add your routes here
router.post('/lab-session-1/options-on-interstitial/check-state-pension/interstitial', function (req, res) {
  if (req.body.loginoption === "government-gateway") {
    res.redirect('https://www.tax.service.gov.uk/gg/sign-in?continue=%2Fcheck-your-state-pension%2Faccount&origin=nisp-frontend&accountType=individual')
  } else if (req.body.loginoption === "verify") {
    res.redirect('https://www.tax.service.gov.uk/check-your-state-pension/signin/verify')
  } else if (req.body.loginoption === "no-account") {
    res.redirect('/lab-session-1/options-on-interstitial/check-state-pension/create-new-account')
  } else {
    res.render('lab-session-1/options-on-interstitial/check-state-pension/interstitial', { error: true })
  }
})
router.post('/lab-session-2/options-on-interstitial/view-driving-licence/interstitial', function (req, res) {
  if (req.body.loginoption === "government-gateway") {
    res.redirect('update-me')
  } else if (req.body.loginoption === "verify") {
    res.redirect('update-me')
  } else if (req.body.loginoption === "no-account") {
    res.redirect('/lab-session-2/options-on-interstitial/view-driving-licence/create-new-account')
  } else {
    res.render('lab-session-2/options-on-interstitial/view-driving-licence/interstitial', { error: true })
  }
})

module.exports = router
