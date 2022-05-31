var submit = document.getElementById('submitButton');
submit.onclick = showImage;     //Submit 버튼 클릭시 이미지 보여주기

/* 버튼 */
const btnSLD = document.querySelector('.btnSetLocalData');
/* input 텍스트 */
const setInput = document.querySelector('#setInput');

function setData(){
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
