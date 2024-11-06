var express = require('express');
var router = express.Router();
var store = require('../store');
/* GET home page. */
router.get('/', function(req, res, next) {
  let mailData = store.get('mailData');
  let inboxData = mailData.filter(e => e.isArchived === false)
  let archivedData = mailData.filter(e => e.isArchived === true)
  res.render('index', { title: 'Mail Box', inboxData: inboxData, archivedData: archivedData });
});

router.post('/', function(req, res, next) {
  let mailData = store.get('mailData');
  let mailIds = req.body.mailId
  if(mailIds) {
    let action = req.body.actionType
    const updateMailData = mailData.map((mail) => {
      if (mailIds.includes(mail.id.toString())) {
        switch (action) {
          case 'Mark Read':
            mail.isRead = true;
            break;
          case 'Mark Unread':
            mail.isRead = false;
            break;
          case "Archive":
            mail.isArchived = true;
            break;
          case "Un Archive":
            mail.isArchived = false;
            break;
        }
      }
      return mail;
    })
    store.set('mailData', updateMailData);
  }
  res.redirect('/');
});

module.exports = router;
