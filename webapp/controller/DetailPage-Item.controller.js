sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";
	
	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.DetailPage-Item", {
		
		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Item
		 */
		onInit: function () {
			// Bind a function to this view so this will be called upon every time we route to this view
			this._oRouter = this.getOwnerComponent().getRouter();
			this._oRouter.getRoute("RouteDetailItem").attachMatched(this.initialize, this);
		},
		
		initialize: function() {
			var that = this;
			
			// Get selected correlationAssetId from the model
			var oItem = sap.ui.getCore().getModel("correlelationAssetId");
			var correlationAssetId = JSON.parse(oItem.getJSON()).correlationAssetId.text;
			
			// Set weburl
			var weburl = "https://eks.ordina-jworks.io/zpr-bff/assets/" + correlationAssetId;
			
			$.ajax({
				url: weburl,
				type: "GET",
				dataType: "json",
				success: function(dataj){
					var activeJourneyLocations = [];
					
					// Set physicalID as title of the page
					that.getView().byId("pageTitle").setTitle("ID: " + dataj.physicalId);
					
					dataj.assetJourneys.forEach(function(journey){
						if (journey.isTravelling)
						{
							// Show entered time and date of the object 
							if (journey.locations[0].timestamp) {
								var timestamp = journey.locations[0].timestamp.split("T");
								var date = timestamp[0].substring(0, timestamp[0].length - 1);
								var time = timestamp[1].substring(0, timestamp[1].length - 1);
								
								that.getView().byId("labelTitle").setText("Entered the water on " + date + " at " + time);
							}
							
							journey.locations.forEach(function(location) {
								// Convert coordinates to dms
								var dms = that.convertDMS(location.latitude, location.longitude);
								
								var timestamp = journey.locations[0].timestamp.split("T");
								var aDate = timestamp[0].substring(0, timestamp[0].length - 1).split("-");
								var aTime = timestamp[1].substring(0, timestamp[1].length - 1).split(":");
								var convertedTimestamp = (aTime[1] + ":" + aTime[2] + " " + aDate[2] + "/" + aDate[1]);
								
								activeJourneyLocations.push({ "dms" : dms, "timestamp" : convertedTimestamp});
							});
						}
					});
					
					// Create JSON model and set data
					var oModel = new sap.ui.model.json.JSONModel();
					oModel.setData(activeJourneyLocations);
					
					// Set new model at table from the view
					var oTable = that.getView().byId("itemTable");
					oTable.setModel(oModel);
				},
				error: function(){
					// Error handling
				}
			});
		},
		
		onNavBack: function () {
			var oHistory = History.getInstance();
			var sPreviousHash = oHistory.getPreviousHash();
			
			if (sPreviousHash !== undefined) {
				window.history.go(-1);
			} else {
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("RouteOverview", true);
			}
			
			//location.reload();
		},
		
		convertDMS: function (lat, lng) {
			var latitude = this.toDegreesMinutesAndSeconds(lat);
			var latitudeCardinal = lat >= 0 ? "N" : "S";
			
			var longitude = this.toDegreesMinutesAndSeconds(lng);
			var longitudeCardinal = lng >= 0 ? "E" : "W";
			
			return latitude + latitudeCardinal + " " + longitude + longitudeCardinal;
		},
		
		toDegreesMinutesAndSeconds: function (coordinate) {
			var absolute = Math.abs(coordinate);
			var degrees = Math.floor(absolute);
			var minutesNotTruncated = (absolute - degrees) * 60;
			var minutes = Math.floor(minutesNotTruncated);
			var seconds = Math.floor((minutesNotTruncated - minutes) * 60);
			
			return degrees + "°" + minutes + "'" + seconds + '"' ;
		}
		
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Item
		 */
		// onBeforeRendering: function() {
		// 	this.initialize();
		// }
	
	
		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Item
		 */
		//	onAfterRendering: function() {
		//
		//	},
		
		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Item
		 */
		//	onExit: function() {
		//
		//	}
	});
});