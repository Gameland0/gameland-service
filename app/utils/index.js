class Utils {
  fixDigitalId(first, id, digits) {
    const len = String(id).length
    if (len === digits) {
      return `${first}${id}`
    }
    let fixId = id
    for (let i = len; i < digits; i++) {
      fixId = `0`+fixId
    }
    return `${first}${fixId}`
  }
}

module.exports = Utils
