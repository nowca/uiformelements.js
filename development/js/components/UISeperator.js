function UISeperator(options)
{
    this.createHTMLElement = function(options)
    {
        options = options || {};
        
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);

        var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("div"), attributeValues);

        return htmlNode;
    }

    var _construct = function(instance, options)
    {
        UIElement.call(instance, options);

        options = options || {};

        instance.type = "UISeperator";
        instance.defaultAttributes._class = options.class || "Seperator";
    }

    if (this instanceof UISeperator)
    {
        _construct(this, options);
    }
    else
    {
        return new UISeperator(options);
    }
};

var hr = UISeperator;