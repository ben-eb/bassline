#Bassline

Bassline is a tool that generates a baseline typographic grid, to help you establish a consistent vertical rhythm for layouts on the web. It works best in WebKit browsers as they have support for the range input type, but it will fallback fairly well in Firefox. As the grid is dynamically generated the tool still works in Opera but no grid lines are shown. This has not been tested in IE, but the *output* of the program will work in *all* modern browsers.

##Usage

Simply drag the sliders on the left hand side to achieve the desired font size/line height combination. The changes will appear dynamically on the right hand side; copy the CSS from the textarea and paste it into your project.

##Issues

###Known issues

* Some combinations of font size and line height will break the grid generated. The best way around this problem is to try a slightly different line height/font size combination!
* Bassline makes heavy use of HTML5 sliders which are *not* supported in Firefox, and gradients to generate the grid lines (not supported by IE or Opera). For this reason it is best to run Bassline in either Safari or Chrome.
* The image generator may break the grid lines at times, although the CSS output paired with real images seems to work.
* **This tool has not been designed to work in IE!**

###Contact

Please report any other issues you have using one of the following:

* The issues section of this repo
* Twitter: [@basslineapp](http://twitter.com/basslineapp "Bassline on Twitter")