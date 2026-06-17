function UISlider(options)
{
	this.createHTMLElement = function(options)
	{
        options = options || {};
        
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._min = options.min || this.defaultAttributes._min || 0;
        attributeValues._max = options.max || this.defaultAttributes._max || 10;
        attributeValues._step = options.step || this.defaultAttributes._step || 1;
        attributeValues._value = options.value || this.defaultAttributes._value || 0;

        var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("input"), attributeValues);
    	htmlNode.setAttribute("type", "range");
        htmlNode.value = attributeValues._value;

	    return htmlNode;
	}

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);
    	
        options = options || {};

        instance.type = "UISlider";
        instance.defaultAttributes._class = options.class || "Slider";
        instance.defaultAttributes._value = options.value || "";
        instance.defaultAttributes._min = options.min || "";
        instance.defaultAttributes._max = options.max || "";
        instance.defaultAttributes._step = options.step || "";
    }

    if (this instanceof UISlider)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UISlider(options);
    }
};