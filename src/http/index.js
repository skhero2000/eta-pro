import axios from 'axios';
import qs from 'qs';

class Http{
  constructor(props){
    this.headers = {

    }
  }
  post(url, data){
    let promise = new Promise(function (resolve, reject) {
      axios.post('https://ht-mjwx-test.htmimi.com/index.php/Api/Wxapi/JsSignPackage', qs.stringify(data), {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }).then(function (suc) {
        if(suc.status == 200){
          resolve(suc.data)
        }else{
          reject(suc);
        }

      }, function (err) {
        reject(err);
      });
    });
    return promise;
  }

}

export default new Http();
