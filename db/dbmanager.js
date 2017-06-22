const ibmdb = require('ibm_db')
const q = require('q')
const service = require('../config/VCAP_SERVICES.json')

//Vcaps
const connString = ''
const services = undefined

// if (process.env.VCAP_SERVICES) {
//    services = JSON.parse(process.env.VCAP_SERVICES)
// } else {
// 	var fs = require('fs')
// 	// services = JSON.parse(fs.readFileSync('./../config/VCAP_SERVICES.json', 'utf8'))
// }

if (services){
  // look for a service starting with 'sqldb'
  for (var svcName in services) {
    if (svcName.match(/^dashDB/)) {
      const db2creds = services[svcName][0]['credentials']
      connString = "DRIVER=DB2;DATABASE=" + db2creds.db + ";UID=" + db2creds.username + ";PWD=" + db2creds.password + ";HOSTNAME=" + db2creds.hostname + ";port=" + db2creds.port + ";PROTOCOL=TCPIP"
    }
  }
}

const DataBase = {
	open : function(){
		var deferred = q.defer()

		logger.info("[open]")

		ibmdb.open(connString, function(err,conn) {
		  if (err){
			deferred.reject(err)
			logger.error("[open] conn.open error " + err)
		  }else{
		  	 deferred.resolve(conn)
		  	 logger.info("[open] conn.open done")
		  }
		})

	  return deferred.promise
	},

	close : function(conn){
		logger.info('[close]')

		var deferred = q.defer()
		conn.close(function () {
			deferred.resolve()
		    logger.info('[close] conn.close done')
		})
	  return deferred.promise
	},

	execute : function(conn, query, params) {
		var deferred = q.defer()
		conn.query(query, params, function (err, data) {
		    if (err){
		    	logger.info("[execute] conn.query error: " + JSON.stringify(err));
		    	deferred.reject(err)
		    }
		    else {
		    	logger.info("[execute] conn.query done")
		    	deferred.resolve(data)
		    }
		})

		return deferred.promise
	},

	prepare : function(conn, query, params) {

		var deferred = q.defer()
		conn.prepare(query, function (err, stmt) {
		    if (err) {
		    	logger.error("prepare] conn.prepare error: "+JSON.stringify(err));
		    	deferred.reject(err);
		      	conn.closeSync();
		    }

		    stmt.execute(params, function (err, result) {
		    	if (err){
			    	logger.error("prepare] stmt.execute err: "+JSON.stringify(err));
			    	deferred.reject(err);
			    }
			    else {
			    	logger.info("prepare] stmt.execute done ");
			    	result.closeSync();
			    	deferred.resolve(result);
			    }
			})
		})

		return deferred.promise;
	},

}

module.exports = exports = DataBase
