let index = 0;
let readThankDB;
let thanksMax = 0;

getThanksByDB();

function getThanksByDB() {
    var requestURL = 'thanks.json';
    var request = new XMLHttpRequest();
    request.open('GET', requestURL);
    request.responseType = 'json';
    request.send();
    request.onload = function() {
        console.log(request.response);
        readThankDB = request.response;
        thanksMax = Object.keys(readThankDB).length;
        addData(0);
    }
}

function addData(index) {
    let thanksMax = readThankDB.length;
    const studenttitle = document.getElementById('studenttitle');
    const thankbox = document.getElementById('thankbox');
    const thankstotal = document.getElementById('thankstotal');
    const thankData = readThankDB[index];
    studenttitle.innerHTML = '';
    const studentnameDiv = document.createElement("p");
    studentnameDiv.classList.add("studentname");
    studentnameDiv.innerHTML = `${thankData.student}`;
    studenttitle.append(studentnameDiv);
    const pattern = /\n/g;
    const thankcontent = thankData.thank.replace(pattern, '<br>')
    thankbox.innerHTML = '';
    const thankDiv = document.createElement("p");
    thankDiv.classList.add("thankcontent");
    thankDiv.innerHTML = `${thankcontent}`;
    thankbox.append(thankDiv);
    thankstotal.innerHTML = '';
    const totalDiv = document.createElement("span");
    totalDiv.innerHTML = ` ${index + 1} / ${thanksMax}`;
    thankstotal.append(totalDiv);
}

const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
prevButton.addEventListener('click', function(){
    index--;
    if (index < 0) {
        index = 0;
        prevButton.classList.add('disabled');
        Swal.fire(
            'Oops...',
            '已經是第 1 位了',
            'error'
        )
    } else if (index === 0){
        addData(index);
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
        addData(index);
    }
}, false);
nextButton.addEventListener('click', function(){
    index++;
    if (index > thanksMax - 1){
        index = thanksMax - 1;
        Swal.fire(
            'Oops...',
            '已經是最後 1 位了',
            'error'
        )
        nextButton.classList.add('disabled');
    } else if (index === thanksMax - 1){
        addData(index);
        nextButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
        addData(index);
    }
}, false);