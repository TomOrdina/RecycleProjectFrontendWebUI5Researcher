sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Footer", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.Footer
		 */
		onInit: function () {

		},
		
		onPressOverview: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Route");
		},
		
		onPressItems: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Route");
		},
		
		onPressAlerts  : function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Route");
		},
		
		onPressExport: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("Route");
		},
		
		onPressProfile: function () {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteProfile");
		}
	});

});