function UITextInput(options)
{
    // .text
    // .name
    // .value
    // .placeholder
    // .password

    // https://html.spec.whatwg.org/multipage/input.html#common-input-element-attributes
    // https://www.w3.org/TR/2011/WD-html5-20110525/the-input-element.html
	this.createHTMLElement = function(options)
    {
        options = options || {};
       
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);

        attributeValues._text = options.text || this.defaultAttributes._text;
        attributeValues._name = options.name || this.defaultAttributes._name || this.defaultAttributes._id;
        attributeValues._value = options.value || this.defaultAttributes._value;
        attributeValues._placeholder = options.placeholder || this.defaultAttributes._placeholder;
        attributeValues._type = options.type || this.defaultAttributes._type || "text";

        attributeValues._min = options.min || this.defaultAttributes._min;
        attributeValues._max = options.max || this.defaultAttributes._max;
        attributeValues._maxlength = options.maxlength || this.defaultAttributes._maxlength;
        attributeValues._pattern = options.pattern || this.defaultAttributes._pattern;
        attributeValues._readonly = options.readonly || this.defaultAttributes._readonly;
        attributeValues._required = options.required || this.defaultAttributes._required;
        attributeValues._size = options.size || this.defaultAttributes._size;

        var inputNode = UIElement.setHTMLNodeAttributes(document.createElement("input"), attributeValues);
        //inputNode.setAttribute("type", (attributeValues._password == "true" ? "password" : "text"));
        inputNode.setAttribute("type", attributeValues._type);
        var htmlNode;

        if (attributeValues._text != undefined)
        {
            htmlNode = document.createElement("span");
            htmlNode.setAttribute("class", attributeValues._class);

            var labelNode = document.createElement("label");

            if (attributeValues._id != undefined)
            {
                labelNode.setAttribute("for", attributeValues._id);

                if (attributeValues._name == undefined)
                {
                    inputNode.setAttribute("name", attributeValues._id);
                }
            }

            labelNode.appendChild(document.createTextNode(attributeValues._text));
            htmlNode.appendChild(labelNode);
            htmlNode.appendChild(inputNode);
        }
        else
        {
            inputNode.setAttribute("class", attributeValues._class);
            htmlNode = inputNode;
        }

        return htmlNode;
    }

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);

        options = options || {};

        instance.type = "UITextInput";
        instance.defaultAttributes._class = options.class || "TextInput";
        instance.defaultAttributes._text = options.text || undefined;
        instance.defaultAttributes._name = options.name || undefined;
    	instance.defaultAttributes._value = options.value || undefined;
        instance.defaultAttributes._placeholder = options.placeholder || undefined;
        instance.defaultAttributes._type = options.type || undefined;
        
        instance.defaultAttributes._min = options.min || undefined;
        instance.defaultAttributes._max = options.max || undefined;
        instance.defaultAttributes._maxlength = options.maxlength || undefined;
        instance.defaultAttributes._pattern = options.pattern || undefined;
        instance.defaultAttributes._readonly = options.readonly || undefined;
        instance.defaultAttributes._required = options.required|| undefined;
        instance.defaultAttributes._size = options.size|| undefined;
    }

    if (this instanceof UITextInput)
    {
        _construct(this, options);
    }
    else
    {
        return new UITextInput(options);
    }
};