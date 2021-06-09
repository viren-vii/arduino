# Blockly Colour Gradient

Serves a JS class that can add a vertical or horizontal colour gradient to Google Blockly's blocks (see https://github.com/google/blockly.git). Google Blockly (https://developers.google.com/blockly/) is required for this Addon.

The `setVerticalGradient(block, colours, inputs)` function takes a block of Blockly, an object with the keys start and stop which get HTML colours as Hex (e.g #000000) and an Array with the input names that should be calculated.

![Vertical Gradient Example](https://github.com/SPE-Systemhaus/blockly-colour-gradient/blob/master/img/example_gradient_vertical.gif)

The `setHorizontalGradient(block)` function takes a block and builds a colour gradient with colours of the parent and the current block.

![Horizontal Gradient Example](https://github.com/SPE-Systemhaus/blockly-colour-gradient/blob/master/img/example_gradient_horizontal.gif)

## Sample Usage
```javascript 
Blockly.Blocks['example'] = {
	init: function() {
		this.setHelpUrl("https://www.spe-systemhaus.de/");
		this.setColour("#74A55B");
		this.gradient = new ColourGradient();	/* Creating ColourGradient Object */
        this.appendDummyInput("")
            .appendField("Example");
        this.appendDummyInput("bla")
            .appendField("bla");
		this.appendDummyInput("blubb")
            .appendField("blubb");
		this.setOutput(true, "blubb");
		this.setTooltip("See the colour gradient");
	}, onchange : function() {
		/* Adding a vertical gradient to the example block */
        this.gradient.setVerticalGradient(
            this, { 
                "start" : "#5BA58C",
                "stop" : this.getColour() 
            }, ["blubb"]
        );
	}
};
```
![Gradient Example Block](https://github.com/SPE-Systemhaus/blockly-colour-gradient/blob/master/img/example_gradient_block.png)


## Install with Bower

```
bower install --save blockly-colour-gradient
```

## Add to HTML

Add `colour-gradient.js` to your `index.html` *after* all the other blockly scripts.

```
<script src="bower_components/blockly-colour-gradient/colour-gradient.js"></script>
```
