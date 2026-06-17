function UIButton(options)
{
    // .text
    // .value
    this.createHTMLElement = function(options)
    {
        options = options || {};
        
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._text = options.text || this.defaultAttributes._text;
        attributeValues._type = options.type || this.defaultAttributes._type;
        attributeValues._value = options.value || this.defaultAttributes._value;

        var htmlNode = UIElement.setHTMLNodeAttributes(
            document.createElement("button"),
            attributeValues
        );

        if (attributeValues._type == "submit")
        {
            htmlNode.setAttribute("type", "submit");
            htmlNode.setAttribute("value", attributeValues._text);
        }
        /*else
        {
        }*/

        return htmlNode;
    }

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);
        
        options = options || {};

        instance.type = "UIButton";
        instance.defaultAttributes._class = options.class || "Button";
        instance.defaultAttributes._text = options.text || "OK";
        instance.defaultAttributes._type = options.type || undefined;
        instance.defaultAttributes._value = options.value || undefined;
        instance.defaultAttributes._disabled = options.disabled || false;
    }

    if (this instanceof UIButton)
    {
        _construct(this, options);
    }
    else
    {
        return new UIButton(options);
    }
};