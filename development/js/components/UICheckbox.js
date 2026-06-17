function UICheckbox(options)
{
    // text
    // checked
	this.createHTMLElement = function(options)
	{
        options = options || {};

        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._text = options.text || this.defaultAttributes._text;
        attributeValues._value = options.value || this.defaultAttributes._value;
        attributeValues._checked = options.checked || this.defaultAttributes._checked;

        var labelNode = document.createElement("label");
        var inputNode = document.createElement("input");
        inputNode.setAttribute("type", "checkbox");
        inputNode.checked = attributeValues._checked;
        labelNode.appendChild(inputNode);

        if (attributeValues._id != undefined)
        {
            inputNode.setAttribute("id", attributeValues._id);
            labelNode.setAttribute("for", attributeValues._id);
        }

        if (attributeValues._value != undefined)
        {
            inputNode.setAttribute("value", attributeValues._value);
        }

        if (attributeValues._disabled != undefined && (attributeValues._disabled == "true" || attributeValues._disabled == "false"))
        {
            inputNode.setAttribute("disabled", attributeValues._disabled);
        }

        if (attributeValues._onchange != undefined)
        {
            inputNode.setAttribute("onchange", attributeValues._onchange);
        }

        var htmlNode = UIElement.setHTMLNodeAttributes(labelNode, attributeValues);

	    return htmlNode;
	}

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);
    	
        options = options || {};

        instance.type = "UICheckbox";
        instance.defaultAttributes._class = options.class || "Checkbox";
        instance.defaultAttributes._text = options.text || "";
        instance.defaultAttributes._value = options.value || undefined;
        instance.defaultAttributes._checked = options.checked || undefined;
    }
    
    if (this instanceof UICheckbox)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UICheckbox(options);
    }
};