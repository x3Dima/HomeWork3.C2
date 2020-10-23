const URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json";
const container = document.querySelector(".output");

fetch(URL)
  .then((answer) => answer.json())
  .then((data) => {
    let now = "2020-10-22";
    let attractionArray = [];
    const usdRates = 28.27;
    const eurRates = 33.53;
    let id = 0;

    for (let item of data) {
      let date = item.repaydate.split(".").reverse().join("-");
      if (date >= now) {
        let repeatData = {};
        repeatData.date = date;
        repeatData.attraction = item.attraction;
        repeatData.valcode = item.valcode;
        repeatData.id = id;
        attractionArray.push(repeatData);
        id++;
      }
    }
    for (let item in attractionArray) {
      if (attractionArray[item].valcode == "USD") {
        console.log(
          attractionArray[item].id,
          attractionArray[item].date,
          attractionArray[item].attraction * usdRates
        );
      } else if (attractionArray[item].valcode == "EUR") {
        console.log(
          attractionArray[item].id,
          attractionArray[item].date,
          attractionArray[item].attraction * eurRates
        );
      } else {
        console.log(
          attractionArray[item].id,
          attractionArray[item].date,
          attractionArray[item].attraction
        );
      }
    }
    // console.log(attractionArray);
  });
