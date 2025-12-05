/**********************\
| JavaScript for index |
| page by Andrew Yaros |
\**********************/

function isTouch() {
	if(navigator && typeof navigator.maxTouchPoints === "number") return navigator.maxTouchPoints > 1;
	else return 'ontouchstart' in window;
}

/* detect and adjust for mobile devices by testing whether there is a touchscreen */
if(isTouch()) {
	console.log("Adjusting style for touchscreen displays.")
	let mobileStyle = document.createElement("style");
	mobileStyle.innerText = `
		:root {
			--heightTransition: 0s;
		}
		.fixedBackground, body {
			background-attachment: scroll;
		}
		body {
			font-size: 14pt;
		}
		@media only screen and (orientation: portrait) {
			.moduleImage {
				height: 25vh;
			}
			.buttonContainer {
				flex-flow: column nowrap;
				align-items: stretch;
			}
		}
		`;
	document.head.appendChild(mobileStyle);
}

//disable right clicks
document.addEventListener('contextmenu', event => event.preventDefault());

/*
const slidesPath = "./data/images/slides/"
const slideFiles = [
	// "bshroom-l2.jpg",
	"lancaster.jpg",
	"shell.jpg",
	"stanford.jpg",
	"wefa.jpg",
	"gropius.jpg",
	"station.jpg",
	"RRatrium.jpg",
	'towers.jpg',
	'isp1 slide.jpg',
], n = slideFiles.length, images = [];
*/

/* Preload images */
/*
for(let i = 0; i < n; i++) {
	let img = new Image();
	img.src = slidesPath + slideFiles[i % n];
	images.push(img)
}
*/


//set copyright date
function setDate() {
	const startYear = 2013; //set starting year
	
	//construct date range text from initial year to current
	const dateRange = startYear + "–" + (new Date).getFullYear();
	
	//determine whether to print starting year or date range
	//print the range only if current year is after starting year
	let dateToPrint = String(startYear);
	if((new Date).getFullYear() > startYear) dateToPrint = dateRange;
	
	document.getElementById("copyrightYear").innerHTML = dateToPrint; //update document
}

//when window is finished loading
/*
function start() {
	setDate(); //set copyright date
}

window.addEventListener('load', start);
*/

//when email link is clicked
function sendEmail() {
	//subtract 1 from a character code to get the previous character
	function shiftDown(char) { return String.fromCharCode(char.charCodeAt(0) - 1); }
	
	//shift a whole word downwards
	function shiftWord(input) {
		let output = "";
		//shift each character in the word
		for(let i = 0; i < input.length; i++) output += (shiftDown(input[i]));
		return output;
	}
	
	let shifted = ["boesfx", "zbspt", "bf"];
	//go to mailto link
	window.location = "mailto:" + shiftWord(shifted[0]) + "@" + shiftWord(shifted[1]) + "." + shiftWord(shifted[2]);
}