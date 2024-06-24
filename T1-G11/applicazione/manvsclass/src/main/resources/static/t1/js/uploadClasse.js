document.addEventListener("DOMContentLoaded", function () {
    // Si aggancia al form tramite ID
    const form = document.getElementById('uploadForm');

    // Funzione per l'upload della classe e generazione dei test
    window.uploadFile = function (event) {
        // Mostra il feedback di caricamento al click del pulsante
        document.getElementById('loadingIndicator').style.display = 'inline-block';

        event.preventDefault(); // Previene il comportamento predefinito del form

        // Creazione delle costanti che rappresentano i dati input al form
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

        // Costante che rappresenta il file .java in input
        const fileInput = document.getElementById('fileInput');
        const file = fileInput.files[0];

        // Costante che rappresenta l'insieme dei dati del form e il file in input
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

        $.ajax({
            url: '/uploadFile',
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (data) {
                console.log('Success:', data);
                // Nascondi il feedback di caricamento dopo il caricamento
                document.getElementById('loadingIndicator').style.display = 'none';
                window.location.href = '/class';
                // Aggiungi qui il codice per gestire la risposta dal server
            },
            error: function (error) {
                console.error('Error:', error);
                // Nascondi il feedback di caricamento in caso di errore
                document.getElementById('loadingIndicator').style.display = 'none';
                // Aggiungi qui il codice per gestire gli errori
            }
        });
    }

    // Aggancia la funzione uploadFile al submit del form
    form.addEventListener('submit', uploadFile);
});