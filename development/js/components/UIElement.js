function UIElement(options)
{
    this.defaultAttributes;

    this.parentUIElement;
    this.childUIElements;

    this.instanceNum;
    this.hashId;

    this.setDefaultValues = function(options)
    {
        var defaultOptions = Object.entries(options);

        for (var i = 0; i < defaultOptions.length; i++)
        {
            if (this[defaultOptions[i][0]] != undefined)
            {
                this[defaultOptions[i][0]] = defaultOptions[i][1];
            }
        }
    }

    var _construct = function(instance, options)
    {
        instance.__proto__ = UIElement;

        UIFormElements.uiElementInstances.push(instance);
        instance.instanceNum = UIFormElements.uiElementInstances.length;

    	options = options || {};

        options.disabled = options.disabled != undefined ? options.disabled.toLowerCase() : undefined;
        options.checked = options.checked != undefined ? options.checked.toLowerCase() : undefined;
        options.inline = options.inline != undefined ? options.inline.toLowerCase() : undefined;

        if (options.disabled == "")
        {
            options.disabled = "true";
        }

        if (options.checked == "")
        {
            options.checked = "true";
        }

        instance.defaultAttributes = new UIElementHTMLAttributes();
        instance.defaultAttributes._id = options.id || undefined;
        instance.defaultAttributes._class = options.class | undefined;
        instance.defaultAttributes._name = options.name || undefined;
        instance.defaultAttributes._style = options.style || undefined;
        instance.defaultAttributes._disabled = options.disabled || undefined;

        // events
        instance.defaultAttributes._onblur = options.onblur || undefined;
        instance.defaultAttributes._onchange = options.onchange || undefined;
        instance.defaultAttributes._oncontextmenu = options.oncontextmenu || undefined;
        instance.defaultAttributes._onfocus = options.onfocus || undefined;
        instance.defaultAttributes._onclick = options.onclick || undefined;
        instance.defaultAttributes._oninput = options.oninput || undefined;
        instance.defaultAttributes._oninvalid = options.oninvalid || undefined;
        instance.defaultAttributes._onreset = options.onreset || undefined;
        instance.defaultAttributes._onsearch = options.onsearch || undefined;
        instance.defaultAttributes._onselect = options.onselect || undefined;
        instance.defaultAttributes._onsubmit = options.onsubmit || undefined;

        if (options.inline != undefined)
        {
            if (instance.defaultAttributes._style != undefined)
            {
                if
                (
                    instance.defaultAttributes._style.substr(instance.defaultAttributes._style.length - 1) != ";"
                    || instance.defaultAttributes._style.substr(instance.defaultAttributes._style.length - 2) != ";"
                )
                {
                    instance.defaultAttributes._style += ";"
                }

                instance.defaultAttributes._style = instance.defaultAttributes._style + " ";
            }
            else
            {
                instance.defaultAttributes._style = "";
            }

            if (options.inline == true || options.inline == "true")
            {
                instance.defaultAttributes._style += "display: inline-block;";
            }
            if (options.inline == false || options.inline == "false")
            {
                instance.defaultAttributes._style += "display: block;";
            }
        }

        if (UIFormElements.state == 0)
        {
            UIFormElements.init();
        }
    }

    _construct(this, options);
};

UIElement.getDefaultAttributeValues = function(instance, options)
{
    var defaultAttributesValues = new UIElementHTMLAttributes();

    instance.hashId = instance.type.replace("UI", "ui-").toLowerCase() + "-" + UIFormElements._internals.pad(instance.instanceNum, 5);

    if (instance.defaultAttributes._id == "{generateId}")
    {
        instance.defaultAttributes._id = instance.hashId;
    }

    defaultAttributesValues.uiElementType = instance.type;
    defaultAttributesValues._tagName = options.tagName || instance.defaultAttributes._tagName;
    defaultAttributesValues._id = options.id || instance.defaultAttributes._id || (UIFormElements.config.generateIds == true || instance.defaultAttributes._bind != undefined ? instance.hashId : undefined);
    defaultAttributesValues._class = options.class || instance.defaultAttributes._class;
    defaultAttributesValues._name = options.name || instance.defaultAttributes._name;
    defaultAttributesValues._style = options.style || instance.defaultAttributes._style;
    defaultAttributesValues._disabled = options.disabled || instance.defaultAttributes._disabled;

    // events
    defaultAttributesValues._onblur = options.onblur || instance.defaultAttributes._onblur;
    defaultAttributesValues._onchange = options.onchange || instance.defaultAttributes._onchange;
    defaultAttributesValues._oncontextmenu = options.oncontextmenu || instance.defaultAttributes._oncontextmenu;
    defaultAttributesValues._onfocus = options.onfocus || instance.defaultAttributes._onfocus;
    defaultAttributesValues._onclick = options.onclick || instance.defaultAttributes._onclick;
    defaultAttributesValues._onchange = options.onchange || instance.defaultAttributes._onchange;
    defaultAttributesValues._oninput = options.oninput || instance.defaultAttributes._oninput;
    defaultAttributesValues._oninvalid = options.oninvalid || instance.defaultAttributes._oninvalid;
    defaultAttributesValues._onreset = options.onreset || instance.defaultAttributes._onreset;
    defaultAttributesValues._onsearch = options.onsearch || instance.defaultAttributes._onsearch;
    defaultAttributesValues._onselect = options.onselect || instance.defaultAttributes._onselect;
    defaultAttributesValues._onsubmit = options.onsubmit || instance.defaultAttributes._onsubmit;

    if (UIFormElements.config.consoleMessages == true && UIFormElements.config.generateIds == false && instance.defaultAttributes._bind != undefined)
    {
        console.info(instance.type + " is bound to event \"" + instance.defaultAttributes._bind + "\" but has no id. Using generated id " + defaultAttributesValues._id);
    }

    return defaultAttributesValues;
}

UIElement.setHTMLNodeAttributes = function(htmlNode, attributeValues)
{
    var attributes = UIFormElements._internals.getObjectEntries(attributeValues);

    for (var i = 0; i < attributes.length; i++)
    {
        var name = attributes[i][0].substring(1);
        var value =  attributes[i][1];
        var uiElementType = undefined;

        if (attributes[i][0] == "uiElementType")
        {
            uiElementType = attributes[i][0];
        }

        if
        (
            (
                attributes[i][0] != "uiElementType"
                && value != undefined
                && name != "disabled"
                && name != "id"
                && name != "class"
                && name != "value"
                && name != "text"
                && name != "tagName"
            )
            ||
            (
                name == "disabled"
                && value != undefined
                && value == "true"
            )
            ||
            (
                name == "id"
                && value != undefined
                && attributeValues.uiElementType != "UICheckbox"
            )
            ||
            (
                name == "class"
                && value != undefined
                && attributeValues.uiElementType != "UIRadioButton"
                && attributeValues.uiElementType != "UITextInput"
            )
            ||
            (
                name == "value"
                && value != undefined
                && attributeValues.uiElementType == "UITextInput"
            )
        )
        {
            if
            (
                (attributeValues.uiElementType == "UICheckbox" && name == "onchange") == false
                && (attributeValues.uiElementType == "UITab" && name == "title") == false
            )
            {
                htmlNode.setAttribute(name, attributeValues[attributes[i][0]]); 
            }
        }
    }

    if
    (
        (
            attributeValues.uiElementType == "UILabel"
            || attributeValues.uiElementType == "UIButton"
            || attributeValues.uiElementType == "UICheckbox"
            || attributeValues.uiElementType == "UITextInput"
            || attributeValues.uiElementType == "UITextArea"
        )
        && attributeValues._text != undefined
    )
    {
        if (attributeValues._value != undefined && attributeValues.uiElementType == "UILabel")
        {
            htmlNode.appendChild(document.createTextNode(attributeValues._text.replace("{value}", attributeValues._value)));
        }
        else
        {
            htmlNode.appendChild(document.createTextNode(attributeValues._text));
        }
    }

    return htmlNode;
}

UIElement.addElements = function(instance, uiElements)
{
    for (var i = 0; i < uiElements.length; i++)
    {
        if (uiElements[i] != undefined)
        {
            uiElements[i].parentUIElement = instance;
            instance.childUIElements.push(uiElements[i]);
        }
    }
}

function UIElementHTMLAttributes()
{
    this.__proto__ = Object;
};