sap.ui.define([
	"sap/ui/core/mvc/Controller"
], function (Controller) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Overview", {

		onInit: function () {
			
		}, 
		onAfterRendering: function () {
			//get model from data.json file
			var oModel = this.getView().getModel("data");
			//var localModel = JSON.parse(oModel.getJSON());
			//console.log(localModel);
			this.getView().setModel(oModel);
			//var loModel = JSON.parse(oModel);
			//console.log(loModel);
		}
	});
});