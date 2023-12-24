var myAtoi = function (s) {
  let resultStr = "";
  let norPositive = "";
  let newStr = "";
  for (let i = 0; i < s.length; i++) {
    if (parseInt(s.charAt(i)) != NaN) {
      // console.log(parseInt(s.charAt(i)));
      // continue;
      if (s.charAt(i) == "+" || s.charAt(i) == "-") {
        norPositive = s.charAt(i);
        continue;
      }
      resultStr += s.charAt(i);
    } else {
      continue;
    }
  }
  resultStr = norPositive + resultStr;

  for (let i = 0; i < resultStr.length; i++) {
    if (resultStr.charAt(i) == " ") {
      continue;
    } else if (parseInt(resultStr.charAt(i)) == NaN) {
        continue;
    }else{
        newStr += resultStr.charAt(i);
    }
  }
  console.log(newStr);
  return parseInt(newStr);
};
/* 
let str1 = "__  42 ";
let value = 0;
let str2= "";
for (let i = 0; i < str1.length; i++) {
    // console.log(str1.charAt(i))
    // str2 += str1.charAt(i);
}
console.log(parseInt("4193 with words-42"))
if (parseInt("-5")!= NaN) {
    console.log("testing")
}else{
    console.log("is false")
} */
// console.log(myAtoi("s -42"));



//another solution
var myAtoi1 = function (s) {
    s = s.trimStart();
    const max32BitInt = 2 **32 -1;
    const min32BitInt = 2 **32 *-1 ;

    const zeroCharCode = "0".charCodeAt(0);
    const nineCharCode = "9".charCodeAt(0);
    const firstChar = s[0];

    let result  ="0";
    let sign = 1;
    let idx = 0;
    if (firstChar ==="-"|| firstChar ==="+") {
        if (firstChar ==="-") {
            sign = -1;
        }
        idx= 1;
    }
    for (let i = 0; i < s.length; i++) {
        const char = s[i];
        const code = char.charCodeAt(0);
        if (code< zeroCharCode || code >nineCharCode) {
            continue;
        }
        result = result === "0" ? char : result + char;
    }
    result = +result * sign;
    if(result> max32BitInt) result = max32BitInt;
    if(result<min32BitInt) result = min32BitInt;
    return result;
};
// let strTest1 = "012omar";
// console.log("9".charCodeAt(0));
console.log(myAtoi1("words and 987"));

