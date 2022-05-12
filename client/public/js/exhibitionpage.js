function clickTheExhitibion() {
    document.querySelector(".background").className = "background show";
}
function closePopup() {
    document.querySelector(".background").className = "background";
}
var onBar = False;
function onBarbtn() {
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
        document.getElementById('2022__01__hearticon').className = "fa-solid fa-heart fa-lg";
    }
    else {
        document.getElementById('2022__01__hearticon').className = "fa-regular fa-heart fa-lg";
    }
}
function clickDeletebtn() {
    if (confirm("정말 삭제하시겠습니까??") == true) {    //확인
        document.removefrm.submit();
    } else {   //취소
        return false;
    }
}