
function jwtRemainingTime (exp) {
  const currentTime = new Date()
  const expTime = new Date(exp * 1000)
  const remainingTime = parseInt( (expTime - currentTime) / 1000 )

  return remainingTime
}

function btnSpinner (btnObj, status, message, style) {
  btnObj.value = message
  btnObj.disabled = status
  btnObj.style = style
}

export {
  jwtRemainingTime,
  btnSpinner
};
