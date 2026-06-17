// initialization with procedural JS instructions:

function useServer() {
    var x = document.getElementById("server-list");
    x.disabled = !x.disabled;
}

function showPassword() {
    var x = document.getElementById("password-field");
    x.type = x.type === "password" ? "text" : "password";
}

var labelWidth = "width: 80px;";

// create two groups and add its elements to it
var uiServer = UIGroup().add([
    UICheckbox({ id: "server", text: "Use another Server:", onchange: "useServer()", checked: true }),
    UIDropdownList({ id: "server-list", values: ["USA", "Germany", "Japan", "Moscow"], name: "server" })
])

var uiButtons = UIGroup().add([
    UIButton({ id: "submit-button", type: "submit", text: "Submit Form" }),
    UIButton({ id: "reset-button", type: "reset", text: "Reset Form" })  
]);

// create a tab with another groups and add the other two groups into the list
var uiForm = UIForm({ id: "login-form", method: "get", action: "redirect_page.php" }).add([
    UITab({ title: "Login Form", style: "width: 245px;" }).add([
        UIGroup().add([
            UILabel({ id: "user-name", text: "Username: ", style: labelWidth }),
            UITextInput({ placeholder: "Type in the username", size: 12, name: "username" })
        ]),
        UIGroup().add([
            UILabel({ id: "email-address", text: "E-Mail: ", style: labelWidth }),
            UITextInput({ placeholder: "Type in the e-mail", size: 12, name: "email" })
        ]),
        UIGroup().add([
            UILabel({ id: "password", text: "Password: ", style: labelWidth }),
            UITextInput({ id: "password-field", placeholder: "Type in the password", size: 12, name: "password", type: "password" }),
            UICheckbox({ id: "showpass", text: "Show password", onchange: "showPassword()" })
        ]),
        UISeperator(),
        uiServer,
        UICheckbox({ id: "remember", text: "Remember login", name: "remember" }),
        UISeperator(),
        uiButtons,
    ]),
    UICustomHTMLElement({
        htmlNode: document.createElement("div"),
        text: new Date().toUTCString(),
        style: "color: #888888; margin: 16px 0 0 4px;"
    })
]);