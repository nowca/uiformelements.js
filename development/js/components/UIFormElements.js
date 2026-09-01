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

        if (document.body != undefined && document.body.className != undefined)
        {
	        for (var i = 0; i < themes.length; i++)
	        {
	        	document.body.className = document.body.className.replace(currentTheme, "");
	        }

	        document.body.classList.add(value);
	    }
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