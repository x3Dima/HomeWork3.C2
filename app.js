const URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/ovdp?json";
const container = document.querySelector(".output");

fetch(URL)
  .then((answer) => answer.json())
  .then((data) => {
    let now = "2020-10-22";
    const usdRates = 28.27;
    const eurRates = 33.53;
    let id = 0;
    let bonds = data.filter((item) => {
      let date = item.repaydate.split(".").reverse().join("-");
      if (date > now) {
        item.date = date;

        return item;
      }
    });

    bonds.sort((a, b) => {
      let dateToNumberA = a.date.split("-").join("");
      let dateToNumberB = b.date.split("-").join("");

      return +dateToNumberA - +dateToNumberB;
    });

    for (let item in bonds) {
      if (bonds[item].valcode == "USD") {
        bonds[item].attraction * usdRates;
      } else if (bonds[item].valcode == "EUR") {
        bonds[item].attraction * eurRates;
      }
    }

    for (let i = 0; i < bonds.length - 1; i++) {
      if (i === 0) {
        continue;
      } else if (bonds[i - 1].date === bonds[i].date) {
        bonds[i - 1].attraction += bonds[i].attraction;
        bonds.splice(i - 1, 1);
      }
    }

    bonds.forEach((el) => {
      console.log(el.date, el.attraction);
    });
  });
