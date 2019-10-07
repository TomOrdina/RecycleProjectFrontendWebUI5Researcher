sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/UIComponent"
], function (Controller, UIComponent) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Release", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.Release
		 */
		onInit: function () {

		},
		onBeforeRendering: function () {
			// ajax calls to be implemented when backend is ready => push into data.json / batchs
			var oItemSelectTemplate = new sap.ui.core.Item({
	            key : "{batchId}",
	            text : "{batchName}"
        	});
			var oModel = this.getView().getModel("data");
			this.getView().setModel(oModel);
			var mySelectMenu = this.byId("mySelect");
			mySelectMenu.bindAggregation("items","/batches", oItemSelectTemplate);
		},
		onPressRelease: function () {
			//gets selected batch ID
			// var selected = this.getView().byId("mySelect").getSelectedKey();
			// // console.log(selected);
			// var oRouter = UIComponent.getRouterFor(this);
			// oRouter.navTo("RouteItemRelease");
		}

	});

});