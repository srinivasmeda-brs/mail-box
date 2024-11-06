var express = require('express');
var router = express.Router();
var store = require('../store');
/* GET users listing. */
router.get('/:id', function(req, res, next) {
  let mailData = store.get('mailData');
  const mailDetails = mailData.filter(e => e.id == req.params.id)
  const updatedMailData = mailData.map(mail => {
    if(mail.id == req.params.id) {
      mail.isRead = true;
    }
    return mail;
  })
  store.set('mailData', updatedMailData);
  res.render('inbox', { mailDetails: mailDetails[0] });
});

module.exports = router;
