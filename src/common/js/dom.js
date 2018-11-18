export function addClass(obj, cls) {
  if (!hasClass(obj, cls)) obj.className += ' ' + cls
}

function hasClass(obj, cls) {
  return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'))
}
