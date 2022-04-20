$(document).ready(function(){
  
  $(window).scroll(function(){
    let sPos = $(this).scrollLeft(); //가로스크롤값 변수에 담기
    $('.status').html(sPos); //스크롤값 출력하기
  });

  //각각의 메뉴를 클릭시
  $('.gnb li a').click(function(){
    
    //기존 a에 적용된 on서식을 제거하고
    $('.gnb a').removeClass('on');
    //선택한 a에 on서식을 적용한다.
    $(this).addClass('on');

    //해당하는 a의 href속성 값을 변수에 담기
    let id_value = $(this).attr('href');
    console.log(id_value); //증명하기

    //가져온 속성값 sec1, sec2, sec3, sec4의 위치값을 왼쪽에 맞추기
    let secOffset = $(id_value).offset().left; //왼쪽으로부터 떨어진값
    console.log(secOffset); //0, 1852, 3704, 5556

    $('html,body').stop().animate({'scrollLeft':secOffset},500,'easeOutQuint');
    return false;
  });

  $('main section').each(function(){
    // 개별적으로 Wheel 이벤트 적용
    $(this).on('mousewheel',function(e){
      
      var delta = 0;
      var moveTop = null;
      var boxMax = $("main section").length - 1;
      var winEvent = "";
      console.log(boxMax);
      
      if(!winEvent) { //만약에 이벤트가 발생하지 않는다면
        winEvent = window.event; //이벤트는 없다
      }
      if(winEvent.wheelDelta) { //만약에 이벤트에서 휠데이터값이 있다면
        delta = winEvent.wheelDelta / 120; //데이터값을 저장
        if(window.opera) {
            delta = -delta;
        }
      }          
      else if(winEvent.detail) { //그렇지 않으면
        delta = -winEvent.detail / 11; 
      }
            
      // 마우스휠을 위에서 아래로 이동(처음에서 다음박스로 이동)
      if(delta < 0) {
          // 마지막 BOX 보다 순서값이 작은 경우에 실행
          if($(this).index() < boxMax) {
              console.log("▼");
              if($(this).next() != undefined) {
                  moveTop =$(this).next().offset().left;
              }
          }
          // 마지막 article보다 더 오른쪽으로 이동하려고 하는 경우 알림창 출력
          else {
              //alert("마지막 페이지 입니다.");
              return false;
          }
      }
      // 마우스휠을 아래에서 위로 이동( 뒤에서 앞으로 이동)
      else {
          // 첫번째 article보다 순서값이 큰 경우에 실행
          if($(this).index() > 0) {
              console.log("▲");
              if($(this).prev() != undefined) {
                  moveTop =$(this).prev().offset().left;
              }
          }
          // 첫번째 article보다 더 위로 이동하려고 하는 경우 알림창 출력
          else {
              //alert("첫번째 페이지 입니다.");
              return false;
          }
      }
          //화면 이동 0.3초(300)
          $("html,body").stop().animate({scrollLeft : moveTop + "px"}, 300, 'easeOutQuint');
      });
    });

});