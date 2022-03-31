$(document).ready(function(){
    $('.play-btn').on('click',(e)=>{
        e.preventDefault();
        
        if($('.name-input').val()!=''){
            window.location.href = "quiz.html?user="+$('.name-input').val();
        }
        else{
            $('.name-input').attr('Placeholder', 'Enter Your Name');
        }
    });
});