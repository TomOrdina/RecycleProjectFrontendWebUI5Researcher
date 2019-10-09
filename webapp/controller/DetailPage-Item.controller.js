sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.DetailPage-Item", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Item
		 */
		onInit: function () {
		var oModel3 = this.getOwnerComponent().getModel("modeltest");
		// var oModel3 = this.getOwnerComponent().getModel("modeltest");
		var oTable4 = this.getView().byId("specificItem");
		//var data = JSON.parse(oModel3.getJSON().TestData);
		//sap.ui.getCore().byId("t1").setText(data.toString());
		//console.log(data);
		oTable4.setModel(oModel3);
		var oModel4 = this.getOwnerComponent().getModel("modeltest");
		// var oModel3 = this.getOwnerComponent().getModel("modeltest");
		var oTable5 = this.getView().byId("specificItemDetail");
		//var data = JSON.parse(oModel3.getJSON().TestData);
		//sap.ui.getCore().byId("t1").setText(data.toString());
		//console.log(data);
		oTable5.setModel(oModel4);
		}

		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Item
		 */
		//	onBeforeRendering: function() {
		//
		//	},

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