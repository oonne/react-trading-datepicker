import React from 'react'
import PropTypes from 'prop-types';
import classname from 'classname'
import DateUtil from '../utils/date'
import CalendarUtil from '../utils/calendar'

import './Datepicker.css'

class Datepicker extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    onChange: PropTypes.func,
    tradingList: PropTypes.array,
  };

  static defaultProps = {
    value: '',
    onChange: ()=>{},
    tradingList: [],
  };

  constructor(props){
    super(props)

    let dateObj = new Date();
    this.state = {
      date: this.props.value,
      currentYear: dateObj.getFullYear(),
      currentMonth: dateObj.getMonth(),
      showCalendar: false
    }
    this.showCalendar = this.showCalendar.bind(this)
    this.hideCalendar = this.hideCalendar.bind(this)
  }

  selectDate (date) {
    if (!date.disable) {
      this.setState({
        date: date.date,
        showCalendar: false
      })
      this.props.onChange(date.date)
    }
  }

  renderCalenderDate (date, i) {
    let dateClass = classname({'datepicker_date_disable': date.disable, 'datepicker_date_active': date.date==this.state.date});
    return(<td key={i} className={dateClass} onClick={this.selectDate.bind(this, date)}>
      {date.text}
    </td>);
  }
  renderCalenderWeekly (week, i) {
    return(<tr key={i}>
      {week.map((date, i)=>this.renderCalenderDate(date, i))}
    </tr>);
  }
  renderCalender () {
    let time = new Date(this.state.currentYear, this.state.currentMonth, 1);
    let dateList = CalendarUtil.getDateList(time, this.props.tradingList);

    return (<tbody>
      {dateList.map((week, i)=>this.renderCalenderWeekly(week, i))}
    </tbody>);
  }

  showCalendar () {
    this.setState({
      showCalendar: true
    })
  }
  hideCalendar () {
    let dateObj = DateUtil.getDate(this.state.date);
    this.setState({
      showCalendar: false,
      currentYear: dateObj.getFullYear(),
      currentMonth: dateObj.getMonth(),
    })
  }

  // 切换月份
  switchMonth (n) {
    let year = this.state.currentYear
    let month = this.state.currentMonth
    if (month == 0 && n===-1) {
      this.setState({
        currentYear: year-1,
        currentMonth: 11,
      })
    } else if (month == 11 && n===1){
      this.setState({
        currentYear: year+1,
        currentMonth: 0,
      })
    } else {
      this.setState({
        currentMonth: month+n,
      })
    }
  }

  render () {
    let containerClass = classname('datepicker_wrapper', this.props.className);
    let calendarClass = classname('datepicker_calendar', {'hidden': !this.state.showCalendar});
    return (
      <div className={containerClass}>
        <input className="datepicker_input" onFocus={this.showCalendar} value={this.state.date} type="text" readOnly/>
        
        <div className={calendarClass}>
          <div className="datepicker_modal" onClick={this.hideCalendar}></div>
          <div className="datepicker_header">
            <div className="datepicker_header_pre" onClick={this.switchMonth.bind(this, -1)}>&lt;</div>
            <div className="datepicker_header_month">
              {CalendarUtil.getHeaderMonth(this.state.currentYear, this.state.currentMonth)}
            </div>
            <div className="datepicker_header_next" onClick={this.switchMonth.bind(this, 1)}>&gt;</div>
          </div>
          <div className="datepicker_content">
            <table>
              <thead>
                <tr>
                  <th>Sun.</th>
                  <th>Mon.</th>
                  <th>Tues.</th>
                  <th>Wed.</th>
                  <th>Thur.</th>
                  <th>Fri.</th>
                  <th>Sat.</th>
                </tr>
              </thead>
              {this.renderCalender()}
            </table>
          </div>
        </div>
      </div>
    )
  }
}

export default Datepicker