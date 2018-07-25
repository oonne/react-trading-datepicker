import React, { Component } from 'react';
import './App.css';
import Datepicker from './component/Datepicker'
import DateUtil from './utils/date'

class App extends Component {
  
  constructor(props){
    super(props);

    this.onChange = this.onChange.bind(this)

    this.state = {
      date: DateUtil.getYYYYMMDD(new Date()),
    }
  }

  onChange (val) {
    this.setState({
      date: val
    })
  }

  getTradingListDemo () {
    let tradingList = [];
    let curDate = new Date();
    for (let i=0; i<30; i++) {
      let thisDate = new Date(curDate.getTime() + i*24*60*60*1000);
      if (thisDate.getDay()>0 && thisDate.getDay()<6) {
        tradingList.push(DateUtil.getYYYYMMDD(thisDate))
      }
    }

    return tradingList;
  }

  render() {
    let date = this.state.date;
    let tradingList = this.getTradingListDemo();

    return (
      <div className="App">
        <Datepicker value={date} tradingList={tradingList} onChange={this.onChange} />
      </div>
    );
  }
}

export default App;
