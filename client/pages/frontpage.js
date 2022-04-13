function createNewAccount() {
    document.querySelector(".background").className = "background show";
}
function emailCheck() {
    nowEmail = document.getElementById('email__text').value;
    if (nowEmail === '1') { //이미 가입된 이메일이면 x를
        document.getElementById('email__isoverlap').className = "fa-solid fa-circle-exclamation";
        document.getElementById('email__isoverlapword').innerText = "이미 가입된 이메일 주소입니다."
    }
    else if (nowEmail.indexOf('@') == -1) { //이메일 형식이 아니면 x를
        document.getElementById('email__isoverlap').className = "fa-solid fa-circle-xmark";
        document.getElementById('email__isoverlapword').innerText = "올바른 이메일주소 형식이 아닙니다."
    }
    else { //가입할 수 있는 이메일 입니다.
        document.getElementById('email__isoverlap').className = "fa-solid fa-check";
        document.getElementById('email__isoverlapword').innerText = "가입할 수 있는 이메일 주소입니다."
    }
}
function passwordCheck() {
    nowpassword = document.getElementById('password__text').value;
    var pattern1 = /[a-zA-Z]/; // 문자 
    var pattern2 = /[0-9]/; // 숫자 
    var pattern3 = /[~!@#$%^&*()_+|<>?:{}]/; // 특수문자
    if ((8 <= nowpassword.length <= 20) && (pattern1.test(nowpassword) && pattern2.test(nowpassword) && pattern3.test(nowpassword))) { //올바른 형식의 비밀번호이면 check
        document.getElementById('password__okay').className = "fa-solid fa-check";
        document.getElementById('password__okayword').innerText = ""
    }
    else {
        document.getElementById('password__okay').className = "fa-solid fa-circle-xmark";
        document.getElementById('password__okayword').innerText = "8~20자의 문자, 숫자, 특수문자를 포함한 비밀번호를 입력하여야 합니다."
    }
}
function passwordSame() {
    nowpassword2 = document.getElementById('password2__text').value;
    if (nowpassword2 === document.getElementById('password__text').value) { //비밀번호 일치시
        document.getElementById('password2__match').className = "fa-solid fa-check";
        document.getElementById('password2__matchword').innerText = ""
    }
    else {
        document.getElementById('password2__match').className = "fa-solid fa-circle-xmark";
        document.getElementById('password2__matchword').innerText = "비밀번호가 일치하지 않습니다."
    }
}
function closePopup() {
    input1 = document.getElementById('name__textfirst');
    input1.value = null;
    input2 = document.getElementById('name__textlast');
    input2.value = null;
    input3 = document.getElementById('email__text');
    input3.value = null;
    input4 = document.getElementById('password__text');
    input4.value = null;
    input5 = document.getElementById('password2__text');
    input5.value = null;
    document.getElementById('email__isoverlap').className = "";
    document.getElementById('email__isoverlapword').innerText = ""
    document.getElementById('password__okay').className = "";
    document.getElementById('password__okayword').innerText = ""
    document.getElementById('password2__match').className = "";
    document.getElementById('password2__matchword').innerText = ""
    document.querySelector(".background").className = "background";
}
function findIDorPassword() {
    console.log("findIDorPassword");
}
function signIn() {
    console.log("signIn");
}
function relateToGoogle() {
    console.log("relate1");
}
function relateToGit() {
    console.log("relate1");
}
function relateToNaver() {
    console.log("relate1");
}
function relateToKakao() {
    console.log("relate1");
}