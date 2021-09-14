const quizQuestions = [
  ['question_freegift',true],
  ['question_unhappy',true],
  ['question_currentap',true],
  ['question_wheresweat',true],
  ['question_mostsweat',false],
  ['question_smell',false],
  ['question_smellRegimen',false],
  ['question_gender',false],
  ['question_email',true]
];

const recommendedProducts = [];


function nextQuestion(parentID) {
  addFutureQuestions();
  //console.log(parentID)
  for (i=0; i<quizQuestions.length; i++){
    if (quizQuestions[i][0] == parentID) {
      var newIndex = i + 1;
      for (j=newIndex; j<quizQuestions.length; j++){
        if (quizQuestions[j][1] === true){
          var newIndex = j;
          break;
        } else {
          //GO TO RESULTS... NO QUESTIONS LEFT WITH TRUE
        }
      }
    }
  }
  var nextID = quizQuestions[newIndex][0];
  //ga('send', 'event', 'Quiz', 'Next Question', nextID);

  setTimeout(function(){
    document.getElementById(parentID).classList.add('inactive');
    document.getElementById(nextID).classList.remove('inactive');
    //console.log(newIndex);
    //console.log(nextID);

    //HANDLES PROGRESS BAR WIDTH
    var quizLength = quizQuestions.length;
    var progressWidth = ((newIndex + 1)/quizLength)*100;
    //console.log(progressWidth);
    document.getElementById("quiz_progress_active").style.width = progressWidth + "%";
  },500);
}

function selectedAnswer(answer, gift_image){
  answer.classList.toggle('answer_selected');
  //Specific logic that runs if you're selecting a free gift
  if (answer.classList.contains('gift_block')) {
    //Behave differently based on whether you just activated this selection or have cleared all selections
    if (answer.classList.contains('answer_selected')) {
      //So you've just selected this - set the corresponding gift image and clear the other selection
      document.getElementById('timer_image').src = gift_image;
      //Note that this is slightly lazy code that only works if we have two gift options
      if (answer.nextElementSibling) {
        answer.nextElementSibling.classList.remove('answer_selected');
      } else {
        answer.previousElementSibling.classList.remove('answer_selected');
      }
    } else {
      document.getElementById('timer_image').src = 'freegift_default.png';
    }
  }
  //If any answers are selected, enable the NEXT button - if no answers are selected, disable the button
  all_answers = answer.parentElement.children;
  for (i=0; i < all_answers.length; i++) {
    if (all_answers[i].classList.contains('answer_selected')) {
      //At least one answer selected - enable the button
      answer.parentElement.nextElementSibling.children[0].disabled = false;
      return;
    }
  }
  //No answers are selected - disable the button
  answer.parentElement.nextElementSibling.children[0].disabled = true;
}

function addFutureQuestions() {
  var selectedAnswers = document.getElementsByClassName('answer_selected');
  console.log(selectedAnswers);
  for (i=0;i<selectedAnswers.length;i++){
    console.log(selectedAnswers.length);
    console.log(i);
    if (selectedAnswers[i].dataset.question){
      var newQuestion = selectedAnswers[i].dataset.question;
      console.log(newQuestion);
        for (j=0; j<quizQuestions.length; j++){
          if (quizQuestions[j][0] == newQuestion) {
            quizQuestions[j][1] = true;
          };
        };
      };
    };
};


function goToCart(){
// For each div in "question_wheresweat" check if class = answer_selected;
  var selectedAnswers = document.getElementsByClassName('answer_selected');
  //console.log(selectedAnswers);
  for (i=0;i<selectedAnswers.length;i++){
    if (selectedAnswers[i].dataset.product){
      //console.log(selectedAnswers[i].dataset.product)
      recommendedProducts.push(selectedAnswers[i].dataset.product);
    }
  }
  var url = 'https://mycarpe.com/cart/add?id%5B%5D='+recommendedProducts[0];
      for (j=1;j<recommendedProducts.length; j++) {
        url = url + '&id%5B%5D='+recommendedProducts[j];
      };
    sessionStorage.setItem('sweatquiz', 'true');
    window.location.href=url;
}



//Timer JS
function startTimer() {
  var presentTime = document.getElementById('timer').innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond((timeArray[1] - 1));
  if(s==59){m=m-1}


  if (m>=0){
  document.getElementById('timer').innerHTML =
    m + ":" + s;
  }else{
     document.getElementById('timer').innerHTML =
    "0:00";
    return;
  }

  //console.log(m)
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {sec = "0" + sec}; // add zero in front of numbers < 10
  if (sec < 0) {sec = "59"};
  return sec;
}
