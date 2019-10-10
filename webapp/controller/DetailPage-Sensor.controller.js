sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/routing/History"
], function (Controller, History) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.DetailPage-Sensor", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Sensor
		 */
		onInit: function () {
			//Er wordt hier de data van het andere model in de tabel gezet om te kunnen laten zien in de view
			var oModel3 = this.getOwnerComponent().getModel("modeltest");
			var oTable4 = this.getView().byId("specificItem");
			oTable4.setModel(oModel3);
			
			//Er wordt hier de data van het andere model in de tabel gezet om te kunnen laten zien in de view
			var oModel4 = this.getOwnerComponent().getModel("modeltest");
			var oTable5 = this.getView().byId("specificItemDetail");
			oTable5.setModel(oModel4);
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
		}
		/**
		 * Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
		 * (NOT before the first rendering! onInit() is used for that one!).
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Sensor
		 */
		//	onBeforeRendering: function() {
		//
		//	},

		/**
		 * Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
		 * This hook is the same one that SAPUI5 controls get after being rendered.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Sensor
		 */
		//	onAfterRendering: function() {
		//
		//	},

		/**
		 * Called when the Controller is destroyed. Use this one to free resources and finalize activities.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.DetailPage-Sensor
		 */
		//	onExit: function() {
		//
		//	}

	});

});