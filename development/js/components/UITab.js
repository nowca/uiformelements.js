function UITab(options)
{
	this.add = function(uiElements)
	{
		UIElement.addElements(this, uiElements);

		return this;
	}

	// .title
    this.createHTMLElement = function(options)
	{
		options = options || {};
        
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._title = options.title || this.defaultAttributes._title;

	    var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("fieldset"), attributeValues);

        if (this.defaultAttributes._title != undefined)
		{
			var legendNode = document.createElement("legend");
			legendNode.appendChild(document.createTextNode(this.defaultAttributes._title));
			htmlNode.appendChild(legendNode);
		}

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

		instance.type = "UITab";
		instance.defaultAttributes._class = options.class || "Tab";
    	instance.defaultAttributes._title =  options.title != undefined ? options.title : undefined;
    	
    	instance.childUIElements = [];
    }

    if (this instanceof UITab)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UITab(options);
    }
};