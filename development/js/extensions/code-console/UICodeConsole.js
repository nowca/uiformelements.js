/*
 *  UICodeConsole.js
 *
 *  UIFormElements.js HTML Form toolkit extension
 *
 *  Copyright 2026 Jonathan Nowca
 *  License: CC BY-NC-SA
 */

var UICodeConsole = {
	VERSION: "0.8b",
	highlightForm: true,
	config: {
		highlightForm: true,
		export: {
			generateIds: false,
			fullHtmlDocument: true,
			embeddedCSS: true,
			injectScripts: false,
			formattedSpaces: false,
			extraHtml: ""
		}
	},
	outputHtml: {
		selected: 0,
		content: [],
		htmlOutputNode: undefined,
		codeOutputNode: undefined
	},
	load: function()
	{
		UICodeConsole._internals.active = true;
		UIFormElements._internals.css += UICodeConsole._internals.css;
		UICodeConsole._internals.formatDomStructure();
		UICodeConsole._internals.buildCodeConsole();
		UICodeConsole._internals.splitCodeConsole();

		UICodeConsole.config.export.highlightForm = localStorage.getItem("highlightForm") != undefined ? ((localStorage.getItem("highlightForm")  === "true")) : true;
		document.getElementById("toggle-highlight").checked = UICodeConsole.config.export.highlightForm;

		UIFormElements.config.generateIds = localStorage.getItem("generateIds") != undefined ? ((localStorage.getItem("generateIds")  === "true")) : true;
		document.getElementById("generate-id").checked = UIFormElements.config.generateIds;

		UICodeConsole.config.export.fullHtmlDocument = localStorage.getItem("fullHtmlDocument") != undefined ? ((localStorage.getItem("fullHtmlDocument")  === "true")) : true;
		document.getElementById("export-html-body").checked = UICodeConsole.config.export.fullHtmlDocument;

		UICodeConsole.config.export.embeddedCSS = localStorage.getItem("embeddedCSS") != undefined ? ((localStorage.getItem("embeddedCSS")  === "true")) : true;
		document.getElementById("export-embedded-css").checked = UICodeConsole.config.export.embeddedCSS;

		UICodeConsole.config.export.injectScripts = localStorage.getItem("injectScripts") != undefined ? ((localStorage.getItem("injectScripts")  === "true")) : true;
		document.getElementById("export-script-injection").checked = !UICodeConsole.config.export.injectScripts;

		UICodeConsole.config.export.formattedSpaces = localStorage.getItem("formattedSpaces") != undefined ? ((localStorage.getItem("formattedSpaces")  === "true")) : false;
		document.getElementById("export-spaces").checked = UICodeConsole.config.export.formattedSpaces;

        document.getElementById("export-html").setAttribute(
            "onclick",
            "UICodeConsole.download('ui-form-html-source')"
        );

        document.getElementById("export-css").setAttribute(
            "onclick",
            "UICodeConsole.getCSSFile()"
        );
	},
	getCSSFile: function()
	{
		var cssFilename = UIFormElements.config.themes[UIFormElements.config.theme].toLowerCase() + ".css";
		var cssLinks = document.querySelectorAll('link');
		var cssFileURL;

		for (var i = 0; i < cssLinks.length; i++)
		{
			var cssLink = cssLinks[i];

			if (cssLink.href.indexOf(cssFilename) !== -1)
			{
				cssFileURL = cssLink.href
			}
		}

		var link = document.createElement('a');
        link.href = cssFileURL;
        link.download = cssFileURL;
        link.target = "_blank";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
	},
	add: function(rootNode)
	{
		if (UICodeConsole._internals.active == true)
		{
			window.addEventListener('onformloaded', function (e)
			{
			    var outputList = document.getElementById("code-output-list");
			
				if (outputList.children[0].value == "_none")
				{
					outputList.disabled = false;
					outputList.innerHTML = "";
				}

				UICodeConsole.outputHtml.content.push({
		            htmlNode: rootNode,
		            htmlSource: style_html(rootNode.innerHTML, {})
		        });

		        var pos = UICodeConsole.outputHtml.content.length-1;

		        UICodeConsole.outputHtml.content[pos].htmlSource = UICodeConsole.outputHtml.content[pos].htmlSource[0] == " " ? UICodeConsole.outputHtml.content[pos].htmlSource.substring(1) : UICodeConsole.outputHtml.content[pos].htmlSource;

		        var outputList = document.getElementById("code-output-list");
		        var htmlNode = UICodeConsole.outputHtml.content[pos].htmlNode;
		        var elementName = outputList.children.length + ": " + htmlNode.tagName;
		        elementName += htmlNode.id != undefined && htmlNode.id.length > 0 ? "#" + htmlNode.id : "";

		        var optionElement = document.createElement('option');
		        optionElement.textContent = elementName;
		        optionElement.value = outputList.length;
		        outputList.appendChild(optionElement);

		        //UICodeConsole.outputHtml.content[pos].htmlNode.classList.add("CodeOutput");
		        UICodeConsole.toggleHighlight(UICodeConsole.config.export.highlightForm)

		        var span = document.createElement('span');
		        span.classList.add("CodeOutputName")
		        span.textContent = elementName;
		        span.style = "position: absolute; top: -20px; right: 0;";
		        htmlNode.appendChild(span);
		       
		       	if (outputList.onchange == undefined)
		       	{
		       		outputList.onchange = UICodeConsole._internals.changeCodeOutput;
		       	}

		       	UICodeConsole._internals.refresh();
			});
       	}
	},
	toggleHighlight: function(checked)
	{
		if (checked == false)
		{
			for (var i = 0; i < UICodeConsole.outputHtml.content.length; i++)
            {
                UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutputActive");
                UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutput");
            }
            UICodeConsole.config.highlightForm = false;
		}
		else
		{
			var selected = document.getElementById("code-output-list").value;

			for (var i = 0; i < UICodeConsole.outputHtml.content.length; i++)
            {
            	if (i != selected)
            	{
            		UICodeConsole.outputHtml.content[i].htmlNode.classList.add("CodeOutput");
            	}
            }
            UICodeConsole.outputHtml.content[selected].htmlNode.classList.add("CodeOutputActive");
			UICodeConsole.config.highlightForm = true;
		}

		localStorage.setItem("highlightForm", UICodeConsole.config.highlightForm);
	},
	setIds: function(checked)
	{
		UIFormElements.config.generateIds = checked;
		localStorage.setItem("generateIds", checked);
		window.location.reload();
	},
	setFullHtml: function(checked)
	{
		UICodeConsole.config.export.fullHtmlDocument = checked;
		localStorage.setItem("fullHtmlDocument", checked);
	},
	setEmbeddedCSS: function(checked)
	{
		UICodeConsole.config.export.embeddedCSS = checked;
		localStorage.setItem("embeddedCSS", checked);
	},
	setScriptInjection: function(checked)
	{
		checked = !checked;
		UICodeConsole.config.export.injectScripts = checked;
		localStorage.setItem("injectScripts", checked);
		window.location.reload();
	},
	setFormattedSpaces: function(checked)
	{
		var infoText = "Exporting code with HTML-spaces can cause HTML formatting problems and display issues in spacing of elements.";
		var checkbox = document.getElementById("export-spaces");

		if (checkbox.checked == true)
		{
			if (confirm(infoText) == true)
			{
				UICodeConsole.config.export.formattedSpaces = true;
				localStorage.setItem("formattedSpaces", true);
			}
			else
			{
				UICodeConsole.config.export.formattedSpaces = false;
				localStorage.setItem("formattedSpaces", false);
				checkbox.checked = false;
			}
		}
		else
		{
			UICodeConsole.config.export.formattedSpaces = false;
			localStorage.setItem("formattedSpaces", false);
		}
	},
	download: function(filename)
    {
    	var timestamp = new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-");
    	var scriptInjection = UICodeConsole.config.export.injectScripts == true ? '<script>\n\
	function setLabel(labelId, bindNodeId, text) { document.getElementById(labelId).textContent = text.replace("{value}", document.getElementById(bindNodeId).value); }\n\
</script>' : "";
		var htmlDocString_head;
		var htmlDocString_tail;
		var embeddedCSS = "";
		var cssFilename = UIFormElements.config.themes[UIFormElements.config.theme].toLowerCase() + ".css";

		var styleTagList;
		if (UICodeConsole.config.export.embeddedCSS == true)
		{
			styleTagList = document.querySelectorAll('style');
			for (var i = 0; i < styleTagList.length; i++)
			{
				embeddedCSS += "<style>" + styleTagList[i].textContent + "</style>\n";
			}
		}
		else
		{
			embeddedCSS = "";
		}

		if (UICodeConsole.config.export.fullHtmlDocument == true)
		{
			htmlDocString_head = '<!DOCTYPE html>\n\
<html lang="en">\n\
<head>\n\
    <meta charset="UTF-8">\n\
    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n\
    <title>UIFormElement.js HTML export ' + timestamp + '</title>\n\
	<link rel="stylesheet" href="' + cssFilename + '">' + embeddedCSS +
'</head>\n\
<body class="' + UIFormElements.config.theme + '">\n';
			htmlDocString_tail = '\n\
\n</body>\n\
</html>';
		}
		else
		{
			htmlDocString_head = "";
			htmlDocString_tail = "";
		}

    	var data = htmlDocString_head;

    	if (UICodeConsole.config.export.formattedSpaces == false)
		{
			data += UICodeConsole.outputHtml.content[UICodeConsole.outputHtml.selected].htmlSource.replace(/    /g, "").replace(/\n/g, ""); //.replaceAll("    ", "").replaceAll("\n", "");
		}
		else
		{
			data += UICodeConsole.outputHtml.content[UICodeConsole.outputHtml.selected].htmlSource;
		}

		data += scriptInjection + htmlDocString_tail;

        const blob = new Blob([data], {type: 'text/plain'});
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = filename + "-" + new Date().toISOString().replace(/:/g, "-").replace(/\./g, "-") + ".html";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    },
	_internals:
	{
		active: false,
		/* css source-code included from prettify-modified.css into program code */
		css: "/**\
 * @license\
 * Copyright (C) 2015 Google Inc.\
 *\
 * Licensed under the Apache License, Version 2.0 (the \"License\");\
 * you may not use this file except in compliance with the License.\
 * You may obtain a copy of the License at\n\
 *\
 *      http://www.apache.org/licenses/LICENSE-2.0\
 *\
 * Unless required by applicable law or agreed to in writing, software\
 * distributed under the License is distributed on an \"AS IS\" BASIS,\
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.\
 * See the License for the specific language governing permissions and\
 * limitations under the License.\
 */\
\
/* Pretty printing styles. Used with prettify.js. */\
\
/* SPAN elements with the classes below are added by prettyprint. */\
.pln { color: #204061 !important }  /* plain text */\
\
@media screen, print, projection {\
  .str { color: #658923 !important }  /* string content */\
  .kwd { color: #204061 !important }  /* a keyword */\
  .com { color: #066 !important }  /* a comment */\
  .typ { color: #956480 !important }  /* a type name */\
  .lit { color: #066 !important }  /* a literal value */\
  /* punctuation, lisp open bracket, lisp close bracket */\
  .pun, .opn, .clo { color: #660 !important }\
  .tag { color: #517194 !important }  /* a markup tag name */\
  .atn { color: #956480 !important }  /* a markup attribute name */\
  .atv { color: #658923 !important }  /* a markup attribute value */\
  .dec, .var { color: #956480 !important }  /* a declaration; a variable name */\
  .fun { color: red }  /* a function name */\
}\
\
/* Put a border around prettyprinted code snippets. */\
pre.prettyprint { padding: 2px; border: 1px solid #888 !important }\
\
/* Specify class=linenums on a pre to get line numbering */\
ol.linenums { margin-top: 0; margin-bottom: 0 } /* IE indents via margin-left */\
\
li::marker {\
  color: #bbbbbb;\
}\
\
/* UICodeConsole extension css settings */\
\n\n\
#html-code-output pre span {\
    padding: 0 !important;\
}\
\
.CodeOutput,\
.CodeOutputActive {\
    position: relative;\
    margin: 4px;\
    padding: 16px;\
}\
\
.CodeOutput {\
    border: 1px dashed #aaaaaa;\
}\
\
.CodeOutputActive {\
    border: 1px dashed #00aaaa;\
}\
\
.CodeOutputActive .CodeOutputName {\
    color: #00aaaa;\
}\
\
.CodeOutput .CodeOutputName {\
    color: #aaaaaa;\
}\
\
pre {\
    padding-left: 8px;\
}\
\
pre,\
#html-code-output-content {\
    padding-top: 8px;\
    padding-bottom: 8px;\
}\
\
#html-code-output * {\
	font-family: Verdana, Arial, monospace !important;\
    font-size: 12px !important;\
    font-weight: normal;\
}\
\
pre,\
#html-code-output-content * {\
    font-family: monospace !important;\
}\
\
#console-code-buttons button {\
	border-radius: 4px;\
}\
\
.gutter {\
    float: none !important;\
    position: relative;\
    display: inline-block;\
    height: 100vh;\
\
    cursor: ew-resize;\
    cursor: -moz-ew-resize;\
    cursor: -webkit-ew-resize;\
\
    background-color: #3C3C3C;\
    border-right: 1px solid #5E5E5E;\
}\
\
.gutter:hover {\
    background-color: #4D4D4D;\
}\
\
.gutter div {\
	position: absolute; width: 2px;\
    height: 64px;\
    border: 2px dotted #888888;\
    left: 2px;\
    bottom: 50%;\
}",
		formatDomStructure: function()
		{
			if (UICodeConsole.outputHtml.codeOutputNode == undefined)
			{
				UICodeConsole.outputHtml.codeOutputNode = document.createElement("div");
				UICodeConsole.outputHtml.codeOutputNode.id = "code-dump-output";
				UICodeConsole.outputHtml.codeOutputNode.style = "position: relative; display: inline-block; overflow: hidden; height: 100vh;";
				document.body.appendChild(UICodeConsole.outputHtml.codeOutputNode);

				var html = document.body.innerHTML;
				UICodeConsole.outputHtml.htmlOutputNode = document.createElement("div");
				UICodeConsole.outputHtml.htmlOutputNode.id = "html-output";
				UICodeConsole.outputHtml.htmlOutputNode.style = "overflow: scroll; height: 100vh; display: inline-block;";
				document.body.appendChild(UICodeConsole.outputHtml.htmlOutputNode);

				var innerContainer = document.createElement("div");
				innerContainer.id = "html-output-inner-container";
				innerContainer.style.setProperty("padding", window.getComputedStyle(document.body).padding || "32px");
				UICodeConsole.outputHtml.htmlOutputNode.appendChild(innerContainer);

				var nodes = document.querySelectorAll("body > *");

				for (var i = 0; i < nodes.length; i++)
				{
					var node = nodes[i];

					if (node.id != "html-output" && node.id != "code-dump-output" && node.tagName.toLowerCase() != "script")
					{
						UICodeConsole.outputHtml.htmlOutputNode.children[0].appendChild(node);
					}
				}

				document.getElementsByTagName("body")[0].style = "padding: 0 !important;";
			}
		},
		buildCodeConsole: function()
		{
			var buttonStyle = "position: relative; width: auto; height: 32px; margin: 0 0 2px 10px; padding: 0;";

			var uiConsoleCodeButtons = UIGroup({
				id: "console-code-buttons",
				style: "position: absolute; bottom: 20px; margin: 0; padding: 0; width: 100%;"
			}).add([
				UIGroup({ style: "margin: 8px;" }).add([
					UICheckbox({ id: "toggle-highlight", text: "Show UI Form highlight marker", style: "min-width: 200px; border-right: 1px solid #555555; color: #cccccc;", inline: true, checked: true, onchange: "UICodeConsole.toggleHighlight(this.checked)" }),
					UICheckbox({ id: "generate-id", text: "Generate id on unset id", style: "margin-left: 16px; color: #cccccc;", inline: true, checked: (localStorage.getItem("generateIds") || true), onchange: "UICodeConsole.setIds(this.checked)" })
				]),
				UISeperator({ style: "margin: 0 0 10px 8px; border-color: #555555;" }),
				UIGroup({ style: "margin: 8px;" }).add([
					UIGroup().add([
						UICheckbox({ id: "export-html-body", text: "Export with HTML head + body", style: "min-width: 200px; border-right: 1px solid #555555; color: #cccccc;;", inline: true, checked: true, onchange: "UICodeConsole.setFullHtml(this.checked)" }),
						UICheckbox({ id: "export-embedded-css", text: "Export embedded CSS", style: "margin-left: 16px; color: #cccccc;", inline: true, checked: true, onchange: "UICodeConsole.setEmbeddedCSS(this.checked)" })
					]),
					UICheckbox({ id: "export-script-injection", text: "Export events in <input oninput=\"...\"> instead in <script>", style: "color: #cccccc;", inline: false, checked: (localStorage.getItem("injectScripts") || true), onchange: "UICodeConsole.setScriptInjection(this.checked)" }),
					UICheckbox({ id: "export-spaces", text: "Export with formatted HTML spaces", style: "color: #cccccc;", inline: false, checked: (localStorage.getItem("formattedSpaces") || false), onchange: "UICodeConsole.setFormattedSpaces(this.checked)" })
				]),
				UISeperator({ style: "margin: 0 0 14px 8px; border-color: #555555;" }),
				UIGroup().add([
					UIButton({
						id: "about",
						text: "About",
						style: buttonStyle,
						onclick: "UICodeConsole._internals.aboutDialog()"
					}),
					UIButton({
						id: "copy-to-clipboard",
						text: "Copy to clipboard",
						style: buttonStyle
					}),
					UIButton({
						id: "export-html",
						text: "Export HTML-File",
						style: buttonStyle
					}),
					UIButton({
						id: "export-css",
						text: "Get CSS-Theme",
						style: buttonStyle
					})
				])
			]);

			var codeConsoleHtmlOutput = UIGroup({
				id: "html-code-output",
				title: "Generated HTML Output",
				style: "background-color: #3C3C3C; width: 100%; height: 100%; padding: 0 10px 10px 0;"
			}).add([
				UIGroup().add([
					UILabel({
						text: "Generated HTML Output",
						style: "font-weight: bold; font-size: 12px; background-color: #406161; height: 12px; padding: 10px 0 10px 24px !important; color: #ffffff; position: absolute; left: 0; right: 0;"
					}),
					UIDropdownList({
						id: "code-output-list",
						values: { "_none": "Use UICodeConsole.add() to load the code output" },
						style: "float: right; position: absolute; right: 0; width: 50%; height: 32px",
						disabled: "true"
					})
				]),
				UICustomHTMLElement({
					tagName: "pre",
					id: "html-code-output-content",
					class: "prettyprint lang-html linenums",
					style: "background-color: #eaeaea; width: auto; overflow: scroll; position: absolute; top: 20px; bottom: 200px; left: 0; right: 10px; box-shadow: 0px 0px 10px 4px #cccccc inset;",
				}),
				uiConsoleCodeButtons
			]);

			UICodeConsole.outputHtml.codeOutputNode.appendChild(codeConsoleHtmlOutput.createHTMLElement());

			if (uiConsoleCodeButtons != undefined)
			{
				document.getElementById("copy-to-clipboard").onclick = function()
				{
		       		var htmlSourceOutput = UICodeConsole.outputHtml.content[document.getElementById("code-output-list").value].htmlSource;

					if (navigator.clipboard != undefined)
					{
						try
						{
							navigator.clipboard.writeText(htmlSourceOutput);
						}
						catch (error)
						{
							console.error(error.message);
						}
					}

					var codeOutput = document.querySelectorAll("#html-code-output-content span");
					var codeSelection = document.createRange();
					codeSelection.setStartBefore(codeOutput[0]);
					codeSelection.setEndAfter(codeOutput[codeOutput.length-1]);
					window.getSelection().addRange(codeSelection);
				}
			}
		},
		splitCodeConsole: function()
		{
			Split([
				UICodeConsole.outputHtml.codeOutputNode.id,
				UICodeConsole.outputHtml.htmlOutputNode.id
			],
			{
				gutter: true,
	        	widths: [30, 70],
	        	minWidth: 420
		    });

		    var gutter = document.getElementsByClassName("gutter")[0];
		    gutter.appendChild(document.createElement("div"));

		    window.onresize = function()
		    {
		    	Split([
					UICodeConsole.outputHtml.codeOutputNode.id,
					UICodeConsole.outputHtml.htmlOutputNode.id
				],
				{
					gutter: false,
		        	widths: [30, 70],
		        	minWidth: 420
			    });
		    }
		},
		formatHtml: function(s)
		{
		    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/&lt;script src[\s\S]*?&gt;&lt;\/script&gt;|&lt;!--\?[\s\S]*?--&gt;|&lt;pre\b[\s\S]*?&lt;\/pre&gt;/g, '<span class="operative">$&<\/span>');
		},
		refresh: function()
		{
			UICodeConsole._internals.changeCodeOutput({ target: { value: 0 } });
		},
		changeCodeOutput: function(e)
		{
			value = e.target.value;

			UICodeConsole.outputHtml.selected = Number(value);

			if (UICodeConsole.config.highlightForm == true)
			{
				for (var i = 0; i < UICodeConsole.outputHtml.content.length; i++)
		        {
		            UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutputActive");
		            UICodeConsole.outputHtml.content[i].htmlNode.classList.remove("CodeOutput");

		            if (i != value)
		            {
		                UICodeConsole.outputHtml.content[i].htmlNode.classList.add("CodeOutput");
		            }
		        }

		        UICodeConsole.outputHtml.content[value].htmlNode.classList.add("CodeOutputActive");
		    }

	        document.getElementById("html-code-output-content").innerHTML = UICodeConsole._internals.formatHtml(UICodeConsole.outputHtml.content[value].htmlSource);
	        prettyPrint();
		},
		aboutDialog: function()
		{
			document.body.style = "padding: 0 !important; filter: blur(20px);";
			setTimeout(function() {
				alert("UIFormElements.js v" + UIFormElements.VERSION + "\n\
UICodeConsole.js v" +  UICodeConsole.VERSION + " extension\n\n\
Legacy-compatible HTML Form toolkit\n\n\
Copyright 2026 Jonathan Nowca - License: CC BY-NC-SA");
				document.body.style = "padding: 0 !important;";
			}, 100);
		}
	}
};