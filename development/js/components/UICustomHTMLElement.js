function UICustomHTMLElement(options)
{
	this.add = function(uiElements)
	{
		UIElement.addElements(this, uiElements);

		return this;
	}

    this.createHTMLElement = function(options)
	{
		options = options || {};
        
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        var tagName = this.defaultAttributes._htmlNode != undefined ? this.defaultAttributes._htmlNode.localName : (options.tagName || this.defaultAttributes._tagName);
		var htmlNode = this.defaultAttributes._htmlNode != undefined ? UIElement.setHTMLNodeAttributes(this.defaultAttributes._htmlNode, attributeValues) : UIElement.setHTMLNodeAttributes(document.createElement(tagName), attributeValues);
		htmlNode.textContent = options.text || this.defaultAttributes._text;

	    for (var i = 0; i < this.childUIElements.length; i++)
	    {
	    	var htmlChildNode = this.childUIElements[i].createHTMLElement();
			htmlNode.appendChild(htmlChildNode);
	    }

	    return htmlNode;
	}

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);

    	options = options || {};

    	instance.type = "UICustomHTMLElement";
    	instance.defaultAttributes._htmlNode = options.htmlNode || undefined;
    	instance.defaultAttributes._class = options.class || "CustomHTML" || undefined;
    	instance.defaultAttributes._tagName = options.tagName || "div";
    	instance.defaultAttributes._text = options.text || undefined;
    	instance.childUIElements = [];
    }

    if (this instanceof UICustomHTMLElement)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UICustomHTMLElement(options);
    }
};