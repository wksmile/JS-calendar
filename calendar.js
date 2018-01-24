/**
 * @summary 当前日期
 * @desc 用户操作的日期，随操作不断更新
 * @type {Date}
 * */
let currentDate = new Date()
// 当前时间
let today_day = currentDate.getDate()     // 天 (1~31)
let today_month = currentDate.getMonth()   // 月(0~11)
let today_year = currentDate.getFullYear() // 年

/**
 * @summary 返回到今天
 * */
let backToday = document.getElementById('backToday')
backToday.addEventListener('click',returnToday);
function returnToday() {
  currentDate = new Date()
  generteCanlendar()
}

/**
 * @summary lastYear按钮监事件
 * */
let lastYearSpan = document.getElementById('lastYear')
lastYearSpan.addEventListener('click',lastYear)
function lastYear() {
  let year = currentDate.getFullYear()
  currentDate.setFullYear(--year)
  // 从新生成日历
  generteCanlendar()
}

/**
 * @summary nextYear按钮监事件
 * */
let nextYearSpan = document.getElementById('nextYear')
nextYearSpan.addEventListener('click',nextYear)
function nextYear() {
  let year = currentDate.getFullYear()
  currentDate.setFullYear(++year)
  // 从新生成日历
  generteCanlendar()
}

/**
 * @summary lastMonth按钮监事件
 * */
let lastMonthSpan = document.getElementById('lastMonth')
lastMonthSpan.addEventListener('click',lastMonth)
function lastMonth() {
  let month = currentDate.getMonth()
  currentDate.setMonth(--month)
  // 从新生成日历
  generteCanlendar()
}

/**
 * @summary lastMonth按钮监事件
 * */
let nextMonthSpan = document.getElementById('nextMonth')
nextMonthSpan.addEventListener('click',nextMonth)
function nextMonth() {
  let month = currentDate.getMonth()
  currentDate.setMonth(++month)
  // 从新生成日历
  generteCanlendar()
}

/**
 * 第一次执行生成日历
 * */
generteCanlendar()

/**
 * @summary 生成日历
 * @desc 根据日历的第一天生成当月的日历
 * @param firstDay {Date} 当月需要显示的第一天
 * */


function generteCanlendar() {
  let date = currentDate.getDate()     // 天 (1~31)
  let day = currentDate.getDay()       // 周几(0~6)
  let month = currentDate.getMonth()   // 月(0~11)
  let year = currentDate.getFullYear() // 年
  // 得到当前这个月的第一天的date对象
  let firstDayOfMonth = new Date(year,month,1)
  // 得到当前月第一天的是周几
  let dayOfFirstDay = firstDayOfMonth.getDay()
  // 得到这个月日历显示中第一天的date对象
  let firstOfTable = new Date(year,month,-dayOfFirstDay)
  generateOperate(year,month)       // 产生头部年月的信息
  generateDateTable(firstOfTable,month)   // 产生table里面的日期
}

/**
 * @summary 产生日历头部的年月部分
 * @param {number} year - 头部显示的年份
 * @param {number} month - 头部显示的月份
 * */
function generateOperate(year, month) {
  let domYear = document.getElementById('year')
  let domMonth = document.getElementById('month')
  domYear.innerHTML = year
  domMonth.innerHTML = month+1
}

/**
 * @summary 产生table表格中的日期信息
 * @param {Date} firstOfTable  表中需要显示的第一个的日期
 */
function generateDateTable(firstOfTable,month) {
  let dateTable = document.getElementById('dateTable')
  let date = firstOfTable.getDate()
  // 清空table下标签
  let year
  if(dateTable.firstChild) {
    dateTable.innerHTML = ''
  }
  let fragment = document.createDocumentFragment()
  for(let i=0;i<5;i++){
    let tr = document.createElement('ul')
    for(let j=0;j<7;j++){
      let td = document.createElement('li')
      firstOfTable.setDate(++date)
      date = firstOfTable.getDate()
      year = firstOfTable.getFullYear()
      td.innerText = date
      let className = 'date'
      if(firstOfTable.getMonth() !== month ) {
        className += ' gray'
      }
      if(year === today_year && month === today_month && date === today_day){
        className += ' today'
      }
      td.className = className
      td.setAttribute('data-date',firstOfTable.toLocaleDateString())
      tr.appendChild(td)
    }
    fragment.appendChild(tr)
  }
  dateTable.appendChild(fragment)
}

