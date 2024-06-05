function Cambia_psw_admin() {
    const email = document.getElementById('email').value;
    const resetToken = document.getElementById('resetToken').value;
    const password = document.getElementById('password').value;
  
    const data = {
      email: email,
      resetToken: resetToken,
      password: password
    };
  
    fetch('/password_change_admin', {
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
        window.location.href = "/loginAdmin";
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
  