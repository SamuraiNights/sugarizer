

define(["sugar-web/activity/activity","sugar-web/datastore","tutorial"], function (activity, datastore, tutorial) {
	if (!Abcd) {
		Abcd = {};
	}
	Abcd.activity = activity;
	Abcd.datastore = datastore;
	app = null;

	// Manipulate the DOM only when it is ready.
	requirejs(['domReady!'], function (doc) {
		// Initialize the activity
		Abcd.activity.setup();

		// Create sound component
		Abcd.sound = new Abcd.Audio();
		Abcd.sound.renderInto(document.getElementById("header"));

		// Load Database
		Abcd.loadDatabase(function(err) {
			// Init localization 
			Abcd.initL10n();

			// Create and display first screen
			app = new Abcd.App().renderInto(document.getElementById("body"));

			// Load context
			Abcd.loadContext(function() {
				app.restartLastGame();
			});
		});

		// Stop sound at end of game to sanitize media environment, specifically on Android
		document.getElementById("stop-button").addEventListener('click', function (event) {
			Abcd.sound.pause();
		});
		var helpButton = document.getElementById("help-button");
		helpButton.addEventListener('click', function(e) {
			tutorial.setElement("activity", document.getElementById("activity-button"));
			tutorial.setElement("stop", document.getElementById("stop-button"));
			tutorial.setElement("undo", document.getElementById("undo-button"));
			tutorial.setElement("redo", document.getElementById("redo-button"));
			tutorial.setElement("node", nodetextButton);
			tutorial.setElement("link", linkButton);
			tutorial.setElement("remove", removeButton);
			tutorial.setElement("png", pngButton);
			tutorial.setElement("zoom", zoomButton);
			tutorial.setElement("textvalue", textValue);
			tutorial.setElement("bold", boldButton);
			tutorial.setElement("italic", italicButton);
			tutorial.setElement("foreground", foregroundButton);
			tutorial.setElement("background", backgroundButton);
			tutorial.setElement("font", fontButton);
			tutorial.setElement("fontminus", fontMinusButton);
			tutorial.setElement("fontplus", fontPlusButton);
			tutorial.setElement("board", document.getElementById('canvas'));
			if (cy) {
				var selected = lastSelected;
				if (!selected) {
					var nodes = cy.elements("node");
					if (nodes.length > 0) {
						selected = nodes[0];
						lastSelected = selected;
						selectNode(selected);
					}
				}
				if (selected) {
					showSubToolbar(selected);
				}
			}
			tutorial.start();
		});
	});

});
