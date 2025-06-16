const startStopBtn = document.getElementById('startStopBtn');
const textOutput = document.getElementById('text');

const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

if(!SpeechRecognition){
    textOutput.textContent="Sorry, Your browser doesn't support Speech Recognition.";
    startStopBtn.disabled=true;
}
else{
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    let listening=false;

    startStopBtn.addEventListener('click',()=> {
        if(!listening){
            recognition.start();
            startStopBtn.textContent='Stop Listening';
            // startStopBtn.classList.replace('bg-blue-600','bg-red-600');
        
             startStopBtn.classList.remove('bg-blue-500');
  startStopBtn.classList.add('bg-red-500');
            listening=true;
        }
        else{
            recognition.stop();
            startStopBtn.textContent='Start Listening';
            // startStopBtn.classList.replace('bg-red-600','bg-blue-600');
             startStopBtn.classList.remove('bg-red-500');
  startStopBtn.classList.add('bg-blue-500');
            listening=false;
        }
    });

    recognition.onresult = (event) => {
        const transcript = Array.from(event.results)
        .map(result => result[0].transcript)
        .join('');

        textOutput.textContent = transcript;
    };

    recognition.onerror = (event) =>{
        textOutput.textContent = `Error: ${event.error}`;;
    };
}