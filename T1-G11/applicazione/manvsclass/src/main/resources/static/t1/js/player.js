document.addEventListener("DOMContentLoaded", function () {
    // Effettua una richiesta FETCH per ottenere la lista degli studenti
    const studentsPromise = fetch('/students_list').then(response => response.json());

    // Effettua una richiesta FETCH per ottenere i dati aggiuntivi
    const gameDataPromise = fetch('/games').then(response => response.json());

    // Attendi che entrambe le richieste siano completate
    Promise.all([studentsPromise, gameDataPromise])
        .then(([studentsData, gameData]) => { 

            // Creiamo un oggetto per tenere traccia del conteggio, del tempo totale e dello score per ogni 'accountId'
            const accountStats = {};

            // Funzione per calcolare la differenza di tempo in secondi tra due date
            function calculateTimeDifference(startedAt, closedAt) {
                if (!closedAt) {
                    return 0;
                }

                const startTimestamp = new Date(startedAt).getTime();
                const closedTimestamp = new Date(closedAt).getTime();
                return (closedTimestamp - startTimestamp) / 60000; // Ritorna la differenza in minuti
            }

            // Scansioniamo i dati e calcoliamo il conteggio, il tempo totale e lo score per ogni 'accountId'
            gameData.data.forEach(entry => {
                const timeDifference = calculateTimeDifference(entry.startedAt, entry.closedAt);

                entry.players.forEach(player => {
                    const accountId = player.accountId;  

                    // Aggiorniamo il conteggio, il tempo totale e lo score per ogni 'accountId'
                    if (!accountStats[accountId]) {
                        accountStats[accountId] = { count: 1, totalTime: timeDifference, score: entry.score ? entry.score : 0 };
                    } else {
                        accountStats[accountId].count++;
                        accountStats[accountId].totalTime += timeDifference;
                        accountStats[accountId].score += entry.score ? entry.score : 0;
                    }
                });
            });

            // Aggiungiamo un campo 'position' per indicare la posizione in classifica
            studentsData.forEach((student, index) => {
                student.position = index + 1;
            });

            // Combina le informazioni da studentsData e gameData.data in un'unica array
            const combinedData = studentsData.map(student => {
                const accountId = student.id;  // Modifica la chiave in base alla tua struttura JSON
                const stats = accountStats[accountId] || { count: 0, totalTime: 0, score: 0 };

                return {
                    ...student,
                    accountId: accountId,
                    count: stats.count,
                    totalTime: stats.totalTime.toFixed(2),
                    points: stats.score
                };
            }).sort((a, b) => b.points - a.points)
            .map((student, index) => ({ ...student, position: index + 1 }));

            // Manipola i dati combinati e crea la tabella con DataTables
            const table = $('#studentTable').DataTable({
                data: combinedData,
                columns: [
                    { data: 'position' },
                    { data: 'points' },
                    { data: 'name' },
                    { data: 'surname' },
                    { data: 'email' },
                    { data: 'studies' },
                    { data: 'count' },
                    { data: 'totalTime' }
                ]
            });

            $("#studentTable").css({"display":"block"});

        })
        .catch(error => {
            console.error('Errore durante la richiesta:', error);
        });
});
