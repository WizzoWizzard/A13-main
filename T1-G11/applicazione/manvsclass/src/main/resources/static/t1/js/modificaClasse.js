var parametro = location.search.split('parametro=')[1];
fetch('/home/' + parametro)
  .then(response => response.json())
  .then(data => {
    let classutList = document.getElementById('classut-list');
    let rows = '';
    data.forEach(home => {
      rows += `
        <div class="file">
          <br>
          <center><p class="h3">Modifica Classe: ${home.name}</p></center>
          <div class="icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="55" height="55" fill="currentColor" class="bi bi-arrow-clockwise text-success" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"/>
              <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"/>
            </svg>
            <br><br>
          </div>
        </div>
        <div class="card-body">
          <form id="uploadForm">
            <div class="mb-3">
              <label for="className" class="form-label">Class name</label>
              <input type="text" class="form-control" value="${home.name}" id="className" aria-describedby="classNameHelp">
            </div>
            <div class="mb-3">
              <label for="date" class="form-label">Date</label>
              <input type="date" class="form-control" id="date" aria-describedby="dateHelp" value="${new Date().toISOString().slice(0, 10)}">
            </div>
            <div class="mb-3">
              <label for="difficulty" class="form-label">Difficulty</label>
              <select class="form-select" id="difficulty" value="${home.difficulty}" aria-describedby="difficultyHelp">
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
              </select>
              <div id="difficultyHelp" class="form-text">Select the difficulty level of this item</div>
            </div>
            <div class="mb-3">
              <label for="description" class="form-label">Description</label>
              <textarea class="form-control" id="description" rows="3">${home.description}</textarea>
            </div>
            <div class="mb-3">
              <label for="category1" class="form-label">Category 1</label>
              <input type="text" class="form-control" id="category1" value="${home.category[0]}" aria-describedby="categoryHelp">
            </div>
            <div class="mb-3">
              <label for="category2" class="form-label">Category 2</label>
              <input type="text" class="form-control" id="category2" value="${home.category[1]}" aria-describedby="categoryHelp">
            </div>
            <div class="mb-3">
              <label for="category3" class="form-label">Category 3</label>
              <input type="text" class="form-control" id="category3" value="${home.category[2]}" aria-describedby="categoryHelp">
            </div>
            <div class="col-12">
              <button type="button" onclick="uploadFile()" class="btn btn-success">Upload</button>
            </div>
          </form>
        </div>
      `;
    });
    classutList.innerHTML = rows;
  })
  .catch(error => console.error(error));

function uploadFile(event) {
  const name = document.getElementById('className').value;
  const date = document.getElementById('date').value;
  const difficulty = document.getElementById('difficulty').value;
  const code_Uri = "";
  const description = document.getElementById('description').value;
  const category = [
    document.getElementById('category1').value,
    document.getElementById('category2').value,
    document.getElementById('category3').value
  ];

  const data = {
    name: name,
    date: date,
    difficulty: difficulty,
    code_Uri: code_Uri,
    description: description,
    category: category
  };

  fetch('/update/' + name, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
    window.location.href = "/home";
  })
  .catch((error) => {
    console.error('Error:', error);
    window.location.href = "/home";
  });
}
