require('dotenv').config()
const admin = require('firebase-admin');
const express = require('express')
const cors = require('cors')
const app = express()
const port = (process.env.PORT || 3000)
const bodyParser=require('body-parser')
const DataProvider = require('./api.js').DataProvider
const serviceAccount = require("./login-98ff2-firebase-adminsdk-gjeu3-6df1360445.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

app.use(cors())
app.use(express.static(__dirname + '/public'))
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));//Might not be necessary
app.use(bodyParser.json());                         //Might not be necessary

var dataProvider;
try {
  dataProvider = new DataProvider();
} catch(error) {
  console.log(error);
}

let authenticate = function(request, response, next) {
 
    const Bearer = request.headers.authorization;
	console.log(Bearer);
    const idToken = Bearer.split(' ')[1];
	
    admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {//User confirmed
        const uid = decodedToken.uid;
		console.log("function auth");
        next(uid);
		console.log("function auth ahead");
      })
      .catch((error) => {//User not confirmed
        console.log('error')
        response.send({status: "ERROR", description: "User not confirmed"});
      });
 
}

app.get('/', function(request, response) {
  response.send("Server Running");
})

app.get('/all-services', function(request, response) {
  dataProvider.getAllServices(function(error, services) {
    if(error) {
      response.send({
        status: "ERROR",
        description: "Server Error"
      });
    } else {
      response.send(services)
    }
  })
})

app.get('/cities', function(request, response) {
  dataProvider.getAllCities(function(error, cities) {
    if(error) {
      response.send({
        status: "ERROR",
        description: "Server Error"
      });
    } else {
      response.send(cities);
    }
  });
})

app.get('/city-service-details', function(request, response) {
  if(!request.query.city) {
    response.send({
      status: "ERROR",
      description: "City name was not provided"
    });
  } else {
    try {
      dataProvider.getCityServiceDetails(request.query.city, function(error, result) {
        if(!error) {
          response.send(result);
        }
      })
    } catch(ERROR) {
      console.log(ERROR);
    }
  }
})

app.get('/city-sub-service-details', function(request, response) {
  if(!request.query.service || !request.query.city) {
    response.send({
      status: "ERROR",
      description: "Service name and/or City name was not provided"
    });
  } else {
    dataProvider.getSubServiceDetails(request.query.city, request.query.service, function(error, service_details) {
      if(error) {
        response.send({
          status: "ERROR",
          description: "Server Error"
        });
        throw error;
      } else {
        response.send(service_details);
      }
    });
  }
})

////// Must be protected, requires authorization /////////////////////////////////////////////////////////

app.post('/place-order', function(request, response) {
	console.log("order api")
	 const Bearer = request.headers.authorization;
	console.log(Bearer);
	var uid;
    const idToken = Bearer.split(' ')[1];
	
    admin.auth().verifyIdToken(idToken)
      .then((decodedToken) => {//User confirmed
        uid = decodedToken.uid;
		 if(request.body) {
    dataProvider.placeOrder(request.body, uid, function(error, data) {
	
      response.send(data);
    });
  } else {
	  console.log("place order");
    response.send({
      status: "ERROR",
      description: "Request didn't contain data"
    });
  }
      })
      .catch((error) => {//User not confirmed
        console.log('error')
        response.send({status: "ERROR", description: "User not confirmed"});
      });
	  
 
})

////// Must be protected, requires authorization/////////////////////////////////////////////////////////

app.get('/get-order-history', function(request, response, uid) {
  

    const Bearer = request.headers.authorization;
    console.log(Bearer);
    var uid;
      const idToken = Bearer.split(' ')[1];
    
      admin.auth().verifyIdToken(idToken)
        .then((decodedToken) => {//User confirmed
          uid = decodedToken.uid;
          try {
            dataProvider.getOrderHistory(uid, function(error, result) {
              if(error) response.send({
                status: "ERROR",
                description: "SERVER ERROR"
              })
              else response.send(result);
            })
          } catch(ERROR) {
            response.send({
              status: "ERROR",
              description: ERROR
            });
          }

        })
        .catch((error) => {//User not confirmed
          console.log('error')
          response.send({status: "ERROR", description: "User not confirmed"});
        });
      

    
})

app.post('/register-as-professional', function(request, response) {
  data = request.body;
  if(data) {
    try {
      dataProvider.addProfessionalsDetails(data, function(error, result) {
        response.send(result)
      })
    } catch(error) {
      response.send({
        status: "ERROR",
        description: "Server Error"
      });
    }
  } else {
    response.send({
      status: "ERROR",
      description: "Cannot find the professional details"
    })
  }
})

//////////////////////////////////////////////////////////////////////////////////////////////////////

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})