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
   				  			scriptTag.textContent = "function setLabel(labelId, bindNodeId, text) { document.getElementById(labelId).textContent = text.replace('{value}', document.getElementById(bindNodeId).value); }";
		    				document.body.appendChild(scriptTag);
		    				UIFormElements._internals.state.injection.labelBindScript = true;
		    			}

		    			if (UIFormElements.config.export.injectScripts == true)
		    			{
		    				bindNode.setAttribute("oninput", "setLabel('" + attributeValues._id + "', '" + bindNode.id + "', '" + attributeValues._text + "')");
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