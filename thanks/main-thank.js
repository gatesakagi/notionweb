async function getThanksByDB() {
    
    let url = 'https://gatesakagi-notionapi.herokuapp.com/api/thanks';
    let obj = null;

    Swal.fire({
        title: '',
        html: '<div class="loading"><img src="images/notion-logo-no-background.png"><p>資料載入中，請稍候...</p></div>',
        showConfirmButton: false
    });
    
    try {
        obj = await (await fetch(url)).json();
    } catch(e) {
        console.log('error');
    }
    Swal.close();
    readThankDB = obj;
    thanksMax = Object.keys(obj).length;
    console.log(thanksMax);
    addData(obj, 0);
}
let index = 0;
let readThankDB;
let thanksMax = 0;
await getThanksByDB();
function addData(readData, index) {
    let thanksMax = readData.length;
    const studenttitle = document.getElementById('studenttitle');
    const thankbox = document.getElementById('thankbox');
    const thankstotal = document.getElementById('thankstotal');
    const thankData = readData[index];
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
        addData(readThankDB, index);
        prevButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
        addData(readThankDB, index);
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
        addData(readThankDB, index);
        nextButton.classList.add('disabled');
    } else {
        prevButton.classList.remove('disabled');
        nextButton.classList.remove('disabled');
        addData(readThankDB, index);
    }
}, false);