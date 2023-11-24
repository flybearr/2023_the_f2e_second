const judeNum = (val) => {
    if (typeof val === "number") {
        return val
    } else {
        console.log(val);
      return parseInt(val.replace(/,/g,""),10)
    }
}

export {judeNum}
