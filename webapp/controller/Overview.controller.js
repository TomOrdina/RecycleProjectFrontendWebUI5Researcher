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
				}
				
				// Increment clicks as the 'next' pagination button has been clicked on
				clicks += 1;
			}
			
			if (clicks >= (assetsSlicedLength)) {
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
			
			var correlationAssetId = event.getParameters().listItem.mAggregations.cells[0].mProperties;
			var oModel = new sap.ui.model.json.JSONModel();
			oModel.setData({'correlationAssetId' : correlationAssetId}, true);
			
			sap.ui.getCore().setModel(oModel, "correlelationAssetId");
			
			// Navigate to detail page
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteDetailItem");
		},
		
		onAfterRendering: function () {
			
		}
	});
});