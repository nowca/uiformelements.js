function UIDropdownList(options)
{
	this.entries;

    // value
	this.createHTMLElement = function(options)
    {
        options = options || {};
       
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._value = options.value || this.defaultAttributes._value;
        attributeValues._size = options.size || this.defaultAttributes._size;
        attributeValues._multiple = options.multiple || this.defaultAttributes._multiple;

        var htmlNode = UIElement.setHTMLNodeAttributes(
            document.createElement("select"),
            attributeValues
        );

        if (options.values != undefined) 
        {
            if ((options.values instanceof Array) || (options.values instanceof Object))
            {
                this.entries = UIFormElements._internals.getObjectEntries(options.values);
            }
            else
            {
                console.error("Error: values " + options.values + " of " + this.type + " is not of type Array or Object");
            }
        }

        if (options.multiple == "true")
        {
            htmlNode.multiple = true;
            htmlNode.setAttribute("multiple", true); 
        }
        
        for (var i = 0; i < this.entries.length; i++)
        {
        	var entry = {
                value: this.entries[i][0],
                text: this.entries[i][1]
            }
        	var optionNode = document.createElement("option");
        	optionNode.value = entry.value;

            if (this.defaultAttributes._selected == optionNode.value)
            {
                optionNode.selected = true;
                optionNode.setAttribute("selected", true);
            }

        	optionNode.appendChild(document.createTextNode(entry.text));
        	htmlNode.appendChild(optionNode);
        }

        if (attributeValues._value != undefined && attributeValues._value.length > 0)
        {
            htmlNode.value = attributeValues._value;
        }

        return htmlNode;
    }

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);
        
        options = options || {};

        instance.type = "UIDropdownList";
        instance.defaultAttributes._class = options.class || "DropdownList";
        instance.defaultAttributes._value = options.value || "";
        instance.defaultAttributes._size = options.size || undefined;
        instance.defaultAttributes._multiple = options.multiple || undefined;
        instance.defaultAttributes._selected = options.selected || undefined;
        instance.entries = [];

        if (options.values != undefined) 
        {
            if ((options.values instanceof Array) || (options.values instanceof Object))
            {
                instance.entries = UIFormElements._internals.getObjectEntries(options.values);
            }
            else
            {
                console.error("Error: values " + options.values + " of " + instance.type + " is not of type Array or Object");
            }
        }
    }

    if (this instanceof UIDropdownList)
    {
        _construct(this, options);
    }
    else
    {
        return new UIDropdownList(options);
    }
};