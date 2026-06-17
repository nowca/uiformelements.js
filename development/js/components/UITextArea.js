function UITextArea(options)
{
	this.createHTMLElement = function(options)
	{
		options = options || {};
		
		var attributeValues = UIElement.getDefaultAttributeValues(this, options);
		attributeValues._text = options.text || this.defaultAttributes._text;
		attributeValues._rows = options.rows || this.defaultAttributes._rows;
		attributeValues._cols = options.cols || this.defaultAttributes._cols;
		attributeValues._placeholder = options.placeholder || this.defaultAttributes._placeholder;

	    var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("textarea"), attributeValues);

	    return htmlNode;
	}

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);

    	options = options || {};

    	instance.type = "UITextArea";
    	instance.defaultAttributes._class = options.class || "TextArea";
		instance.defaultAttributes._text = options.text || "";
		instance.defaultAttributes._rows = options.rows || undefined;
		instance.defaultAttributes._cols = options.cols || undefined;
		instance.defaultAttributes._placeholder = options.placeholder || undefined;
    }

    if (this instanceof UITextArea)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UITextArea(options);
    }
};