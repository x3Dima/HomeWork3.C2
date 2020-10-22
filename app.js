const URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json";
const container = document.querySelector(".output");

fetch(URL)
  .then((answer) => answer.json())
  .then((data) => {
    let now = "2020-10-22";
    let attractionArray = [];
    const usdRates = 28.27;
    const eurRates = 33.53;

    for (let item of data) {
      let date = item.repaydate.split(".").reverse().join("-");
      if (date >= now) {
        let repeatData = {};
        repeatData.date = date;
        repeatData.attraction = item.attraction;
        repeatData.valcode = item.valcode;
        attractionArray.push(repeatData);
      }
    }

    let uah = attractionArray.filter((el) => el.valcode == "UAH");
    let usd = attractionArray.filter((el) => el.valcode == "USD");
    let eur = attractionArray.filter((el) => el.valcode == "EUR");

    let uahTotal = uah.reduce((acc, el) => {
      return acc + el.attraction;
    }, 0);
    let usdTotal = usd.reduce((acc, el) => {
      return acc + el.attraction * usdRates;
    }, 0);
    let eurTotal = eur.reduce((acc, el) => {
      return acc + el.attraction * eurRates;
    }, 0);

    let totalAttraction = uahTotal + usdTotal + eurTotal;
    container.innerHTML = `
    <h5>Общая сумма облигаций в гривне = ${uahTotal.toFixed(2)} грн.</h5>
    <h5>Общая сумма облигаций в долларе = ${usdTotal.toFixed(2)} грн.</h5>
    <h5>Общая сумма облигаций в евро = ${eurTotal.toFixed(2)} грн.</h5>
    <h5>Общая сумма облигаций = ${totalAttraction.toFixed(2)} грн.</h5>
    `;
  });
