sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Overview", {

		onInit: function () {
				var oTable = this.getView().byId("testtabel");
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.loadData("model/data2.json");
			oTable.setModel(oModel);
		}, 
		generalData: function (event) {
			//general data 
			//console.log(event.getParameters().listItem.mAggregations)
			var correlationAssetIdProperty = event.getParameters().listItem.mAggregations.cells[1].mProperties;
			var correlationAssetId = correlationAssetIdProperty.text;
			// console.log(correlationAssetId);
			var activeproperty = event.getParameters().listItem.mAggregations.cells[3].mProperties;
			var active = activeproperty.text;
			// console.log(active);
			var statusproperty = event.getParameters().listItem.mAggregations.cells[2].mProperties;
			var status = statusproperty.text;
			// console.log(status);
			var typeNameProperty = event.getParameters().listItem.mAggregations.cells[4].mProperties;
			var typeName = typeNameProperty.text;
			// console.log(Type_name);
			var FistWaterEnteredproperty = event.getParameters().listItem.mAggregations.cells[5].mProperties;
			var FistWaterEntered = FistWaterEnteredproperty.text;
			// console.log(FistWaterEntered);
			var physicalIdproperty = event.getParameters().listItem.mAggregations.cells[11].mProperties;
			var physicalId = physicalIdproperty.text;
			// console.log(physicalId);
			var latitudeproperty = event.getParameters().listItem.mAggregations.cells[7].mProperties;
			var latitude = latitudeproperty.text;
			// console.log(latitude);
			var longitudeproperty = event.getParameters().listItem.mAggregations.cells[6].mProperties;
			var longitude = longitudeproperty.text;
			// console.log(longitude);
			var timestampproperty = event.getParameters().listItem.mAggregations.cells[0].mProperties;
			var timestamp = timestampproperty.text;
			//var year = timestamp.substring(0,4);
			var month = timestamp.substring(7,5);
			var day = timestamp.substring(10,8);
			var hour = timestamp.substring(13,11);
			var minutes = timestamp.substring(16,14);
			var time = hour+":"+minutes+"h "+day+"/"+month;
			//get model from data.json file
			if(typeName == "sensor"){
				this.sensor(event,latitude,longitude,time);
			}else{
			var oModel2 = this.getView().getModel("modeltest");
			// Assign the model object to the SAPUI5 core
			oModel2.setData({
				"Item": [{
					"correlationAssetId": correlationAssetId,
					"active": active,
					"type": {
						"Type_name": typeName,
						"ColorCode": "",
						"physicalId": physicalId,
						"batteryLevel": "",
						"wakeUpTime": "",
						"hibernate": ""
					},
					"status": status,
					"locations": [{
						"id": "",
						"latitude": latitude,
						"longitude": longitude,
						"timestamp": time
					}],
					"FirstWaterEntered": FistWaterEntered
				}],
				"User": [{
					"UID": "",
					"Gebruikersnaam": "",
					"Wachtwoord": "",
					"Achternaam": "",
					"Voornaam": "",
					"Export": "",
					"Role": ""
				}]
			}, true);

			sap.ui.getCore().setModel(oModel2);
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteDetailItem");
			}
		},
		sensor: function (event,latitude,longitude,timestamp) {
			//sensor
			var batteryLevelproperty = event.getParameters().listItem.mAggregations.cells[8].mProperties;
			var batteryLevel = batteryLevelproperty.text;
			// console.log(batteryLevel);
			var wakeupTimeproperty = event.getParameters().listItem.mAggregations.cells[9].mProperties;
			var wakeupTime = wakeupTimeproperty.text;
			// console.log(wakeupTime);
			var hibernateproperty = event.getParameters().listItem.mAggregations.cells[10].mProperties;
			var hibernate = hibernateproperty.text;
			// console.log(hibernate);
			//get model from data.json file
			var oModel2 = this.getView().getModel("modeltest");
			// Assign the model object to the SAPUI5 core
			oModel2.setData({
				"Item": [{
					"correlationAssetId": "",
					"active": "",
					"type": {
						"Type_name": "",
						"ColorCode": "",
						"batteryLevel": batteryLevel,
						"wakeUpTime": wakeupTime,
						"hibernate": hibernate
					},
					"status": "",
					"locations": [{
						"id": "",
						"latitude": latitude,
						"longitude": longitude,
						"timestamp": timestamp
					}],
					"FirstWaterEntered": ""
				}],
				"User": [{
					"UID": "",
					"Gebruikersnaam": "",
					"Wachtwoord": "",
					"Achternaam": "",
					"Voornaam": "",
					"Export": "",
					"Role": ""
				}]
			}, true);
			sap.ui.getCore().setModel(oModel2);
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteDetailSensor");

		},
			
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
			//get model from data.json file
			var oModel = this.getView().getModel("data");
			//var localModel = JSON.parse(oModel.getJSON());
			//console.log(localModel);
			this.getView().setModel(oModel);
			//var loModel = JSON.parse(oModel);
			//console.log(loModel);
			// var datum = "teststring";
			// var text = new sap.m.Text("test");
			// text.setText(datum);
		}
	});
});