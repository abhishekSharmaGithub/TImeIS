const incr = document.getElementById('increment');
const decr = document.getElementById('decrement');
const timers = document.getElementById('timer');
const reset = document.getElementById('reset');
const submit = document.getElementById('submit');



let val=0; 

const storedvalue = localStorage.getItem('count');

if(!isNaN(storedvalue)){
  val=parseInt(storedvalue);
  document.getElementsByClassName('count-sub')[0].textContent=val;
}

incr.addEventListener('click',()=>{
    val++;
    updateCount();


});
decr.addEventListener('click',()=>{
    if(val>0)
    val--;
  updateCount();

});
reset.addEventListener('click',()=>{
    val=0;
    updateCount();
});
document.addEventListener('DOMContentLoaded', () => {
  // Retrieve total count value from local storage
  let savedNum = localStorage.getItem('totalCount');

  if (savedNum !== null) {
      // If a value is found in local storage, update the UI
      document.getElementsByClassName('count-total')[0].textContent = savedNum;
  }
});

submit.addEventListener('click',()=>{
    event.preventDefault();
    let inputValue = document.getElementsByClassName('count-total')[0]
    let num=document.getElementById('val').value;

    // check if input is valid 
    if (!isNaN(num)) {
    let savednum=localStorage.getItem('totalCount');
    savednum=parseInt(savednum);

    if(num!==savednum || savednum===null){
    inputValue.textContent= num;
    localStorage.setItem('totalCount',num.toString());
    }
    else{
      inputValue.textContent= savednum;

    }
    }
  
  else {
      showAlert('invalid input!','danger');
  }

});

function showAlert(message,className){
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container=document.querySelector('.container');
    const form = document.querySelector('.top');
    container.insertBefore(div,form);

    setTimeout(()=>{
        div.remove();
    },3000)
}

timers.addEventListener('click',()=>startStopTimer());

let timer;
let hours = 0;
let minutes = 0;
let seconds = 0;
let milliseconds = 0;

function updateTimer() {
  milliseconds += 10;

  if (milliseconds === 1000) {
    milliseconds = 0;
    seconds++;

    if (seconds === 60) {
      seconds = 0;
      minutes++;

      if (minutes === 60) {
        minutes = 0;
        hours++;
      }
    }
  }

  document.getElementById('hours').innerText = hours.toString().padStart(2, '0');
  document.getElementById('minutes').innerText = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').innerText = seconds.toString().padStart(2, '0');
  document.getElementById('milliseconds').innerText = milliseconds.toString().padStart(3, '0');
}

function updateCount(){
  document.getElementsByClassName('count-sub')[0].textContent=val;
  localStorage.setItem('count',val.toString());


}

function startStopTimer() {
  if (timer) {
    // Stop the timer
    clearInterval(timer);
    timer = null;
    resetTimer();
  } else {
    // Start the timer
    timer = setInterval(updateTimer, 10);
  }
}

function resetTimer() {
  hours = 0;
  minutes = 0;
  seconds = 0;
  milliseconds = 0;

  document.getElementById('hours').innerText = '00';
  document.getElementById('minutes').innerText = '00';
  document.getElementById('seconds').innerText = '00';
  document.getElementById('milliseconds').innerText = '000';
}