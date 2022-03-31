$(document).ready(function(){

    var remove = window.location.search.replace('?','');
    var ar = remove.split('&');
    var user = ar[0].split('=');
    var score = ar[1].split('=');

    user = user[1];
    score = score[1];

    $('.score').text(score+'%');
    
    $('.play-btn').on('click', function(){
        window.location.href = "quiz.html?user="+user;
    });

    $('.save-btn').on('click', function(){

        var array = [
            {
                'user': user,
                'score': score,
            }
        ];

        if(localStorage.getItem("Scores")==null){

            localStorage.setItem("Scores", JSON.stringify(array));      

        }else if(localStorage.getItem("Scores")!=null) {
            
            
            var storedScores = JSON.parse(localStorage.getItem("Scores"));
            
            var isSame = false;
            var userIndex = null;

            storedScores.forEach( (element, index)=> {
                
                if(user==element.user){
                    userIndex = index;
                    isSame = true;
                    return false;
                }
                else{
                    isSame = false;
                }

            });

            if(isSame==true&&userIndex!=null){
                storedScores[userIndex].score = score;
            }
            else{
                storedScores.push({
                    'user': user,
                    'score': score,
                });
            }


            localStorage.setItem("Scores", JSON.stringify(storedScores));      
        }

        setTimeout(() => {
            window.location.href = "../index.html";    
        }, 1000);
        
    });

    $('.home-btn').on('click', function(){
        window.location.href = "../index.html";
    });

});