const ibmdb = require('ibm_db')
const q = require('q')
var services = require('../config/VCAP_SERVICES.json')

//Vcaps
var connString = ''
// const services = undefined

if (services) {
  // look for a service starting with 'sqldb'
  for (var svcName in services) {
    if (svcName.match(/^dashDB/)) {
      const db2creds = services[svcName][0]['credentials']
      connString = "DRIVER=DB2;DATABASE=" + db2creds.db + ";UID=" + db2creds.username + ";PWD=" + db2creds.password + ";HOSTNAME=" + db2creds.hostname + ";port=" + db2creds.port + ";PROTOCOL=TCPIP"
    }
  }
}

const DataBase = {
	open : function() {
		var deferred = q.defer()
    console.log('Openning connection')
    console.log('connString', connString)
		ibmdb.open(connString, (error,conn) => {
		  if (error){
        console.log('GOT ERROR',error)
			deferred.reject(error)
		  } else{
        console.log('GOT CONNECTION', conn)
		  	 deferred.resolve(conn)
		  }
		})

	  return deferred.promise
	},

	close : function(conn) {

		var deferred = q.defer()
		conn.close(function () {
			deferred.resolve()
		})
	  return deferred.promise
	},

	execute : function(conn, query, params) {
		var deferred = q.defer()
		conn.query(query, params, function (err, data) {
		    if (err){
		    	deferred.reject(err)
		    }
		    else {
		    	deferred.resolve(conn, data)
		    }
		})

		return deferred.promise
	},

	prepare : function(conn, query, params) {

		var deferred = q.defer()
		conn.prepare(query, function (err, stmt) {
		    if (err) {
		    	deferred.reject(err);
		      	conn.closeSync();
		    }

		    stmt.execute(params, function (err, result) {
		    	if (err){
			    	deferred.reject(err);
			    }
			    else {
			    	result.closeSync();
			    	deferred.resolve(result);
			    }
			})
		})

		return deferred.promise;
	},

}

module.exports = exports = DataBase
