// this code for page theme
document.querySelector("#theme").onclick = function () {
  this.classList.toggle("active");
  if (this.classList.contains("active")) {
    document.body.classList.add("active");
    document.querySelector("#theme span").textContent = "Light Mode";
  } else {
    document.body.classList.remove("active");
    document.querySelector("#theme span").textContent = "Dark Mode";
  }
};

// this code to open boxs filter region
document.querySelector(".select").onclick = function () {
  document.querySelector(".select-box").classList.toggle("active");
};

// this code for all countries
let country = document.querySelector(".countries .container .row");

let arr = [];
let dataFileArr = [];

async function fetchData() {
  try {
    let data = await fetch("https://restcountries.com/v3.1/all");
    let dataFile = await data.json();

    // create all countries boxs
    for (let i = 0; i < dataFile.length; i++) {
      arr.push(dataFile[i]);
      if ("borders" in dataFile[i]) {
        dataFileArr.push(dataFile[i]);
      }

      let countryBox = document.createElement("div");
      countryBox.className =
        "country-box col-12 col-md-6 col-lg-3 mb-3 mb-lg-4";
      country.appendChild(countryBox);

      let image = document.createElement("div");
      image.className = "image";
      image.style.cssText = `background-image: url(${dataFile[i].flags.png})`;
      countryBox.appendChild(image);
      /*let img = document.createElement("img");
      img.className = "img-fluid" 
      img.src = dataFile[i].flags.png; 
      img.alt = "country-flag"; 
      image.appendChild(img);*/

      let info = document.createElement("div");
      info.className = "info";
      countryBox.appendChild(info);
      let name = document.createElement("p");
      name.className = "name";
      name.textContent = dataFile[i].name.common;
      info.appendChild(name);

      let detaile = document.createElement("ul");
      detaile.className = "detaile";
      info.appendChild(detaile);

      // first li
      let li1 = document.createElement("li");
      detaile.appendChild(li1);
      let population = document.createElement("p");
      population.textContent = "Population: ";
      li1.appendChild(population);
      let spanPopulation = document.createElement("span");
      spanPopulation.textContent = dataFile[i].population;
      li1.appendChild(spanPopulation);
      // second li
      let li2 = document.createElement("li");
      detaile.appendChild(li2);
      let region = document.createElement("p");
      region.textContent = "Region: ";
      li2.appendChild(region);
      let spanRegion = document.createElement("span");
      spanRegion.className = "the-region";
      spanRegion.textContent = dataFile[i].region;
      li2.appendChild(spanRegion);
      // third li
      let li3 = document.createElement("li");
      detaile.appendChild(li3);
      let capital = document.createElement("p");
      capital.textContent = "Capital: ";
      li3.appendChild(capital);
      let spanCapital = document.createElement("span");
      spanCapital.textContent = dataFile[i].capital;
      li3.appendChild(spanCapital);
    }

    // write the name of country to search
    document.querySelector("input").oninput = function () {
      // row style
      if (this.value !== "") {
        country.className =
          "row justify-content-center justify-content-lg-start align-items-center gap-4";
      } else {
        country.className =
          "row justify-content-center justify-content-lg-between align-items-center gap-4";
      }

      // remove
      document.querySelectorAll(".country-box").forEach((box) => {
        box.classList.add("disabled");
      });

      document.querySelectorAll(".country-box").forEach((box) => {
        // console.log(box.children[1].children[0].textContent);

        let lower = box.children[1].children[0].textContent.toLowerCase();
        let upper = box.children[1].children[0].textContent.toUpperCase();

        if (
          box.children[1].children[0].textContent.includes(this.value) ||
          lower.includes(this.value) ||
          upper.includes(this.value)
        ) {
          box.classList.remove("disabled");
        }
      });
    };

    // click the country to get it's information
    document.querySelectorAll(".country-box").forEach((box) => {
      box.onclick = function () {
        // hide the serach section
        document.querySelector(".serach-section").classList.add("disabled");

        document.querySelector(".countries").classList.add("active");

        // back button
        document.querySelector(".back-btn").classList.add("active");

        // console.log(this.children[1].children[0].textContent);
        document.querySelectorAll(".country-box").forEach((box) => {
          box.classList.add("disabled");
        });

        let detaile = document.createElement("section");
        detaile.className = "detaile-section";
        document.querySelector("main").appendChild(detaile);
        let container = document.createElement("div");
        container.className = "container";
        detaile.appendChild(container);

        let row = document.createElement("div");
        row.className = "row";
        container.appendChild(row);

        let image = document.createElement("div");
        image.className = "image col-12 col-lg-6";

        row.appendChild(image);
        // let img = document.createElement("img");
        // img.className = "img-fluid"
        // img.src = dataFile[i].flags.png;
        // img.alt = "country-flag";
        // image.appendChild(img);

        let info = document.createElement("div");
        info.className = "info col-12 col-lg-5";
        row.appendChild(info);
        let name = document.createElement("p");
        name.className = "name";
        info.appendChild(name);

        // country info
        let countryInfo = document.createElement("div");
        countryInfo.className = "country-info";
        info.appendChild(countryInfo);

        // first ul
        let firstUl = document.createElement("ul");
        firstUl.className = "firstUl";
        countryInfo.appendChild(firstUl);
        let text = [
          "Native Name",
          "Population",
          "Region",
          "Sub Region",
          "Capital",
        ];

        let secondUl = document.createElement("ul");
        secondUl.className = "secondUl";
        countryInfo.appendChild(secondUl);
        let text2 = ["Top Level Domain", "Currencies", "Languages"];

        for (let i = 0; i < dataFile.length; i++) {
          if (
            dataFile[i].name.common === this.children[1].children[0].textContent
          ) {
            // console.log(dataFile[i].flags.png)
            image.style.cssText = `background-image: url(${dataFile[i].flags.png})`;

            name.textContent = dataFile[i].name.common;

            let nativeName = dataFile[i].name.nativeName;
            let theNative;
            for (let value in nativeName) {
              theNative = nativeName[value].common;
            }

            let subregion;
            if ("subregion" in dataFile[i]) {
              subregion = dataFile[i].subregion;
            } else {
              subregion = "Don't have subregion";
            }

            let textInfo = [
              theNative,
              dataFile[i].population,
              dataFile[i].region,
              subregion,
              dataFile[i].capital,
            ];

            let classes = [
              "nativeName",
              "population",
              "region",
              "subregion",
              "capital",
            ];

            for (let i = 0; i < text.length; i++) {
              let li = document.createElement("li");
              firstUl.appendChild(li);
              let p = document.createElement("p");
              p.textContent = `${text[i]}: `;
              li.appendChild(p);
              let span = document.createElement("span");
              span.className = classes[i];
              span.textContent = textInfo[i];
              li.appendChild(span);
            }

            let languagesArr = [];
            let languages = dataFile[i].languages;
            for (let lang in languages) {
              languagesArr.push(languages[lang]);
            }

            let currency;
            let currencies = dataFile[i].currencies;
            for (let curren in currencies) {
              currency = currencies[curren].name;
            }

            let textInfo2 = [dataFile[i].tld, currency, languagesArr];

            let classes2 = ["topLevelDomain", "currencies", "languages"];

            for (let i = 0; i < text2.length; i++) {
              let li = document.createElement("li");
              secondUl.appendChild(li);
              let p = document.createElement("p");
              p.textContent = `${text2[i]}: `;
              li.appendChild(p);
              let span = document.createElement("span");
              span.className = classes2[i];
              span.textContent = textInfo2[i];
              li.appendChild(span);
            }

            // check if borders exits
            if ("borders" in dataFile[i] === true) {
              // create border country
              let borderCon = document.createElement("div");
              borderCon.className = "border-country";
              info.appendChild(borderCon);

              let border = document.createElement("p");
              border.textContent = "Border countries:";
              borderCon.appendChild(border);

              let btnsBox = document.createElement("div");
              btnsBox.className = "btns";
              borderCon.appendChild(btnsBox);

              for (let b = 0; b < dataFile[i].borders.length; b++) {
                // console.log(dataFile[i].borders[b]);
                let btn = document.createElement("button");
                btn.id = "border";
                btnsBox.appendChild(btn);
                for (let a = 0; a < arr.length; a++) {
                  if (dataFile[i].borders[b] === arr[a].cca3) {
                    btn.textContent = arr[a].name.common;
                  }
                }
              }
            }
          }
        }

        // theme
      };
    });

    //
    document.addEventListener("click", (e) => {
      if (e.target.id === "border") {
        // console.log(e.target.textContent);
        document.querySelector(".detaile-section .name").textContent =
          e.target.textContent;

        for (let i = 0; i < dataFile.length; i++) {
          if (e.target.textContent === dataFile[i].name.common) {
            document.querySelector(
              ".detaile-section .image"
            ).style.cssText = `background-image: url(${dataFile[i].flags.png})`;

            let nativeName = dataFile[i].name.nativeName;
            let theNative;
            for (let value in nativeName) {
              theNative = nativeName[value].common;
            }
            document.querySelector(".nativeName").textContent = theNative;

            document.querySelector(".population").textContent =
              dataFile[i].population;

            document.querySelector(".region").textContent = dataFile[i].region;

            let subregion;
            if ("subregion" in dataFile[i]) {
              subregion = dataFile[i].subregion;
            } else {
              subregion = "Don't have subregion";
            }
            document.querySelector(".subregion").textContent = subregion;

            document.querySelector(".capital").textContent =
              dataFile[i].capital;

            document.querySelector(".topLevelDomain").textContent =
              dataFile[i].tld;

            let languagesArr = [];
            let languages = dataFile[i].languages;
            for (let lang in languages) {
              languagesArr.push(languages[lang]);
            }
            document.querySelector(".languages").textContent = languagesArr;

            let currency;
            let currencies = dataFile[i].currencies;
            for (let curren in currencies) {
              currency = currencies[curren].name;
            }
            document.querySelector(".currencies").textContent = currency;

            // console.log(dataFile[i].borders);

            document.querySelector(".btns").remove();

            let btnsBox = document.createElement("div");
            btnsBox.className = "btns";

            document.querySelector(".border-country").appendChild(btnsBox);

            for (let b = 0; b < dataFile[i].borders.length; b++) {
              // console.log(dataFile[i].borders[b]);

              let btn = document.createElement("button");
              btn.id = "border";
              btnsBox.appendChild(btn);
              for (let a = 0; a < arr.length; a++) {
                if (dataFile[i].borders[b] === arr[a].cca3) {
                  btn.textContent = arr[a].name.common;
                }
              }
            }
          }
        }
      }

      // if (document.querySelector("#theme ").classList.contains("active")) {
      //   document.querySelectorAll("#border").forEach((btn) => {
      //     btn.classList.add("active");
      //   });
      // } else {
      //   document.querySelectorAll("#border").forEach((btn) => {
      //     btn.classList.remove("active");
      //   });
      // }

      // filter countries by region
      if (e.target.dataset.region === "Africa") {
        filterRegion("Africa");
      }
      if (e.target.dataset.region === "Americas") {
        filterRegion("Americas");
      }
      if (e.target.dataset.region === "Asia") {
        filterRegion("Asia");
      }
      if (e.target.dataset.region === "Europe") {
        filterRegion("Europe");
      }
      if (e.target.dataset.region === "Oceania") {
        filterRegion("Oceania");
      }
    });

    // function to filter countries by region
    function filterRegion(name) {
      document.querySelectorAll(".country-box").forEach((box) => {
        box.classList.add("disabled");
      });
      document.querySelectorAll(".the-region").forEach((region) => {
        if (region.textContent === name) {
          region.parentElement.parentElement.parentElement.parentElement.classList.remove(
            "disabled"
          );
        }
      });
    }

    // back button
    document.querySelector(".back-btn").onclick = function () {
      // display the serach section
      document.querySelector(".serach-section").classList.remove("disabled");

      document.querySelector(".countries").classList.remove("active");

      // hide the button
      this.classList.remove("active");

      document.querySelectorAll(".country-box").forEach((box) => {
        box.classList.remove("disabled");
      });

      document.querySelector(".detaile-section").remove();
    };

    //
  } catch {
    console.log("data not found");
  }
}

fetchData();
