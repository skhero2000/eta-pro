/*
* 分格式化为元
* num为保留几位小数
* 使用：value | money(0)
* */
let money = (value, num) => {
  let res = parseInt(value);
  if(typeof(num)=="undefined"){
    num = 2;
  }else{
    num = parseInt(num);
  }
  if(res>=0){
    res = (res/100).toFixed(num);
  }else{
    res = '';
  }
  return res;
};

/*
* 时间格式化
* 使用: value | date('yyyy-MM-dd')
* */
let date = (obj, fmt) =>{
  let _this = '';
  if(!fmt){
    fmt = 'yyyy-MM-dd';
  }
  if(obj instanceof Date){
    _this = obj;
  }else if(typeof obj == 'number' && obj>0){
    _this = new Date(obj);
  }else{
    fmt = obj;
  }
  if(fmt == 0){
    fmt = '';
  }

  if(_this){
    let o = {
      "M+": _this.getMonth() + 1, //月份
      "d+": _this.getDate(), //日
      "h+": _this.getHours(), //小时
      "m+": _this.getMinutes(), //分
      "s+": _this.getSeconds(), //秒
      "q+": Math.floor((_this.getMonth() + 3) / 3), //季度
      "S": _this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt))fmt = fmt.replace(RegExp.$1, (_this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (let k in o)if (new RegExp("(" + k + ")").test(fmt))fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
  }
  return fmt
};

let trimStr = (str)=>{
  return str.replace(/(^\s*)|(\s*$)/g,"");
};


export { money, date, trimStr}
