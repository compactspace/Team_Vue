export const kakaoPostcode = (onCompleteCallback) => {
  if (!window.daum) {
    const script = document.createElement("script");
    script.src =
      "https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.onload = () =>
      new window.daum.Postcode({ oncomplete: onCompleteCallback }).open();
    document.head.appendChild(script);
  } else {
    new window.daum.Postcode({ oncomplete: onCompleteCallback }).open();
  }
};
