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
	"bshroom-l2.jpg",
	"lancaster.jpg",
	"shell.jpg",
	"stanford.jpg",
	"wefa.jpg",
	"gropius.jpg",
	"station.jpg",
	"RRatrium.png"
];
const n = slideFiles.length;
const slideInterval = 3000;

/* When the page is loaded: set the background image based on the current time */
const startingSlide = (Math.floor((new Date).getTime())) % n;

//counter variable starts at the second image; we already displayed the first
var slideCounter = startingSlide + 1;

//inner title div starts out hidden
var innerTitleDivHidden = true;

//preload images
var images = [];
/* Start preloading at the starting slide
Preload n images */
for (let i = startingSlide; i < startingSlide + n; i++) {
	let img = new Image();
	img.src = slidesPath + slideFiles[i % n];
	images.push(img)
}

//change the opacity of the inner div when transitioning to a slide.
function setInnerTitleDivOpacity(value) {
	let corrected = Number(value);
	if (corrected < 0) corrected = 0;
	else if (corrected > 1) corrected = 1;
	document.getElementById("titleBoxInner").style.opacity = String(corrected);
}

//change the background image path of an element
function changeSlide(elementID, path) {
	document.getElementById(elementID).style.backgroundImage = "url('" + path + "')";
}

//set the initial slide
function setInitialSlide() {
	/* detect and adjust for mobile devices by testing whether there is a touchscreen */
	if (isMobile()) {
		console.log("Detected mobile touch event. Adjusting styles.")
		let mobileStyle = document.createElement("style");
		mobileStyle.innerText = `:root { --heightTransition: 1s; } .fixedBackground, body { background-attachment: scroll; } body { font-size: 14pt; } @media only screen and (orientation: portrait) { .moduleImage { height: 25vh; } .buttonContainer { flex-flow: column nowrap; align-items: stretch; } } .linkButton:hover, .linkButton:active { color: var(--buttonText); background-color: var(--backgroundColor); box-shadow: 0 5px 20px var(--buttonShadow); } .footerLink:hover, .footerLink:active { color: var(--buttonText); background-color: var(--darkerColor); box-shadow: 0 2px 10px var(--buttonShadow); } .linkButton:hover .thearrow, .linkButton:active .thearrow { fill: var(--buttonText); stroke: var(--buttonText); }`;
		document.head.appendChild(mobileStyle);
	}

	//change background of the inner slide to the starting slide
	changeSlide("titleBox", slidesPath + slideFiles[startingSlide]);
}

//increment to the next slide
function incrementSlide() {
	//path of the image we are about to transition to
	let pathToUse = slidesPath + slideFiles[slideCounter % n];

	//if the INNER div is HIDDEN
	if (innerTitleDivHidden) {
		//change the INNER div background (so it is set before we transition to it)
		changeSlide("titleBoxInner", pathToUse);

		//set opacity of inner div to 1
		setInnerTitleDivOpacity(1.0)

		//update state variable
		innerTitleDivHidden = false;
	} else /* if the INNER div is VISIBLE */{
		//change the OUTER div background (so it is set before we transition to it)
		changeSlide("titleBox", pathToUse);

		//set opacity of the inner div to 0
		setInnerTitleDivOpacity(0);

		//update state variable
		innerTitleDivHidden = true;
	}

	//increment counter
	slideCounter += 1;
}

//set copyright date
function setDate() {
	//set starting year
	const startYear = 2013;

	//construct date range text from initial year to current
	const dateRange = "&nbsp;" + startYear + "&nbsp;-&nbsp;" + (new Date).getFullYear();

	//determine whether to print starting year or date range
	//print the range only if current year is after starting year
	let dateToPrint = String(startYear);
	if ((new Date).getFullYear() > startYear) dateToPrint = dateRange;

	//update document
	document.getElementById("copyrightYear").innerHTML = dateToPrint;
}

//when window is finished loading
function start() {
	//window.scrollTo(0, 0); //reset scroll position
	setDate(); //set copyright date

	//change the slide every few seconds
	setInterval(incrementSlide, slideInterval);
}

//when email link is clicked
function sendEmail() {
	//subtract 1 from a character code to get the previous character
	function shiftDown(char) {
		return String.fromCharCode(char.charCodeAt(0) - 1);
	}

	//shift a whole word downwards
	function shiftWord(input) {
		let output = "";
		//shift each character in the word
		for (let i = 0; i < input.length; i++) output += (shiftDown(input[i]));
		return output;
	}

	let shifted = ["boesfx", "zbspt", "bf"];
	//go to mailto link
	window.location = "mailto:" + shiftWord(shifted[0]) + "@" + shiftWord(shifted[1]) + "." + shiftWord(shifted[2]);
}

//change button color as scroll position changes
//use event listener to detect change in scroll position
//change css variable to a color with hue determined by (scrollpos * factor ) % 360
document.addEventListener("scroll", function () {
	let hueScaleFactor = 10;
	let hue = (window.scrollY / hueScaleFactor) % 360;
	let darkerColor = 'hsl(' + hue + 'deg 100% 25%)';
	let lighterColor = 'hsl(' + hue + 'deg 100% 75%)';
	document.documentElement.style.setProperty('--buttonColor', darkerColor);
	document.documentElement.style.setProperty('--buttonActive', lighterColor);
});