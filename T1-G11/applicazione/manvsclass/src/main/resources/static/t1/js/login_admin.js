//MODIFICA (11/02/2024) : Controllo form login */
function Logi() {

    const usernameSuffix = document.getElementById('usernameSuffix').textContent.trim();
    const usernameInput = document.getElementById('username').value;
    const username = usernameInput + usernameSuffix;
    const password = document.getElementById('password').value;

    if (!usernameInput || !password) {
        alert("Per favore, compila tutti i campi obbligatori!");
        return;
    }

    const data = {
        username: username,
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
            alert('Si è verificato un errore. Per favore riprova.');
        });
}

document.getElementById('togglePassword').addEventListener('click', function (e) {
    const password = document.getElementById('password');
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    this.classList.toggle('fa-eye');
    this.classList.toggle('fa-eye-slash');
});