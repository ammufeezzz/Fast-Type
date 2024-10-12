const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');

const gameTime = 30 * 1000;
window.timer = null;
window.gameStart = null;
window.pauseTime = 0;

function addclass(el,name){
    el.className+=" "+name
}
function removeclass(el,name){
    el.className=el.className.replace(name,"")
}
function randomword(){
    const randomindex=Math.floor(Math.random()*words.length)
    return words[randomindex]
}

function formatword(word){
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;



}




function newgame(){
    document.getElementById("words").innerHTML=""
    for(let i=0;i<200;i++){
        document.getElementById("words").innerHTML+=formatword(randomword())
    }
    addclass(document.querySelector(".word"),"current")
    addclass(document.querySelector(".letter"),"current")
}



function gameOver() {
    clearInterval(window.timer);
    addclass(document.getElementById('game'), 'over');
    console.log("Game Over function called");
    displayResults();
}
function getWpm() {
    const words = [...document.querySelectorAll('.word')];
    const lastTypedWord = document.querySelector('.word.current');
    const lastTypedWordIndex = words.indexOf(lastTypedWord) + 1;
    const typedWords = words.slice(0, lastTypedWordIndex);
    let totalLettersTyped = 0;
    let correctLettersCount = 0;
    const correctWords = typedWords.filter(word => {
        const letters = [...word.children];
        const incorrectLetters = letters.filter(letter => letter.className.includes('incorrect'));
        const correctLetters = letters.filter(letter => letter.className.includes('correct'));
        totalLettersTyped+=letters.length
        correctLettersCount+=correctLetters.length


        return incorrectLetters.length === 0 && correctLetters.length === letters.length;
    });
    const accuracy=(correctLettersCount/totalLettersTyped)*100

    const userwpm= correctWords.length / gameTime * 60000;
    return { wpm: Math.round(userwpm),
        accuracy: Math.round(accuracy)}
}

const wpmdata=[]
const accuracydata=[]

document.getElementById("game").addEventListener("keyup", ev => {
    const key = ev.key; // The key that was pressed
    const currentword = document.querySelector(".word.current"); // The currently highlighted word
    const currentletter = document.querySelector(".letter.current"); // The currently highlighted letter
    const expected = currentletter?.innerHTML || " "; // Get the expected letter or space
    const isletter = key.length === 1 && key !== " "; // Check if a single letter was pressed
    const isspace = key === " "; // Check if the spacebar was pressed
    const isbackspace= key==="Backspace"
    const isfirstletter= currentletter===currentword.firstChild

    if (document.querySelector('#game.over')) {
        return;
      }

    console.log({ key, expected });

    if (!window.timer && isletter) {
        window.timer = setInterval(() => {
          if (!window.gameStart) {
            window.gameStart = (new Date()).getTime();
          }
          const currentTime = (new Date()).getTime();
          const msPassed = currentTime - window.gameStart;
          const sPassed = Math.round(msPassed / 1000);
          const sLeft = Math.round((gameTime / 1000) - sPassed);
          document.getElementById('info').innerHTML = sLeft + '';

          if (sLeft <= 0) {
            gameOver();
            return;
          }

          const {wpm,accuracy}=getWpm()
          wpmdata.push(wpm)
          accuracydata.push(accuracy)

        }, 1000);
    }

    if (isletter) {
        if (currentletter) {
            // Check if the pressed key matches the expected letter
            addclass(currentletter, key === expected ? "correct" : "incorrect");
            removeclass(currentletter, "current");

            // Move to the next letter
            if (currentletter.nextSibling) {
                addclass(currentletter.nextSibling, "current");
            }
        }
    }

    if (isspace) {
        // Check if the expected character is a space
        if (expected !== " ") {
            // Invalidate letters if the expected character is not a space
            const lettersToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            lettersToInvalidate.forEach(letter => {
                addclass(letter, "incorrect");
            });
        }

        // Move to the next word
        if (currentword) {
            removeclass(currentword, "current");
            if (currentword.nextSibling) {
                addclass(currentword.nextSibling, "current"); // Highlight the next word
                // Highlight the first letter of the next word
                addclass(currentword.nextSibling.firstChild, "current");
            }
        }

        if (currentletter) {
            removeclass(currentletter, "current");
        }
    }
    if(isbackspace){
        if(currentletter && isfirstletter){
            removeclass(currentword,"current")
            addclass(currentword.previousSibling,"current")
            removeclass(currentletter,"current")
            addclass(currentword.previousSibling.lastChild,"current")
            removeclass(currentword.previousSibling.lastChild,"incorrect")
            removeclass(currentword.previousSibling.lastChild,"correct")
        }
        else if (currentletter) {
            const previousLetter = currentletter.previousSibling;
            if (previousLetter) {
                removeclass(currentletter, "current");
                addclass(previousLetter, "current");
                removeclass(previousLetter, "incorrect");
                removeclass(previousLetter, "correct");
            }
        }
        else if (!currentletter) {
            // Remove classes from the last letter of the current word
            const lastLetter = currentword.lastChild;
            if (lastLetter) {
                removeclass(lastLetter, "current");
                removeclass(lastLetter, "correct");
                removeclass(lastLetter, "incorrect");
            }
        }
    }
    if (currentword.getBoundingClientRect().top > 250) {
        const words = document.getElementById('words');
        const margin = parseInt(words.style.marginTop || '0px');
        words.style.marginTop = (margin - 35) + 'px';
    }

    const nextletter = document.querySelector(".letter.current");
    const nextword = document.querySelector(".word.current");
    const cursor = document.getElementById("cursor");
    cursor.style.top = (nextletter || nextword).getBoundingClientRect().top + 2 + 'px';
    cursor.style.left = (nextletter || nextword).getBoundingClientRect()[nextletter ? 'left' : 'right'] + 'px';
});

document.addEventListener("keydown",(event)=>{
    const keyPressed = event.key;
    const button=document.querySelector(`input[value="${keyPressed}"]`)
    if(button){
        button.classList.add("active")
    }
    

})

document.addEventListener("keyup",(event)=>{
    const keydown=event.key
    const button=document.querySelector(`input[value="${keydown}"]`)
    setTimeout(() => {
        button.classList.remove('active');
    }, 50); 
})

function displayResults() {
    console.log("displayResults function called");
    console.log("WPM data:", wpmdata);

    // Clear the existing content
    const textContainer = document.querySelector('.text-container');
    textContainer.innerHTML = '';
    textContainer.classList.add('centered');

    // Create a canvas for the chart
    const canvas = document.createElement('canvas');
    canvas.id = 'wpmChart';
    textContainer.appendChild(canvas);

    document.getElementById('game').style.display = 'none';
    document.querySelector('.keyboard').style.display = 'none';
    textContainer.style.display = 'flex';
    document.getElementById('info').innerHTML = "";

    const chartAndStats = document.createElement('div');
    chartAndStats.classList.add('chart-and-stats');
    textContainer.appendChild(chartAndStats);

    // WPM and accuracy 
    const { wpm, accuracy } = getWpm();

    // stats div
    const statsDiv = document.createElement('div');
    statsDiv.classList.add('stats');
    chartAndStats.appendChild(statsDiv);

    // WPM and accuracy stats
    const wpmStat = document.createElement('p');
    wpmStat.classList.add('wpm-stat');
    wpmStat.innerHTML = `<span class="large">${wpm}</span> WPM`;
    statsDiv.appendChild(wpmStat);

    const accuracyStat = document.createElement('p');
    accuracyStat.classList.add('accuracy-stat');
    accuracyStat.innerHTML = `<span class="large">${accuracy}%</span> ACC`;
    statsDiv.appendChild(accuracyStat);

    // Labels for each second of the test (based on elapsed time)
    const labels = Array.from({ length: 30 }, (_, i) => i + 1);

    // WPM Chart
    const ctx = document.getElementById('wpmChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'WPM Over Time',
                data: wpmdata,
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    title: {
                        display: true,
                        text: 'Time (seconds)'
                    }
                },
                y: {
                    title: {
                        display: true,
                        text: 'Words Per Minute'
                    }
                }
            }
        }
    });
}





newgame()


