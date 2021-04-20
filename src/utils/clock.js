export function dateFilter (v) {
  let m = v.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = v.getDate()
  d = d < 10 ? '0' + d : d
  return v.getFullYear() + '-' + m + '-' + d
}

export function timeFilter (v) {
  let h = v.getHours()
  h = h < 10 ? '0' + h : h
  let m = v.getMinutes()
  m = m < 10 ? '0' + m : m
  let s = v.getSeconds()
  s = s < 10 ? '0' + s : s
  return h + ':' + m + ':' + s
}
