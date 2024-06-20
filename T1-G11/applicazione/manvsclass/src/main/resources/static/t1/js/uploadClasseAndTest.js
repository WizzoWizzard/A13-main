//Si aggancia al form tramite ID
const formTest = document.getElementById('formId');

//Funzione per l'upload della classe e dei relativi test
function uploadTest(event) {
    //Creazione delle costanti che rappresentano i dati input al form
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

    //Costante che rappresenta il file .java in input della classe
    const classInput = document.getElementById('fileInput');
    const file = classInput.files[0];
    //Costante che rappresenta il file .zip in input dei test Randoop
    const testInput = document.getElementById('testInput');
    const test = testInput.files[0];
    //Costante che rappresenta il file .zip in input dei test EvoSuite
    const testInputEvo = document.getElementById('testInputEvo');
    const testEvo = testInputEvo.files[0];

    //Costante che rappresenta l'insieme dei dati del form e i file in input
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', JSON.stringify({
        name: name,
        date: date,
        difficulty: difficulty,
        code_Uri: code_Uri,
        description: description,
        category: category
    }));
    formData.append('test', test);
    formData.append('testEvo', testEvo);

    //chiamata HTTP alla funzione uploadTest in HomeController con metodo POST e dati del form come body 
    // Assicurati di includere jQuery nel tuo progetto prima di utilizzare questo codice
    // Mostra la schermata di caricamento prima della richiesta POST
    document.getElementById('loadingOverlay').style.display = 'block';
    $.ajax({
        url: '/uploadTest',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (data) {
            console.log('Success:', data);
            $('#loadingOverlay').hide();
            window.location.href = '/class';
            // Aggiungi qui il codice per gestire la risposta dal server
        },
        error: function (error) {
            console.error('Error:', error);
            $('#loadingOverlay').hide();
            alert('Si è verificato un errore durante la richiesta.');
        }
    });
}