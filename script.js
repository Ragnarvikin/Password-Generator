const inputSlider = document.querySelector('#myRange');
const lengthdisplay = document.querySelector("[length-display]");

const passwordDisply = document.querySelector("#pass-display")
const copyBtn = document.querySelector("[data-copy]")
const copyMsg = document.querySelector("[data-copymsg]")


const upprcase =document.querySelector("#upperCaseCheck");
const lowercase =document.querySelector("#lowerCaseCheck");
const numberscase =document.querySelector("#numbersCheck");
const symbolscase =document.querySelector("#symbolsCheck");


const indeator = document.querySelector(".strength");
const allCheckbox = document.querySelectorAll("input[type=checkbox]");
const genrateButton =document.querySelector("[button-pass]");
const symbol = "!@#$%^&*_<>?{]/-";

let passwordLength = 10;
let password = "";
let checkCount = 0;
handleSlider();

setIndecator("#808080")



function handleSlider(){
    inputSlider.value = passwordLength;
    lengthdisplay.innerHTML = passwordLength;

    // add extra 
    const min = inputSlider.min;
    const max =inputSlider.max;

    inputSlider.style.backgroundSize =( (passwordLength - min)*100/(max - min))+ "%100%"
}



// console.log(setIndecator());
function setIndecator(color){
    indeator.style.backgroundColor ='gray';
};

function getRandInteger(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
};

function genNumbers(){
    return getRandInteger(0,9);
}

function genUppercase(){
  return String.fromCharCode(getRandInteger(97,123));
}

function genlowerCase(){
    return String.fromCharCode(getRandInteger(65,91));

}

function genrateSymbol() {
    const randNum = getRandInteger(symbol.length);
    return symbol.charAt(randNum);
}

function calcStrength(){
    let hasUpper = false;
    let hasLower = false;
    let  hasNum = false;
    let hasSymbol = false;

    if(upprcase.checked) hasUpper =true;
    if(lowercase.checked) hasLower= true;
    if(numberscase.checked) hasNum = true;
    if(symbolscase.checked)hasSymbol =true;


    if(hasUpper && hasLower &&(hasNum || hasSymbol)&& passwordLength >= 8){
        indeator.style.backgroundColor ="#FF0000";
    } 
    else if(
        (hasLower||hasUpper)&&
        (hasNum||hasSymbol)&&
        passwordLength >=6 ){
            indeator.style.backgroundColor ="#008000";
        }
        else {
            indeator.style.backgroundColor ="#FFFF00";
        }
    
};

async function copyContant(){
    try {
        await navigator.clipboard.writeText(passwordDisply.value);
        copyMsg.innerText ='copied';
        
    } catch (e) {
        copyMsg.innerText = "Failed";
        
    };
    // span visiable 
    copyMsg.classList.add("active");

    setTimeout(() => {
        copyMsg.classList.remove("active");
        
    }, 1000);
};

function sufflePassword(array){
    // fisher yates method
    for(let i = array.length -1; i>0; i--){
        const j = Math.floor(Math.random()*(i+1));
        const temp =array[i];
        array[i]= array[j];
        array[j] = temp;
    }
    let str = "";
    array.forEach((el) => str +=el);
    return str;

}

function handleCheckbox(){
    checkCount = 0;
    allCheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
        checkCount++;

    });

    // special condition 
    if(passwordLength<checkCount){
        password = checkCount;
        handleSlider(); //jha jha password length ka use hoga slider fu() call hoga
    }
}


allCheckbox.forEach((checkbox)=>{
    console.log('chl nhi raha');
    checkbox.addEventListener('change', handleCheckbox);
})

inputSlider.addEventListener("input",(e)=> {
    passwordLength = e.target.value;
    handleSlider();
});

copyBtn.addEventListener("click",() =>{
    if(passwordDisply.value);
    copyContant();

})


genrateButton.addEventListener('click',()=>{
    // none of checkbox are selected
    if(checkCount=0)
    return;


    if(passwordLength < checkCount){
        password = checkCount;
        handleSlider(); 
    };
    // lets start the find new passworrd

    password = "";

    let funncArr = [];

    if(upprcase.checked){
        funncArr.push(genUppercase);
    }

    if(lowercase.checked){
        funncArr.push(genlowerCase);
    }

    if(numberscase.checked){

        funncArr.push(genNumbers);
        console.log(funncArr.push);
        
    }

    if(symbolscase.checked){
        funncArr.push(genrateSymbol);
    }




    // compulsory addition 

    for(let i=0; i<funncArr.length; i++){
        password +=funncArr[i]();
    }


    



    // remening addition 

    for (let i = 0; i < passwordLength-funncArr.length; i++) {
    let randomIndex = getRandInteger(0,funncArr.length);
    password +=funncArr[randomIndex]();
    }

    // shuffle the password 

    password = sufflePassword(Array.from(password));

    // show in UI
    passwordDisply.value = password;

    // calculate strength 
    calcStrength();


})
