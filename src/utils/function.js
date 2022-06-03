export const removeWhiteBetweenWord = str => {
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, 'a');
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, 'e');
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, 'i');
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, 'o');
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, 'u');
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, 'y');
  str = str.replace(/đ/g, 'd');
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, 'A');
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, 'E');
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, 'I');
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, 'O');
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, 'U');
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, 'Y');
  str = str.replace(/Đ/g, 'D');
  // Some system encode vietnamese combining accent as individual utf-8 characters
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ''); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ''); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
  // Remove extra spaces
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g, ' ');
  str = str.trim();
  // Remove punctuations
  // Bỏ dấu câu, kí tự đặc biệt
  str = str.replace(
    /!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g,
    ' ',
  );
  return str;
};

export const formatToListOption = arr => {
  let dataResult = [];
  arr.map(item => {
    let label = item.name;
    let value = removeWhiteBetweenWord(label)
      .split(' ')
      .filter(s => s)
      .join('')
      .toLowerCase();
    let itemArr = {label, value};
    dataResult = [...dataResult, itemArr];
  });
  return dataResult.length > 0 && dataResult;
};

export const convertLabel = val => {
  let value = removeWhiteBetweenWord(val)
    .split(' ')
    .filter(s => s)
    .join('')
    .toLowerCase();
  return value && value;
};

export const formatToListOptionType = arr => {
  let dataResult = [];
  arr.map(item => {
    let label = item.name;
    let value = item.name;
    let itemArr = {label, value};
    dataResult = [...dataResult, itemArr];
  });
  return dataResult.length > 0 && dataResult;
};

export const formatToList = arr => {
  let dataResult = [];
  arr.map(item => {
    let label = item;
    let value = item;
    let itemArr = {label, value};
    dataResult = [...dataResult, itemArr];
  });
  return dataResult.length > 0 && dataResult;
};

export const getToListName = arr => {
  let dataResult = [];
  arr.map(item => {
    let name = item.name;
    dataResult = [...dataResult, name];
  });
  return dataResult.length > 0 && dataResult;
};

export const formartToCurrency = item => {
  const result = (+item).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  const dotIndex = result.indexOf('.');
  return result.toString().slice(0, dotIndex);
};

export const isString = obj => {
  return Object.prototype.toString.call(obj) === '[object String]';
};

export const convertCurrencyToNumber = val => {
  const data = val && val.split(',').join('');
  return val && data;
};

export const checkConsultInfo133 = val => {
  const check = convertCurrencyToNumber(val);
  return check % 1 === 0;
};

export const durableDay = (start, end) => {
  const arr1 = start.split('-');
  const arr2 = end.split('-');
  return +arr2[0] - +arr1[0] + 1;
};

export const convertFormatDate = date => {
  return date.split('-').reverse().join('/');
};
