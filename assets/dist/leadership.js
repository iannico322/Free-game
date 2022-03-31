$(document).ready(function () {
    
    var storedScores = JSON.parse(localStorage.getItem("Scores"));

    if (storedScores != null) {
        storedScores.sort(function (a, b) {
            return b.score - a.score;
        })

        var html = ''

        storedScores.forEach((element, index) => {
            if (index <= 3) {
                html += '<li style="list-style:none; font-size: 30px">' + element.user + ' - ' + element.score + '%</li>';
                return false;
            }
        });

        $('.list').html(html);
    } else {
        var html = ''

        html += '<li style="list-style:none; font-size: 30px">No User Yet</li>';

        $('.list').html(html);
    }


    $('.play-btn').on('click', function () {
        window.location.href = "../index.html";
    });
});