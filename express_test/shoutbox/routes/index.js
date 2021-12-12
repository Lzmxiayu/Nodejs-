var express = require('express');
var router = express.Router();
var dbConfigIf =require('../util/dbconfig.js')
/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  var sql="select name from st_info"
  var sqlArr = []
  var callBack =(err,data)=>{
    if(err) throw err;
    res.send({
      'name1':data[0]
    })
  }
  dbConfigIf.sqlConnect(sql,sqlArr,callBack)
});

module.exports = router;
