"use strict";Object.defineProperty(exports,"__esModule",{value:true});const POINT_DAY={startGregorian:"15821015",lastJulian:"15821004",errorLast:"00040228",ADStart:"00010101"};const dayStringTable=["Sat","Sun","Mon","Tue","Wed","Thu","Sat"];exports.default=(year,month,day)=>dayStringTable[getDayNumber(year,month,day)];const getDayNumber=(year,month,day)=>{const dateString=year.toString().padStart(4,"0")+month.toString().padStart(2,"0")+day.toString().padStart(2,"0");if(month>12||day>31||month<1||day<1)throw new Error(`Invalid date. date:${year}/${month}/${day}`);if(dateString>POINT_DAY.startGregorian){return zellersCongruence(year,month,day)}else if(POINT_DAY.lastJulian<dateString&&dateString<POINT_DAY.startGregorian){throw new Error("invalid date. please check calendar revision rules.")}else if(dateString<POINT_DAY.lastJulian&&POINT_DAY.errorLast<dateString){return zellersCongruence(year,month,day,false)}else if(POINT_DAY.ADStart<=dateString&&dateString<=POINT_DAY.errorLast){let dayNumber=zellersCongruence(year,month,day,false)+1;if(dayNumber>6)dayNumber=0;return dayNumber}else if(dateString<POINT_DAY.ADStart){throw new Error("A date before the Western calendar is specified.")}else{throw new Error(`invalid dateString ${dateString}`)}};const zellersCongruence=(year,month,day,isGregorian=true)=>{if(month<3){month+=12;year-=1}const C=Math.floor(year/100);const Y=year%100;let l;if(isGregorian){l=5*C+Math.floor(C/4)}else{l=6*C+5}const h=(day+Math.floor(26*(month+1)/10)+Y+Math.floor(Y/4)+l)%7;return h};