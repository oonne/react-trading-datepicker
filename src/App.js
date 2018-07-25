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

  render() {
    let date = this.state.date;
    let tradingList = [
      '2018-07-30',
      '2018-07-31',
      '2018-08-01',
      '2018-08-02',
      '2018-08-03',
    ]

    return (
      <div className="App">
        <Datepicker value={date} tradingList={tradingList} onChange={this.onChange.bind(this)} />
      </div>
    );
  }
}

export default App;
