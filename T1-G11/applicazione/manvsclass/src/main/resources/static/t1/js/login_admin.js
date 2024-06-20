//MODIFICA (11/02/2024) : Controllo form login */
function Logi() {

    lsRememberMe();

    const usernameInput = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const selectedSuffix = document.getElementById('usernameSuffix').value;

    const fullUsername = usernameInput + selectedSuffix;

    const data = {
        username: fullUsername,
        password: password
    };

    fetch('/loginAdmin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log('Response:', response);
            if (response.status == 200) {

                response.text().then(okMessage => {
                    alert(okMessage);
                })

                window.location.href = "/home_adm";
            }
            else {
                response.text().then(errorMessage => {
                    alert(errorMessage);
                })
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            //Aggiungi qui il codice per gestire gli errori
        });
}

document.getElementById('togglePassword').addEventListener('click', function (e) {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});

const rmCheck = document.getElementById("rememberMe"),
    emailInput = document.getElementById("username"),
    passwordInput = document.getElementById("password");

if (localStorage.checkbox && localStorage.checkbox !== "") {
    rmCheck.setAttribute("checked", "checked");
    emailInput.value = localStorage.username;
    passwordInput.value = localStorage.password;
} else {
    rmCheck.removeAttribute("checked");
    emailInput.value = "";
    passwordInput.value = "";
}

function lsRememberMe() {
    if (rmCheck.checked && emailInput.value !== "" && passwordInput.value !== "") {
        localStorage.username = emailInput.value;
        localStorage.password = passwordInput.value;
        localStorage.checkbox = rmCheck.value;
    } else {
        localStorage.username = "";
        localStorage.password = "";
        localStorage.checkbox = "";
    }
}