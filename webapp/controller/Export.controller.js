sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/core/util/Export",
	"sap/ui/core/util/ExportTypeCSV"
], function (Controller, Export, ExportTypeCSV) {
	"use strict";

	return Controller.extend("ResearcherApp.RecycleFrontEndResearcherApp.controller.Export", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf ResearcherApp.RecycleFrontEndResearcherApp.view.Export
		 */
		onInit: function () {
			var oModel = new sap.ui.model.json.JSONModel("model/data.json");
			sap.ui.getCore().setModel(oModel, "oModel");
		},

		onDataExport: sap.m.Table.prototype.exportData || function() {

			var oModel = sap.ui.getCore().getModel("oModel");
			var oExport = new Export({

				exportType: new ExportTypeCSV({
					fileExtension: "csv",
					separatorChar: ";"
				}),
				models: oModel,

				rows: {
					path: "/items"
				},
				columns: [{
					name: "Recorded Time",
					template: {
						content: "{time}"
					}
				}, {
					name: "Item ID",
					template: {
						content: "{itemID}"
					}
				}, {
					name: "Item Status",
					template: {
						content: "{status}"
					}
				}]
			});
			
			oExport.saveFile().catch(function(oError) {
 
			}).then(function() {
				oExport.destroy();
			});
		}
	});

});