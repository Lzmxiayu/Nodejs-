const mysql = require('mysql')
module.exports = {
	//数据库配置
	config:{
		host:'localhost',
		port:'3306',
		user:'root',
		password:'1260937224Lzm!',
		database:'test'
	},
	
	
	sqlConnect: function(sql,sqlArr,cb){
		//创建连接池对象
		let pool = mysql.createPool(this.config)
		//获取链接
		pool.getConnection((err,data)=>{
			console.log('connect')
			//报错
			if(err) throw err;
			//
			data.query(sql,sqlArr,cb);
			
			data.release();
		})


	}
}