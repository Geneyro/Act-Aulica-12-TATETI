let jugador1 = true;
let cells = document.getElementsByClassName("cell");
let gameActive = true; // Variable para controlar si el juego está activo

for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', userMove);
}

document.querySelector('#restart').addEventListener('click', restartGame); // Evento para el botón de reinicio

function userMove(e) {
    let cellValue = e.target.innerHTML;
    if (!cellValue.length && gameActive) {
        e.target.innerHTML = jugador1 ? 'x' : 'o';
        jugador1 = !jugador1;

        // Verificar líneas después de cada movimiento
        let winner = checkLine(0, 1, 2) || 
                     checkLine(3, 4, 5) || 
                     checkLine(6, 7, 8) || 
                     checkLine(0, 3, 6) || 
                     checkLine(1, 4, 7) || 
                     checkLine(2, 5, 8) || 
                     checkLine(0, 4, 8) || 
                     checkLine(6, 4, 2);

        // Verificar empate solo si no hay un ganador
        if (!winner) {
            checkDraw();
        }
    }
}

function checkLine(c1, c2, c3) {
    if (
        cells[c1].innerHTML.length &&
        cells[c1].innerHTML === cells[c2].innerHTML &&
        cells[c1].innerHTML === cells[c3].innerHTML
    ) {
        showWinner(cells[c1].innerHTML);
        return true; // Indica que hay un ganador
    }
    return false; // No hay ganador
}

function checkDraw() {
    let draw = true;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].innerHTML.length === 0) {
            draw = false; // Si hay al menos una celda vacía, no es un empate
            break;
        }
    }
    if (draw) {
        showDraw();
    }
}

function showWinner(player) {
    document.querySelector('#results').innerHTML = player + " es el ganador!";
    gameActive = false; // Detener el juego
    document.querySelector('#restart').style.display = 'block'; // Mostrar botón de reinicio
}

function showDraw() {
    document.querySelector('#results').innerHTML = "¡Empate!";
    gameActive = false; // Detener el juego
    document.querySelector('#restart').style.display = 'block'; // Mostrar botón de reinicio
}

function restartGame() {
    gameActive = true; // Reiniciar el estado del juego
    jugador1 = true; // Volver a empezar con el jugador 1
    document.querySelector('#results').innerHTML = ''; // Limpiar el mensaje de resultados
    document.querySelector('#restart').style.display = 'none'; // Ocultar el botón de reinicio

    for (let i = 0; i < cells.length; i++) {
        cells[i].innerHTML = ''; // Limpiar todas las celdas
    }
}
