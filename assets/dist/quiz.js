$(document).ready(function () {

    // async
    function async(){
        $.ajax({
            url: "../server.php?question=1",
            type: "GET",
            contentType: false,
            processData: false,
            success: function (data) {
    
                var json = JSON.parse(data);
                
                // passing array
                question_list = chooseRandom(json, 10);
            }
        });
    }

    // func for shuffle array 
    const chooseRandom = (json, num = 1) => {

        // container for shuffle array 
        const res = [];

        for(let i = 0; i < num; ){

            const random = Math.floor(Math.random() * json.length);
            if(res.indexOf(json[random]) !== -1){
                continue;
            };
            res.push(json[random]);
            i++;
        };

        return res;
    };

    var question_list;
    let seconds = 0;
    var questionPerTime = 29;
    var i = 0;
    let timer;
    let right = 0;

    // $('.count').hide();

    // funtion for modal
    $('.play-btn').on('click', function(){
        async();
        // modal hide
        $('.modal').hide();
        
        // displaying question
        choose(i);

        // start timer
        count = setInterval(time, 1000)
    });

    //func for time
    function time() {

        if(seconds <= 19){
            $('.timer-num').css('color','white');
        }
        else{
            $('.timer-num').css('color','#f75454');
        }

        if (seconds <= questionPerTime) {
            ++seconds;
            $('.timer-num').text(seconds);
        }
        else {
            $('.choices__container').css({
                'background-color': '#f75454',
                'pointer-events': 'none'
            });
            seconds = -1;
            setTimeout(function () {
                $('choices__container').css({
                    'background-color': '#4759ff',
                    'pointer-events': 'auto'

                });
                choose(i);
            }, 1000);
        }
    }

    //function for question render
    function question(question, num) {

        if (num == question.length) {

            // setting up the pointer events to none
            pointerEvents('.choices-a, .choices-b, .choices-c', 'none');

            // setting for number label
            $('.color-label').css({
                'width': '100%',
                'border-radius': '50px'
            });

            clearInterval(count);

            countAppper(right);
            

        } else {

            // setting up the pointer events to auto
            pointerEvents('.choices-a, .choices-b, .choices-c', 'auto');

            // setting for number label
            $('.color-label').css({
                'width': ((i + 1) / question.length) * 100 + '%',
                'border-radius': '50px 0 0 50px'
            });

            // setting up the question, choices, number of question
            $('.question-text').text(question[num].question);
            $('.answer-a').text(question[num].a);
            $('.answer-b').text(question[num].b);
            $('.answer-c').text(question[num].c);
            $('.from').text(num + 1);
            $('.to').text(question.length);

            // determinig if the correct answer is a
            if (question[num].correct == 'a') {
                
                // setting data
                dataRelaying('.choices-a', 'b326b5062b2f0e69046810717534cb09')

            } else {

                // setting data to empty
                dataRelaying('.choices-a', '');

            }

            // determinig if the correct answer is b
            if (question[num].correct == 'b') {
                
                // setting data
                dataRelaying('.choices-b', 'b326b5062b2f0e69046810717534cb09')

            } else {
                
                // setting data to empty
                dataRelaying('.choices-b', '');
            }

            // determinig if the correct answer is c
            if (question[num].correct == 'c') {

                // setting data
                dataRelaying('.choices-c', 'b326b5062b2f0e69046810717534cb09')

            }
            else {

                // setting data to empty
                dataRelaying('.choices-c', '');

            }

            // preparing for the next set of question
            ++i;

        }

    }

    // function for displaying question
    function choose(i) {
        
        // apperance of question
        question(question_list, i);
    }

    $('.choices-a').on('click', function () {

        // determinig the if the choose is correct
        if ($(this).attr('data-relay') == 'b326b5062b2f0e69046810717534cb09') {
            
            // count correct answer
            right++;

            // set background color to the right choices
            backgroundChoices('.choices-a', '#16da40');

        } else {
            
             // set background color to the wrong choices
             backgroundChoices('.choices-a', '#f75454');

        }

        // setting up the pointer events to none
        pointerEvents('.choices-a, .choices-b, .choices-c', 'none');

        // restart the seconds to -1 to start in the zero
        seconds = -1;

        setTimeout(function () {
            
            // back to normal background color
            backgroundChoices('.choices-a', '#4759ff');

            // appear next question
            choose(i);

        }, 1000);
    });

    // func for B
    $('.choices-b').on('click', function () {

        // determinig the if the choose is correct
        if ($(this).attr('data-relay') == 'b326b5062b2f0e69046810717534cb09') {
            
            // count correct answer
            right++;

            // set background color to the right choices
            backgroundChoices('.choices-b', '#16da40');

        } else {

            // set background color to the wrong choices
            backgroundChoices('.choices-b', '#f75454');

        }

        // setting up the pointer events to none
        pointerEvents('.choices-a, .choices-b, .choices-c', 'none');

        // restart the seconds to -1 to start in the zero
        seconds = -1;

        setTimeout(function () {

            // back to normal background color
            backgroundChoices('.choices-b', '#4759ff');

            // appear next question
            choose(i);

        }, 1000);
    });

    // func for C
    $('.choices-c').on('click', function () {

        // determinig the if the choose is correct
        if ($(this).attr('data-relay') == 'b326b5062b2f0e69046810717534cb09') {
            
            // count correct answer
            right++;

            // set background color to the right choices
            backgroundChoices('.choices-c', '#16da40');

        } else {

            // set background color to the wrong choices
            backgroundChoices('.choices-c', '#f75454');

        }

        // setting up the pointer events to none
        pointerEvents('.choices-a, .choices-b, .choices-c', 'none');

        // restart the seconds to -1 to start in the zero
        seconds = -1;

        setTimeout(function () {

            // back to normal background color
            backgroundChoices('.choices-c', '#4759ff');
            
            // appear next question
            choose(i);

        }, 1000);
    });

    // func for color background of your choices
    function backgroundChoices(selector, color){
        $(selector).css({
            'background-color': color 
        });
    }

    // function for pointer events 
    function pointerEvents(selector, pointer){
        $(selector).css({
            'pointer-events': pointer
        });
    }

    // func for setting data
    function dataRelaying(selector, data){
        $(selector).attr('data-relay', data);
    }

    // func for counting modal
    function countAppper(resultToExam){
        
        $('.card').hide();

        $('.count').css({
            'visibility': 'visible',
            'opacity': '1'
        }).addClass('count-show');

        var rederectingTime = 0;

        setInterval(() => {
            $('.wait').text(rederectingTime);
            if(rederectingTime==3){
                window.location.href = "score.html"+window.location.search+"&result="+(resultToExam*10);
            }
            rederectingTime++;

        }, 500);
        
    }

    setTimeout(() => {
        pointerEvents('.play-btn', 'auto')
    }, 1500);
    
});