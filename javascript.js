$(document).ready(function() {
    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = $(".question").length;

    $(".option-button").click(function() {
        let answer = $(this).data("answer");

        // Si la respuesta es "Sí", sumar puntos
        if (answer === "yes") {
            score += 10;
        }

        // Avanzar a la siguiente pregunta
        currentQuestion++;
        $("#progress-display").text(`Completaste ${currentQuestion} de ${totalQuestions} preguntas`);
        
        // Mostrar la siguiente pregunta
        $(this).closest(".question").fadeOut(function() {
            if (currentQuestion < totalQuestions) {
                $(".question").eq(currentQuestion).fadeIn();
            } else {
                // Al finalizar el cuestionario, mostrar el puntaje final
                let percentage = (score / (totalQuestions * 10)) * 100;
                $("#score-display").text(`Puntuación: ${percentage}%`);
                $("#feedback").text().fadeIn();
                $(".submit-button").fadeIn(); // Mostrar el botón de "Enviar"
            }
        });
    });
});
$(document).ready(function() {
    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = $(".question").length;
    let progressData = []; // Para almacenar el progreso de las respuestas afirmativas

    // Crear el gráfico de progreso
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line', // Gráfico de línea
        data: {
            labels: [], // Las etiquetas serán los números de las preguntas
            datasets: [{
                label: 'Progreso de Respuestas Afirmativas',
                data: [], // Aquí se almacenará el porcentaje de respuestas afirmativas hasta la pregunta actual
                borderColor: '#4CAF50',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: {
                    ticks: {
                        beginAtZero: true
                    }
                },
                y: {
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    $(".option-button").click(function() {
        let answer = $(this).data("answer");

        // Si la respuesta es "Sí", sumar puntos
        if (answer === "yes") {
            score += 10;
        }

        // Calcular el porcentaje de respuestas afirmativas
        let percentage = (score / ((currentQuestion + 1) * 10)) * 100;

        // Actualizar los datos de progreso
        progressData.push(percentage);

        // Actualizar el gráfico
        progressChart.data.labels.push(currentQuestion + 1); // Añadir el número de la pregunta
        progressChart.data.datasets[0].data.push(percentage); // Añadir el porcentaje al gráfico
        progressChart.update(); // Actualizar el gráfico

        // Avanzar a la siguiente pregunta
        currentQuestion++;
        $("#progress-display").text(`Completaste ${currentQuestion} de ${totalQuestions} preguntas`);

        // Mostrar la siguiente pregunta
        $(this).closest(".question").fadeOut(function() {
            if (currentQuestion < totalQuestions) {
                $(".question").eq(currentQuestion).fadeIn();
            } else {
                // Al finalizar el cuestionario, mostrar el puntaje final
                let finalPercentage = (score / (totalQuestions * 10)) * 100;
                $("#score-display").text(`Puntuación Final: ${finalPercentage}%`);
                $("#feedback").text().fadeIn();
                $(".submit-button").fadeIn(); // Mostrar el botón de "Enviar"
            }
        });
    });

    // Enviar el cuestionario
    $(".submit-button").click(function() {
    });
});
document.addEventListener("DOMContentLoaded", function() {
    let score = 0;
    let currentQuestion = 0;
    const totalQuestions = document.querySelectorAll(".question").length;
    const feedbackMessages = [
        {
            yes: "¡Bien hecho! Asegúrate de mantener estos estándares de calidad para obtener mejores resultados.",
            no: "Revisa tu manejo post-cosecha para mejorar la calidad de tu producción. <br>"
        },
        {
            yes: "¡Excelente! Los rendimientos consistentes son clave para optimizar tu producción. ",
            no: "Evalúa las condiciones del suelo y las prácticas de siembra para mejorar la consistencia."
        },
        {
            yes: "¡Bien hecho! Los márgenes de ganancia son una señal de una buena planificación.",
            no: "Revisa tu estructura de costos y las condiciones del mercado para mejorar tus márgenes."
        },
        {
            yes: "¡Perfecto! Las inversiones en tecnología pueden mejorar significativamente la eficiencia.",
            no: "Considera invertir en nuevas tecnologías para optimizar la producción y los costos."
        },
        {
            yes: "¡Excelente! La tecnología aplicada es clave para mejorar la calidad y cantidad de la producción.",
            no: "Evalúa la implementación de nuevas herramientas tecnológicas en tu producción."
        },
        {
            yes: "¡Muy bien! Las condiciones del mercado son cruciales para tu rentabilidad.",
            no: "Revisa tus estrategias de venta y considera diversificar tus canales de distribución."
        }
    ];

    // Crear el gráfico de progreso
    const ctx = document.getElementById('progressChart').getContext('2d');
    const progressChart = new Chart(ctx, {
        type: 'line', // Gráfico de línea
        data: {
            labels: [], // Las etiquetas serán los números de las preguntas
            datasets: [{
                label: 'Progreso de Respuestas Afirmativas',
                data: [], // Aquí se almacenará el porcentaje de respuestas afirmativas hasta la pregunta actual
                borderColor: '#4CAF50',
                fill: false,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { display: true, position: 'top' }
            },
            scales: {
                x: {
                    ticks: {
                        beginAtZero: true
                    }
                },
                y: {
                    max: 100,
                    min: 0,
                    ticks: {
                        stepSize: 10
                    }
                }
            }
        }
    });

    const optionButtons = document.querySelectorAll(".option-button");
    optionButtons.forEach(button => {
        button.addEventListener("click", function() {
            const answer = this.getAttribute("data-answer");

            // Si la respuesta es "Sí", sumar puntos
            if (answer === "yes") {
                score += 10;
            }

            // Calcular el porcentaje de respuestas afirmativas
            const percentage = (score / ((currentQuestion + 1) * 10)) * 100;

            // Actualizar los datos del gráfico
            progressChart.data.labels.push(currentQuestion + 1); // Añadir el número de la pregunta
            progressChart.data.datasets[0].data.push(percentage); // Añadir el porcentaje al gráfico
            progressChart.update(); // Actualizar el gráfico

            // Almacenar el mensaje de feedback
            const feedbackMessage = feedbackMessages[currentQuestion][answer];
            let feedbackText = document.getElementById('feedback-text');
            feedbackText.innerHTML += `<p>${feedbackMessage}</p>`;

            // Avanzar a la siguiente pregunta
            currentQuestion++;
            document.getElementById("progress-display").innerText = `Completaste ${currentQuestion} de ${totalQuestions} preguntas`;

            // Mostrar la siguiente pregunta o el resumen final
            if (currentQuestion < totalQuestions) {
                document.querySelectorAll(".question")[currentQuestion].style.display = "block";
                document.querySelectorAll(".question")[currentQuestion - 1].style.display = "none";
            } else {
                const finalPercentage = (score / (totalQuestions * 10)) * 100;
                document.getElementById("score-display").innerText = `Puntuación Final: ${finalPercentage}%`;
                document.getElementById("submit-button").style.display = "block";
                document.getElementById("feedback").style.display = "block"; // Mostrar el feedback al final
            }
        });
    });

    document.getElementById("submit-button").addEventListener("click", function() {
        alert("¡Gracias! Tu evaluación ha sido enviada.");
    });
});
