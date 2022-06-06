let Authorization = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTM4MzE3ODAsImV4cCI6MTY1NDAwNDU4MH0.hKX9hphNAwF_kE_L9FjKMmOt4RMI-_yy9mTOjKlLfKs';

function clickTheExhitibion() {
    document.querySelector(".background").className = "background show";
}
function closePopup() {
    nowgalleryid = document.getElementsByClassName('title').id;
    console.log("지금 제목 아이디");
    console.log(nowgalleryid);
    console.log(document.getElementById('texpinput').value);

    fetch('http://localhost:8080/exhibition/' + String(nowgalleryid), {
        method: 'PATCH',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "GalleryName": document.getElementById('texpinput').value.slice(3,) }),
    })

    ////여기까지
    fetch('http://localhost:8080/exhibition/' + String(nowgalleryid), {
        method: 'GET',
        headers: {
            'Authorization': String(Authorization)
        }
    }).then((response) => response.json())
        .then((data) => {
            console.log("진입");
            console.log(data);
        });
    /////
    document.querySelector(".background").className = "background";
    // 코드 작성 완료 시 주석 해제
    //window.location.reload();
}
function click_arrowleft() {
    const aboutGalleryPicture = document.getElementsByClassName('picture').id.split('__');
    galleryid = aboutGalleryPicture[0];
    diaryid = aboutGalleryPicture[1];
    fetch('http://localhost:8080/exhibition/' + String(galleryid), {
        method: 'GET',
        headers: {
            'Authorization': String(Authorization)
        }
    }).then((response) => response.json())
        .then((data) => {
            diaryArr = String(data.DiaryID.diaries).split(',');
            let beforeelement;
            let find = false;
            let findnextelement;
            diaryArr.reverse().forEach(element => {
                if (diaryid != beforeelement && find == false) {
                    beforeelement = element;
                } else {//beforeelement=element
                    if (find == false) {
                        findnextelement = element;
                        find = true;
                    }
                }
            });
            if (findnextelement == diaryArr[-1]) {
                alert('맨 처음 그림입니다.');
            } else {
                fetch('http://localhost:8080/diary/' + String(findnextelement), {
                    method: 'GET',
                    headers: {
                        'Authorization': String(Authorization)
                    }
                }).then((response) => response.json())
                    .then((arraydata) => {
                        document.getElementsByClassName('title').id = String(galleryid);
                        console.log("현재 전시 정보 left");
                        console.log(String(galleryid));
                        document.getElementById('the_title').textContent = (arraydata.title);
                        document.getElementsByClassName('picture').id = String(galleryid) + "__" + String(arraydata.id);
                        //document.getElementById('the_picture').src = "../img/slide2.jpg";
                        document.getElementById('the_title').textContent = (arraydata.title);
                        document.getElementById('the_date').textContent = (arraydata.date).slice(0, 10);

                        var binary = '';
                        var bytes = new Uint8Array(arraydata.afterImg.data);
                        var len = bytes.byteLength;
                        for (var i = 0; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        tempimgsrc = "data:image/png;base64," + btoa(binary);
                        document.getElementById('the_picture').src = tempimgsrc;
                    });
            }
        });
}
function click_arrowright() {
    const aboutGalleryPicture = document.getElementsByClassName('picture').id.split('__');
    galleryid = aboutGalleryPicture[0];
    diaryid = aboutGalleryPicture[1];
    fetch('http://localhost:8080/exhibition/' + String(galleryid), {
        method: 'GET', headers: {
            'Authorization': String(Authorization)
        }
    }).then((response) => response.json())
        .then((data) => {
            diaryArr = String(data.DiaryID.diaries).split(',');
            let beforeelement;
            let find = false;
            let findnextelement;
            diaryArr.forEach(element => {
                if (diaryid != beforeelement && find == false) {
                    beforeelement = element;
                } else {//beforeelement=element
                    if (find == false) {
                        findnextelement = element;
                        find = true;
                    }
                }
            });
            if (findnextelement == diaryArr[-1]) {
                alert('맨 마지막 그림입니다.');
            } else {
                fetch('http://localhost:8080/diary/' + String(findnextelement), { method: 'GET' }).then((response) => response.json())
                    .then((data) => {
                        document.getElementsByClassName('title').id = String(galleryid);
                        console.log("현재 전시 정보 right");
                        console.log(String(galleryid));
                        document.getElementById('the_title').textContent = (data.title);
                        document.getElementsByClassName('picture').id = String(galleryid) + "__" + String(data.id);
                        //document.getElementById('the_picture').src = "../img/slide2.jpg";
                        document.getElementById('the_title').textContent = (data.title);
                        document.getElementById('the_date').textContent = (data.date).slice(0, 10);

                        var binary = '';
                        var bytes = new Uint8Array(data.afterImg.data);
                        var len = bytes.byteLength;
                        for (var i = 0; i < len; i++) {
                            binary += String.fromCharCode(bytes[i]);
                        }
                        tempimgsrc = "data:image/png;base64," + btoa(binary);
                        document.getElementById('the_picture').src = tempimgsrc;
                    });
            }
        });
}
function clickDeletebtn() {
    if (confirm("정말 삭제하시겠습니까??") == true) {    //확인
        document.removefrm.submit();
    } else {   //취소
        return false;
    }
}

//이미지 다운로드
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
        type: mime
    });
}

function downloadImg(imgSrc) {
    var image = new Image();
    image.crossOrigin = "anonymous";
    image.src = imgSrc;
    var fileName = image.src.split("/").pop();
    image.onload = function () {
        var canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        canvas.getContext('2d').drawImage(this, 0, 0);
        if (typeof window.navigator.msSaveBlob !== 'undefined') {
            window.navigator.msSaveBlob(dataURLtoBlob(canvas.toDataURL()), fileName);
        } else {
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = fileName;
            link.click();
        }
    };
}
function ClicktoDownLoad() {
    //console.log(document.getElementById('the_picture').src);
    if (confirm("다운로드 하시겠습니까??") == true) {    //확인
        downloadImg(document.getElementById('the_picture').src);
        document.removefrm.submit();
    } else {   //취소
        return false;
    }
}
var tempimgsrc;
function reloading() {
    //최신순 정렬
    fetch('http://localhost:8080/exhibition?OwnerID=20', {
        method: 'GET',
        headers: {
            'Authorization': String(Authorization)
        }
    }).then((response) => response.json())
        .then((data) => {
            var dictObject = {};
            data.forEach(element => {
                GalleryDateyear = element.GalleryDate.slice(0, 4);
                if (GalleryDateyear in dictObject) {
                    dictObject[GalleryDateyear] = dictObject[GalleryDateyear] + 1;
                } else {
                    dictObject[GalleryDateyear] = 1;
                }
            });
            var everynum = 0
            var dictkeys = Object.keys(dictObject).reverse();
            dictkeys.forEach(keyelement => {
                //년도별로 분류->(배열로 내림차순 정렬)->query문 쓰기 get by year (for문 두번일듯?)
                year = keyelement;
                let yearnum = 1;
                let elementyear = document.createElement("div");
                elementyear.style.diaplay = "block";
                elementyear.id = "main" + String(year);
                elementyear.className = "year";

                let elementyearh3 = document.createElement("h3");
                elementyearh3.id = String(year);
                elementyearh3.className = "subtitle";
                elementyearh3.textContent = year;
                elementyearh3.style.diaplay = "block";


                let elementyearflexbox = document.createElement('div');
                elementyearflexbox.className = "year__flexbox";
                elementyearflexbox.id = "flexbox" + year;
                /*    
                display: flex;
                width: 100%;
                flex-wrap: wrap;
                align-items: center;
                justify-content: space-around;
                opacity: 1;
                transition: all var(--animation--duration) ease-out;
                */
                elementyearflexbox.style.display = "flex";
                elementyearflexbox.style.width = "100%";
                elementyearflexbox.style.flexWrap = "wrap";
                elementyearflexbox.style.alignItems = "center";
                elementyearflexbox.style.justifyContent = "space-around";
                elementyearflexbox.style.opacity = "1";
                elementyearflexbox.style.transition = "all var(--animation--duration) ease-out";

                while (yearnum <= dictObject[keyelement]) {
                    randomnum = parseInt(Math.random() * 3 + 1); //0~1 => 0~3 => 1~4
                    /*.flexboxone {
                        flex-basis: 48%;
                        height: 400px;
                        border-radius: 30px;
                        margin-bottom: 2%;
                        box-shadow: -5px 10px 10px #1a1f3ada;
                    }
                    */

                    // -- 각각의 전시 가져오기
                    let flexboxn = document.createElement('div');
                    flexboxn.id = "y" + String(year) + "__" + String(yearnum) + "__" + String(data[everynum].GalleryID); //y__01__GalleryID
                    flexboxn.className = "flexboxone";
                    flexboxn.style.color = "white";
                    flexboxn.style.flexBasis = "40%";
                    flexboxn.style.height = "400px";
                    flexboxn.style.borderRadius = "30px";
                    flexboxn.style.marginBottom = "2%";
                    flexboxn.style.boxShadow = "-5px 10px 10px #1a1f3ada";


                    if (String(data[everynum].GalleryID).length == 1) {
                        flexboxn.style.backgroundImage = "url('../img/gallery_img/00" + String(data[everynum].GalleryID) + ".jpg')";
                    } else {
                        flexboxn.style.backgroundImage = "url('../img/gallery_img/0" + String(data[everynum].GalleryID) + ".jpg')";
                    }
                    fetch('http://localhost:8080/diary/' + data[everynum].DiaryID.diaries[0], {
                        method: 'GET',
                        headers: {
                            'Authorization': String(Authorization)
                        }
                    }).then((response) => response.json())
                        .then((nowdata) => {
                            console.log(nowdata);
                            var binary = '';
                            var bytes = new Uint8Array(nowdata.afterImg.data);
                            var len = bytes.byteLength;
                            for (var i = 0; i < len; i++) {
                                binary += String.fromCharCode(bytes[i]);
                            }
                            tempimgsrc = "data:image/png;base64," + btoa(binary);
                            flexboxn.style.backgroundImage = tempimgsrc;
                        });

                    //flexboxn.style.backgroundImage = "url('../img/gallery_img/20220507.jpg')";
                    flexboxn.style.backgroundSize = "cover";
                    flexboxn.style.backgroundPosition = "center";

                    /*.flexboxone:hover{
                    box-shadow: -5px 10px 10px #eb7d5280;}*/
                    flexboxn.addEventListener('mouseover', function () {
                        flexboxn.style.boxShadow = "-5px 10px 10px #eb7d5280";
                    });
                    flexboxn.addEventListener('mouseout', function () {
                        flexboxn.style.boxShadow = "-5px 10px 10px gray";
                    });

                    //////
                    /*.icons {
                    margin-top: 3%;
                    margin-right: 3%;
                    align-items: space-between;
                    text-align: right;
                    height: 7%;}*/

                    let flexboxnicon = document.createElement('div');
                    flexboxnicon.id = "y" + String(year) + "__" + String(yearnum) + "__" + "icons";
                    flexboxnicon.className = "icons";
                    flexboxnicon.style.display = "flex";
                    flexboxnicon.style.width = "94%";
                    flexboxnicon.style.marginLeft = "3%";
                    flexboxnicon.style.marginRight = "3%";
                    flexboxnicon.style.textAlign = "right";
                    flexboxnicon.style.height = "10%"
                    flexboxnicon.style.alignItems = "center";

                    let iclass1 = document.createElement('i');
                    iclass1.className = "fa-solid fa-bars fa-lg";
                    iclass1.id = "y" + String(year) + "__" + String(yearnum) + "__" + "baricon";
                    iclass1.style.justifyContent = "flex-start";
                    iclass1.addEventListener('click', function () {
                        if (insidedescrition.style.opacity == "0.8") {
                            insidedescrition.style.opacity = "0";
                            insidedescrition.style.transform = "translateY(10px)";
                        } else {
                            insidedescrition.style.opacity = "0.8";
                            insidedescrition.style.transform = "translateY(0px)";
                        }
                    });

                    /*
                    let iclass2 = document.createElement('i');
                    iclass2.className = "fa-solid fa-floppy-disk fa-lg";
                    iclass2.id = "y" + String(year) + "__" + String(yearnum) + "__" + "hearticon";
                    iclass2.style.marginLeft = "auto";
                    iclass2.style.marginRight = "2%";
                    iclass2.addEventListener('click', function () {
                        if (confirm("다운 받으시겠습니까?") == true) {    //확인
                            iclass2.style.color = "var(--color-orange)";
                            iclass2.className = "fa-solid fa-chevron-down fa-lg";
                            document.removefrm.submit();
                        } else {   //취소
                            return false;
                        }
                    });
                    */

                    let iclass3 = document.createElement('i');
                    iclass3.className = "fa-regular fa-circle-xmark fa-lg";
                    iclass3.id = "y" + String(year) + "__" + String(yearnum) + "__" + "deleteicon";
                    iclass3.style.marginLeft = "auto";
                    iclass3.style.marginRight = "0%";

                    const aboutGalleryPicture = flexboxn.id.split('__');
                    let nowgalleryid = aboutGalleryPicture[2];

                    iclass3.addEventListener('click', function () {
                        if (confirm("정말삭제하시겠습니까?") == true) {    //확인
                            fetch('http://localhost:8080/exhibition/' + nowgalleryid, { method: 'DELETE' }).then((response) => response.json());
                            //재로딩해야함.
                            window.location.reload();
                            document.removefrm.submit();
                        } else {   //취소
                            return false;
                        }
                    });

                    flexboxnicon.appendChild(iclass1);
                    iclass1 = null;
                    //flexboxnicon.appendChild(iclass2);
                    flexboxnicon.appendChild(iclass3);
                    iclass3 = null;
                    //////
                    //////
                    let flexboxinside = document.createElement("div");
                    flexboxinside.className = "flexonxoneinside";
                    /*.flexonxoneinside{
                    height: 88%;
                    width: 100%;
                    background-color: var(--color-light-grey);
                    position: relative;
                    display: flex;
                    justify-content: center;
                    align-items: center;}*/
                    flexboxinside.style.height = "90%";
                    flexboxinside.style.width = "100%";
                    flexboxinside.style.backgroundColor = "var(--color-light-grey)";
                    flexboxinside.style.position = "relative";
                    flexboxinside.style.diaplay = "flex";
                    flexboxinside.style.justifyContent = "center";
                    flexboxinside.style.alignItems = "center";

                    /*.flexonxoneinside.invisible{
                    display: none;}*/
                    if (flexboxinside.style.visibility == "invisible") {
                        flexboxinside.style.display = "none";
                    }
                    ///
                    /*.contents {
                    margin-left: 7%;
                    margin-right:7%;
                    height: 88%;
                    width: 88%;}*/

                    let insidecontents = document.createElement("div");
                    insidecontents.id = "y" + String(year) + "__" + String(yearnum) + "__" + "contents";
                    insidecontents.className = "contents";
                    insidecontents.style.marginLeft = "7%";
                    insidecontents.style.marginRight = "7%";
                    insidecontents.style.height = "90%";
                    insidecontents.style.width = "88%";
                    insidecontents.style.display = "flex";
                    insidecontents.style.flexDirection = "column";
                    insidecontents.style.justifyContent = "flex-end";

                    let contentsh1 = document.createElement("h1");
                    contentsh1.id = "y" + String(year) + "__" + String(yearnum) + "__" + "title";
                    contentsh1.className = "subtitle";
                    contentsh1.textContent = "0" + String(yearnum) + " " + String(data[everynum].GalleryName);

                    let contentsh4 = document.createElement("h4");
                    contentsh4.id = "y" + String(year) + "__" + String(yearnum) + "__" + "date";
                    contentsh4.className = "subdate";
                    let tempGalleryDate = data[everynum].GalleryDate;
                    contentsh4.textContent = String(tempGalleryDate.slice(0, 4) + "년 " + tempGalleryDate.slice(5, 7) + "월 " + tempGalleryDate.slice(8, 10) + "일");

                    contentsh1.style.display = "block";
                    contentsh4.style.display = "block";

                    if (randomnum == 1) {

                    } else if (randomnum == 2) {
                        /*#y2022__02__contents{
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;
                            vertical-align: bottom;
                            text-align: end;
                        }
                        #y2020__02__title{
                            display: block;
                        }
                        #y2020__02__date{
                            display: block;
                        }*/
                        insidecontents.style.verticalAlign = "bottom";
                        insidecontents.style.textAlign = "end";
                    } else if (randomnum == 3) {
                        /*#y2022__03__contents{
                            display: flex;
                            flex-direction: column;
                            vertical-align: bottom;
                            text-align: end;
                        }
                        #y2020__03__title{
                            display: block;
                        }
                        #y2020__03__date{
                            display: block;
                        }
                        */

                        insidecontents.style.verticalAlign = "bottom";
                        insidecontents.style.textAlign = "end";

                    } else if (randomnum == 4) {
                        /* #y2022__04__contents{
                            display: flex;
                            flex-direction: column;
                            justify-content: flex-end;  
                        }
                        #y2020__04__title{
                            display: block;
                        }
                        #y2020__04__date{
                            display: block;
                        }*/


                    } else {
                        console.log("잘못된 랜덤 숫자가 생성되었습니다.");
                    }

                    insidecontents.appendChild(contentsh1);
                    contentsh1 = null;
                    insidecontents.appendChild(contentsh4);
                    contentsh4 = null;
                    ///

                    ///
                    //전시 안의 그림 목록 가져오기
                    let insidedescrition = document.createElement("div");
                    insidedescrition.id = "y" + String(year) + "__" + String(yearnum) + "__" + "description";
                    insidedescrition.className = "project__description";
                    /*.project__description{
                    position:absolute;
                    border-radius: 30px;
                    top: 0;
                    left: 0;
                    width: 95%;
                    height: 40%;
                    padding-top: 30%;
                    padding-left: 5%;
                    background-color: black;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                    opacity: 0;
                    transform: translateY(10px);
                    transition: all var(--animation--duration);
                    overflow-y: auto;
                    overflow-x:hidden;}*/
                    insidedescrition.style.position = "absolute";
                    insidedescrition.style.borderRadius = "30px";
                    insidedescrition.style.top = "0";
                    insidedescrition.style.left = "0";
                    insidedescrition.style.width = "95%";
                    insidedescrition.style.height = "90%";
                    insidedescrition.style.paddingTop = "1%";
                    insidedescrition.style.paddingBottom = "2%";
                    insidedescrition.style.paddingLeft = "5%";
                    insidedescrition.style.backgroundColor = "gray";
                    insidedescrition.style.opacity = "0";
                    insidedescrition.style.display = "flex";
                    insidedescrition.style.flexDirection = "column";
                    insidedescrition.style.justifyContent = "center";
                    insidedescrition.style.transform = "translateY(10px)";
                    insidedescrition.style.transition = "all var(--animation--duration)";
                    insidedescrition.style.overflowY = "auto";
                    insidedescrition.style.overflowX = "hidden";

                    /*.project__description::-webkit-scrollbar {
                    width: 7px;
                    }
                    .project__description::-webkit-scrollbar-thumb {
                        background-color: var(--color-orange);
                        border-radius: 10px;
                    }
                    .project__description::-webkit-scrollbar-track {
                        background-color: grey;
                        border-radius: 10px;
                        box-shadow: inset 0px 0px 5px white;
                    }*/
                    //insidedescrition.style.scrollbar

                    //전시 제목
                    let nowgalleryName = "0" + String(yearnum) + " " + String(data[everynum].GalleryName);
                    let projecttitle = document.createElement("h3");
                    projecttitle.textContent = "0" + String(yearnum) + " " + String(data[everynum].GalleryName);
                    projecttitle.style.color = "var(--color-orange)";
                    insidedescrition.appendChild(projecttitle);
                    projecttitle = null;

                    //그림 제목들
                    let nowDiaryList = String(data[everynum].DiaryID.diaries);
                    const DiaryListarr = nowDiaryList.split(',');
                    DiaryListarr.forEach(element => {
                        fetch('http://localhost:8080/diary/' + element, { method: 'GET' }).then((response) => response.json())
                            .then((nowdata) => {
                                let projectspan = document.createElement("span");
                                projectspan.style.color = "whitesmoke";
                                projectspan.id = String(nowdata.id);
                                projectspan.textContent = (nowdata.title);
                                projectspan.addEventListener('mouseover', function () {
                                    projectspan.style.color = "var(--color-orange)";
                                    projectspan.style.transform = "scale(1.05)";
                                });
                                projectspan.addEventListener('mouseout', function () {
                                    projectspan.style.color = "white";
                                    projectspan.style.transform = "scale(1)";
                                });
                                projectspan.addEventListener('click', function () {
                                    document.getElementsByClassName('title').id = nowgalleryid;
                                    console.log(document.getElementsByClassName('title').id);
                                    document.querySelector(".background").className = "background show";

                                    projectspan.style.color = "white";
                                    projectspan.style.transform = "scale(1)";
                                    document.getElementById('texpinput').value = String(nowgalleryName);
                                    document.getElementsByClassName('picture').id = String(nowgalleryid) + "__" + String(nowdata.id);

                                    /*
                                    console.log(nowdata.beforeImg.data);
                                    console.log(nowdata.afterImg.data);
                                    */
                                    document.getElementById('the_title').textContent = (nowdata.title);
                                    document.getElementById('the_date').textContent = (nowdata.date).slice(0, 10);

                                    var binary = '';
                                    var bytes = new Uint8Array(nowdata.afterImg.data);
                                    var len = bytes.byteLength;
                                    for (var i = 0; i < len; i++) {
                                        binary += String.fromCharCode(bytes[i]);
                                    }
                                    tempimgsrc = "data:image/png;base64," + btoa(binary);
                                    document.getElementById('the_picture').src = tempimgsrc;
                                    document.getElementById('the_picture').style = "object-fit : cover";
                                });
                                insidedescrition.appendChild(projectspan);
                            });
                    });
                    ///
                    flexboxinside.appendChild(insidecontents);
                    flexboxinside.appendChild(insidedescrition);
                    //////


                    flexboxn.appendChild(flexboxnicon);//div
                    flexboxn.appendChild(flexboxinside);//div

                    r = parseInt(flexboxn.id.split("__")[0].slice(1, 5)) % 255;
                    g = parseInt(flexboxn.id.split("__")[1]) % 255;
                    b = parseInt(flexboxn.id.split("__")[2]) % 255;
                    flexboxn.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", 0.1)";


                    elementyearflexbox.appendChild(flexboxn);//div
                    yearnum = yearnum + 1;
                    everynum += 1;
                }
                yearnum = yearnum - 1;

                if (yearnum % 2 == 0) { //짝수개    
                } else {//홀수개
                    //flexboxone 추가+안보이게
                    // -- 각각의 전시 가져오기
                    let flexboxntemp = document.createElement('div');
                    flexboxntemp.id = "y" + String(year) + "__" + String(yearnum);
                    flexboxntemp.className = "flexboxone";
                    flexboxntemp.style.flexBasis = "40%";
                    flexboxntemp.style.height = "400px";
                    flexboxntemp.style.borderRadius = "30px";
                    flexboxntemp.style.marginBottom = "2%";
                    flexboxntemp.style.boxShadow = "none";
                    flexboxntemp.style.backgroundSize = "cover";
                    flexboxntemp.style.backgroundPosition = "center";
                    //flexboxntemp.style.visibility = "invisible";
                    elementyearflexbox.appendChild(flexboxntemp);//div
                    flexboxntemp = null;
                }

                elementyear.appendChild(elementyearh3);//h3
                elementyear.appendChild(elementyearflexbox);//div
                elementyearh3 = null;
                elementyearflexbox = null;
                parent = document.getElementById("main");
                parent.appendChild(elementyear);
                elementyear = null;
                parent = null;
            });
        });
}
function saveTitle() {
    var keycode = event.keycode;
    alert(keycode);
}
function hi() {
    /*
    fetch('http://localhost:8080/diary?userid=20/', {
        method: 'GET',
    }).then((response) => response.json())
        .then((data) => {
            if (data[0].id == 36) {
                console.log("hi");
            }

        });
        */

    fetch('http://localhost:8080/exhibition/', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "GalleryID": 6,
            "GalleryName": "06 제목을 입력하세요",
            "DiaryID": {
                "diaries": [
                    29,
                    34,
                    35,
                    36,
                ]
            },
            "GalleryDate": "2022-06-10",
            "Img_Num": "5",
            "OwnerID": "20",
            "Createby": {
                "weather": "happy"
            }
        })
    }).then((response) => response.json())
        .then((data) => {
            console.log(data);
        });

}