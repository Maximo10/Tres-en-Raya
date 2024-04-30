$(document).ready(function() {
    let turno = 'X';
    let tablero = [];
    let resultadoMensaje = $('#resultado-mensaje');

    function reiniciarJuego() {
        $('.celda').text('').removeClass('X O');
        tablero = [];
        turno = 'X';
        $('#jugador-turno').text(turno);
        resultadoMensaje.text('');
        resultadoMensaje.removeClass('mostrar');
    }

    function comprobarGanador(tablero) {
        let combinacionesGanadoras = [
            [0, 1, 2], // fila 1
            [3, 4, 5], // fila 2
            [6, 7, 8], // fila 3
            [0, 3, 6], // columna 1
            [1, 4, 7], // columna 2
            [2, 5, 8], // columna 3
            [0, 4, 8], // diagonal 1
            [2, 4, 6]  // diagonal 2
        ];

        for (let i = 0; i < combinacionesGanadoras.length; i++) {
            let [a, b, c] = combinacionesGanadoras[i];
            if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
                return tablero[a];
            }
        }

        if (tablero.filter(celda => celda).length === 9) {
            return 'Empate';
        }

        return null;
    }

    $('.celda').click(function() {
        let celda = $(this);
        let posicion = celda.index();

        if (!tablero[posicion]) {
            celda.text(turno);
            tablero[posicion] = turno;
            turno = turno === 'X' ? 'O' : 'X';
            $('#jugador-turno').text(turno);

            let resultado = comprobarGanador(tablero);
            if (resultado) {
                if (resultado === 'Empate') {
                    resultadoMensaje.text('¡Empate!');
                } else {
                    resultadoMensaje.text(`¡${resultado} ha ganado!`);
                }
                resultadoMensaje.addClass('mostrar'); // Muestra el mensaje
                setTimeout(function() {
                    reiniciarJuego();
                }, 1500); // Retraso de 1.5 segundos
            }
        }
    });

    $('#reiniciar').click(function() {
        reiniciarJuego();
    });

    // Asegúrate de que el mensaje de resultado se oculte correctamente
    resultadoMensaje.on('animacion', function() {
        $(this).removeClass('mostrar'); // Elimina la clase mostrar para preparar la próxima animación
        $(this).text(''); // Limpia el texto del mensaje
    })
});
