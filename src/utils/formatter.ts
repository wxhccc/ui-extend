import numeral from 'numeral'
import dayjs, { Dayjs } from 'dayjs'

/***
 ** 将数字转化为需要的格式的字符串，使用numeral转化
 * {number} value 需要格式转化的数字
 * {string} format 转化格式的字符串
 ** 返回值: {string} 返回转化后的字符串
 ***/
export function commaNum(value: string | number, format = '0,0') {
  return typeof format === 'string' ? numeral(value).format(format) : value
}
/***
 ** 将数字转化为百分比格式字符串，使用numeral转化
 * {number} value 需要格式转化的数字
 * {string} format 转化格式的字符串
 * {boolean} hasSymbol 是否添加%符号
 ** 返回值: {string} 返回转化后的字符串
 ***/
export function percent(value: string | number, format = '0.0', noSymbol?: boolean) {
  const result = numeral(value).format(`${format}%`)
  return noSymbol ? result.replace('%', '') : result
}

const dateFormatShot: Record<string, string> = {
  default: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD'
}
/***
 ** 使用fecha做时间格式化
 * {integer | string | Date} date 需要格式化的时间，10/13位时间戳数字，合法格式时间字符串，Date对象
 * {string} format fecha支持的转化格式字符串
 ** 返回值: {string} 返回转化后的时间字符串
 ***/

export function dateFormat(date: string | number | Date | Dayjs, format = 'default') {
  let trueDate: null | Dayjs = null
  if (dayjs.isDayjs(date)) {
    trueDate = date
  } else if (date instanceof Date) {
    trueDate = dayjs(date)
  } else if (!isNaN(new Date(date).getTime())) {
    trueDate = dayjs(new Date(date))
  } else if (isFinite(Number(date)) && !isNaN(new Date((date as number) * 1000).getTime())) {
    trueDate = dayjs(new Date((date as number) * 1000))
  }
  const formatStr = dateFormatShot[format] || format
  return trueDate ? trueDate.format(formatStr) : ''
}
