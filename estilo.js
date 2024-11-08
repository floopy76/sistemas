$(document).ready(function() {
    
    const questions = [
        "¿Ha realizado revisiones de calidad en los últimos 7 días?",
        "¿Está siguiendo el plan de producción propuesto para este mes?",
        "¿Ha tenido problemas de maquinaria en la última semana?",
        "¿Ha realizado alguna mejora en el proceso de cultivo recientemente?",
        "¿Está utilizando fertilizantes según las recomendaciones?",
        "¿Ha realizado controles de plagas en los últimos 15 días?",
        "¿La cosecha ha cumplido con los estándares de calidad?",
        "¿Ha experimentado alguna mejora en el rendimiento en el último mes?",
        "¿Está controlando la humedad del suelo de forma regular?",
        "¿Tiene un plan de rotación de cultivos para el próximo año?"
    ];

    let currentQuestionIndex = 0;
    let positiveAnswers = 0;

    
    function showQuestion(index) {
        if (index < questions.length) {
            $("#question-container").html(`
                <p>${questions[index]}</p>
                <button class="btn-yes">Sí</button>
                <button class="btn-no">No</button>
            `).fadeIn();
        } else {
            
            let score = Math.round((positiveAnswers / questions.length) * 100);

            
            $("#feedback").html(`Su puntaje es: ${score}%`).fadeIn();
        }
    }

    
    showQuestion(currentQuestionIndex);

    
    $("#question-container").on("click", ".btn-yes", function() {
        positiveAnswers++;
        nextQuestion();
    });

    
    $("#question-container").on("click", ".btn-no", function() {
        nextQuestion();
    });


    function nextQuestion() {
        $("#question-container").fadeOut(function() {
            currentQuestionIndex++;
            showQuestion(currentQuestionIndex);
        });
    }
});
