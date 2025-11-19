Om de database op te zetten, run dit commando: 
* docker run --name alpine-mysql  -e MYSQL_ROOT_PASSWORD=secret -e MYSQL_DATABASE=bergen_db -p 3306:3306 -d mysql:8
