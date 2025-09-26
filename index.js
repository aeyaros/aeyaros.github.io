/************************
 * JavaScript for index *
 * page by Andrew Yaros *
 ************************/

function isMobile() {
	return 'ontouchstart' in document.documentElement;
}

//disable right clicks
document.addEventListener('contextmenu', event => event.preventDefault());

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
];

slideFiles.sort(() => Math.random() - 0.5);

const n = slideFiles.length;
const slideInterval = 10000;

/* When the page is loaded: set the background image based on the current time */
const startingSlide = (Math.floor((new Date).getTime())) % n;

//counter variable starts at second image; we already displayed the first
let slideCounter = startingSlide + 1;
let innerTitleDivHidden = true; //inner title div starts out hidden

let images = []; //preload images
/* Start preloading at the starting slide; preload n images */
for(let i = startingSlide; i < startingSlide + n; i++) {
	let img = new Image();
	img.src = slidesPath + slideFiles[i % n];
	images.push(img)
}

//change the opacity of the inner div when transitioning to a slide.
function setInnerTitleDivOpacity(value) {
	let clamped = Math.max(0, Math.min(Number(value), 1));
	document.getElementById("titleBoxInner").style.opacity = String(clamped);
}

//change the background image path of an element
function changeSlide(elementID, path) {
	document.getElementById(elementID).style.backgroundImage = "url('" + path + "')";
}

//set the initial slide
function setInitialSlide() {
	/* detect and adjust for mobile devices by testing whether there is a touchscreen */
	if(isMobile()) {
		console.log("Detected mobile touch event. Adjusting styles.")
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
			} .buttonContainer {
				flex-flow: column nowrap;
				align-items: stretch;
			}
		}
		
		/* old button styles (refactored) */
		/*
		.coloredButton:hover, .coloredButton:active {
			color: var(--buttonText);
			background-color: var(--backgroundColor);
			box-shadow: 0 5px 20px var(--buttonShadow);
		}
		.footerButton:hover, .footerButton:active {
			color: var(--buttonText);
			background-color: var(--darkerColor);
			box-shadow: 0 2px 10px var(--buttonShadow);
		}
		.coloredButton:hover .thearrow, .coloredButton:active .thearrow {
			fill: var(--buttonText);
			stroke: var(--buttonText);
		}
		.footerButton:hover img,.footerButton:active img {
			filter: unset!important;
		}
		*/
		`;
		document.head.appendChild(mobileStyle);
	}
	
	//change background of the inner slide to the starting slide
	changeSlide("titleBox", slidesPath + slideFiles[startingSlide]);
}

//wait for a specified numebr of ms
async function wait(ms) { return new Promise(resolve => setTimeout(resolve, ms)) }

//increment to the next slide
async function incrementSlide() {
	//path of the image we are about to transition to
	let pathToUse = slidesPath + slideFiles[slideCounter % n];
	
	//if the INNER div is HIDDEN
	if(innerTitleDivHidden) {
		//change the INNER div background (so it is set before we transition to it)
		changeSlide("titleBoxInner", pathToUse);
		setInnerTitleDivOpacity(1.0) //set opacity of inner div to 1
		innerTitleDivHidden = false; //update state variable
	} else /* if the INNER div is VISIBLE */{
		//change the OUTER div background (so it is set before we transition to it)
		changeSlide("titleBox", pathToUse);
		setInnerTitleDivOpacity(0); //set opacity of the inner div to 0
		innerTitleDivHidden = true; //update state variable
	}
	slideCounter += 1; //increment counter
	
	
	await wait(slideInterval);
	incrementSlide();
}

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
function start() {
	//window.scrollTo(0, 0); //reset scroll position
	setDate(); //set copyright date
	incrementSlide(); //change the slide every few seconds
}

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