sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Login", {
		onInit: function () {

		},
		
		onLogin: function() {
			var oRouter = UIComponent.getRouterFor(this);
			oRouter.navTo("RouteProfile");
		}
	});
});