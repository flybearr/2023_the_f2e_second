const judeNum = (val) => {
    if (typeof val === "number") {
        return val
    } else {
      return parseInt(val.replace(/,/g,""),10)
    }
}

const randomPrecent = (min , max) => {
    const randomValue = Math.random();

    // 計算在指定範圍內的百分比
    const range = max - min;
    const minValue = min;
  
    // 計算最終的值
    const finalValue = Math.round((minValue + randomValue * range).toFixed(3) * 10000)/100;
    
    // 將數字映射到字串範圍
    // const stringValue = `${finalValue}%`;
  
    // console.log(finalValue);
    return finalValue;
}

export {judeNum,randomPrecent}
