var parametro = location.search.split('parametro=')[1];
var stringa_metodo;
if (typeof parametro == "undefined") {
  stringa_metodo = '/home';
} else {
  stringa_metodo = '/home/' + parametro;
  switch (parametro) {
    case '1':
      stringa_metodo = '/orderbydate';
      break;
    case '2':
      stringa_metodo = '/orderbyname';
      break;
    case '3':
      stringa_metodo = '/Dfilterby/Beginner';
      break;
    case '4':
      stringa_metodo = '/Dfilterby/Intermediate';
      break;
    case '5':
      stringa_metodo = '/Dfilterby/Advanced';
      break;
    default:
      break;
  }
}

fetch(stringa_metodo)
  .then(response => response.json())
  .then(data => {
    let classutList = document.getElementById('classut-list');
    let rows = '';
    data.forEach(home => {
      rows += `
        <div class="col-lg-3 col-md-4 col-sm-12">
          <div class="card" onmouseover="getLikes('${home.name}')">
            <div class="file">
              <a href="javascript:void(0);">
                <div class="hover">
                  <button type="button" class="btn btn-light" onclick="window.location.href='reportClasse?parametro=${home.name}'">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag-fill text-danger" viewBox="0 0 16 16">
                      <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12.435 12.435 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A19.626 19.626 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a19.587 19.587 0 0 0 1.349-.476l.019-.007.004-.002h.001"/>
                    </svg>
                  </button>
                </div>
                <br>
                <div class="icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="currentColor" class="bi bi-file-earmark-fill text-info" viewBox="0 0 16 16">
                    <path d="M4 0h5.293A1 1 0 0 1 10 .293L13.707 4a1 1 0 0 1 .293.707V14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zm5.5 1.5v2a1 1 0 0 0 1 1h2l-3-3z"></path>
                  </svg>
                  <br><br>
                </div>
                <div class="file-name">
                  <p class="m-b-5 text-muted">${home.name}.java</p>
                  <small class="date text-muted">${home.description} ${home.level}</small>
                  <small class="date text-success">${home.difficulty}<span class="date text-muted">${home.date}</span></small>
                  <center><span class="badge badge-info">${home.category[0]}</span> <span class="badge badge-info">${home.category[1]}</span> <span class="badge badge-info">${home.category[2]}</span></center>
                  <center><span>
                    <br>
                    <button type="button" onclick="downloadFile('${home.name}')" class="btn btn-success btn-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-down-circle" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v5.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V4.5z"></path>
                      </svg>
                      Download
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span id="${home.name}" class="text-danger"></span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" onclick="newLike('${home.name}')" fill="currentColor" class="bi bi-heart-fill text-danger" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
                    </svg>
                  </span></center>
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

function getLikes(name) {
  const endpoint = '/getLikes/' + name; // URL dell'endpoint API

  return fetch(endpoint)
    .then(response => response.text())
    .then(data => {
      console.log(data); // log del risultato della chiamata API
      document.getElementById(name).innerHTML = data;
      return data; // restituisce il risultato della chiamata API
    })
    .catch(error => console.error(error)); // gestione degli errori
}

function downloadFile(name) {
  fetch('/downloadFile/' + name)
    .then(response => response.blob())
    .then(blob => {
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = name + '.java';
      link.click();
    })
    .catch(error => console.error(error));
}

function newLike(name) {
  fetch(`/newlike/${name}`, {
    method: 'POST'
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Errore durante il like.');
    }
    // gestisci la risposta del server
    location.reload();
  })
  .catch(error => console.error(error));
}
