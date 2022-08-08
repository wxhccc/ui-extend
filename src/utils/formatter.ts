import dayjs, { Dayjs } from 'dayjs'

const dateFormatShort = {
  default: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD',
  time: 'HH:mm:ss'
}
type FormatShort = keyof typeof dateFormatShort
/***
 ** 使用fecha做时间格式化
 * {integer | string | Date} date 需要格式化的时间，10/13位时间戳数字，合法格式时间字符串，Date对象
 * {string} format fecha支持的转化格式字符串
 ** 返回值: {string} 返回转化后的时间字符串
 ***/

export function dateFormat(
  date: string | number | Date | Dayjs,
  format: FormatShort | string = 'default'
) {
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
  const formatStr = dateFormatShort[format as FormatShort] || format
  return trueDate ? trueDate.format(formatStr) : ''
}
