var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});
router.get('/about', function(req, res) {
  res.renderView("about", "about");
});
router.get('/contact', function(req, res) {
  res.renderView("contact", "contact");
});

module.exports = router;
