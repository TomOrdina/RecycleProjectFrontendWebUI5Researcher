sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent",
	"sap/ui/core/routing/History"
], function (Controller, UIComponent, History) {
	"use strict";
	
	var assets, assetsSlicedLength;
	var clicks = 1;

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Overview", {
		
		onNext: function(oEvt) {
			var that = this;
			
			if (clicks >= 0 && clicks < assetsSlicedLength) {
				// Create JSON model
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(assets.slice(clicks * 100, (clicks + 1) * 100));
				
				// Set new model at table from the view
				var oTable = that.getView().byId("overviewTable");
				oTable.setModel(oModel);
				
				// Enable 'previous' pagination button
				that.getView().byId("previousButton").setEnabled(true);
				
				// Set pagination info
				if ((clicks + 1) >= assetsSlicedLength) {
					that.getView().byId("paginationInfo").setText(((clicks * 100) + 1) + "-" + assets.length+ " / " + assets.length);
				}
				else {
					that.getView().byId("paginationInfo").setText(((clicks * 100) + 1) + "-" + ((clicks + 1) * 100) + " / " + assets.length);
					
					// Increment clicks as the 'next' pagination button has been clicked on
					clicks += 1;
				}
			}
			
			if (clicks >= assetsSlicedLength) {
				// Disable 'next' pagination  button
				oEvt.getSource().setEnabled(false);
			}
		},
		
		onPrevious: function(oEvt) {
			var that = this;
			
			if (clicks > 0) {
				// Create JSON model
				var oModel = new sap.ui.model.json.JSONModel();
				oModel.setData(assets.slice((clicks -  2) * 100, (clicks - 1) * 100));
				
				// Set new model at table from the view
				var oTable = that.getView().byId("overviewTable");
				oTable.setModel(oModel);
				
				// Enable 'next' pagination button
				that.getView().byId("nextButton").setEnabled(true);
				
				// Set pagination info
				that.getView().byId("paginationInfo").setText((((clicks - 2) * 100) + 1) + "-" + ((clicks - 1) * 100) + " / " + assets.length);
					
				// Decrement clicks as the 'previous' pagination button has been clicked on
				clicks -= 1;
			}
			
			if (clicks <= 1)
			{
				// Disable 'previous' pagination button
				oEvt.getSource().setEnabled(false);
			}
		},
		
		onSearch: function(evt) {
			var that = this;
			var value = evt.getSource().getValue();
			
			if (value && assets)
			{
				// Filter the assets based on the given searchfield value
				var assetsResult = assets.find(x => x.physicalId == value);
				
				// Create JSON model
				var oModel = new sap.ui.model.json.JSONModel();
				
				// If the result from filtering is array => set data directly in the model, 
				// otherwise set JSON result in array first
				if(Array.isArray(assetsResult)) 
				{
					oModel.setData(assetsResult);
					
					// Set model size to lenght of the given data as m.Table default only supports 100 rows
					oModel.setSizeLimit(assetsResult.length);
				} 
				else 
				{
					var arrayResult = [];
					arrayResult.push(assetsResult);
					oModel.setData(arrayResult);
				}
				
				// Set new model at table from the view
				var oTable = that.getView().byId("overviewTable");
				oTable.setModel(oModel);
			} 
			else 
			{
				sap.m.MessageToast.show("Please set a filter");
			}
		},
		
		onInit: function () {
			var that = this;
			var weburl = "https://eks.ordina-jworks.io/zpr-bff/assets";
			
			$.ajax({
				url: weburl,
				type: "GET",
				dataType: "json",
				success: function(dataj){
					// oModel.setData({ "item": {"correlationAssetId" : dataj.id }}, true);
					// // Navigates to the succes page
					// oRouter.navTo("Succes");
					
					// var oModel2 = new sap.ui.model.json.JSONModel();
					// oModel2.loadData("model/data2.json")
					// console.log(oModel2);
					
					// console.log("stringify ajax object:");
					// var test = JSON.stringify(dataj);
					// console.log(test);
					
					// console.log("parse stringified ajax object:");
					// var test1 = JSON.parse(test);
					// console.log(test1);
					
					// console.log("add new word to stringified ajax object");
					// var test4 = '{ "Item" :' + test + '}';
					// console.log(test4);
					
					// console.log("parse stringified ajax object");
					// var test5 = JSON.parse(test4);
					// console.log(test5);
					
					// console.log("extra test: ");
					// var test6 = JSON.parse('{	"Item": [{		"correlationAssetId": "ded5833c-947c-48a3-920f-88a8c6743a29",		"active": true,		"type": {			"Type_name": "sensor",			"ColorCode": "new",			"batteryLevel": 15,			"wakeUpTime": 15000,			"hibernate": false		},		"status": "UNCONNECTED",		"locations": [{			"id": "ef979d1c-3547-442f-aafc-daf04d5a5b47",			"latitude": 1.23,			"longitude": 4.57,			"timestamp": "2019-10-11T01:59:00Z"		}],		"FirstWaterEntered": "2019-02-15T10:30:00Z"	}]}');
					// console.log(test6);
					// //'{ "Item" :[{"id":"81053c82-449a-4627-9c10-d13697d502cf","physicalId":"R-001-II","active":null,"type":"UNCONNECTED"},{"id":"72941f30-fcd0-4fb7-8582-703c8f66d487","physicalId":"R-001-III","active":null,"type":"UNCONNECTED"},{"id":"a57c8c1b-2de9-4d9b-9893-108615022293","physicalId":"R-002-I","active":null,"type":"UNCONNECTED"},{"id":"8ad4a1b0-e952-408d-80c9-488f9224aa87","physicalId":"R-002-II","active":null,"type":"UNCONNECTED"},{"id":"6a768ee3-bd9a-4d87-a4af-5801ff5cd9f8","physicalId":"R-002-III","active":null,"type":"UNCONNECTED"},{"id":"06110b28-76e1-4a41-adfb-6ba0085ef064","physicalId":"R-003-I","active":null,"type":"UNCONNECTED"},{"id":"a444f1b2-7b17-47ea-bab0-f8e1e4f3e39f","physicalId":"R-003-II","active":null,"type":"UNCONNECTED"},{"id":"0269f806-a731-423e-86ef-12a1babf1125","physicalId":"R-003-III","active":null,"type":"UNCONNECTED"}'));
					
					// console.log("stringify local json object");
					// var test2 = JSON.stringify("model/data2.json");
					// console.log(test2);
					
					// Declare global variables
					assets = dataj;
					assetsSlicedLength = Math.ceil(dataj.length / 100);
					
					// Create JSON model and set data
					var oModel = new sap.ui.model.json.JSONModel();
					//oModel.loadData(test6);
					oModel.setData(dataj);
					
					// Set model size to lenght of the given data as m.Table default only supports 100 rows
					//oModel.setSizeLimit(dataj.length);
					
					// Set new model at table from the view
					var oTable = that.getView().byId("overviewTable");
					oTable.setModel(oModel);
					
					// Disable previous pagination button
					that.getView().byId("previousButton").setEnabled(false);
					
					// Disable next pagination button if there are less than 100 records
					if (assetsSlicedLength <= 1) {
						that.getView().byId("nextButton").setEnabled(false);
						
						// Set pagination info (< 100 records)
						that.getView().byId("paginationInfo").setText((((clicks - 1) * 100) + 1) + "-" + assets.length + " / " + assets.length);
					}
					else {
						// Set pagination info (> 100 records)
						that.getView().byId("paginationInfo").setText((((clicks - 1) * 100) + 1) + "-" + (clicks * 100) + " / " + assets.length);
					}
				},
				error: function(){
					// Error handling
				}
			});
		},
		
		onItemPress: function (event) {
			// var oModel = event.getParameters().listItem;
			//sap.ui.core().setMo	
				
			// Navigate to detail page
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteDetailItem");
			
			// //Dit is de data gehaald uit een individueel item waar is op geklikt
			// //Deze wordt dan geplaatst in een ander model om vanuit dit model op een andere pagina de data terug uit te halen
			// var correlationAssetIdProperty = event.getParameters().listItem.mAggregations.cells[1].mProperties;
			// var correlationAssetId = correlationAssetIdProperty.text;
			
			// var activeproperty = event.getParameters().listItem.mAggregations.cells[3].mProperties;
			// var active = activeproperty.text;
			
			// var statusproperty = event.getParameters().listItem.mAggregations.cells[2].mProperties;
			// var status = statusproperty.text;
			
			// var typeNameProperty = event.getParameters().listItem.mAggregations.cells[4].mProperties;
			// var typeName = typeNameProperty.text;
			
			// var FistWaterEnteredproperty = event.getParameters().listItem.mAggregations.cells[5].mProperties;
			// var FistWaterEntered = FistWaterEnteredproperty.text;
			
			// var physicalIdproperty = event.getParameters().listItem.mAggregations.cells[11].mProperties;
			// var physicalId = physicalIdproperty.text;
			
			// var latitudeproperty = event.getParameters().listItem.mAggregations.cells[7].mProperties;
			// var latitude = latitudeproperty.text;
			
			// var longitudeproperty = event.getParameters().listItem.mAggregations.cells[6].mProperties;
			// var longitude = longitudeproperty.text;
			
			// var timestampproperty = event.getParameters().listItem.mAggregations.cells[0].mProperties;
			// var timestamp = timestampproperty.text;
			// //Hierbij wordt de datum geherformatteerd zodat deze op de manier van de wireframes kan worden afgebeeld in de detail page
			// //var year = timestamp.substring(0,4);
			// var month = timestamp.substring(7,5);
			// var day = timestamp.substring(10,8);
			// var hour = timestamp.substring(13,11);
			// var minutes = timestamp.substring(16,14);
			// var time = hour+":"+minutes+"h "+day+"/"+month;
			// //Hierbij wordt er gechecked of het item een sensor is, indien dit zo is gaat hij naar de sensor functie anders doet hij de else code
			// if(typeName == "sensor"){
			// 	this.sensor(event,latitude,longitude,time);
			// }else{
			// var oModel2 = this.getView().getModel("modeltest");
			// //Hierbij steekt hij de bovenstaande data van het individueel item in een ander model
			// oModel2.setData({
			// 	"Item": [{
			// 		"correlationAssetId": correlationAssetId,
			// 		"active": active,
			// 		"type": {
			// 			"Type_name": typeName,
			// 			"ColorCode": "",
			// 			"physicalId": physicalId,
			// 			"batteryLevel": "",
			// 			"wakeUpTime": "",
			// 			"hibernate": ""
			// 		},
			// 		"status": status,
			// 		"locations": [{
			// 			"id": "",
			// 			"latitude": latitude,
			// 			"longitude": longitude,
			// 			"timestamp": time
			// 		}],
			// 		"FirstWaterEntered": FistWaterEntered
			// 	}],
			// 	"User": [{
			// 		"UID": "",
			// 		"Gebruikersnaam": "",
			// 		"Wachtwoord": "",
			// 		"Achternaam": "",
			// 		"Voornaam": "",
			// 		"Export": "",
			// 		"Role": ""
			// 	}]
			// }, true);
			// sap.ui.getCore().setModel(oModel2);
			// }
		},
		
		// sensor: function (event,latitude,longitude,timestamp) {
		// 	//sensor
		// 	//Dit is de data gehaald uit een individueel item waar is op geklikt
		// 	//Deze wordt dan geplaatst in een ander model om vanuit dit model op een andere pagina de data terug uit te halen
		// 	var batteryLevelproperty = event.getParameters().listItem.mAggregations.cells[8].mProperties;
		// 	var batteryLevel = batteryLevelproperty.text;
		// 	var wakeupTimeproperty = event.getParameters().listItem.mAggregations.cells[9].mProperties;
		// 	var wakeupTime = wakeupTimeproperty.text;
		// 	var hibernateproperty = event.getParameters().listItem.mAggregations.cells[10].mProperties;
		// 	var hibernate = hibernateproperty.text;
		// 	var oModel2 = this.getView().getModel("modeltest");
		// 	//Hierbij steekt hij de bovenstaande data van het individueel item in een ander model
		// 	oModel2.setData({
		// 		"Item": [{
		// 			"correlationAssetId": "",
		// 			"active": "",
		// 			"type": {
		// 				"Type_name": "",
		// 				"ColorCode": "",
		// 				"batteryLevel": batteryLevel,
		// 				"wakeUpTime": wakeupTime,
		// 				"hibernate": hibernate
		// 			},
		// 			"status": "",
		// 			"locations": [{
		// 				"id": "",
		// 				"latitude": latitude,
		// 				"longitude": longitude,
		// 				"timestamp": timestamp
		// 			}],
		// 			"FirstWaterEntered": ""
		// 		}],
		// 		"User": [{
		// 			"UID": "",
		// 			"Gebruikersnaam": "",
		// 			"Wachtwoord": "",
		// 			"Achternaam": "",
		// 			"Voornaam": "",
		// 			"Export": "",
		// 			"Role": ""
		// 		}]
		// 	}, true);
		// 	sap.ui.getCore().setModel(oModel2);
			
		// 	var oRouter = UIComponent.getRouterFor(this);
		// 	oRouter.navTo("RouteDetailSensor");
		// },
			
		// userEventPress: function (event) {
		// 	//sensor

		// 	var UIDproperty = event.getParameters().listItem.mAggregations.cells[0].mProperties;
		// 	var UID = UIDproperty.text;
		// 	console.log(UID);
		// 	var Gebruikersnaamproperty = event.getParameters().listItem.mAggregations.cells[1].mProperties;
		// 	var Gebruikersnaam = Gebruikersnaamproperty.text;
		// 	console.log(Gebruikersnaam);
		// 	var Wachtwoordproperty = event.getParameters().listItem.mAggregations.cells[2].mProperties;
		// 	var Wachtwoord = Wachtwoordproperty.text;
		// 	console.log(Wachtwoord);
		// 	var Achternaamproperty = event.getParameters().listItem.mAggregations.cells[3].mProperties;
		// 	var Achternaam = Achternaamproperty.text;
		// 	console.log(Achternaam);
		// 	var Voornaamproperty = event.getParameters().listItem.mAggregations.cells[4].mProperties;
		// 	var Voornaam = Voornaamproperty.text;
		// 	console.log(Voornaam);
		// 	var Exportproperty = event.getParameters().listItem.mAggregations.cells[5].mProperties;
		// 	var Export = Exportproperty.text;
		// 	console.log(Export);
		// 	var Roleproperty = event.getParameters().listItem.mAggregations.cells[6].mProperties;
		// 	var Role = Roleproperty.text;
		// 	console.log(Role);

		// 	//get model from data.json file
			
		// 	var oModel2 = this.getView().getModel("modeltest");
		// 	// Assign the model object to the SAPUI5 core
		// 	oModel2.setData({
		// 		"Item": [{
		// 			"correlationAssetId": "",
		// 			"active": "",
		// 			"type": {
		// 				"Type_name": "",
		// 				"ColorCode": "",
		// 				"batteryLevel": "",
		// 				"wakeUpTime": "",
		// 				"hibernate": ""
		// 			},
		// 			"status": "",
		// 			"locations": [{
		// 				"id": "",
		// 				"latitude": "",
		// 				"longitude": "",
		// 				"timestamp": ""
		// 			}],
		// 			"FirstWaterEntered": ""
		// 		}],
		// 		"User": [{
		// 			"UID": UID,
		// 			"Gebruikersnaam": Gebruikersnaam,
		// 			"Wachtwoord": Wachtwoord,
		// 			"Achternaam": Achternaam,
		// 			"Voornaam": Voornaam,
		// 			"Export": Export,
		// 			"Role": Role
		// 		}]
		// 	}, true);
			
		// 	sap.ui.getCore().setModel(oModel2);
		// 	var oRouter = UIComponent.getRouterFor(this);
		// 	oRouter.navTo("RouteSecond");
		// },
		onAfterRendering: function () {
			// var that = this;
			
			//get model from data.json file
			
			
			//var oModel = that.getView().getModel("data");
			
			
			//var localModel = JSON.parse(oModel.getJSON());
			//console.log(localModel);
			
			
			//that.getView().setModel(oModel);
			
			
			//var loModel = JSON.parse(oModel);
			//console.log(loModel);
//<<<<<<< HEAD
			// var datum = "teststring";
			// var text = new sap.m.Text("test");
			// text.setText(datum);
//=======
			//var datum = "teststring";
			//var text = new sap.m.Text("test");
			//text.setText(datum);
			
			// var test = sap.ui.getCore().getElementById("scrollBarOverview");
			// var test2 = that.getView().byId("scrollBarOverview").getDomRef();
			// var test3 = that.getView().byId("scrollBarOverview"); //.getDomRef();
			
			// test2.classList.add("noScrollBarWebkit");
			// test2.className += "noScrollBarWebkit";
//>>>>>>> refs/heads/applic
		}
	});
});