var stringDisplay = "";
var emptyString = "";
var emptyArray = [];
var result=0;
var arr1 = [];
var arr2 = [];

const numberbtns = document.querySelectorAll(".numbers");
const operatorbtns = document.querySelectorAll(".operator");
const display = document.querySelector(".display");
const equals = document.querySelector("#equals");
const clearBtn = document.querySelector(".clear");
const omit = document.querySelector("#omit");
const btns = document.querySelectorAll(".btn");
const decimal = document.querySelector(".decimal");

window.addEventListener("DOMContentLoaded", function(){
  display.innerHTML = result;
});

numberbtns.forEach(function(item){
  item.addEventListener("click", function(){
    _display(item.value);
    emptyString+=item.value;
  });
});
decimal.addEventListener("click", function(){
  if(!emptyString.includes(".")){
    if(emptyString===""){
      emptyString = "0"+decimal.value;
    }
    else {
      emptyString+=decimal.value;
    }
    _display(decimal.value);
  }
});

operatorbtns.forEach(function(item){
    item.addEventListener("click", function(){
      if(emptyString===""){
        if(emptyArray.length===0){
          emptyArray.push(result);
          emptyArray.push(item.value);
          _display(result);
          _display(item.value);
        }
      }
      else {
        emptyArray.push(parseFloat(emptyString));
        emptyArray.push(item.value);
        emptyString="";
        _display(item.value);
      }
    });
});

function _display(item){
  stringDisplay += item;
  display.innerHTML = stringDisplay;
}

equals.addEventListener("click", function(){
    stringDisplay="";
        if(emptyArray.length!=0){
            for(let i=0; i<emptyArray.length; i++){
                if(emptyArray[i]==="+"||
                emptyArray[i]==="-"||
                emptyArray[i]==="*"||
                emptyArray[i]==="/") {
                    arr2.push(emptyArray[i]);
                }
                else {
                    arr1.push(emptyArray[i]);
                }
            }
            for(let i=0; i<arr2.length; i++){
                if(arr2[i]==="/"){
                    if(arr1[i+1]===undefined){
                        if(emptyString===""){
                          arr1[i]=arr1[i];
                        }
                        else {
                          arr1[i] = arr1[i]/parseFloat(emptyString);
                        }
                    }
                    else {
                        arr1[i+1] = arr1[i]/arr1[i+1];
                        arr1[i]= '.';
                    }
                }
            }

            arr1 = arr1.filter(function(item){
              return item!=".";
            });
            arr2 = arr2.filter(function(item){
              return item!="/";
            });

            for(let i=0; i<arr2.length; i++){
                if(arr2[i]==="*"){
                    if(arr1[i+1]===undefined){
                        if(emptyString===""){
                          arr1[i] = arr1[i];
                        }
                        else {
                          arr1[i] = arr1[i]*parseFloat(emptyString);
                        }
                    }
                    else {
                        arr1[i+1] = arr1[i]*arr1[i+1];
                        arr1[i]= '.';
                    }
                }
            }
            arr1 = arr1.filter(function(item){
                return item!=".";
            });
            arr2 = arr2.filter(function(item){
                return item!="*";
            });
            for(let i =0; i<arr2.length ; i++){
                var x;
                if(arr1[i+1]===undefined){
                    if(arr2[i]==="+"){
                        x = arr1[i]+parseFloat(emptyString);
                        arr1[i] = x;
                    }
                    else {
                        x = arr1[i]-parseFloat(emptyString);
                        arr1[i]=x;
                    }
                }
                else {
                    if(arr2[i]==="+"){
                        x = arr1[i]+arr1[i+1];
                        arr1[i+1] = x;
                    }
                    else {
                        x = arr1[i]-arr1[i+1];
                        arr1[i+1] = x;
                    }
                }
            }
            result=arr1[arr1.length-1];
            emptyArray = [];
            arr1 = [];
            arr2 = [];
        }
        else if(emptyArray.length===0 && emptyString!=""){
            result=parseFloat(emptyString);
        }
        display.innerHTML = result;
    emptyString="";
    console.log(result);
});

clearBtn.addEventListener("click", function(){
  stringDisplay = "";
  result = 0;
  display.innerHTML = result;
  emptyArray = [];
  emptyString = "";
});

omit.addEventListener("click", function(){
  var x = stringDisplay.length;
  if(stringDisplay!=""){
    if(stringDisplay[x-1]==="+" || 
        stringDisplay[x-1]==="-" ||
        stringDisplay[x-1]==="*" || 
        stringDisplay[x-1]==="/") {
        emptyArray.pop();
        emptyString = emptyArray.pop().toString();
  }
  else {
    emptyString = emptyString.slice(0,-1);
  }
  stringDisplay = stringDisplay.slice(0,-1);
  display.innerHTML = stringDisplay;
  }
});

btns.forEach(function(item){
  item.addEventListener("mousedown", function(){
    item.classList.add("shrink");
  });
  item.addEventListener("mouseup", function(){
    item.classList.remove("shrink");
  });  
});