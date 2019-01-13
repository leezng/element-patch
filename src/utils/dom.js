export function addClass (el, className) {
  if (!el || !className) return
  let classArr = className.split(' ')
  let elClassStr = el.className
  classArr.forEach(item => {
    if (!item) return // unexpectedClassName: 'aa bb   cc'

    if (el.classList) {
      el.classList.add(item)
    } else if (!hasClass(item)) {
      elClassStr += ' ' + item
    }
  })
  !el.classList && (el.className = elClassStr)
}

export function removeClass (el, cls) {
  if (!el || !cls) return
  let classes = cls.split(' ')
  let curClass = ' ' + el.className + ' '

  classes.forEach(item => {
    if (!item) return

    if (el.classList) {
      el.classList.remove(item)
    } else if (hasClass(el, item)) {
      curClass = curClass.replace(' ' + item + ' ', ' ')
    }
  })
  !el.classList && (el.className = curClass.trim())
}

export function hasClass (el, className) {
  if (!el || !className) return false
  if (className.indexOf(' ')) return false // 类名本身不可有空格, 防止多类名className存在空格的检验异常

  return el.classList
    ? el.classList.contains(className)
    : el.className.indexOf(className) > -1
}
