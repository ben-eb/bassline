var baseSpacing = 1;
var baseFontSize = 16;
var baseLineHeightPx = 24;
var baseLineHeight = decround(baseLineHeightPx/baseFontSize);
var targetHeadingSizes = [36,28,24,20,14,12];
var targetHeadingSpaces = [0,0,6,1,0,3];
var smallPrintSize = 11;
var smallPrintSpacing = 3;
var spacingLabels = ['none', 'single, top', 'single, bottom', 'single', 'double, top', 'double, bottom', 'double'];
var showBaseGrid = true;
var outputBaseGrid = false;
var baseGrid = "-repeating-linear-gradient(top, transparent 0, transparent 23px, #ededed 23px, #ededed 24px)";
window.addEventListener('load', function()
{
	/* for the benefit of firefox */
	id('image-counter').value = 0;
	id("base-range").addEventListener("input", function() {initRender();pxcounter();}, false);
	id("lh").addEventListener("input", function() {initRender();lhcounter();}, false);
	id("spacing-srange").addEventListener("input",  function(){var i = sprcounter("spacing"); baseSpacing = i; renderCSS();}, false);
	id("small-srange").addEventListener("input",  function(){var i = sprcounter("small"); smallPrintSpacing = i; renderCSS();}, false);
	/* custom font sizes */
	for(var i = 1; i < 7; i++)
	{
		assignHeadings(i);
	}
	id("small-range").addEventListener("input", updateSmallPrint, false);
	/* options */
	id("grid-toggle").addEventListener("change", toggleGrid, false);
	id("gcode-toggle").addEventListener("change", outputGridLines, false);
	id("cufont-toggle").addEventListener("click", toggleHeadingOptions, false);
	/* image options */
	id("add-image").addEventListener("click", addImageDialog, false);
	addImageDialog();
}, false);
function addImageDialog()
{
	var numi = id('image-counter');
	var num = (parseInt(numi.value) + 1);
	numi.value = num;
	/* options div */
	var imopt = document.createElement('div');
	imopt.setAttribute('id', 'image-opt'+num);
	imopt.setAttribute('class', 'image-options');
	imopt.innerHTML = "\n<label>Image "+num+"</label>\n<label class=\"small-label\">Width (px)</label><input type=\"text\" id=\"image"+num+"-width\" value=\"100\">\n<label class=\"small-label\">Height (px)</label><input type=\"text\" id=\"image"+num+"-height\" value=\"100\">\n";
	id('image-settings').appendChild(imopt);
	id('image' + num + '-width').addEventListener("change", function(){renderImages("image"+num);}, false);
	id('image' + num + '-height').addEventListener("change", function(){renderImages("image"+num);}, false);
	/* output img */
	var cim = calculateImageMargin(100);
	var imdiv = document.createElement('div');
	imdiv.setAttribute('id', 'image' + num);
	imdiv.setAttribute('style', 'width: 100px; height:100px; margin:' + cim + 'em, 0 0 0');
	imdiv.innerHTML = "\n<span id=\"image" + num + "-span\">100*100</span>\n";
	id('image-placeholder').appendChild(imdiv);
	renderCSS();
}
function renderImages(i)
{
	var w = id(i + "-width").value;
	var h = id(i + "-height").value;
	var m = calculateImageMargin(h);
	id(i + "-span").innerHTML = w + "*" + h;
	id(i).setAttribute('style', 'width:' + w + 'px; height:' + h + 'px; margin:' + m + 'em 0 0 0;');
	renderCSS();
}
function assignHeadings(i)
{
	id("h" + i + "-range").addEventListener("input", function(){updateHeading("h" + i)}, false);
	id("h" + i + "-sprange").addEventListener("input", function(){updateHeadingSpacing("h" + i)}, false);
}
function id(i)
{
	return document.getElementById(i);
}
function toggleGrid()
{
	showBaseGrid = (showBaseGrid == true) ? false : true;
	initGrid();
}
function toggleHeadingOptions()
{
	if(id("sizes-options").className == "visible")
	{
		id("sizes-options").className = "hidden";
		id("sizes-label").className = "hidden";
		id("spacing-options").className = "visible";
		id("spacing-label").className = "visible";
	}
	else
	{
		id("sizes-options").className = "visible";
		id("sizes-label").className = "visible";
		id("spacing-options").className = "hidden";
		id("spacing-label").className = "hidden";
	}
}
function outputGridLines()
{
	outputBaseGrid = (outputBaseGrid == true) ? false : true;
	renderCSS();
}
function initGrid()
{
	baseFontSize = id("base-range").value;
	baseFontSize = (baseFontSize < 9) ? 9 : baseFontSize;
	baseLineHeightPx = decround(id("lh").value);
	baseLineHeightPx = (baseLineHeightPx < 9) ? 9 : baseLineHeightPx;
	baseLineHeight = decround(baseLineHeightPx/baseFontSize);
	/*	Find the grid line height */
	var baseLine = baseLineHeightPx - 1;
	baseGrid = '-repeating-linear-gradient(top, transparent 0, transparent ' + baseLine + 'px, #ededed ' + baseLine + 'px, #ededed ' + baseLineHeightPx + 'px)';
	if (showBaseGrid)
	{
		id("content").style.backgroundImage = '-webkit' + baseGrid;
		id("content").style.backgroundImage = '-moz' + baseGrid;
		id("content").style.backgroundSize = baseLineHeightPx + 'px ' + (baseLineHeightPx + 1) + 'px';
	}
	else
	{
		id("content").style.background = 'transparent';
	}
}
function initRender()
{
	initGrid();
	renderCSS();
}
function pxcounter()
{
	id("base-value").innerHTML = id("base-range").value + 'px';
}
function lhcounter()
{
	id("lh-value").innerHTML = decround(id("lh").value) + 'px';
}
function sprcounter(i)
{
	var spr = parseInt(id(i + "-srange").value);
	id(i + "-svalue").innerHTML = spacingLabels[spr];
	return spr;
}
function cssBlock(selector, properties)
{
	var csschunk = selector + "\n{\n";
	for (var i=0; i < properties.length; i++)
	{
		csschunk += "\t" + properties[i] + ";\n";
	}
	return csschunk + "}\n";
}
function calculateLineHeight(targetFontSize)
{
	return decround(returnLineHeight(targetFontSize) / targetFontSize);	
}
function calculateImageMargin(imageHeight)
{
	return (returnLineHeight(imageHeight) - imageHeight) / baseFontSize;
	/*return (returnLineHeight(imageHeight) - imageHeight);*/
}
function returnLineHeight(targetFontSize)
{
	var targetLineHeight;
	var lineHeightMultiplier = 1;
	do
	{
		targetLineHeight = baseLineHeightPx * lineHeightMultiplier;
		lineHeightMultiplier++;
	}  while (targetLineHeight < targetFontSize);
	return targetLineHeight;
}
function updateHeading(sel)
{
	var targetHeadingFontSize = id(sel + "-range").value;
	id(sel + "-value").innerHTML = targetHeadingFontSize + 'px';
	var tHFZ = sel.split("h");
	targetHeadingSizes[(tHFZ[1] - 1)] = targetHeadingFontSize;
	renderCSS();
}
function updateHeadingSpacing(sel)
{
	var targetHeadingSpacing = parseInt(id(sel + "-sprange").value);
	id(sel + "-spacing").innerHTML = spacingLabels[targetHeadingSpacing];
	var tHSP = sel.split("h");
	targetHeadingSpaces[(tHSP[1] - 1)] = targetHeadingSpacing;
	renderCSS();
}
function updateSmallPrint()
{
	smallPrintSize = id("small-range").value;
	id("small-value").innerHTML = smallPrintSize + 'px';
	renderCSS();
}
function calculateSpacing(spacingValue, lineHeight)
{
	var returnMargin;
	switch (spacingValue)
	{
		case 0: returnMargin = 0; break;
		case 1: returnMargin = lineHeight + 'em 0 0 0'; break;
		case 2: returnMargin = '0 0 ' + lineHeight + 'em 0'; break;
		case 3: returnMargin = lineHeight + 'em 0'; break;
		case 4: returnMargin = lineHeight * 2 + 'em 0 0 0'; break;
		case 5: returnMargin = '0 0 ' + lineHeight * 2 + 'em 0'; break;
		case 6: returnMargin = lineHeight * 2 + 'em 0'; break;
	}
	return returnMargin;
}
function renderCSS()
{
	/* reset */
	var cssT = cssBlock("html, body, h1, h2, h3, h4, h5, h6, p, ul, ol, li, blockquote", ["margin:0", "padding:0"]);
	/* body */
	var size = (baseFontSize / 16) * 100;
	document.body.style.fontSize = size + '%';
	var showGrid = "";
	if (outputBaseGrid)
	{
		showGrid =  ";\n\tbackground: -webkit" + baseGrid +
					";\n\tbackground: -moz" + baseGrid +
					";\n\tbackground-size:" + baseLineHeightPx + 'px' + baseLineHeightPx + 'px';
	}
	cssT += cssBlock("body", ["font-size:" + size + "%", "font-family:Helvetica, Arial, sans-serif"+showGrid]);
	/* paragraphs */
	var paragraphs = document.getElementsByClassName("bass-p");
	for (var i = 0; i < paragraphs.length; i++)
	{
		paragraphs[i].style.lineHeight = baseLineHeight;
		var paraSpacing = calculateSpacing(baseSpacing, baseLineHeight);
		paragraphs[i].style.margin = paraSpacing;
	}
	cssT += cssBlock("p, cite", ["font-size:1em", "line-height:" + baseLineHeight, "margin:" + paraSpacing]);
	/* lists */
	var lists = document.getElementsByClassName("bass-list");
	for (var i = 0; i < lists.length; i++)
	{
		lists[i].style.margin = paraSpacing;
	}
	cssT += cssBlock("ol, ul", ["padding-left:2em", "margin:" + paraSpacing]);
	var listItems = document.getElementsByTagName("li");
	for (var i = 0; i < listItems.length; i++)
	{
		listItems[i].style.fontSize = '1em';
		listItems[i].style.lineHeight = baseLineHeight;
	}
	cssT += cssBlock("li", ["font-size:1em", "line-height:" + baseLineHeight]);
	/* headings */
	var k = 0;
	for (var i=1; i<7; i++)
	{
		var headings = document.getElementsByTagName('h' + i);
		for (var j=0; j<headings.length; j++)
		{
			var htemp = calculateCSS("h" + i, headings[j], targetHeadingSizes[k], targetHeadingSpaces[k]);
		}
		cssT += htemp;
		k++;
	}
	/* images */
	imgopts = document.getElementsByClassName('image-options');
	for (var i = 0; i < imgopts.length; i++)
	{
		var j = i + 1;
		var w = id('image' + j + '-width').value;
		var h = id('image' + j + '-height').value;
		var m = calculateImageMargin(h);
		cssT += cssBlock (".image" + j, ["width:" + w + "px", "height:" + h + "px", "margin:" + m + "em 0 0 0"]);
	}
	/* small text */
	cssT += calculateCSS("small", id("small-print"), smallPrintSize, smallPrintSpacing);
	cssT += cssBlock("cite, small, img", ["display:block"]);
	id("code").value = cssT;
}
function calculateCSS(sel, obj, fontS, spacing)
{
	// may need rewriting to allow more than one element/returned style
	lh = calculateLineHeight(fontS);
	obj.style.lineHeight = lh;
	fz = decround(fontS / baseFontSize);
	obj.style.fontSize = fz + 'em';
	mr = calculateSpacing(spacing, lh);
	obj.style.margin = mr;
	return cssBlock(sel, ["font-size:" + fz + "em", "line-height:" + lh, "margin:" + mr]);
}
function decround(num, dec)
{
    if (typeof(dec) == "undefined")
    {
        dec = 4;
    }
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}