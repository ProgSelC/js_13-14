'use strict';

window.onbeforeunload = function () {
    localStorage.clear();
};

$(function () {
    var quizz = {
        "testName":"Moq test",
        "submitText":"View results",
        "questions":[
            {
                "id": "q1",
                "answer": "100",
                "text": "Are you a programmer?",
                "type": "radio",
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
                "type": "radio",
                "variants":[
                    { "text": "Pyton", "value": 1 },
                    { "text": "Sun", "value": 2 },
                    { "text": "JavaScript", "value": 4 }
                ]
            },
            {
                "id": "q3",
                "answer": "1011",
                "text": "Which results equal 0",
                "type": "checkbox",
                "variants":[
                    { "text": " (1 ^ 1)", "value": 1 },
                    { "text": " (1 ^ 1 & 1)", "value": 2 },
                    { "text": " (0 | 1)", "value": 4 },
                    { "text": " (1 ^ 0 ^ 1)", "value": 8 }
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
            return { "testName":"The test is unreachable :(", "submitText":"No need to push the button", "questions": [] };
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

            if ( (checkSum^parseInt(item.answer, 2)) == 0 ) {
                totalAnswered +=  1;
            }
        });

        return (totalItems == totalAnswered) ? "Bingo!" : "Your result is: " + totalAnswered + "/" + totalItems;
    }

    $('button[type="submit"]').click(function() {
        $('#results .modal-body p').html(checkAnswers(savedQuizz));
        $('#results').modal('show');
    });
    $('#results .btn-primary').click(function(){
        $('input').prop('checked', false);
        $('#results').modal('hide');
    });
});
