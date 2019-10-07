sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Profile", {
		onInit: function () {

		},
		onBeforeRendering: function () {
			var oModel = this.getView().getModel("data");
			this.getView().setModel(oModel);
		},
		onPress: function () {
			console.log("working");
		}
	});
});