const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;
const assert = require('assert');

require('dotenv').config()

DataProvider = function() {
    var that = this;
    const DB_URL = `mongodb+srv://sanket:${process.env.dbpass}@sanketdemocluster.1hbtk.mongodb.net/${process.env.dbname}?retryWrites=true&w=majority`;
    this.client = new MongoClient(DB_URL, { useNewUrlParser: true, useUnifiedTopology: true });
    this.client.connect(function(error) {
        if(error)   throw new Error("DATABASE CONNECTION ERROR");
        that.DB = that.client.db(process.env.dbname);
    })
}

DataProvider.prototype.getCollection = function(collection_name, callback) {
    const cursor = this.DB.collection(collection_name);
    if(cursor == null) {
        console.log("Not able to create cursor in DataProvider.prototype.getCollection");
        callback({error: "Cursor not created"}, cursor);
    } else {
        callback(null, cursor);
    }
}

DataProvider.prototype.getAllServices = function(callback) {
    this.getCollection('services', function(error, service_collection) {
        if(error) throw new Error("Can't get services collection in get all services function");
        service_collection.find({}).toArray(function(error, results) {
            if(error)   throw new Error("Can't get array from database response in get all services function");
            for(result of results) {
                result["service_id"] = result["_id"];
                delete result["_id"];
            }
            callback(null,{ status: "SUCCESS",
                            services: results } )
        })
    })
}

DataProvider.prototype.getAllCities = function(callback) {
    this.getCollection('cities', function(error, city_collection) {
        if(error) {
            console.log("Error in DataProvider.prototype.getAllCities Line 30");
            callback(error);
        } else {
            city_collection.find({
            }).project({
                "_id":1,
                "name": 1
            }).toArray(function(error, results) {
                if(error) {
                    console.log("Error in DataProvider.prototype.getAllCities Line 35");
                    callback(error);
                } else {
                    for(city of results) {
                        city.city_id = city["_id"];
                        delete city["_id"];
                    }
                    callback(null, { status: "SUCCESS",
                                     cities: results });
                }
            })
        }
    })
}

DataProvider.prototype.getCityServiceDetails = function(cityname, callback) {
    this.getCollection('cities', function(error, city_collection) {
        if(error) {
            console.log("Error in DataProvider.prototype.getAllCities Line 30");
            callback(error);
        } else {
            city_collection.find({
                "name": cityname
            }).toArray(function(error, results) {
                if(error) {
                    console.log("Error in DataProvider.prototype.getAllCities Line 35");
                    callback(error);
                } else {
                    let result;
                    if(results.length > 0) {
                        result = results[0];
                        result["city_id"] = result["_id"];
                        delete result["_id"];
                        callback(null, { "status": "SUCCESS", "city": result });
                    } else {
                        callback(null, {"status": "ERROR", "description": "Requested details not present in database"})
                    }
                }
            })
        }
    })
}

DataProvider.prototype.getSubServiceDetails = function(cityname, servicename, callback) {
    this.getCollection('sub_services', function(error, service_details_collection) {
        if(error) {
            console.log("Error in DataProvider.prototype.getAllServiceDetails Line 74");
            callback(error);
        } else {
            query_object = {
                "service": servicename, 
                "available_in_cities.city_name": {"$eq": cityname}
            }

            projection_object = {
                "_id":1,
                "service":1,
                "service_id":1,
                "sub_service_name":1,
                "rating": 1,
                "quantity_limit": 1,
                "cost_description": 1,
                "description": 1,
                "available_in_cities": {$elemMatch:{"city_name": cityname}}
            }

            service_details_collection.find(query_object).project(projection_object).toArray(function(error, results) {
                if(error) {
                    console.log("Error in DataProvider.prototype.getAllServiceDetails Line 74");
                    callback(error);
                } else {
                    if(results.length == 0)
                        callback(null, { status: "ERROR", description: "Requested information not present in database" });
                    else {
                        for(job of results) {
                            job["sub_service_id"] = job["_id"];
                            job["sub_service_cost"] = job["available_in_cities"][0]["cost"];
                            delete job["available_in_cities"];
                            delete job["_id"];
                        }
                        callback(null, { "status": "SUCCESS",
                                         "city_name": cityname,
                                         "sub_services": results });
                    }
                }
            });
        }
    })
}

DataProvider.prototype.demo = function(order_list, cityname, callback) {
    this.getCollection('sub_services', function(error, sub_service_collection) {
        if(error)   throw new Error("Error connecting to sub_services collection in demo function");
        sub_service_id_list = [];

        for(sub_service of order_list) {
            console.log(sub_service.sub_service_id);
            //sub_service_id_list.push(ObjectID(order_list.sub_service_id));
            sub_service_id_list.push(new ObjectID.createFromHexString(sub_service.sub_service_id));
        }
        sub_service_collection.find({
            "_id": {"$in": sub_service_id_list}
        }).project({
            "_id": 1,
            "sub_service_name": 1,
            "available_in_cities": {$elemMatch:{"city_name": cityname}}
        }).toArray(function(error, results) {
            if(error)   throw new Error("Error in toArray callback in demo function");
            temp_obj = {};
            for(result of results) {
                temp_obj[result["_id"]] = result;
            }
            to_return = {list:[]};
            let sub_serv_tc = 0, total_cost = 0;
            for(sub_serv of order_list) {
                sub_serv_tc = 0;
                if(temp_obj[sub_serv.sub_service_id]) {
                    to_return.list.push({
                        sub_service_id: sub_serv.sub_service_id,
                        sub_service_name: temp_obj[sub_serv.sub_service_id]["sub_service_name"],
                        quantity: sub_serv.quantity,
                        cost_per_quantity: temp_obj[sub_serv.sub_service_id]["available_in_cities"][0]["cost"],
                        total_cost: (sub_serv.quantity*temp_obj[sub_serv.sub_service_id]["available_in_cities"][0]["cost"])
                    });
                    //console.log(temp_obj);
                    total_cost += to_return.list[to_return.list.length-1]["total_cost"];
                }
            }

            to_return["city_name"] = cityname;
            to_return["total_cost"] = total_cost;
            to_return["status"] = "PLACED";
            to_return["cutomer_id"] = "607c7f97b5b5b57fd19f6af5";
            callback(null, to_return);
        })
    });
}

DataProvider.prototype.placeOrder = function(data, customerid, callback) {
    that = this;
    this.getCollection("professionals", function(error, prof_collection) {
        if(error)   {throw new Error("professionals collection not received in placeOrder");}
        
        //Find professional for the given city and service
        prof_collection.find({
            "city_name": data.delivery_address.city,
            "services_provided": data.service_name
        }).project({
            "password": 0
        }).toArray(function(error, results) {
            if(error)   throw new Error("Can find professionals in placeorder");

            //If no professional is available send status as error
            if(results.length == 0) {
                callback(null, { status: "ERROR", description: "Can't find professional for requested service, city"});
            } else {
                
                let order_obj = {...data}, professional = results[0];
                
                //Change professional details for frontend
                professional.professional_id = professional["_id"];
                delete professional["_id"];
                delete professional["services_provided"];

                //Add assigned professional details to the order, make manipulations to match data type format in database
                order_obj.status = "PLACED";
                order_obj.professional_id = professional.professional_id;
                order_obj.professional_name = professional["name"];
                order_obj.customer_id = customerid; //Change made here
                //order_obj.service_id = new ObjectID.createFromHexString(data.service_id);
                order_obj.date_service = new Date(data.date_service);

                that.getCollection("orders", function(error, order_collection) {
                    if(error)   throw new Error("Error in getting order collection in placeOrder");
                    
                    //Add the created order object to the database
                    order_collection.insertOne(order_obj, function(error, result) {
                        if(error) throw new Error("order Insertion error");
                        order_obj.order_id = result.insertedId;
                        delete order_obj["_id"];

                        // Send the bill and assigned professional information to frontend
                        callback(null, {
                            status: "SUCCESS",
                            //bill_details: order_obj,
                            assigned_professional: professional
                        });
                    })
                })
            }
        })
    });
}

DataProvider.prototype.getOrderHistory = function(customerid, callback) {
    this.getCollection("orders", function(error, order_collection/*Cursor of the collection mentioned*/) {
        if(error)   throw new Error("Can't get order collection in getOrderDetails function");

        order_collection.find({
            "customer_id": customerid
        }).project({
            "_id": 1,
            "date_service": 1,
            "delivery_address": 1,
            "service_name": 1,
            "status": 1,
            "professional_name": 1,
            "total_cost": 1,
        }).toArray(function(error, results) {
            if(error)   throw new Error("error in fetching results array in getOrderDetails");
            all_orders = {customer_id: customerid, ongoing: [], history: []};

            //console.log(results);

            for(result of results) {
                result.order_id = result["_id"];
                delete result["_id"];
                switch(result.status) {
                    case "PLACED": all_orders.ongoing.push(result);
                                   break;
                    case "COMPLETED": all_orders.history.push(result);
                }
            }

            callback(null, {
                status: "SUCCESS",
                all_orders
            });
        })
    })
}

DataProvider.prototype.insert = function(collectionname, data, callback) {
    this.getCollection(collectionname, function(error, collection) {
        if(error)   throw new Error("Can't get collection insert function");
        collection.insertOne(data, function(error, result) {
            if(error)   throw new Error("Error in insertOne");
            callback(result);
        })
    });
};

DataProvider.prototype.addProfessionalsDetails = function(data, callback) {//job
    this.getCollection('professionals_job_application', function(error, proCollection) {
        if(error)   throw new Error("Professional collection link error")
        proCollection.insertOne(data, function(error, result) {
            if(error)   throw new Error("Register as professional insertion error")
            callback(error, {
                status: "SUCCESS"
            })
        })
    })
}

DataProvider.prototype.addUsers = function(data) {
    this.getCollection("customers", function(error, collection) {
        collection.insertOne(data);
    })
}

DataProvider.prototype.diconnectDB = function() {
    this.client.close();
    console.log("Disconnected database");
}

DataProvider.prototype.addAreas = function(cityname, data) {
    this.getCollection("cities", function(error, cities) {
        cities.updateOne({name: cityname}, {$set: {available_areas: data}})
    })
}

exports.DataProvider = DataProvider