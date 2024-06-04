function Regi() {
    const nome = document.getElementById('nome').value;
    const cognome = document.getElementById('cognome').value;
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
  
    const data = {
      nome: nome,
      cognome: cognome,
      username: username,
      email: email,
      password: password
    };
  
    fetch('/registraAdmin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(response => {
      console.log('Response:', response);
      if(response.status == 200) {
        window.location.href = "/home_adm";
      } else {
        response.text().then(errorMessage => {
          alert(errorMessage); // pop-up che mostra il messaggio di errore restituito dal controller
        });
      }
    })
    .catch((error) => {
      window.location.href = "/registraAdmin";
      console.error('Error:', error);
      // Aggiungi qui il codice per gestire gli errori
    });
  }
  