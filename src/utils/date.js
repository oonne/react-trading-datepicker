let DateUtil = {
    /**
     * 字符转时间戳
     * @param {String} dateString format YYYY-MM-DD 
     * @return {Date} 
     */
    getDate: (dateString)=>{
        let len = dateString.length;
        let arr;
        let ret;

        if(len === 10){
            arr = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
            ret = new Date(arr[1], arr[2] - 1, arr[3]);
        }else{
            return null;
        }

        return ret;
    },

    /**
     * 时间戳转字符
     * @param {Date} 
     * @return {String} dateString format YYYY-MM-DD
     */
    getYYYYMMDD: (dateObj)=>{
        let year = dateObj.getFullYear();
        let month = dateObj.getMonth()+1;
        let date = dateObj.getDate();
        if(month<10){
            month = '0' + month;
        }
        if(date<10){
            date = '0' + date;
        }
        return [year, month, date].join('-');
    },
}

export default DateUtil;