function UIGroup(options)
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
		var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("div"), attributeValues);

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

    	instance.type = "UIGroup";
    	instance.defaultAttributes._class = options.class ||  "Group";

    	instance.childUIElements = [];
    }

    if (this instanceof UIGroup)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UIGroup(options);
    }
};