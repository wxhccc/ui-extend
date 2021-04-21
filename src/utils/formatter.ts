import numeral from 'numeral';
import { format as FechaFormat, setGlobalDateMasks } from 'fecha';

/***
** 将数字转化为需要的格式的字符串，使用numeral转化
* {number} value 需要格式转化的数字
* {string} format 转化格式的字符串
** 返回值: {string} 返回转化后的字符串
***/
export function commaNum (value: number, format = '0,0') {
  return typeof format === 'string' ? numeral(value).format(format) : value
}
/***
** 将数字转化为百分比格式字符串，使用numeral转化
* {number} value 需要格式转化的数字
* {string} format 转化格式的字符串
* {boolean} hasSymbol 是否添加%符号
** 返回值: {string} 返回转化后的字符串
***/
export function percent (value: number, format = '0.0', noSymbol?: boolean) {
  const result = numeral(value).format(`${format}%`);
  return noSymbol ? result.replace('%', '') : result;
}

/***
** 秒数转换为时分秒
* {integer} seconds 需要转化的秒数
* {integer} level 需要显示的级数
* {string} lang 显示的单位语言，zh/en
** 返回值: {string} 转换后的字符串，例如secToWord(65)返回1分钟5秒
***/
const unitMap: Record<string, string[]> = {
  zh: ['秒', '分钟', '小时', '天'],
  en: ['second', 'minute', 'hour', 'day']
}
export function secondStringify (seconds: number, level = 0, lang = 'zh') {
  const units = Array.isArray(lang) ? lang : (unitMap[lang] || unitMap['en']);
  const roundFn = (lvl: number, num: number) => (lvl === level ? Math.round(num) : Math.floor(num));
  const countArr = [seconds % 60];
  seconds >= 60 && countArr.push(roundFn(1, seconds % 3600 / 60));
  seconds >= 3600 && countArr.push(roundFn(2, seconds % 86400 / 3600));
  seconds >= 86400 && countArr.push(roundFn(3, seconds / 86400));
  const result = countArr.map((item, index) => {
    return level <= index ? ((item > 0 || countArr.length === 1) ? `${item}${units[index]}` : '') : '';
  }).reverse();
  return result.join('');
}

/***
** 使用fecha做时间格式化
* {integer | string | Date} date 需要格式化的时间，10/13位时间戳数字，合法格式时间字符串，Date对象
* {string} format fecha支持的转化格式字符串
** 返回值: {string} 返回转化后的时间字符串
***/
setGlobalDateMasks({
  default: 'YYYY-MM-DD HH:mm:ss',
  date: 'YYYY-MM-DD'
})

export function dateFormat (date: string | number | Date, format: string) {
  let trueDate = null
  if (date instanceof Date) {
    trueDate = date
  } else if (!isNaN(new Date(date).getTime())) {
    trueDate = new Date(date)
  } else if (isFinite(Number(date)) && !isNaN(new Date(date as number * 1000).getTime())) {
    trueDate = new Date(date as number * 1000)
  }
  return trueDate ? FechaFormat(trueDate, format) : ''
}
