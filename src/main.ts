/// <reference types="@workadventure/iframe-api-typings" />

import { bootstrapExtra } from "@workadventure/scripting-api-extra";

console.log('Script started successfully!');

let currentPopup: any = undefined;


// Waiting for the API to be ready
WA.onInit().then(() => {
    console.log('Scripting API ready');
    console.log('Player tags: ',WA.player.tags)

	//Apotheke
	WA.room.area.onEnter('ApothekeRoom').subscribe(() => {
		WA.room.hideLayer("Apotheke_Roof");
			
		//Draw Tile in front of door to open it	
		WA.room.setTiles([		  
		  { x: 42, y: 23, tile: "Tile_Zone", layer: "Apotheke_OpenZone" }
		]);
	})  
		
	WA.room.area.onLeave('ApothekeRoom').subscribe(() => {
		WA.room.showLayer("Apotheke_Roof");
	}) 

	//Disco
	WA.room.area.onEnter('DiscoRoom').subscribe(() => {
		console.log('Hide Disco Roof');
		WA.room.hideLayer("Disco_Roof");
		
		//Draw Tile in front of door to open it	
		WA.room.setTiles([		  
		  { x: 42, y: 23, tile: "Tile_Zone", layer: "Apotheke_OpenZone" }
		]);

	})
	
	WA.room.area.onLeave('DiscoRoom').subscribe(() => {
		WA.room.showLayer("Disco_Roof");
	}) 
		
	//Fischladen
	WA.room.area.onEnter('FischladenRoom').subscribe(() => {
		console.log('Hide Fischladen Roof');
		WA.room.hideLayer("Fischladen_Roof");
	})
	
	WA.room.area.onLeave('FischladenRoom').subscribe(() => {
		WA.room.showLayer("Fischladen_Roof");
	}) 
	
	//Popup Feder
	WA.room.area.onEnter('feather').subscribe(() => {
        currentPopup = WA.ui.openPopup("Popup_feather","Du hast eine Feder gefunden...",[{
			label: "Next",
			className: "primary",
			callback: () => {
				// Close the popup when the "Close" button is pressed.
				closePopup();
				currentPopup = WA.ui.openPopup("Popup_feather","Du hast Deine eGK und Dein Smartphone verloren...",[{
					label: "Next",
					className: "primary",
					callback: () => {
						// Close the popup when the "Close" button is pressed.
						closePopup();
						currentPopup = WA.ui.openPopup("Popup_feather","Vielleicht kann Dir die Rezeption weiter helfen...",[{
							label: "Close",
							className: "primary",
							callback: () => {
								// Close the popup when the "Close" button is pressed.
								closePopup();
								
							}
						}]);						
					}
				}]);
			}
		}]);
    })
    WA.room.area.onLeave('feather').subscribe(closePopup)
	
	//Popup eGK
	WA.room.area.onEnter('erinnerung').subscribe(() => {
        currentPopup = WA.ui.openPopup("Popup_erinnerung","Wenn ich mich nur an gestern Nacht erinnern könnte...",[]);
    })
    WA.room.area.onLeave('erinnerung').subscribe(closePopup) 

	
	//Popup rezeption
	WA.room.area.onEnter('rezeption').subscribe(() => {		
        currentPopup = WA.ui.openPopup("Popup_rezeption","Hallo! wir haben Deine eGK und Dein Smartphone leider nicht bei Dir finden können...",[{
			label: "Next",
			className: "primary",
			callback: () => {
				// Close the popup when the "Close" button is pressed.
				closePopup();
				currentPopup = WA.ui.openPopup("Popup_rezeption","Anscheinend hast Du auch Deine analoge Patientenakte verloren...",[{
					label: "Next",
					className: "primary",
					callback: () => {
						// Close the popup when the "Close" button is pressed.
						closePopup();
						currentPopup = WA.ui.openPopup("Popup_rezeption","Wenn wir Deine analoge Patientenakte hätten, könnten wir Dir sagen, was gestern Abend passiert ist...",[{
							label: "Next",
							className: "primary",
							callback: () => {
								// Close the popup when the "Close" button is pressed.
								closePopup();
								currentPopup = WA.ui.openPopup("Popup_rezeption","Wir empfehlen die Nutzung der ePA, damit kannst Du deine Patientenakte digital einsehen...",[{
									label: "Next",
									className: "primary",
									callback: () => {
										// Close the popup when the "Close" button is pressed.
										closePopup();
										currentPopup = WA.ui.openPopup("Popup_rezeption","Dafür benötigst Du aber die drei verloren Komponenten...",[{
											label: "Close",
											className: "primary",
											callback: () => {
												// Close the popup when the "Close" button is pressed.
												closePopup();
												
											}
										}]);
										
									}
								}]);
								
							}
						}]);						
					}
				}]);
			}
		}]);
    })
    WA.room.area.onLeave('rezeption').subscribe(closePopup)
	
	
	
	//Popup Apotheke
	WA.room.area.onEnter('apotheke').subscribe(() => {
        currentPopup = WA.ui.openPopup("Popup_Apotheke","Jeder weiss, dass man die Schätze vom ePAirat mit LostMyPass knacken kann...",[]);
    })
    WA.room.area.onLeave('apotheke').subscribe(closePopup)
	
	//Popup dj
	WA.room.area.onEnter('dj').subscribe(() => {
        currentPopup = WA.ui.openPopup("Popup_dj","64 79 115 105 110 116 115 66 97 114",[]);
    })
    WA.room.area.onLeave('dj').subscribe(closePopup)

	//Popup Matrose
	WA.room.area.onEnter('matrose').subscribe(() => {
        currentPopup = WA.ui.openPopup("Popup_matrose","Hast Du eine Reservierungsnummer? Mir reicht auch unser E-Mail Absender...",[]);
    })
    WA.room.area.onLeave('matrose').subscribe(closePopup)


		
	 	

    // The line below bootstraps the Scripting API Extra library that adds a number of advanced properties/features to WorkAdventure
    bootstrapExtra().then(() => {
        console.log('Scripting API Extra ready');
    }).catch(e => console.error(e));

}).catch(e => console.error(e));

function closePopup(){
    if (currentPopup !== undefined) {
        currentPopup.close();
        currentPopup = undefined;
    }
}

export {};



