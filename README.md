# Geosoftware-Abschluss-BSc-Muenster

Mapping Stadiums Of The Olympic Games in Rio De Janerio 2016.
Final task of the „Geosoftware“ module at University of Münster, Germany.

##How to start working
###Requirements
- Node.js
- mongoDB

###Run Mongo
- Go to the directory of mongo	(C:\...\mongo\bin) and type in following command:
```
mongod –dbpath c:\...\data
```

- if the server is running, there is a new command prompt needed.
- Go again tot he directory of mongo	(C:\...\mongo\bin) and type in following command:
```
mongo
```
- Now the connection to the default database of Mongo is active. You can change the this by typing:
```
use yourDBname
```


###Run Server
Finally you have to start the server, doing this by going tot he directory of the project folder.
Use the following code:
```
npm install       // for installing dependencies
npm start         // for starting server
```
You get access to the website by [http://localhost:2000](http://localhost:2000).

A detailed tutorial getting started with node.js and mongoDB you can find [here](http://cwbuecheler.com/web/tutorials/2013/node-express-mongo/).

###Authors
[**Torben Kraft**](https://github.com/TeKraft) - BSc. Geoinformatics student at University of Münster, Germany
