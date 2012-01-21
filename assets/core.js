var baseFontSize = 16;
var baseLineHeight = 1.5;
var baseLineHeightPx = Math.round(baseFontSize * baseLineHeight);
var targetHeadingSizes = [36,28,24,22,20,18];
var smallPrintSize = 11;
var showBaseGrid = true;
window.onload = function()
{
	id("base-range").addEventListener("input", function() {initRender()}, false);
	id("base-range").addEventListener("input", function() {pxcounter()}, false);
	id("lh").addEventListener("input", function() {initRender()}, false);
	id("lh").addEventListener("input", function() {lhcounter()}, false);
	/* headings */
	id("h1-range").addEventListener("input", function(){updateHeading("h1")}, false);
	id("h2-range").addEventListener("input", function(){updateHeading("h2")}, false);
	id("h3-range").addEventListener("input", function(){updateHeading("h3")}, false);
	id("h4-range").addEventListener("input", function(){updateHeading("h4")}, false);
	id("h5-range").addEventListener("input", function(){updateHeading("h5")}, false);
	id("h6-range").addEventListener("input", function(){updateHeading("h6")}, false);
	/* modals */
	id("heading1").addEventListener("click", function(){toggle("heading1")}, false);
	id("heading2").addEventListener("click", function(){toggle("heading2")}, false);
	id("heading3").addEventListener("click", function(){toggle("heading3")}, false);
	id("heading4").addEventListener("click", function(){toggle("heading4")}, false);
	id("heading5").addEventListener("click", function(){toggle("heading5")}, false);
	id("heading6").addEventListener("click", function(){toggle("heading6")}, false);
	/* options */
	id("grid-toggle").addEventListener("change", function(){toggleGrid()}, false);
	renderCSS();
}
function toggle(i)
{
	var modal = next(id(i)); 
	modal.className = (modal.className == 'text-modal visible') ? 'text-modal hidden' : 'text-modal visible';
}
function id(i)
{
	return document.getElementById(i);
}
function next(i)
{
	do
	{
		i = i.nextSibling;
	} while (i && i.nodeType != 1);
    return i;                
}
function toggleGrid()
{
	showBaseGrid = (showBaseGrid == true) ? false : true;
	initGrid();
}
function initGrid()
{
	baseFontSize = id("base-range").value;
	baseFontSize = (baseFontSize < 9) ? 9 : baseFontSize;
	baseLineHeight = decround(id("lh").value);
	baseLineHeight = (baseLineHeight < 0.5) ? 0.5 : baseLineHeight;
	baseLineHeightPx = Math.round(baseFontSize * baseLineHeight);
	/*	Find the grid line height */
	var baseLine = baseLineHeightPx - 1;
	if (showBaseGrid)
	{
		var grid = '-repeating-linear-gradient(top, transparent 0, transparent ' + baseLine + 'px, #ededed ' + baseLine + 'px, #ededed ' + baseLineHeightPx + 'px)';
		id("content").style.background = '-webkit' + grid;
		id("content").style.background = '-moz' + grid;
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
	id("lh-value").innerHTML = decround(id("lh").value);
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
	var targetLineHeight;
	var lineHeightMultiplier = 1;
	do
	{
		targetLineHeight = baseLineHeightPx * lineHeightMultiplier;
		lineHeightMultiplier++;
	}  while (targetLineHeight < targetFontSize);
	return targetLineHeight / targetFontSize;	
}
function updateHeading(sel)
{
	var targetHeadingFontSize = id(sel + "-range").value;
	id(sel + "-value").innerHTML = targetHeadingFontSize + 'px';
	var tHFZ = sel.split("h");
	targetHeadingSizes[(tHFZ[1] - 1)] = targetHeadingFontSize;
	renderCSS();
}
function renderCSS()
{
	/* body */
	var size = Math.round((baseFontSize / 16) * 100);
	document.body.style.fontSize = size + '%';
	var cssT = cssBlock("body", ["font-size:" + size + "%", "font-family:Helvetica, Arial, sans-serif"]);
	/* reset */
	cssT += cssBlock("html, body, h1, h2, h3, h4, h5, h6, p, ul, ol, li", ["margin:0", "padding:0"]);
	/* paragraphs */
	var paragraphs = document.getElementsByTagName("p");
	for (var i = 0; i < paragraphs.length; i++)
	{
		paragraphs[i].style.lineHeight = baseLineHeight;
		paragraphs[i].style.margin = baseLineHeight + 'em 0';
	}
	cssT += cssBlock("p", ["font-size:1em", "line-height:" + baseLineHeight, "margin:" + baseLineHeight + 'em 0']);
	/* lists */
	var lists = document.getElementsByTagName("ul");
	for (var i = 0; i < lists.length; i++)
	{
		lists[i].style.margin = baseLineHeight + 'em 0';
	}
	cssT += cssBlock("ul", ["padding-left:2em", "margin:" + baseLineHeight + 'em 0']);
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
			cssT += calculateCSS("h" + i, headings[j], targetHeadingSizes[k]);
		}
		k++;
	}
	/* small text */
	cssT += calculateCSS("small", id("small-print"), smallPrintSize);
	id("code").value = cssT;
}
function calculateCSS(sel, obj, fontS)
{
	lh = calculateLineHeight(fontS);
	obj.style.lineHeight = lh;
	fz = (fontS / baseFontSize);
	obj.style.fontSize = fz + 'em';
	return cssBlock(sel, ["font-size:" + fz + "em", "line-height:" + lh]);
}
function decround(num, dec)
{
    if (typeof(dec) == "undefined")
    {
        dec = 4;
    }
    return Math.round(num * Math.pow(10, dec)) / Math.pow(10, dec);
}