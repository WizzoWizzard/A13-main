document.addEventListener("DOMContentLoaded", function () {
    const dominio = location.hostname;
  
    // Effettua una richiesta FETCH per ottenere la lista degli amministratori
    fetch('/admins_list')
      .then(response => response.json())
      .then(admins => {
        const table = $('#adminTable').DataTable({
          data: admins,
          columns: [
            { data: 'nome' },
            { data: 'cognome' },
            { data: 'username' },
            { data: 'email' }
          ]
        });
  
        // Mostra la tabella una volta caricati i dati
        $('#adminTable').show();
        
        // Aggiungi la funzionalità di ricerca
        $('#searchInput').on('keyup', function () {
          table.search(this.value).draw();
        });
      })
      .catch(error => {
        console.error('Errore durante la richiesta:', error);
      });
  });
  