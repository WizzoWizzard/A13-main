var parametro = location.search.split('parametro=')[1];
document.getElementById('nomeC').innerHTML = "Report " + parametro;

function uploadReport(event) {
    const description = document.getElementById('description').value;

    fetch('/newReport/' + parametro, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ description: description })
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        window.location.href = "/home";
    })
    .catch((error) => {
        window.location.href = "/home";
        console.error('Error:', error);
    });
}
