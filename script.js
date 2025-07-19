
const correctUser = "ras", correctDOB = "2001-07-23";
const videos = Array.from({length:10}, (_,i)=>`assets/videos/video${i+1}.mp4`);
const finalVideo = "assets/videos/final_wish_video.mp4";
const music = document.getElementById("music");

const questions = [
  {q:"Sample Q1?",ans:["a"],hint:"Hint 1",msg:"Msg 1"},
  {q:"Sample Q2?",ans:["b"],hint:"Hint 2",msg:"Msg 2"},
  {q:"Sample Q3?",ans:["c"],hint:"Hint 3",msg:"Msg 3"},
  {q:"Sample Q4?",ans:["d"],hint:"Hint 4",msg:"Msg 4"},
  {q:"Sample Q5?",ans:["e"],hint:"Hint 5",msg:"Msg 5"},
  {q:"Sample Q6?",ans:["f"],hint:"Hint 6",msg:"Msg 6"},
  {q:"Sample Q7?",ans:["g"],hint:"Hint 7",msg:"Msg 7"},
  {q:"Sample Q8?",ans:["h"],hint:"Hint 8",msg:"Msg 8"},
  {q:"Sample Q9?",ans:["i"],hint:"Hint 9",msg:"Msg 9"},
  {q:"Sample Q10?",ans:["j"],hint:"Hint 10",msg:"Msg 10"},
];

let idx = 0;

function checkLogin(){
  const u = document.getElementById("username").value.trim().toLowerCase();
  const d = document.getElementById("dob").value;
  if(u===correctUser && d===correctDOB){
    Swal.fire({
      title:"🎉 Happy Birthday!",
      text:"Start your quiz now!",
      confirmButtonText:"Start"
    }).then(()=>{
      document.getElementById("loginBox").style.display="none";
      document.getElementById("quizBox").style.display="block";
      document.getElementById("cake").style.opacity=1;
      music.play();
      loadQuestion();
    });
  } else {
    Swal.fire({icon:"error",title:"Incorrect",text:"Please try again"});
  }
}

function loadQuestion(){
  if(idx < questions.length){
    let q = questions[idx];
    Swal.fire({
      title:q.q,
      html:`💡 ${q.hint}`,
      input:"text",
      confirmButtonText:"Submit"
    }).then(res=>{
      let ans = res.value.trim().toLowerCase();
      if(q.ans.includes(ans)){
        Swal.fire({icon:"success",title:"Correct!",text:q.msg}).then(()=>{
          playVideo(idx);
          idx++;
          updateProgress();
        });
      } else {
        Swal.fire({icon:"error",title:"Wrong!",text:"Try again"}).then(loadQuestion);
      }
    });
  } else {
    showFinal();
  }
}

function playVideo(index){
  music.pause();
  document.getElementById("videoContainer").innerHTML = `
    <video controls autoplay onended="resumeMusicAndLoad()">
      <source src="${videos[index]}" type="video/mp4">
    </video>`;
}

function resumeMusicAndLoad(){
  music.play();
  loadQuestion();
}

function showFinal(){
  music.pause();
  document.getElementById("videoContainer").innerHTML = `
    <video controls autoplay>
      <source src="${finalVideo}" type="video/mp4">
    </video>`;
  Swal.fire({icon:"success",title:"🎉 Quiz Completed!","text":"Happy Birthday!"});
}

function updateProgress(){
  document.getElementById("progressBar").style.width = ((idx)/questions.length*100) + "%";
}

music.addEventListener('ended', ()=>{music.currentTime=0; music.play();});
