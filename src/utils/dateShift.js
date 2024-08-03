import { dayjs } from 'element-plus'

//将类似 的 "Tue Jul 30 2024 18:38:34 GMT+0800 (Coordinated Universal Time)" 时间 转换为年月日格式
//利用element plus 集成的功能
export const dateShift = (date) => {
  if (date) {
    //先将传入的String转换为date
    const dateObj = new Date(date)
    return dayjs(dateObj).format('YYYY年MM月DD日')
  }
  return
}
