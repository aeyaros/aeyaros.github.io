/************************
 * JavaScript for index *
 * page by Andrew Yaros *
 ************************/

const slidesPath = "./data/images/slides/"
const slideFiles = [
	"bshroom-l2.jpg",
	"lancaster.jpg",
	"shell.jpg",
	"stanford.jpg",
	"wefa.jpg",
	"gropius.jpg",
	"barnes.jpg"
];
const n = slideFiles.length;
const slideInterval = 3000;

/* When the page is loaded: set the background image based on the current time */
const startingSlide = (Math.floor((new Date).getTime())) % n;

//preload images
var images = [];
/* Start preloading at the starting slide
Preload n images */
for(let i = startingSlide; i < startingSlide + n; i++) {
	let img = new Image();
	img.src = slidesPath + slideFiles[i % n];
	images.push(img)
}

//counter variable starts at the second image; we already displayed the first
var slideCounter = startingSlide + 1;

function changeSlide(path) {
	document.getElementById("titleBox").style.backgroundImage = "url('" + path + "')";
}

//set the initial slide
function setInitialSlide() {
	changeSlide(slidesPath + slideFiles[startingSlide]);
}

//increment to the next slide
function incrementSlide() {
	changeSlide(slidesPath + slideFiles[slideCounter % n]);
	slideCounter += 1;
}

//set copyright date
function setDate() {
	//set starting year
	const startYear = 2020;

	//construct date range text from initial year to current
	const dateRange = startYear + "&nbsp;-&nbsp;" + (new Date).getFullYear();

	//determine whether to print starting year or date range
	//print the range only if current year is after starting year
	let dateToPrint = String(startYear);
	if ((new Date).getFullYear() > startYear) dateToPrint = dateRange;

	//update document
	document.getElementById("copyrightYear").innerHTML = dateToPrint;
}

function isMobile() {
	return 'ontouchstart' in document.documentElement;
}

//when window is finished loading
function start() {
	window.scrollTo(0, 0); //set scroll position
	setDate(); //set copyright date

	/* detect and adjust for mobile devices by testing whether there is a touchscreen */
	if(isMobile()) {
		console.log("Detected mobile touch event. Adjusting styles.")
		let mobileStyle = document.createElement("style");
		mobileStyle.innerText = "/*Mobile styles:\n*/"
			+ ".fixedBackground { background-attachment: scroll; }"
			+ ".buttonContainer { flex-flow: column nowrap; align-items: stretch; }"
			+ "body { font-size: 14pt; }"
			+ "/*body { background-color: green; } */"
			+ "@media only screen and (orientation: portrait) { .moduleImage { height: 25vh; } }"
			+ ".linkbutton:hover, .linkbutton:active { color:inherit; background-color: inherit; box-shadow: inherit; } "
		;
		document.head.appendChild(mobileStyle);
	}

	//change the slide every few seconds
	setInterval(incrementSlide, slideInterval);
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