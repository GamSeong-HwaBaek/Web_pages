function clickTheExhitibion() {
    document.querySelector(".background").className = "background show";
}
function closePopup() {
    document.querySelector(".background").className = "background";
}
var onBar = False;
function onBarbtn() {
    console.log("hibar");
    onBar = !onBar;
    if (onBar) {
        document.getElementById('y2020__01__description').style.opacity = "0.9";
        document.getElementById('y2020__01__description').style.transform = "translateY(0px)";
    }
    else {
        document.getElementById('y2020__01__description').style.opacity = "0";
        document.getElementById('y2020__01__description').style.transform = "translateY(10px)";
    }
}
var nowLike = False;
function clickLikebtn() {
    nowLike = !nowLike;
    if (nowLike) {
        document.getElementById('2022__01__hearticon').className = "fa-solid fa-heart fa";
    }
    else {
        document.getElementById('2022__01__hearticon').className = "fa-regular fa-heart fa";
    }
}
function clickDeletebtn() {
    if (confirm("정말 삭제하시겠습니까??") == true) {    //확인
        document.removefrm.submit();
    } else {   //취소
        return false;
    }
}

function createGllery() {
    //최신순 정렬
    let data = [{
        GalleryID: 1,
        GalleryName: '안녕히계세요',
        DiaryID: { diaries: [1, 2] },
        GalleryDate: 2022,
        Img_Num: 1,
        OwnerID: 5,
        Createby: { emotions: 'happy' }
    }, {
        GalleryID: 2,
        GalleryName: '300',
        DiaryID: { diaries: [3, 4] },
        GalleryDate: 2022,
        Img_Num: 1,
        OwnerID: 5,
        Createby: { emotions: 'happy' }
    }, {
        GalleryID: 3,
        GalleryName: '안녕히계세요',
        DiaryID: { diaries: [5, 6] },
        GalleryDate: 2022,
        Img_Num: 1,
        OwnerID: 5,
        Createby: { emotions: 'happy' }
    }, {
        GalleryID: 4,
        GalleryName: '300',
        DiaryID: { diaries: [7, 8] },
        GalleryDate: 2019,
        Img_Num: 1,
        OwnerID: 5,
        Createby: { emotions: 'happy' }
    }];
    var dictObject = {};
    data.forEach(element => {
        if (element.GalleryDate in dictObject) {
            dictObject[element.GalleryDate] = dictObject[element.GalleryDate] + 1;
        } else {
            dictObject[element.GalleryDate] = 1;
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
            console.log(keyelement);
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
            flexboxn.id = "y" + String(year) + "__" + String(yearnum);
            flexboxn.className = "flexboxone";
            flexboxn.style.color = "white";
            flexboxn.style.flexBasis = "40%";
            flexboxn.style.height = "400px";
            flexboxn.style.borderRadius = "30px";
            flexboxn.style.marginBottom = "2%";
            flexboxn.style.boxShadow = "-5px 10px 10px #1a1f3ada";
            flexboxn.style.backgroundImage = "url('../img/gallery_img/20220507.jpg')";
            flexboxn.style.backgroundSize = "cover";
            flexboxn.style.backgroundPosition = "center";

            /*.flexboxone:hover{
            box-shadow: -5px 10px 10px #eb7d5280;}*/
            flexboxn.addEventListener('mouseover', function () {
                flexboxn.style.boxShadow = "-5px 10px 10px #eb7d5280";
                console.log("over");
            });
            flexboxn.addEventListener('mouseout', function () {
                flexboxn.style.boxShadow = "-5px 10px 10px gray";
                console.log("out");
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
            flexboxnicon.style.width = "15%";
            flexboxnicon.style.justifyContent = "space-between";
            flexboxnicon.style.marginLeft = "3%";
            flexboxnicon.style.alignItems = "space-between";
            flexboxnicon.style.textAlign = "right";
            flexboxnicon.style.height = "10%"
            flexboxnicon.style.alignItems = "center";

            let iclass1 = document.createElement('i');
            iclass1.className = "fa-solid fa-bars fa-lg";
            iclass1.id = "y" + String(year) + "__" + String(yearnum) + "__" + "baricon";
            iclass1.addEventListener('click', function () {
                if (insidedescrition.style.opacity == "1") {
                    insidedescrition.style.opacity = "0";
                    insidedescrition.style.transform = "translateY(10px)";
                } else {
                    insidedescrition.style.opacity = "1";
                    insidedescrition.style.transform = "translateY(0px)";
                }
            });

            let iclass2 = document.createElement('i');
            iclass2.className = "fa-regular fa-heart fa-lg";
            iclass2.id = "y" + String(year) + "__" + String(yearnum) + "__" + "hearticon";
            iclass2.addEventListener('click', function () {
                if (iclass2.className == "fa-solid fa-heart fa-lg") {
                    iclass2.className = "fa-regular fa-heart fa-lg";
                } else {
                    iclass2.className = "fa-solid fa-heart fa-lg";
                }
            });

            let iclass3 = document.createElement('i');
            iclass3.className = "fa-regular fa-circle-xmark fa-lg";
            iclass3.id = "y" + String(year) + "__" + String(yearnum) + "__" + "deleteicon";

            iclass3.addEventListener('click', function () {
                alert("정말 삭제하시겠습니까?");
            });

            flexboxnicon.appendChild(iclass1);
            flexboxnicon.appendChild(iclass2);
            flexboxnicon.appendChild(iclass3);
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
            flexboxinside.addEventListener('click', function () {
                console.log("click");
                document.querySelector(".background").className = "background show";
            });
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
            contentsh4.textContent = String(data[everynum].GalleryDate);

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
            insidecontents.appendChild(contentsh4);
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
            insidedescrition.style.backgroundColor = "red";
            insidedescrition.style.display = "flex";
            insidedescrition.style.flexDirection = "column";
            insidedescrition.style.justifyContent = "center";
            insidedescrition.style.opacity = "0";
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
            let projecttitle = document.createElement("h3");
            projecttitle.textContent = "0" + String(yearnum) + " " + String(data[everynum].GalleryName);
            projecttitle.style.color = "var(--color-orange)";

            //그림 제목들
            let projectspan = document.createElement("span");
            projectspan.style.color = "whitesmoke";
            projectspan.textContent = "오늘은 우울한날";
            let projectspan2 = document.createElement("span");
            projectspan2.style.color = "white";
            projectspan2.textContent = "오늘은 우울한날";
            let projectspan3 = document.createElement("span");
            projectspan3.style.color = "white";
            projectspan3.textContent = "오늘은 우울한날";
            let projectspan4 = document.createElement("span");
            projectspan4.style.color = "white";
            projectspan4.textContent = "오늘은 우울한날";
            let projectspan5 = document.createElement("span");
            projectspan5.style.color = "white";
            projectspan5.textContent = "오늘은 우울한날";
            let projectspan6 = document.createElement("span");
            projectspan6.style.color = "white";
            projectspan6.textContent = "오늘은 우울한날";
            let projectspan7 = document.createElement("span");
            projectspan7.style.color = "white";
            projectspan7.textContent = "오늘은 우울한날";
            let projectspan8 = document.createElement("span");
            projectspan8.style.color = "white";
            projectspan8.textContent = "오늘은 우울한날";
            let projectspan9 = document.createElement("span");
            projectspan9.style.color = "white";
            projectspan9.textContent = "오늘은 우울한날";

            projectspan.addEventListener('mouseover', function () {
                projectspan.style.color = "var(--color-orange)";
                projectspan.style.transform = "scale(1.05)";
            });
            projectspan.addEventListener('mouseout', function () {
                projectspan.style.color = "white";
                projectspan.style.transform = "scale(1)";
            });


            insidedescrition.appendChild(projecttitle);
            insidedescrition.appendChild(projectspan);
            insidedescrition.appendChild(projectspan2);
            insidedescrition.appendChild(projectspan3);
            insidedescrition.appendChild(projectspan4);
            insidedescrition.appendChild(projectspan5);
            insidedescrition.appendChild(projectspan6);
            insidedescrition.appendChild(projectspan7);
            insidedescrition.appendChild(projectspan8);
            insidedescrition.appendChild(projectspan9);

            ///
            flexboxinside.appendChild(insidecontents);
            flexboxinside.appendChild(insidedescrition);
            //////


            flexboxn.appendChild(flexboxnicon);//div
            flexboxn.appendChild(flexboxinside);//div

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
        }

        elementyear.appendChild(elementyearh3);//h3
        elementyear.appendChild(elementyearflexbox);//div

        parent = document.getElementById("main");
        parent.appendChild(elementyear);
    });
    /*
        let targetFirst = document.querySelectorAll('.flexboxone');
        targetFirst.forEach((target) => target.addEventListener("click", function () {
            console.log(target.id);
            exehi
            
        }));
    */
    let targetHeart = document.querySelectorAll('.fa-regular fa-heart fa-lg');
    targetHeart.forEach((target) => target.addEventListener("click", function () {
        console.log("here");
        nowheart = document.getElementById(String(target.id) + "hearticon");
        if (nowheart.className == "fa-solid fa-heart fa") {
            nowheart.className = "fa-regular fa-heart fa";
        } else {
            nowheart.className = "fa-solid fa-heart fa";
        }
    }));

}
