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
function addtoDB() {
    closePopup();
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
    document.querySelector(".background2").className = "background2 show";
    console.log("hi");
}
function resetcolor1() {
    document.getElementById('checkbox1').style.color = "var(--color-loginfont)";
    document.getElementById('idname__textmsg').innerText = "";
}
function resetcolor2() {
    document.getElementById('checkbox1').style.color = "var(--color-loginfont)";
    document.getElementById('idname__textmsg').innerText = "";
}
function findId() {
    nowName1 = document.getElementById('name__textfirst2').value;
    nowName2 = document.getElementById('name__textlast2').value;
    if (nowName1 === 'a' && nowName2 === 'b') { //가입된 이름이면
        document.getElementById('idname__textmsg').innerText = "이메일주소";
        document.getElementById('checkbox1').style.color = "var(--color-orange)";
    }
    else {
        document.getElementById('idname__textmsg').innerText = "가입되지 않은 이름/닉네임 입니다.";
    }
}
function email2Check() {
    nowEmail = document.getElementById('email2__text').value;
    document.getElementById('checkbox2').style.color = "var(--color-loginfont)";
    console.log(nowEmail);
    if (nowEmail.indexOf('@') == -1) { //이메일 형식이 아니면 x를
        document.getElementById('pwdemail__textmsg').innerText = "올바른 이메일주소 형식이 아닙니다.";
    }
    else { //이메일 형식이면 넘어감
        document.getElementById('pwdemail__textmsg').innerText = "";
    }
}
function sendPassword() {
    nowEmail = document.getElementById('email2__text').value;
    if (nowEmail.indexOf('@') == -1) { //이메일 형식이 아니면 x를
        document.getElementById('pwdemail__textmsg').innerText = "올바른 이메일주소 형식이 아닙니다.";
    }
    else if (nowEmail === '1@') { //이미 가입된 이메일이면 임시 비밀번호 전송
        document.getElementById('pwdemail__textmsg').innerText = "이메일로 임시비밀번호를 전송하였습니다.";
        document.getElementById('checkbox2').style.color = "var(--color-orange)";
    }
    else {
        document.getElementById('pwdemail__textmsg').innerText = "가입되지 않은 이메일 주소입니다.";
    }
}
function closePopup2() {
    input1 = document.getElementById('name__textfirst2');
    input1.value = null;
    input2 = document.getElementById('name__textlast2');
    input2.value = null;
    input3 = document.getElementById('email2__text');
    input3.value = null;

    document.getElementById('checkbox1').style.color = "var(--color-loginfont)";
    document.getElementById('checkbox2').style.color = "var(--color-loginfont)";
    document.getElementById('idname__textmsg').innerText = ""
    document.getElementById('pwdemail__textmsg').innerText = ""
    document.querySelector(".background2").className = "background2";
}

function signIn() {
    console.log("signIn");
    var userid = document.getElementById(loginID).value;
    var userpassword = document.getElementById(loginPassword).value;
    fetch("BASE_SERVER_URL /auth/login", {
        method : "POST",
        body : JSON.stringify({
            user_account : this.state.username,
            password : this.state.password
        })
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        localStorage.setItem('access-token', res.access_token);
    })
    

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

console.log("main js loaded");