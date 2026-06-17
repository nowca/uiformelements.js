function UIForm(options)
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
        attributeValues._action = options.action || this.defaultAttributes._action;
        attributeValues._target = options.target || this.defaultAttributes._target;
        attributeValues._method = options.method || this.defaultAttributes._method;
        attributeValues._autocomplete = options.autocomplete || this.defaultAttributes._autocomplete;
        attributeValues._acceptcharset = options.acceptcharset || this.defaultAttributes._acceptcharset;
        attributeValues._enctype = options.enctype || this.defaultAttributes._enctype;
        attributeValues._rel = options.rel || this.defaultAttributes._rel;

		var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("form"), attributeValues);

		if (attributeValues._novalidate != undefined && attributeValues._novalidate == true)
		{
			htmlNode.noValidate = true;
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

    	instance.type = "UIForm";
    	instance.defaultAttributes._class = options.class ||  "Form";
    	instance.defaultAttributes._action = options.action ||  undefined;
    	instance.defaultAttributes._target = options.target ||  undefined;
    	instance.defaultAttributes._method = options.method ||  undefined;
    	instance.defaultAttributes._autocomplete = options.autocomplete ||  undefined;
    	instance.defaultAttributes._novalidate = options.novalidate ||  undefined;
    	instance.defaultAttributes._acceptcharset = options.acceptcharset ||  undefined;
    	instance.defaultAttributes._enctype = options.enctype ||  undefined;
    	instance.defaultAttributes._rel = options.rel ||  undefined;

    	instance.childUIElements = [];
    }

    if (this instanceof UIForm)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UIForm(options);
    }
};