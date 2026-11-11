window.addEventListener('DOMContentLoaded', function() {
    let ism = localStorage.getItem('user_name');
    const savedTasks = localStorage.getItem('my_tasks');
    if (savedTasks) {
        tasks.push(...JSON.parse(savedTasks));
    }
    if (!ism) {
        ism = prompt("Salom! Ismingizni kiriting:");
        if (ism) {
            localStorage.setItem('user_name', ism);
        }
    }
    if (ism) {
        document.getElementById('welcome-title').innerHTML = "Hayrli kun," + ism +"! 👋<br><span style='font-size: 20px;'>Bugun nima qilsam e'kan? 🤔</span>";
    }
});

const tasks = [
 "Bugun ku'chaga chiq va birinchi ku'rgan mushugingni suratga ol! 🤳",
 "Bugun 10 daqiqa davomida faqat chap qu'ling bilan yozib ku'r! ✍",
 "Bugun mutlaqo yangi, oldin hech emagan taomingni tatib ku'r! 🧆",
 "Bugun e'ski qadrdoningga telefon qil yoki hat yozib, hol-ahvol su'ra! 💌",
 "Bugun honangni 15 daqiqa ichida ideal darajada tartibga keltir! 🏠",
 "Bugun telefondan 1 soat davomida umuman foydalanma! 📲",
 "Bugun uzing yoqtirgan qu'shiqqa 5 daqiqa davomida raqsga tush! 💃",
 "Bugun daftar olib, kelajakdagi 5-ta e'ng katta orzularingni yoz! ✨",
 "Bugun ota-onangga yahsi ku'rishingni ayt va ularni doimo qadrla! 💞",
 "Bugun bir foydali mavzuda 30 minut kitob u'qi! 📚",
 "Bugun oynaga qarab, u'zingga 3-ta yahsi jihatingni aytib maqta!🎀",
 "Bugun 1 soat davomida faqat yahshi yangiliklar va ijobiy videolar tomosha qil! 📲",
 "Bugun ku'chaga chiqib, 5000 qadam piyoda yur! 🚶‍♂️",
 "Bugun yotishdan oldin hechnarsani u'ylamay, 5 daqiqa chuqur nafas olib keyin uhla! 🛌",
 "Bugun oilang uchun biron bir ovqat tayyorlab ber! 🥣"
];

const taskText = document.getElementById('matn');
const generateBtn = document.getElementById('generate-btn');
const card = document.getElementById('block');

generateBtn.addEventListener('click', function() {
   
    taskText.classList.remove('task-pleaceholder');
    card.classList.add('spin-animation');

    const randomIndex = Math.floor(Math.random()* tasks.length);
    const selectedTask = tasks[randomIndex];

    taskText.textContent = selectedTask;
    taskText.style.display = 'block';

    taskText.classList.add('pop-animation');
    setTimeout(function() {
        taskText.classList.remove('pop-animation');
    },400);

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(587.33, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.15);


        const li = document.createElement('li');
        li.textContent = selectedTask;
        document.getElementById('history-list').appendChild(li);

    const actionButtons = document.getElementById('action-buttons');
    const resultMessage = document.getElementById('result-message');
    const historyContainer = document.querySelector('.history-container');

    actionButtons.style.display = 'flex';
    resultMessage.style.display = 'none';

    document.getElementById('done-btn').onclick = function () {
        taskText.style.display = 'none';
        document.getElementById('action-buttons').style.display = 'none';
        document.querySelector('.history-container').style.display = 'none';

        document.getElementById('status-text').textContent = "Barakalla! Siz doimo birinchilardansiz!";
        document.getElementById('big-emoji').textContent = "🏆🤩🎉"
         document.getElementById('result-message').style.display = 'block';

         document.getElementById('history-list').innerHTML = '';

        setTimeout(() => {
            document.getElementById('result-message').style.display = 'none';
            taskText.style.display = 'block';
            document.querySelector('.history-container').style.display = 'block';
        }, 3000);
      };

      document.getElementById('fail-btn').onclick = function() {
        taskText.style.display = 'none';
        document.getElementById('action-buttons').style.display = 'none';
        document.querySelector('.history-container').style.display = 'none';

        document.getElementById('status-text').textContent = "Afsus...Keyingi safar albatta bajarasiz!";
        document.getElementById('big-emoji').textContent = "😔💪";
        document.getElementById('result-message').style.display = 'block';

        document.getElementById('history-list').innerHTML = '';
       
         setTimeout(() => {
            document.getElementById('result-message').style.display = 'none';
            taskText.style.display = 'block';
            document.querySelector('.history-container').style.display = 'block';
        }, 3000);
    };
    setTimeout(() => {
        card.classList.remove('spin-animation');
    },400);

    document.getElementById('add-task-btn').onclick = function() {
        const input = document.getElementById('new-task-input');
        if (tasks.length >= 50) {
            alert("Maksimum 50 ta vazifa qu'shish mumkin!");
            return;
        }
        if (input.value.trim() !=="") {
            tasks.push(input.value.trim());
            localStorage.setItem('my_tasks', JSON.stringify(tasks));
            alert("Yangi vazifa muvaffaqiyatli qu'shildi! 🎉");
            input.value = "";
        } else {
            alert("Iltimos, vazifani yozing!");
        }
    };
});
document.getElementById('dark-btn').onclick = function() {
    document.body.style.filter = document.body.style.filter === 'invert(1)' ? 'invert(0)' : 'invert(1)';
    this.textContent = this.textContent === '🌙' ? '☀' : '🌙';
};