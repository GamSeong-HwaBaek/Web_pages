var submit = document.getElementById('submitButton');
submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

/* 버튼 */
const btnSLD = document.querySelector('.btnSetLocalData');
/* input 텍스트 */
const setInput = document.querySelector('#setInput');

let sunnycolor = document.getElementById('sunny').style.color;
let cloudycolor = document.getElementById('cloudy').style.color;
let rainycolor = document.getElementById('rainy').style.color;
let snowycolor = document.getElementById('snowy').style.color;

let activecolor = document.getElementById('active').style.color;
let joycolor = document.getElementById('joy').style.color;
let peacefulcolor = document.getElementById('peaceful').style.color;
let neutralcolor = document.getElementById('neutral').style.color;
let relaxedcolor = document.getElementById('relaxed').style.color;
let contentcolor = document.getElementById('content').style.color;
let tiredcolor = document.getElementById('tired').style.color;
let sleepycolor = document.getElementById('sleepy').style.color;
let disgustcolor = document.getElementById('disgust').style.color;

function setData() {
    /* 할 일 처리 --> 입력한 텍스트 값 가져오기 */
    let noworange = 0;
    if (sunnycolor == "var(--color-orange)") {
        noworange += 1
    }
    if (cloudycolor == "var(--color-orange)") {
        noworange += 1
    }
    if (rainycolor == "var(--color-orange)") {
        noworange += 1
    }
    if (snowycolor == "var(--color-orange)") {
        noworange += 1
    }
    if (noworange == 0) {
        alert("날씨를 선택하세요");
    } else if (noworange > 1) {
        alert("하나의 날씨를 선택하세요");
    }
    let setInputValue = setInput.value;

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
                if ((yearweather[tempyear][tempweather]).length % 5 == 0) {
                    //갤러리 정보 가져와서 각 항목별로 5의 배수이면 다이어리 추가or생성
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

function showImage() {
    // var newImage = document.getElementById('image-show').lastElementChild;
    // newImage.style.visibility = "visible";
    // newImage.style.display = "block";
    var imashow = document.getElementById('image-show');
    imashow.style.display = "block";
    document.getElementById('image-show').style.opacity = "1";
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

    document.getElementById('image-show').style.backgroundImage = "url(" + String(newImage.src) + ")";
    document.getElementById('image-show').style.background.width = "100%";
    document.getElementById('image-show').style.backgroundSize = "contain";
    document.getElementById('image-show').style.backgroundRepeat = "no-repeat";
    document.getElementById('image-show').style.opacity = "0";
};

function clicksunny() {
    if (sunnycolor == "var(--color-orange)") {
        document.getElementById('sunny').style.color = "var(--color-main)";
    } else {
        document.getElementById('sunny').style.color = "var(--color-orange)";
    }
    sunnycolor = document.getElementById('sunny').style.color;
}
function clickcloudy() {
    if (cloudycolor == "var(--color-orange)") {
        document.getElementById('cloudy').style.color = "var(--color-main)";
    } else {
        document.getElementById('cloudy').style.color = "var(--color-orange)";
    }
    cloudycolor = document.getElementById('cloudy').style.color;
}
function clickrainy() {
    if (rainycolor == "var(--color-orange)") {
        document.getElementById('rainy').style.color = "var(--color-main)";
    } else {
        document.getElementById('rainy').style.color = "var(--color-orange)";
    }
    rainycolor = document.getElementById('rainy').style.color;
}
function clicksnowy() {
    if (snowycolor == "var(--color-orange)") {
        document.getElementById('snowy').style.color = "var(--color-main)";
    } else {
        document.getElementById('snowy').style.color = "var(--color-orange)";
    }
    snowycolor = document.getElementById('snowy').style.color;
}

function clickactive() {
    if (activecolor == "var(--color-orange)") {
        document.getElementById('active').style.color = "var(--color-main)";
    } else {
        document.getElementById('active').style.color = "var(--color-orange)";
    }
    activecolor = document.getElementById('active').style.color;
}
function clickjoy() {
    if (joycolor == "var(--color-orange)") {
        document.getElementById('joy').style.color = "var(--color-main)";
    } else {
        document.getElementById('joy').style.color = "var(--color-orange)";
    }
    joycolor = document.getElementById('joy').style.color;
}
function clickpeaceful() {
    if (peacefulcolor == "var(--color-orange)") {
        document.getElementById('peaceful').style.color = "var(--color-main)";
    } else {
        document.getElementById('peaceful').style.color = "var(--color-orange)";
    }
    peacefulcolor = document.getElementById('peaceful').style.color;
}
function clickneutral() {
    if (neutralcolor == "var(--color-orange)") {
        document.getElementById('neutral').style.color = "var(--color-main)";
    } else {
        document.getElementById('neutral').style.color = "var(--color-orange)";
    }
    neutralcolor = document.getElementById('neutral').style.color;
}
function clickrelaxed() {
    if (relaxedcolor == "var(--color-orange)") {
        document.getElementById('relaxed').style.color = "var(--color-main)";
    } else {
        document.getElementById('relaxed').style.color = "var(--color-orange)";
    }
    relaxedcolor = document.getElementById('relaxd').style.color;
}
function clickcontent() {
    if (contentcolor == "var(--color-orange)") {
        document.getElementById('content').style.color = "var(--color-main)";
    } else {
        document.getElementById('content').style.color = "var(--color-orange)";
    }
    contentcolor = document.getElementById('content').style.color;
}
function clicktired() {
    if (tiredcolor == "var(--color-orange)") {
        document.getElementById('tired').style.color = "var(--color-main)";
    } else {
        document.getElementById('tired').style.color = "var(--color-orange)";
    }
    tiredcolor = document.getElementById('tired').style.color;
}
function clicksleepy() {
    if (sleepycolor == "var(--color-orange)") {
        document.getElementById('sleepy').style.color = "var(--color-main)";
    } else {
        document.getElementById('sleepy').style.color = "var(--color-orange)";
    }
    sleepycolor = document.getElementById('sleepy').style.color;
}
function clickdisgust() {
    if (disgustcolor == "var(--color-orange)") {
        document.getElementById('disgust').style.color = "var(--color-main)";
    } else {
        document.getElementById('disgust').style.color = "var(--color-orange)";
    }
    disgustcolor = document.getElementById('disgust').style.color;
}


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

function serchemotion(emotion) {
    document.getElementById('active').style.color = 'var(--color-main)';
    document.getElementById('joy').style.color = 'var(--color-main)';
    document.getElementById('peaceful').style.color = 'var(--color-main)';
    document.getElementById('neutral').style.color = 'var(--color-main)';
    document.getElementById('relaxed').style.color = 'var(--color-main)';
    document.getElementById('content').style.color = 'var(--color-main)';
    document.getElementById('tired').style.color = 'var(--color-main)';
    document.getElementById('sleepy').style.color = 'var(--color-main)';
    document.getElementById('disgust').style.color = 'var(--color-main)';
    if (emotion.di_emotion == 'active') {
        document.getElementById('active').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'joy') {
        document.getElementById('joy').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'peaceful') {
        document.getElementById('peaceful').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'neutral') {
        document.getElementById('neutral').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'relaxed') {
        document.getElementById('relaxed').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'content') {
        document.getElementById('content').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'tired') {
        document.getElementById('tired').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'sleepy') {
        document.getElementById('sleepy').style.color = 'var(--color-orange)';
    } else if (emotion.di_emotion == 'disgust') {
        document.getElementById('disgust').style.color = 'var(--color-orange)';
    } else {
        console.log('감정이 입력되어 있지 않습니다.');
    }
}

// function loadDiary() {
//     fetch('http://localhost:8080/diary?userid=20', { method: 'GET' }).then((response) => response.json())
//         .then((data) => {

//             if (data.length == 0) {
//                 alert('환영합니다! 일기를 작성해서 나만의 미술관을 만들어 보세요!');
//                 document.getElementById('sunny').style.color = 'var(--color-main)';
//                 document.getElementById('cloudy').style.color = 'var(--color-main)';
//                 document.getElementById('rainy').style.color = 'var(--color-main)';
//                 document.getElementById('snowy').style.color = 'var(--color-main)';
//                 document.getElementById('active').style.color = 'var(--color-main)';
//                 document.getElementById('joy').style.color = 'var(--color-main)';
//                 document.getElementById('peaceful').style.color = 'var(--color-main)';
//                 document.getElementById('neutral').style.color = 'var(--color-main)';
//                 document.getElementById('relaxed').style.color = 'var(--color-main)';
//                 document.getElementById('content').style.color = 'var(--color-main)';
//                 document.getElementById('tired').style.color = 'var(--color-main)';
//                 document.getElementById('sleepy').style.color = 'var(--color-main)';
//                 document.getElementById('disgust').style.color = 'var(--color-main)';
//             } else {
//                 firstpage = data[0];//로드시 처음 페이지
//                 document.getElementsByClassName('mydiary__container').id = 0;
//                 document.getElementById('year').value = firstpage.date.slice(0, 4);
//                 document.getElementById('month').value = firstpage.date.slice(5, 7);
//                 document.getElementById('day').value = firstpage.date.slice(8, 10);
//                 document.getElementById('title').value = firstpage.title;
//                 document.getElementById('setInput').value = firstpage.contents;
//                 serchemotion(firstpage.emotion);
//                 serchweather(firstpage.weather);
//             }
//         });
// }

// function clickprevpage() {
//     //diary?userid=5
//     fetch('http://localhost:8080/diary/?userid=20', { method: 'GET' }).then((response) => response.json())
//         .then((data) => {
//             len = data.length;
//             nowpage = document.getElementsByClassName('mydiary__container').id;
//             if (nowpage == 0) {
//                 alert('첫번째페이지입니다');
//             } else {
//                 next = nowpage - 1;
//                 nextpage = data[next];
//                 document.getElementsByClassName('mydiary__container').id = next;
//                 document.getElementById('year').value = nextpage.date.slice(0, 4);
//                 document.getElementById('month').value = nextpage.date.slice(5, 7);
//                 document.getElementById('day').value = nextpage.date.slice(8, 10);
//                 document.getElementById('title').value = nextpage.title;
//                 document.getElementById('setInput').value = nextpage.contents;
//                 serchemotion(nextpage.emotion);
//                 serchweather(nextpage.weather);
//             }
//         });
// }

// function clicknextpage() {
//     //diary?userid=5
//     fetch('http://localhost:8080/diary/?userid=20', { method: 'GET' }).then((response) => response.json())
//         .then((data) => {
//             len = data.length;
//             nowpage = document.getElementsByClassName('mydiary__container').id;
//             if (nowpage == len) {
//                 alert('일기를 작성해 주세요');
//             } else if (nowpage == len - 1) {
//                 next = nowpage + 1;
//                 nextpage = data[next];
//                 document.getElementsByClassName('mydiary__container').id = next;
//                 document.getElementById('year').value = '';
//                 document.getElementById('month').value = '';
//                 document.getElementById('day').value = '';
//                 document.getElementById('title').value = '';
//                 document.getElementById('setInput').value = '';

//                 document.getElementById('sunny').style.color = 'var(--color-main)';
//                 document.getElementById('cloudy').style.color = 'var(--color-main)';
//                 document.getElementById('rainy').style.color = 'var(--color-main)';
//                 document.getElementById('snowy').style.color = 'var(--color-main)';
//             }
//             else {
//                 next = nowpage + 1;
//                 nextpage = data[next];
//                 document.getElementsByClassName('mydiary__container').id = next;
//                 document.getElementById('year').value = nextpage.date.slice(0, 4);
//                 document.getElementById('month').value = nextpage.date.slice(5, 7);
//                 document.getElementById('day').value = nextpage.date.slice(8, 10);
//                 document.getElementById('title').value = nextpage.title;
//                 document.getElementById('setInput').value = nextpage.contents;
//                 serchemotion(nextpage.emotion);
//                 serchweather(nextpage.weather);
//             }


//         });
// }

function write() {
    // fetch('http://localhost:8080/diary/?userid=20', { method: 'POST' }).then((response) => response.json())
    //     .then((data) => {
    //         document.getElementById('sunny').style.color = 'var(--color-main)';
    //         document.getElementById('cloudy').style.color = 'var(--color-main)';
    //         document.getElementById('rainy').style.color = 'var(--color-main)';
    //         document.getElementById('snowy').style.color = 'var(--color-main)';
    //         document.getElementById('active').style.color = 'var(--color-main)';
    //         document.getElementById('joy').style.color = 'var(--color-main)';
    //         document.getElementById('peaceful').style.color = 'var(--color-main)';
    //         document.getElementById('neutral').style.color = 'var(--color-main)';
    //         document.getElementById('relaxed').style.color = 'var(--color-main)';
    //         document.getElementById('content').style.color = 'var(--color-main)';
    //         document.getElementById('tired').style.color = 'var(--color-main)';
    //         document.getElementById('sleepy').style.color = 'var(--color-main)';
    //         document.getElementById('disgust').style.color = 'var(--color-main)';
    //         document.getElementById('year').value = '';
    //         document.getElementById('month').value = '';
    //         document.getElementById('day').value = '';
    //         document.getElementById('title').value = '';
    //         document.getElementById('setInput').value = '';
    //     });
}

function show() {
    document.querySelector("#select").className = "background show";
}

function close() {
    document.querySelector("#select").className = "background";
}

function close3() {
    document.querySelector("#spin2").className = "background";
}

function close2() {
    document.querySelector("#spin").className = "background";
}
function print() {
    console.log(document.querySelector(".img__wrapbox"));
}
document.querySelector("#savebutton").addEventListener('click', loading);
document.querySelector("#show").addEventListener('click', show);

function return1() {
    document.getElementsByClassName('popup').id = "1";
    close();
    result();
}
function return2() {
    document.getElementsByClassName('popup').id = "2";
    close();
    result();
}
function return3() {
    document.getElementsByClassName('popup').id = "3";
    close();
    result();
}
function return4() {
    document.getElementsByClassName('popup').id = "4";
    close();
    result();
}
function return5() {
    document.getElementsByClassName('popup').id = "5";
    close();
    result();
}
function loading() {
    document.querySelector("#spin").className = "background show";
}
function change() {
    close2();
    show();
}

function result() {
    document.querySelector("#spin2").className = "background show";
}

function finish() {
    close3();
    removeImage();
    var newImage = document.createElement("img");
    newImage.setAttribute("class", 'img');
    newImage.id = "nowImage";
    newImage.src = "C:/Users/82108/Desktop/Web_pages/client/public/img/그림5.png";
    document.getElementById('image-show').appendChild(newImage);
}
function removeImage() {
    document.getElementById('image-show').classList.remove('image-show');
    document.getElementById('image-upload').classList.remove('image-upload');
}