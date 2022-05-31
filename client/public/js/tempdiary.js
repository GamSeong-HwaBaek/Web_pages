var submit = document.getElementById('submitButton');
submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

/* 버튼 */
const btnSLD = document.querySelector('.btnSetLocalData');
/* input 텍스트 */
const setInput = document.querySelector('#setInput');

function setData() {
    /* 할 일 처리 --> 입력한 텍스트 값 가져오기 */
    let setInputValue = setInput.value;

    /* localStorage 저장 */
    localStorage.setItem('inputValue', setInputValue);
    setInput.value = '';

    /* set Data 버튼 클릭 시 */
    btnSLD.addEventListener('click', setData);
};



function showImage() {
    var newImage = document.getElementById('image-show').lastElementChild;
    newImage.style.visibility = "visible";
    newImage.style.display = "block";

    var imashow = document.getElementById('image-show');
    imashow.style.display = "block";
    document.getElementById('image-upload').style.visibility = 'hidden';
    document.getElementById('fileContainer').style.display = 'none';

    document.getElementById('fileName').textContent = null;     //기존 파일 이름 지우기
}


function loadFile(input) {
    var file = input.files[0];

    var name = document.getElementById('fileName');
    name.textContent = file.name;

    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');

    newImage.src = URL.createObjectURL(file);

    newImage.style.width = "100%";
    newImage.style.height = "100%";
    newImage.style.visibility = "hidden";   //버튼을 누르기 전까지는 이미지 숨기기
    newImage.style.objectFit = "contain";


    var container = document.getElementById('image-show');
    container.appendChild(newImage);
};
function serchweather(nowweather) {
    if (nowweather == 'sunny') {
        document.getElementById('sunny').style.color = 'var(--color-orange)';
        document.getElementById('cloudy').style.color = 'var(--color-main)';
        document.getElementById('rainy').style.color = 'var(--color-main)';
        document.getElementById('snowy').style.color = 'var(--color-main)';
    } else if (nowweather == 'cloudy') {
        document.getElementById('cloudy').style.color = 'var(--color-orange)';
        document.getElementById('sunny').style.color = 'var(--color-main)';
        document.getElementById('rainy').style.color = 'var(--color-main)';
        document.getElementById('snowy').style.color = 'var(--color-main)';
    } else if (nowweather == 'rainy') {
        document.getElementById('rainy').style.color = 'var(--color-orange)';
        document.getElementById('sunny').style.color = 'var(--color-main)';
        document.getElementById('cloudy').style.color = 'var(--color-main)';
        document.getElementById('snowy').style.color = 'var(--color-main)';
    } else if (nowweather == 'snowy') {
        document.getElementById('snowy').style.color = 'var(--color-orange)';
        document.getElementById('sunny').style.color = 'var(--color-main)';
        document.getElementById('cloudy').style.color = 'var(--color-main)';
        document.getElementById('rainy').style.color = 'var(--color-main)';
    } else {
        console.log('날씨가 입력되어 있지 않습니다.');
    }
}
function loadDiary() {
    fetch('http://localhost:8080/diary/?userid=20', { method: 'GET' }).then((response) => response.json())
        .then((data) => {
            if (data.length == 0) {
                alert('환영합니다! 일기를 작성해서 나만의 미술관을 만들어 보세요!');
                document.getElementById('sunny').style.color = 'var(--color-main)';
                document.getElementById('cloudy').style.color = 'var(--color-main)';
                document.getElementById('rainy').style.color = 'var(--color-main)';
                document.getElementById('snowy').style.color = 'var(--color-main)';
            } else {
                firstpage = data[0];//로드시 처음 페이지
                document.getElementsByClassName('mydiary__container').id = 0;
                document.getElementById('year').value = firstpage.date.slice(0, 4);
                document.getElementById('month').value = firstpage.date.slice(5, 7);
                document.getElementById('day').value = firstpage.date.slice(8, 10);
                document.getElementById('title').value = firstpage.title;
                document.getElementById('setInput').value = firstpage.contents;

                serchweather(firstpage.weather);
            }
        });
}
function clickprevpage() {
    //diary?userid=5
    fetch('http://localhost:8080/diary/?userid=20', { method: 'GET' }).then((response) => response.json())
        .then((data) => {
            len = data.length;
            nowpage = document.getElementsByClassName('mydiary__container').id;
            if (nowpage == 0) {
                alert('첫번째페이지입니다');
            } else {
                next = nowpage - 1;
                nextpage = data[next];
                document.getElementsByClassName('mydiary__container').id = next;
                document.getElementById('year').value = nextpage.date.slice(0, 4);
                document.getElementById('month').value = nextpage.date.slice(5, 7);
                document.getElementById('day').value = nextpage.date.slice(8, 10);
                document.getElementById('title').value = nextpage.title;
                document.getElementById('setInput').value = nextpage.contents;

                serchweather(nextpage.weather);
            }
        });
}
function clicknextpage() {
    //diary?userid=5
    fetch('http://localhost:8080/diary/?userid=20', { method: 'GET' }).then((response) => response.json())
        .then((data) => {
            len = data.length;
            nowpage = document.getElementsByClassName('mydiary__container').id;
            if (nowpage == len) {
                alert('일기를 작성해 주세요');
            } else if (nowpage == len - 1) {
                next = nowpage + 1;
                nextpage = data[next];
                document.getElementsByClassName('mydiary__container').id = next;
                document.getElementById('year').value = '';
                document.getElementById('month').value = '';
                document.getElementById('day').value = '';
                document.getElementById('title').value = '';
                document.getElementById('setInput').value = '';

                document.getElementById('sunny').style.color = 'var(--color-main)';
                document.getElementById('cloudy').style.color = 'var(--color-main)';
                document.getElementById('rainy').style.color = 'var(--color-main)';
                document.getElementById('snowy').style.color = 'var(--color-main)';
            }
            else {
                next = nowpage + 1;
                nextpage = data[next];
                document.getElementsByClassName('mydiary__container').id = next;
                document.getElementById('year').value = nextpage.date.slice(0, 4);
                document.getElementById('month').value = nextpage.date.slice(5, 7);
                document.getElementById('day').value = nextpage.date.slice(8, 10);
                document.getElementById('title').value = nextpage.title;
                document.getElementById('setInput').value = nextpage.contents;

                serchweather(nextpage.weather);
            }


        });
}
