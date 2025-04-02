```
www-data@canape:/var/www/git$ curl http://localhost:5984/_all_dbs
["_global_changes","_metadata","_replicator","_users","passwords","simpsons"]

www-data@canape:/var/www/git$ curl http://localhost:5984/simpsons/_all_docs
{"total_rows":7,"offset":0,"rows":[
{"id":"f53679a526a868d44172c83a6100451b","key":"f53679a526a868d44172c83a6100451b","value":{"rev":"1-3f6141f3aba11da1d65ff0c13fe6fd39"}}
]}

www-data@canape:/var/www/git$ curl http://localhost:5984/simpsons/f0042ac3dc4951b51f056467a1000dd9
{"_id":"f0042ac3dc4951b51f056467a1000dd9","_rev":"1-fbdd816a5b0db0f30cf1fc38e1a37329","character":"Homer","quote":"Doh!"}

www-data@canape:/var/www/git$ curl http://localhost:5984/passwords
{"error":"unauthorized","reason":"You are not authorized to access this db."}


curl http://localhost:5984/passwords/739c5ebdf3f7a001bebb8fc4380019e4 --user 'admin:password'


www-data@canape:/var/www/git$ curl http://localhost:5984/_users
{"db_name":"_users","update_seq":"17-g1AAAAFTeJzLYWBg4MhgTmEQTM4vTc5ISXLIyU9OzMnILy7JAUoxJTIkyf___z8rkQGPoiQFIJlkD1bHiU-dA0hdPFgdMz51CSB19WB1jHjU5bEASYYGIAVUOp8YtQsgavcTo_YARO19_H6HqH0AUQt0L1MWAOGZbz8","sizes":{"file":103818,"external":4447,"active":7737},"purge_seq":0,"other":{"data_size":4447},"doc_del_count":1,"doc_count":9,"disk_size":103818,"disk_format_version":6,"data_size":7737,"compact_running":false,"instance_start_time":"0"}

www-data@canape:/var/www/git$ curl http://localhost:5984/_users/_all_docs
{"error":"unauthorized","reason":"You are not a server admin."}
```