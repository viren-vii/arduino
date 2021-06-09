/**
    @license
    Copyright 2016 SPE Systemhaus GmbH (https://spe-systemhaus.de/)
    Licensed under the Apache License, Version 2.0 (the "License");
    you may not use this file except in compliance with the License.
    You may obtain a copy of the License at
        http://www.apache.org/licenses/LICENSE-2.0
    Unless required by applicable law or agreed to in writing, software
    distributed under the License is distributed on an "AS IS" BASIS,
    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    See the License for the specific language governing permissions and
    limitations under the License.
    @fileoverview
    This file serves a class to use colour gradients in Blockly's blocks.
    @author
    Michael Kolodziejczyk <mk@spe-systemhaus.de>
    @file
    colour-gradient.js
*/
function ColourGradient() {

    var svg = null;		/* SVG root Element */
    var svgNS = null;	/* SVG namespace */
    var defs = null;	/* SVG defs Element*/
    var id = null;		/* Block Id */
    
	/**
     * Constructor inits SVG DOM.
     */
    var __construct = function() {
        svg = document.getElementsByTagName("svg")[0];
        defs = svg.getElementsByTagName("defs")[0];   
        svgNS = svg.namespaceURI;
    }()

    /**
     * Setting a horizontal colour gradient from the colour of this block
	 * to the colour of the parent block.
	 * 
	 * @param {Blockly.Block} block Current block that has the starting colour for the gradient.
     * @param {String} startColor Color as hex value for starting the gradient.
	 * @param {String} endColor Color as hex value for ending the gradient.
	 */
    this.setHorizontalGradient = function(block, startColor, endColor) {
        var parentBlock = block.getParent();
		id = "gradient_" + parentBlock.id + "_" + block.id;
    
        var colors = {
            start : (startColor) ? startColor : parentBlock.getColour(),
            end : (endColor) ? endColor: block.getColour()
        }; 

        var parentBlockSvg = parentBlock.getSvgRoot().getElementsByClassName("blocklyPath")[0];
        var gradientNode = document.getElementById(id);
        var stops = [
            { "offset" : "50%", "stop-color" : colors.start },
            { "offset" : "50%", "stop-color" : colors.end }
        ];

        if (!gradientNode) {    /* Creating new linearGradient Node in SVG */
            gradientNode = createGradient(stops, false); 
        } else {                /* Updating linearGradient Node */
            updateGradient(gradientNode, stops);
        }
        
        parentBlockSvg.setAttribute("fill", "url('#" + id + "')");
    };

    /**
     * Setting a vertical colour gradient of this block.
	 * 
	 * @param {Object} block Current block that has the starting colour for the gradient.
	 * @param {Object} colors JSON with start and stop color for the gradient.
	 * @param {Array} inputs Array with the names of the inputs that should be calculated for the height.
     */
    this.setVerticalGradient = function(block, colors, inputs) {
        if (!block && !colors && !inputs)
            return false;

        id = "gradient_" + block.id;

        /* Disabling because the ColourGradient updates the colour */
        block.updateColour = function() {};

        var blockSvg = block.getSvgRoot().getElementsByClassName("blocklyPath")[0];
        var gradientNode = document.getElementById(id);
        var height = 0;
        var heightHundredth = 100 / block.getHeightWidth().height;
        
        inputs.forEach(function (entry) {
            var input = block.getInput(entry);
            if (input)
                if (input.renderHeight)
                    height += input.renderHeight;
        });

        height = heightHundredth * height;

        var stops = [
            { "offset" : (height - 5000) + "%", "stop-color" : colors.start },
            { "offset" : (height + 5000) + "%", "stop-color" : colors.stop }
        ];

        if (!gradientNode) {    /* Creating new linearGradient Node in SVG */
            gradientNode = createGradient(stops, true); 
        } else {                /* Updating linearGradient Node */
            updateGradient(gradientNode, stops);
        }
        
        blockSvg.setAttribute("fill", "url('#" + id + "')");
    };
    
    /**
     * Updating existing gradient.
     * 
     * @param {Element} grad <linearGradient> SVG Element
     * @param {Json} stops stop attributes
     */
    var updateGradient = function(grad, stops) {
        var stopNodes = grad.getElementsByTagName("stop");
               
        for (var cnt = 0; cnt < stopNodes.length; cnt++) {
            var attrs = stops[cnt];
            var stop = stopNodes[cnt];

            for (var attr in attrs) {
                stop.setAttribute(attr, attrs[attr]);
            }
        }
    }.bind(this);
    
    /**
     * Creating linearGradient and appending it to <defs> in svg.
     * 
     * @param {Object} stops Json attributes  
     * @param {bool} isVertical true vertical false horizontal
	 * @return {Element} defs Returning defs element with the created linear gradients.
     */
    var createGradient = function(stops, isVertical) {
        var grad  = document.createElementNS(svgNS, "linearGradient");
        grad.setAttribute("id", id);
        
        if (isVertical) {
            grad.setAttribute("x1", "0");
            grad.setAttribute("x2", "0");
            grad.setAttribute("y1", "1");
            grad.setAttribute("y2", "0");
        }

        for (var i = 0; i < stops.length; i++) {
            var attrs = stops[i];
            var stop = document.createElementNS(svgNS, "stop");
            
            for (var attr in attrs) {
                if (attrs.hasOwnProperty(attr)) 
                    stop.setAttribute(attr, attrs[attr]);
            }

            grad.appendChild(stop);
        }

        return defs.appendChild(grad);
    }.bind(this);
}
