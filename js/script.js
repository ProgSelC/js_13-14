'use strict';

window.onbeforeunload = function () {
    localStorage.clear();
};

$(function () {
    var quizz = {
        "testName":"Тест пока не готов :(",
        "submitText":"Проверить мои результаты",
        "questions":[
            {
                "id": "q1",
                "answer": "100",
                "text": "Are you programmer?",
                "variants":[
                    { "text": "Sure!", "value": 1 },
                    { "text": "Of course no!", "value": 2 },
                    { "text": "Who is a programmer?", "value": 4 }
                ]
            },
            {
                "id": "q2",
                "answer": "10",
                "text": "Which is not a programming language?",
                "variants":[
                    { "text": "Pyton", "value": 1 },
                    { "text": "Sun", "value": 2 },
                    { "text": "JavaScript", "value": 4 }
                ]
            }
        ]
    }

    localStorage.setItem('quizz', JSON.stringify(quizz));

    var savedQuizz = getQuizz();

    var tmpl = _.template(document.getElementById('content-template').innerHTML);
    var content = tmpl( savedQuizz );
    $('body').html(content);

    function getQuizz() {
        try {
            var quizz = JSON.parse(localStorage.getItem('quizz'));
            return quizz;
        } catch(exception){
            return { "testName":"Тест недоступен", "submitText":"Кнопку нажимать бессмысленно )", "questions": [] };
        }
    }

    function checkAnswers(q){
        var totalItems = q.questions.length;
        var totalAnswered = 0;

        q.questions.forEach(function(item){
            var checkSum = 0;

            $('#' + item.id + ' input:checked').each(function(index, el){
                checkSum += parseInt($(el).val());
            });
            
            if ( checkSum^parseInt(item.answer, 2) == 0 ) {
                totalAnswered +=  1;
            }
        });

        return "Правильных ответов " + totalAnswered + "/" + totalItems;
    }

    $('button[type="submit"]').click(function() {
        console.log(checkAnswers(savedQuizz));
    });
});
