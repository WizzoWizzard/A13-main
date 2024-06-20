function Registrazione_Invito() {

    const invitationToken = document.getElementById('invitationToken').value;
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const usernameSuffix = document.getElementById('usernameSuffix').textContent.trim();
    const usernameInput = document.getElementById('username').value;
    const username = usernameInput + usernameSuffix;
    const password = document.getElementById('password').value;
    const emailDomain = document.getElementById('emailDomain').value;
    const email = document.getElementById('email').value + emailDomain;

    const data = {

        invitationToken: invitationToken,
        nome: nome,
        cognome: cognome,
        username: username,
        password: password,
        email: email
    };

    //MODIFICA (11/02/2024) : Gestione feedback form registrazione
    fetch('/login_with_invitation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => {
            console.log('Response:', response);
            if (response.status == 200) {
                window.location.href = "/loginAdmin";
            }
            else {
                response.text().then(errorMessage => {
                    alert(errorMessage);                  // pop-up che mostra il messaggio di errore restituito dal controller
                });
            }
        })
        .catch((error) => {
            window.location.href = "/registraAdmin";
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