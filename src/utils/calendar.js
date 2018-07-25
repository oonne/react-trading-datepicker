import DateUtil from './date'

let CalendarUtil = {
    /**
     * 获取当月的日期列表（包含上个月的最后几天和下个月的前几天）
     */
    getDateList: function (time, tradingList){
      let dateObj = new Date(time);
      let year = dateObj.getFullYear();
      let month = dateObj.getMonth() + 1;
      let date = dateObj.getDate();
      let day = dateObj.getDay();
      // 获取本月第一天是星期几
      let currentMonthFirstDay = new Date(year, month-1, 1).getDay();
      // 获取本月最后一天星期几
      let currentMonthEndDay = new Date(year, month, 0).getDay();
      // 获取本月最后一天是几号
      let currentMonthEndDate = new Date(year, month, 0).getDate();
      // 获取上月最后一天是几号
      let lastMonthEndDate = new Date(year, month-1, 0).getDate();


      let dateList = [];

      // Last Month
      let temp = lastMonthEndDate - (currentMonthFirstDay - 1);
      for (temp; temp <= lastMonthEndDate; temp++) {
          dateList.push({
              text: '',
              disable: true
          })
      }
      // This Month
      let y = year;
      let m = month;
      if (m >= 1 && m <= 9)  m = "0" + m;
      for (temp = 1; temp <= currentMonthEndDate; temp++) {            
          let disable = true;
          let tmpDate = DateUtil.getYYYYMMDD(new Date(y, m-1, temp));

          if ( tradingList.some(tradingDate => tradingDate==tmpDate) ) {
            disable = false
          }

          dateList.push({
              date: tmpDate,
              text: temp,
              disable: disable
          });
      }
      // Next Month
      let leftDays = currentMonthEndDate - (7-currentMonthFirstDay)
      let nextDays = leftDays%7 ? 7-(leftDays%7) : 0;
      for (temp = 1; temp <= nextDays; temp++) {
          dateList.push({
              text: '',
              disable: true
          })
      }

      return this.sliceWeekArr(dateList);
    },
    /**
     * 按照每周分成数组
     */
    sliceWeekArr: function (array){
      var result = [];
      for (var x = 0; x < Math.ceil(array.length / 7); x++) {
        var start = x * 7;
        var end = start + 7;
        result.push(array.slice(start, end));
      }
      return result;
    },

    /**
     * 日历头部的月份显示
     */
    getHeaderMonth: function (year, month){
      let m = month+1;
      if (m<10) {
        m = `0${m}`;
      }
      return `${year} - ${m}`;
    },
}

export default CalendarUtil;