document.addEventListener("DOMContentLoaded", function() {
    fetch('/findreport')
      .then(response => response.json())
      .then(data => {
        let classutList = document.getElementById('classut-list');
        let rows = '';
        data.forEach(home => {
          rows += `
            <div class="col-lg-3 col-md-4 col-sm-12">
              <div class="card">
                <div class="file">
                  <a href="javascript:void(0);">
                    <br>
                    <div class="icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="currentColor" class="bi bi-envelope-exclamation-fill text-danger" viewBox="0 0 16 16">
                        <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555ZM0 4.697v7.104l5.803-3.558L0 4.697ZM6.761 8.83l-6.57 4.026A2 2 0 0 0 2 14h6.256A4.493 4.493 0 0 1 8 12.5a4.49 4.49 0 0 1 1.606-3.446l-.367-.225L8 9.586l-1.239-.757ZM16 4.697v4.974A4.491 4.491 0 0 0 12.5 8a4.49 4.49 0 0 0-1.965.45l-.338-.207L16 4.697Z"/>
                        <path d="M12.5 16a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm.5-5v1.5a.5.5 0 0 1-1 0V11a.5.5 0 0 1 1 0Zm0 3a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
                      </svg>
                      <br><br>
                    </div>
                    <div class="file-name">
                      <p class="m-b-7 text-dark font-weight-bold">Email utente:</p>
                      <p class="m-b-7 text-dark">${home.email}</p>
                      <p class="m-b-7 text-dark font-weight-bold">Nome classe:</p>
                      <p class="m-b-7 text-dark">${home.name}.java</p>
                      <p class="m-b-7 text-dark font-weight-bold">Descrizione:</p>
                      <p class="m-b-6 text-danger font-italic">${home.commento}</p>
                      <p class="m-b-3 text-muted font-italic">${home.date}</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>
          `;
        });
        classutList.innerHTML = rows;
      })
      .catch(error => console.error(error));
  });
  