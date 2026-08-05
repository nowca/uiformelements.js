/*
 *  UIFormElements.js
 *
 *  Legacy-compatible HTML Form toolkit
 *
 *  Copyright 2026 Jonathan Nowca
 *  License: CC BY-NC-SA
 */

var UIFormElements = {
	VERSION: "0.8b",
	config: {
		consoleBanner: false,
		consoleMessages: false,
		userselect: true,
		alwaysInline: false,
		generateIds: false,
		export: {
			injectBindHandler: true,
			injectScripts: false
		},
		extensions: [],
		theme: "SystemUI",
		themes: {
            None: "None",
            SystemUI: "System-UI",
            SystemUIDark: "System-UI-Dark",
            Chromium: "Chromium",
            Gimp: "Gimp",
            WindowsClassic: "Windows-Classic",
            DeepBlue: "Deep-Blue",
            Terminal: "Terminal",
            Custom: "Custom"
        }
	},
	state: 0,
	uiElementInstances: [],
	setConfig: function(options)
	{
		if (options.userselect != undefined)
		{
			UIFormElements.config.userselect = options.userselect;
		}

		if (options.theme != undefined)
		{
			UIFormElements.config.theme = options.theme;
			UIFormElements.changeTheme(options.theme);
		}

		if (options.exportMode != undefined)
		{
			UIFormElements.config.export.injectBindHandler = options.exportMode;
			UIFormElements.config.export.injectScripts = options.exportMode;
		}

		if (options.extensions != undefined)
		{
			for (var i = 0; i < options.extensions.length; i++)
			{
				var extName = options.extensions[i];

				if (window[extName] != undefined)
				{
					
					UIFormElements._internals.extensions[extName] = window[extName];
					UIFormElements._internals.extensions[extName].load();
				}
				else
				{
					console.error("Error: Extension \"" + options.extensions[i] + "\" not found.");
				}
			}
		}
	},
	changeTheme: function(value)
    {
		var themes = UIFormElements._internals.getObjectEntries(UIFormElements.config.themes);
        var currentTheme = UIFormElements.config.theme.replace("-", "");

        for (var i = 0; i < themes.length; i++)
        {
        	document.body.className = document.body.className.replace(currentTheme, "");
        }

        document.body.classList.add(value);
        UIFormElements.config.theme = value;
    },
	createHTMLContentFrom: function(uiElementId)
	{
		var uiElementQuery = {
			node: document.getElementById(uiElementId),
			content: undefined
		}

		if (uiElementQuery.node != undefined)
		{
			uiElementQuery.tagName = uiElementQuery.node.tagName.toLowerCase();
			uiElementQuery.className = uiElementQuery.node.className;

			var uiElement;
			var htmlNode;

			if (uiElementQuery.tagName == "template")
			{
				uiElementQuery.content = uiElementQuery.node.content;
				htmlNode = uiElementQuery.content;
				htmlNode.className = uiElementQuery.node.className;
				htmlNode.id = uiElementQuery.node.id;
			}
			else if (uiElementQuery.tagName == "div")
			{
				htmlNode = uiElementQuery.node;
			}
			
			uiElement = UIFormElements._internals.traverseAllChildren(htmlNode);
		}

		if (uiElement != undefined)
		{
			var htmlNode = uiElement.createHTMLElement();
			htmlNode.id = uiElementId;
			htmlNode.className = htmlNode.className.replace("Layout", "");
			htmlNode.className = htmlNode.className.length > 0 ? "Layout" + " " + htmlNode.className : "Layout";

			return htmlNode;
		}
		else
		{
			var htmlNode = document.createElement("p");
			htmlNode.className = "Error"
			htmlNode.textContent = "Error: HTML Element with id \"" + uiElementId + "\" not found."
			htmlNode.style = "color: red;"

			return htmlNode;
		}
	},
	init: function(uiElementId, htmlRootNode)
	{
		var selectedUIElementNode = document.getElementById(uiElementId);

		if (uiElementId != undefined)
		{
			var htmlContent;
			var htmlSourceOutput

			if (htmlRootNode == undefined)
			{
				htmlContent = UIFormElements.createHTMLContentFrom(uiElementId);
				htmlRootNode = selectedUIElementNode;
				htmlRootNode.innerHTML = "";
				selectedUIElementNode.innerHTML = htmlContent.innerHTML;
			}
			else
			{
				htmlRootNode.appendChild(UIFormElements.createHTMLContentFrom(uiElementId));
				selectedUIElementNode.remove();
			}
		}

		if (UIFormElements.state == 0)
		{
			if (UIFormElements.config.consoleBanner == true)
			{
				console.log("UIFormElements.js v" + UIFormElements.VERSION);
			}
			UIFormElements._internals.setupCSS();

			document.addEventListener("DOMContentLoaded", function()
			{
				// dispatch "onformloaded"
				var intervalRef = setInterval(function()
		    	{
		    		var pollRegSize = UIFormElements._internals.pollRegister.length;
		    		var regSizeState = 0;

		    		for (var i = 0; i < pollRegSize; i++)
		    		{
		    			if (UIFormElements._internals.pollRegister[i].intervalRef == undefined)
		    			{
		    				regSizeState++;
		    			}
		    		}

			        if (regSizeState == pollRegSize)
			        {
			        	UIFormElements._internals.pollRegister = [];
			        	clearInterval(intervalRef);
			        	window.dispatchEvent(UIFormElements._internals.events.onFormLoaded);
			        }
		    	}, 100)

				UIFormElements.changeTheme(UIFormElements.config.theme);
			});
		}

		UIFormElements.state = 1;
	},
	_internals:
	{
		extensions: {},
		events: {
			onFormLoaded: new CustomEvent('onformloaded', { detail: undefined })
		},
		pollRegister: [],
		state: {
			injection: {
				labelBindScript: false
			}
		},
		css: "/* UIFormElement default css settings */\
\n\n\
* {\
    font-family: Verdana, Arial, monospace;\
    font-size: 12px;\
}\
\
li {\
    border-left: 1px solid #dedede;\
    padding-left: 10px;\
}\
\
body {\
    margin: 0;\
    white-space: nowrap;\
}\
\
div, select, button, textarea, input {\
    display: block;\
}\
\
button, input[type=button], input[type=submit], input[type=reset] {\
	padding: 2px 4px 2px 4px;\
	margin-right: 8px;\
	display: inline-block;\
}\
\
span, input, select, label {\
    padding: 2px 8px 2px 0;\
}\
\
label,\
label.Checkbox > input,\
.RadioButton > input,\
.RadioButton > label {\
    display: inline-block;\
}\
\
label > input {\
	margin-left: 0;\
    margin-right: 8px;\
}\
\
input, select, button {\
    vertical-align: middle;\
}\
\
fieldset {\
    vertical-align: top;\
    margin-bottom: 8px;\
    margin-top: 8px;\
    padding-left: 12px;\
}\
\
fieldset * {\
    margin-top: 2px;\
    margin-bottom: 2px;\
}\
\
.Seperator {\
    display: block;\
    margin: 8px 0 8px 0;\
}\
\
input,\
select,\
textarea {\
    vertical-align: middle;\
    padding: 4px !important;\
    border-radius: 0;\
}\
\
label {\
    vertical-align: middle;\
    padding: 4px 4px 4px 4px !important;\
}\
\
button {\
    vertical-align: middle;\
    padding: 4px 8px 4px 8px !important;\
    width: inherit;\
}\
\
.Seperator {\
    border-bottom: 1px solid #aaaaaa;\
    border-color: #E0E0E2;\
}\
\
.Group {\
	position: relative;\
}",
		setupCSS: function()
		{
			if (UIFormElements.config.userselect == false)
		    {
				UIFormElements._internals.css += "/* UIFormElement configuration css settings */\
\n\n\
* {\
    user-select: none;\
    -ms-user-select: none;\
    -moz-user-select: none;\
    -webkit-user-select: none;\
}\
\
pre,\
.prettyprint * {\
    user-select: text !important;\
    -ms-user-select: text !important;\
    -moz-user-select: text !important;\
    -webkit-user-select: text !important;\
}";
		    }

			document.head.appendChild(document.createElement("style")).innerHTML = UIFormElements._internals.getCSSStyle();    
		},
		getCSSStyle: function()
		{
			return UIFormElements._internals.css.replace(/{/g, '{\n').replace(/;/g, ';\n').replace(/}/g, '}\n\n');
		},
		traverseAllChildren: function(htmlNode, depth)
		{
			if (htmlNode == undefined) { return; }

			depth = (depth + 1) || 0;

			var uiElement;
			var constructorOptions = {};

			if (htmlNode.attributes != undefined)
			{
				for (var j = 0; j < htmlNode.attributes.length; j++)
				{
					var nodeAttribute = htmlNode.attributes[j];
					
					constructorOptions[nodeAttribute.name] = nodeAttribute.value;
				}
			}

			if (htmlNode.textContent != undefined)
			{
				constructorOptions.text = htmlNode.textContent;
			}

			function containsClass(classNameAttr, className)
			{
				classNameAttr = classNameAttr || "";
				return (classNameAttr.indexOf(className) !== -1);
			}

			function containsNoUIClass(className)
			{
				return containsClass(className, "Group") == false
				    && containsClass(className, "Tab") == false
					&& containsClass(className, "Label") == false
					&& containsClass(className, "Button") == false
					&& containsClass(className, "Checkbox") == false
					&& containsClass(className, "RadioButton") == false
					&& containsClass(className, "Slider") == false
					&& containsClass(className, "DropdownList") == false
					&& containsClass(className, "TextArea") == false
					&& containsClass(className, "TextInput") == false
					&& containsClass(className, "Custom") == false
			}

			if (htmlNode.className.substr(0, 2).toLowerCase() == "ui")
			{
				htmlNode.className = htmlNode.className.substr(2, htmlNode.className.length);
			}

			if
			(
				htmlNode.className == "Group"
				||
				(
					(htmlNode.className == undefined || htmlNode.className == "")
					&& htmlNode.children.length > 0
				)
				||
				containsNoUIClass(htmlNode.className)
			)
			{
				uiElement = UIGroup(constructorOptions);
			}

			if (containsClass(htmlNode.className, "Tab") == true)
			{
				uiElement = UITab(constructorOptions);
			}

			if (containsClass(htmlNode.className, "Label") == true)
			{
				uiElement = UILabel(constructorOptions);
			}

			if (containsClass(htmlNode.className, "Button") == true)
			{
				uiElement = UIButton(constructorOptions);
			}

			if (containsClass(htmlNode.className, "Checkbox") == true)
			{
				uiElement = UICheckbox(constructorOptions);
			}

			if (containsClass(htmlNode.className, "RadioButton") == true)
			{
				uiElement = UIRadioButton(constructorOptions);
			}

			if (containsClass(htmlNode.className, "Slider") == true)
			{
				uiElement = UISlider(constructorOptions);
			}

			if (containsClass(htmlNode.className, "TextArea") == true)
			{
				uiElement = UITextArea(constructorOptions);
			}

			if (containsClass(htmlNode.className, "TextInput") == true)
			{
				uiElement = UITextInput(constructorOptions);
			}

			if (containsClass(htmlNode.className, "DropdownList") == true)
			{
				if (constructorOptions.values != undefined)
				{
					constructorOptions.values = constructorOptions.values.replace('[','').replace(']','').split(",");
				}
				
				uiElement = UIDropdownList(constructorOptions);
			}

			if (containsClass(htmlNode.className, "Custom") == true)
			{
				uiElement = UICustomHTMLElement(constructorOptions);
			}

			if (htmlNode.tagName && htmlNode.tagName.toLowerCase() == "br")
			{
				constructorOptions.tagName = "br";
				uiElement = UICustomHTMLElement(constructorOptions);
			}

			if (containsNoUIClass(htmlNode.className) && depth != 0)
			{
				constructorOptions.text = "";

				for (var i = 0; i < htmlNode.childNodes.length; i++)
				{
					var childNode = htmlNode.childNodes[i];

					if (childNode.nodeType == Node.TEXT_NODE)
					{
						constructorOptions.text += childNode.textContent;
					}
				}

				constructorOptions.htmlNode = htmlNode;
				uiElement = UICustomHTMLElement(constructorOptions);
			}

			var uiChildElement;

			if (htmlNode.children.length > 0)
			{
				for (var i = 0; i < htmlNode.children.length; i++)
				{
					var subHtmlNode = htmlNode.children[i];

					uiChildElement = UIFormElements._internals.traverseAllChildren(subHtmlNode, depth);

					if
					(
						uiElement.type == "UIGroup"
						|| uiElement.type == "UITab"
						|| uiElement.type == "UIForm"
						|| uiElement.type == "UICustomHTMLElement"
					)
					{
						uiElement.add([uiChildElement]);
					}
					else
					{
						console.error("Error: cannot add " + uiChildElement.type + " to the non-group type " + uiElement.type);
					}
				}
			}

			return uiElement;
		},
		getObjectEntries: function(obj)
		{
		    var ownProps = Object.keys(obj)
		    var i = ownProps.length
		    var resArray = new Array(i);

		    while (i--)
		    {
		        resArray[i] = [ownProps[i], obj[ownProps[i]]];
		    }

		    return resArray;
		},
		pad: function(number, size)
		{
		    number = number.toString();

		    while (number.length < size)
		    {
		    	number = "0" + number;
	    	}

		    return number;
		}
	}
}

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

function UILabel(options)
{
	this.bind;
	this.instanceNum;
	this.pollRegId;

	// .text
	// .value
	this.createHTMLElement = function(options)
	{
		options = options || {};
		
		var attributeValues = UIElement.getDefaultAttributeValues(this, options);
		attributeValues._text = options.text || this.defaultAttributes._text;
		attributeValues._value = options.value || this.defaultAttributes._value;
		attributeValues._bind = options.bind || this.defaultAttributes._bind;

	    var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("label"), attributeValues);
	    htmlNode.textContent = attributeValues._text.replace("{value}", "");
	    
	    if (attributeValues._bind != undefined)
	    {
	    	var bindNode;
	    	var instance = this;

	        // poll html node
			var intervalRef = setInterval(function()
	    	{
	    		bindNode = document.getElementById(attributeValues._bind);

	    		if (bindNode != null || bindNode != undefined)
	    		{
	    			htmlNode.textContent = attributeValues._text.replace("{value}", bindNode.value);

	    			if (UIFormElements.config.export.injectBindHandler == false)
	    			{
		    			bindNode.addEventListener(
				           	"input",
				           	function()
				           	{
				           		htmlNode.textContent = attributeValues._text.replace("{value}", bindNode.value);
				           	}
				        );
		    		}
		    		else
		    		{
		    			if
		    			(
		    				UIFormElements.config.export.injectScripts == true
		    				&& UIFormElements._internals.state.injection.labelBindScript == false
		    			)
		    			{
		    				var scriptTag = document.createElement("script");
   				  			scriptTag.textContent = "function setLabel(labelId, bindNodeId) { document.getElementById(labelId).textContent = '{value}'.replace('{value}', document.getElementById(bindNodeId).value); }";
		    				document.body.appendChild(scriptTag);
		    				UIFormElements._internals.state.injection.labelBindScript = true;
		    			}

		    			if (UIFormElements.config.export.injectScripts == true)
		    			{
		    				bindNode.setAttribute("oninput", "setLabel('" + attributeValues._id + "', '" + bindNode.id + "')");
		    			}
		    			else
		    			{
		    				bindNode.setAttribute("oninput", "(function() { document.getElementById('" + attributeValues._id + "').textContent = '" + attributeValues._text + "'.replace('{value}', document.getElementById('" + bindNode.id + "').value); })()");
  							document.getElementById(attributeValues._id).textContent = attributeValues._text.replace('{value}', document.getElementById(bindNode.id).value);
		    			}
		    		}

			        clearInterval(intervalRef);
			        UIFormElements._internals.pollRegister[instance.pollRegId].intervalRef = undefined;
	    		}
	    	}, 50);

			this.pollRegId = UIFormElements._internals.pollRegister.length;

	        UIFormElements._internals.pollRegister.push({
	        	object: this,
	        	intervalRef: intervalRef
	        });
	    }
	    else
	    {
    		htmlNode.textContent = attributeValues._text.replace("{value}", attributeValues._value);
	    }

	    return htmlNode;
	}

    var _construct = function(instance, options)
    {
    	UIElement.call(instance, options);

    	options = options || {};

    	instance.type = "UILabel";
    	instance.defaultAttributes._class = options.class || (options.value != undefined ? "Label Value" : "Label");
    	instance.defaultAttributes._name = options.name || undefined;
    	instance.defaultAttributes._text = options.text || "";
    	instance.defaultAttributes._value = options.value || undefined;
    	instance.defaultAttributes._bind = options.bind || undefined;
    }

    if (this instanceof UILabel)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UILabel(options);
    }
};

function UIGroup(options)
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
		var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("div"), attributeValues);

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

    	instance.type = "UIGroup";
    	instance.defaultAttributes._class = options.class ||  "Group";

    	instance.childUIElements = [];
    }

    if (this instanceof UIGroup)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UIGroup(options);
    }
};

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

function UICustomHTMLElement(options)
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
        var tagName = this.defaultAttributes._htmlNode != undefined ? this.defaultAttributes._htmlNode.localName : (options.tagName || this.defaultAttributes._tagName);
		var htmlNode = this.defaultAttributes._htmlNode != undefined ? UIElement.setHTMLNodeAttributes(this.defaultAttributes._htmlNode, attributeValues) : UIElement.setHTMLNodeAttributes(document.createElement(tagName), attributeValues);
		htmlNode.textContent = options.text || this.defaultAttributes._text;

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

    	instance.type = "UICustomHTMLElement";
    	instance.defaultAttributes._htmlNode = options.htmlNode || undefined;
    	instance.defaultAttributes._class = options.class || undefined;
    	instance.defaultAttributes._tagName = options.tagName || "div";
    	instance.defaultAttributes._text = options.text || undefined;
    	instance.childUIElements = [];
    }

    if (this instanceof UICustomHTMLElement)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UICustomHTMLElement(options);
    }
};

function UITab(options)
{
	this.add = function(uiElements)
	{
		UIElement.addElements(this, uiElements);

		return this;
	}

	// .title
    this.createHTMLElement = function(options)
	{
		options = options || {};
        
        var attributeValues = UIElement.getDefaultAttributeValues(this, options);
        attributeValues._title = options.title || this.defaultAttributes._title;

	    var htmlNode = UIElement.setHTMLNodeAttributes(document.createElement("fieldset"), attributeValues);

        if (this.defaultAttributes._title != undefined)
		{
			var legendNode = document.createElement("legend");
			legendNode.appendChild(document.createTextNode(this.defaultAttributes._title));
			htmlNode.appendChild(legendNode);
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

		instance.type = "UITab";
		instance.defaultAttributes._class = options.class || "Tab";
    	instance.defaultAttributes._title =  options.title != undefined ? options.title : undefined;
    	
    	instance.childUIElements = [];
    }

    if (this instanceof UITab)
    {
     	_construct(this, options);
    }
    else
    {
    	return new UITab(options);
    }
};

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

