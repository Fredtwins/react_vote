import localStorage from 'localStorage';
function setCookie (name, value) {
  var exp = new Date();
  exp.setTime(exp.getTime() + 30 * 24 * 60 * 60 * 1000);
  document.cookie = name + '=' + escape(value) + ';expires=' + exp.toGMTString();
}
function getCookie (name) {
  var arr = document.cookie.match(new RegExp('(^| )' + name + '=([^;]*)(;|$)'));
  if (arr != null) return unescape(arr[2]);
  return null;
}

// function delCookie (name) {
//   var exp = new Date();
//   exp.setTime(exp.getTime() - 1);
//   var cval = getCookie(name);
//   if (cval != null) {
//     document.cookie = name + '=' + cval + ';expires=' + exp.toGMTString();
//   }
// }
export default {
  getStorageSync (item) {
    return getCookie(item) || localStorage.getItem(item)
  },
  setStorageSync (itemName, Value) {
    try {
      localStorage.setItem(itemName, Value)
    } catch (error) {
      setCookie(itemName, Value)
    }
  },
}
