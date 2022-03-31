export default function rexQueryReq(reqQuery) { 

    // tìm các giá trị không phải chữ  và khoảng trắng
  var myRe = /[^a-zA-Z0-9\s]/gim;
  var status = true;

  for (const [key, value] of Object.entries(reqQuery)) {
      // nếu tìm giá trị có ký tự không phải chữ
    //   dừng chương trình re false
      if (myRe.test(value.trim()) == true) {
        console.log(`${key}: ${value}`);
        console.log(myRe.test(value));
      status = false;
      return { status, key, value };
     }
  } 
  return status;
}
