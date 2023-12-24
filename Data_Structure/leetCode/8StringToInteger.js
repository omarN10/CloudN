var myAtoi = function (s) {
  let resultStr = "0";
  const max32Bit = 2 ** 31 - 1;
  const min32Bit = 2 ** 31 * -1;
  const zeroCharCode = "0".charCodeAt(0);
  const nineCharCode = "9".charCodeAt(0);
  let sign = 1;
  
  //validation
  //if there is word before number return 0
  let firstChar = s[0];
  let firstCharCode = firstChar.charCodeAt(0); 
  if (firstCharCode> 96) {
    return 0;
  }

  //validation for +- or -+
  if (s.includes("-+")||s.includes("+-")) {
    return 0;
  }
  
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "-") {
      sign = -1;
    }

    //validation 
    
    const characterCode = char.charCodeAt(0);
    //validation for float numbers  
    if (characterCode ==46) {
      break;
    }
    if (characterCode <zeroCharCode || characterCode > nineCharCode) {
      continue;
    }
    resultStr = resultStr === "0"?char: resultStr+ char;
  }
  resultStr = +resultStr * sign;
  if(resultStr> max32Bit) resultStr = max32Bit;
  if(resultStr< min32Bit) resultStr = min32Bit;

  return resultStr;
};
console.log(myAtoi("3.14"))
console.log(myAtoi("words and 987"))
console.log("0".charCodeAt(0));
/* console.log("-".charCodeAt(0))
console.log("0".charCodeAt(0))
console.log("9".charCodeAt(0)) */