// initialization with procedural calculator example:

var calcStyle = {
    display: "\
color: #000000;\
border-radius: 8px;\
border-top: 4px solid #666666;\
border-right: 4px solid #222222;\
border-bottom: 4px solid #777777;\
border-left: 4px solid #222222;\
background-color: #CFE3E4;\
text-align: right;\
width: 85%;\
margin: 0 4px 16px 4px;\
height: 48px;\
margin-left: 4px;\
margin-bottom: 8px;"
}

function calcInput(c)
{
    var calcDisplay = document.getElementById("calc-display");
    var notCtrl = (c != "CLEAR" && c != "BACK" && c != "SUM");

    if (calcDisplay.value != "0" && notCtrl)
    {
        calcDisplay.value += c;
    }
    if (calcDisplay.value == "0" & notCtrl)
    {
        calcDisplay.value = c;
    }
    if (c == "CLEAR")
    {
        calcDisplay.value = "0";
    }
    if (c == "BACK")
    {
        calcDisplay.value = calcDisplay.value.substring(0, calcDisplay.value.length - 1);;
    }
    if (c == "SUM")
    {
        calcDisplay.value = eval(calcDisplay.value);
    }

    calcDisplay.scrollLeft = calcDisplay.scrollWidth;
}

var calculator = UITab({ id: "calculator", style: "width: 236px; padding: 32px 0 8px 8px;" }).add([
    UITextInput({ id: "calc-display", value: "0", style: calcStyle.display, readonly: true }),
    UIGroup({ style: "display: block; margin: 0;" }).add([
        UIButton({ text: "(", inline: true, onclick: "calcInput('(')" }),
        UIButton({ text: ")", inline: true, onclick: "calcInput(')')" }),
        UIButton({ text: "←", style: "width: 104px;", inline: true, onclick: "calcInput('BACK')" })
    ]),
    UIGroup({ style: "display: block; margin: 0;" }).add([
        UIButton({ text: "C", inline: true, onclick: "calcInput('CLEAR')" }),
        UIButton({ text: "÷", inline: true, onclick: "calcInput('/')" }),
        UIButton({ text: "x", inline: true, onclick: "calcInput('*')" }),
        UIButton({ text: "-", inline: true, onclick: "calcInput('-')" })
    ]),
    UIGroup({ style: "display: block; margin: 0;", inline: true }).add([
        UIGroup({ style: "display: block;" }).add([
            UIButton({ text: "7", inline: true, onclick: "calcInput('7')" }),
            UIButton({ text: "8", inline: true, onclick: "calcInput('8')" }),
            UIButton({ text: "9", inline: true, onclick: "calcInput('9')" })
        ]),
        UIGroup({ style: "display: block; margin: 0;"}).add([
            UIButton({ text: "4", inline: true, onclick: "calcInput('4')" }),
            UIButton({ text: "5", inline: true, onclick: "calcInput('5')" }),
            UIButton({ text: "6", inline: true, onclick: "calcInput('6')" })
        ]),
        UIGroup({ style: "display: block; margin: 0;"}).add([
            UIButton({ text: "1", inline: true, onclick: "calcInput('1')" }),
            UIButton({ text: "2", inline: true, onclick: "calcInput('2')" }),
            UIButton({ text: "3", inline: true, onclick: "calcInput('3')" })
        ]),
        UIGroup({ style: "display: block; margin: 0;"}).add([
            UIButton({ text: "0", style: " width: 104px;" , inline: true, onclick: "calcInput('0')" }),
            UIButton({ text: ",", inline: true, onclick: "calcInput('.')" })
        ])
    ]),
    UIGroup({ style: "display: block; vertical-align: top;", inline: true }).add([
        UIButton({ text: "+", style: "height: 74px; margin-bottom: 8px;", inline: false, onclick: "calcInput('+')"  }),
        UIButton({ text: "=", style: "height: 74px;", inline: false, onclick: "calcInput('SUM')" })
    ])
]);