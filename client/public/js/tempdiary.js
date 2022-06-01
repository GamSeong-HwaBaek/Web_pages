var submit = document.getElementById('submitButton');
submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

/* 버튼 */
const btnSLD = document.querySelector('.btnSetLocalData');
/* input 텍스트 */
const setInput = document.querySelector('#setInput');

/* 검색 텍스트 */
const searchkey = document.querySelector('#question__bar');

function setData(loginid) {
    /* 할 일 처리 --> 입력한 텍스트 값 가져오기 */
    let setInputValue = setInput.value;

    let url = 'http://localhost:8080/diary/?userid=' + loginid;

    console.log(url);

    /* localStorage 저장 */
    localStorage.setItem('inputValue', setInputValue);
    setInput.value = '';

    /* set Data 버튼 클릭 시 */
    btnSLD.addEventListener('click', setData);

    /*전시 생성부분-수정하지 말아주세요(-choi)*/
    //다이어리 정보 가져오기

    fetch('http://localhost:8080/diary/?userid=20', { method: 'GET' }).then((response) => response.json())
        .then((data) => {//최신 날짜순
            var onlyyeardic = {};
            var yeardic = {}; //{"2022": [JSON, JSON], "2021" : [JSON, JSON]} 형태
            var yearweather = {};
            data.forEach(diaryelement => {
                let onlynowyear = diaryelement.date.slice(0, 4);
                let onlyyearkeys = Object.keys(onlyyeardic);
                if (onlyyearkeys.includes(onlynowyear)) {
                    onlyyeardic[onlynowyear].push((diaryelement));
                } else { //처음 삽입시
                    onlyyeardic[onlynowyear] = [(diaryelement)];
                }

                let nowyear = diaryelement.date.slice(0, 4);
                let yearkeys = Object.keys(yeardic);
                let nowmonth = diaryelement.date.slice(5, 7);
                let nowseason;
                if (nowmonth == "03" || nowmonth == "04" || nowmonth == "05") {
                    nowseason = "spring";
                } else if (nowmonth == "06" || nowmonth == "07" || nowmonth == "08") {
                    nowseason = "summer";
                } else if (nowmonth == "09" || nowmonth == "10" || nowmonth == "11") {
                    nowseason = "fall";
                } else if (nowmonth == "12" || nowmonth == "01" || nowmonth == "02") {
                    nowseason = "winter";
                } else {
                    console.log("잘못된 월이 입력되었습니다.");
                }
                if (yearkeys.includes(nowyear)) {
                    let seasonkeys = Object.keys(yeardic[nowyear]);
                    if (seasonkeys.includes(nowseason)) {
                        yeardic[nowyear][nowseason].push((diaryelement.id));
                    } else {
                        yeardic[nowyear][nowseason] = [diaryelement.id];
                    }
                } else { //처음 삽입시
                    yeardic[nowyear] = [];
                    yeardic[nowyear][nowseason] = [diaryelement.id];
                }


                let nowweather = diaryelement.weather;
                if (yearkeys.includes(nowyear)) {
                    let weatherkeys = Object.keys(yearweather[nowyear]);
                    if (weatherkeys.includes(nowweather)) {
                        yearweather[nowyear][nowweather].push((diaryelement.id));
                    } else {
                        yearweather[nowyear][nowweather] = [diaryelement.id];
                    }
                } else { //처음 삽입시
                    yearweather[nowyear] = [];
                    yearweather[nowyear][nowweather] = [diaryelement.id];
                }
            });
            console.log(onlyyeardic); //년도별 다이어리 id
            console.log(yeardic); //년-season별 다이어리 id
            console.log(yearweather); //년-날씨별 다이어리 id

            //전달 받아야 할 항목 (년, 월, 일, season, weather)
            let tempyear = 2022;
            let tempmonth = "05";
            let tempdaty = "31";

            let tempseason = "spring";
            let tempweather = "sunny";
            //각 항목별로 10개이면
            console.log((yeardic[tempyear][tempseason])); //5
            console.log(yearweather[tempyear][tempweather]); //3

            //5나 10의 배수가 아니면 생성 X 생성시(몫이 1인지에 따라->CREATE)(UPDATE) 구분)
            if ((yeardic[tempyear][tempseason]).length % 5 != 0 && (yearweather[tempyear][tempweather]).length % 10 != 0) {//전지 생성 X
                console.log('그냥 넘어감');
            } else {
                if ((yeardic[tempyear][tempseason]).length % 5 == 0) {
                    //전시 아예 생성
                    if ((yeardic[tempyear][tempseason]).length == 1) {
                        console.log('아예 새로 생성');
                        /*                        
                        fetch('http://localhost:8080/exhibition/?OwnerID=20', { method: 'POST' }).then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                            });
                        */
                    } else {
                        /* 제목은 그대로 다이어리목록이랑 ImgNum CreateBy만 추가
                        fetch('http://localhost:8080/exhibition/?OwnerID=20', { method: 'Fetch' }).then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                            });
                        */
                    }
                }
                if ((yearweather[tempyear][tempweather]).length % 10 == 0) {
                    //갤러리 정보 가져와서 각 항목별로 10의 배수이면 다이어리 추가or생성
                    if ((yearweather[tempyear][tempweather]).length / 5 == 1) {
                        console.log('아예 새로 생성');
                        /*                        
                        fetch('http://localhost:8080/exhibition/?OwnerID=20', { method: 'POST' }).then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                            });
                        */
                    } else {
                        /* 제목은 그대로 다이어리목록이랑 ImgNum CreateBy만 추가
                        fetch('http://localhost:8080/exhibition/?OwnerID=20', { method: 'Fetch' }).then((response) => response.json())
                            .then((data) => {
                                console.log(data);
                            });
                        */
                    }
                }
            }
        });
};

function searchByTitle(loginid) {
    return db
        .execute(`SELECT diary.id FROM diary WHERE di.userid =? LIKE %?%`, [loginid, searchkey])
        .then((response) => response.json)
        .then((data) => {
            len = data.length;
            nowpage = document.getElementsByClassName('mydiary__container').id;
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
        );
}

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
    fetch('http://localhost:8080/diary/?userid=5', { method: 'GET' }).then((response) => response.json())
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

function write() {
    document.getElementById('year').value = null;
    document.getElementById('month').value = null;
    document.getElementById('day').value = null;
    document.getElementById('title').value = null;
    document.getElementById('setInput').value = null;
}

function clickprevpage() {
    //diary?userid=5
    fetch('http://localhost:8080/diary/?userid=5', { method: 'GET' }).then((response) => response.json())
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
    fetch('http://localhost:8080/diary/?userid=5', { method: 'GET' }).then((response) => response.json())
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
