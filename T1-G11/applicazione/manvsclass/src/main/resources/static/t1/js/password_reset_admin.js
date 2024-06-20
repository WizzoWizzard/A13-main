//MODIFICA (11/02/2024) : Controllo form login */
function Reimposta_psw_admin() {

    const emailDomain = document.getElementById('emailDomain').value;
    const email = document.getElementById('email').value + emailDomain;

    const data = {
        email: email
    };

    fetch('/password_reset_admin', {
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
                });
                window.location.href = "/password_change_admin";
            } else {
                response.text().then(errorMessage => {
                    alert(errorMessage);
                });
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            //Aggiungi qui il codice per gestire gli errori
        });
}