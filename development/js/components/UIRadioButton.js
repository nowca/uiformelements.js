function UIRadioButton(options)
{
	// .text;
    // .name;
    // .value;
	// .checked;
	// .type;
	this.createHTMLElement = function(options)
	{
        options = options || {};

        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._text = options.text || this.defaultAttributes._text;
        attributeValues._name = options.name || this.defaultAttributes._name;
        attributeValues._value = options.value || this.defaultAttributes._value;
        attributeValues._checked = options.checked || this.defaultAttributes._checked;

        var input = UIElement.setHTMLNodeAttributes(document.createElement("input"), attributeValues);
        input.style.display = "inline-block"
        input.setAttribute("type", "radio");

        var htmlNode = document.createElement("span");
        htmlNode.setAttribute("class", attributeValues._class);

        var label = UIElement.setHTMLNodeAttributes(document.createElement("label"), attributeValues);
        label.style.display = "inline-block"
        label.setAttribute("for", attributeValues._id);
        label.appendChild(document.createTextNode(attributeValues._text));
        
        if (attributeValues._disabled != undefined && (attributeValues._disabled == "true" || attributeValues._disabled == "false"))
        {
            label.setAttribute("disabled", attributeValues._disabled);
        }

        htmlNode.style =  attributeValues._style;
        htmlNode.appendChild(input);
        htmlNode.appendChild(label);

	    return htmlNode;
	}

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);
    	
        options = options || {};

        instance.type = "UIRadioButton";
        instance.defaultAttributes._class = options.class || "RadioButton";
        instance.defaultAttributes._text = options.text || "";
        instance.defaultAttributes._name = options.name || "radio-button-group";
        instance.defaultAttributes._value = options.value || undefined;
        instance.defaultAttributes._checked = options.checked || undefined;
    }
    
    if (this instanceof UIRadioButton)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UIRadioButton(options);
    }
};