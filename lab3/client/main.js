

// $.post( "ajax/test.html", function( data ) {
//     $( ".result" ).html( data );
//   });

// $.ajax({
//   url: "test.html",
//   context: document.body
// }).done(function() {
//   $( this ).addClass( "done" );
// });

const createVeipInfo = (veipinfo) => {
    let elem = document.createElement('div');
    elem.className = 'veipinfo';
    elem.appendChild(document.createElement('div'));
    elem.lastElementChild.className = 'veipheader';
    elem.lastElementChild.innerHTML = veipinfo.header;
    elem.appendChild(document.createElement('img'));
    elem.lastElementChild.alt='veip';
    elem.lastElementChild.src= veipinfo.src;
    elem.lastElementChild.className='veipimg';
    elem.appendChild(document.createElement('div'));
    elem.lastElementChild.className = 'veipdiscription';
    elem.lastElementChild.innerHTML = veipinfo.disk;
    document.getElementById('maintext').appendChild(elem);
}

function sendAjaxForm(ajax_form) {
     let data = $("#"+ajax_form).serialize();
     $.post('http://localhost:3000/pozvony', data, (response, status) => {
        if(status === 'success'){
            $('#maintext').text(response);
            alert('Успешно отправлено');
        }
        else{
            alert('Sad but true');
        }
    });
}
$(document).ready(function(){

$('#offer1').click(()=>{
    $(document).load('http://localhost:3000','veipn1/', (response, status) => {
        if(status === 'success'){
            $('#maintext').text(response);
        }
    });
});
$('#offer2').click(()=>{
    let url_id = 'veip_' + 'photo/';
    // $.ajax({
    //     url: '/index.php',         
    //     method: 'get',            
    //     dataType: 'html',         
    //     data: {text: 'Текст'},    
    //     success: function(data){  
                   
    //     }
    // });
    $.get('http://localhost:3000/' + url_id, function(response, status){
        if(status === 'success'){
            let imgInfo = JSON.parse(response);
            createVeipInfo(imgInfo);
        }
    });
});


    
$('#makequestion').click(()=>{
    sendAjaxForm('ajax_form');
});

// lab4--------------------------------------
const firstText = 'Остановить зависимость сигарет';
const secondText = 'Ладно';
const congrat = 'Вы бросили курить на ';
var animatedImg;
$('#stopit').click(function() {

    var $button = $(this);
    console.log();
    if($button.html() == firstText){
        $button.html(secondText);
        $('#sigiimg').animate(
            {
                width: "110%",
                left: "700px",
                opacity: '0%',
                borderWidth: '14px',
                
            },
            {
                duration: 6000,
                easing: 'linear',
                fail: ()=>{
                    $('#sigiimg').attr('src','https://fsd.multiurok.ru/html/2018/05/21/s_5b02a90155629/img1.jpg');
                    $('#sigiimg').css('opacity', '100%');
                },
                complete: ()=> {
                    $('#sigiimg').attr('src','https://mirgif.com/den_rozhdeniya/animacija-pozdravljaju.gif');
                    $('#sigiimg').css('opacity', '100%');
                },
             progress: function(animation, progress) {
                $('#percentage').text(congrat + Math.round(progress * 100)+'%');
             }
            }
        )
    }
    else if($button.html() == secondText){
        $('#sigiimg').stop();
		$button.html('обновите страницу')
    }
 
 });

});
