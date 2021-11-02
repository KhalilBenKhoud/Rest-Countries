//load all countries

async function loadCountries()
{
  var API = "https://restcountries.com/v3.1/all"
  var container = document.getElementsByClassName("countries")[0]
  var response = await fetch(API)
  var data = await response.json()
  displayCountries(data)
  moreInfo(data)
}


loadCountries() 

function displayCountries(countries)
{    var container = document.getElementsByClassName("countries")[0]
      container.innerHTML = ""
     countries.forEach( e => {
      var country = document.createElement("div")
      country.classList.add("item")
      country.innerHTML = `
      <img src=${e.flags.png}>
      <h1>${e.name.common}</h1>  
      <p><span>Population : </span>${e.population} </p>
      <p><span>Region :  </span>${e.region} </p>
      <p><span>Capital :  </span>${e.capital} </p>
    
      `
      container.append(country)
     
    });
}



// search bar


async function search()
{   var searchBar = document.getElementById("search")
    var API = "https://restcountries.com/v3.1/all"
    var response = await fetch(API)
    var data = await response.json()

    searchBar.addEventListener("keyup", (e) => {
        var searchString = e.target.value.toLowerCase()
         searchString = searchString.charAt(0).toUpperCase() + searchString.slice(1)
        var filtered = data.filter( (ch) => {
            return ch.name.common.includes(searchString)
        })
        displayCountries(filtered)
        moreInfo(filtered)
    }) 
}





//filter by continent



async function filter()
{   var list = document.getElementsByTagName("select")[0]
    var API = "https://restcountries.com/v3.1/all"
    var response = await fetch(API)
    var data = await response.json()
    
    list.addEventListener("change", (e) => {
       var continent = e.target.value
       var filtered = data.filter((ch) => {
          if(continent == "All") { return data}
          return ch.region == continent
       })
       displayCountries(filtered)
       moreInfo(filtered)
    })

}

search()
filter()



// open info

function moreInfo()
{
    var items = document.getElementsByClassName("item")
    
    for(let i=0; i < items.length ; i++)
   { items[i].addEventListener("click", async(event) => {
     event.preventDefault()
     var response = await fetch("https://restcountries.com/v3.1/name/"+event.target.getElementsByTagName("h1")[0].innerText)
     var data = await response.json()
      displayInfo(data)
      })
    }


}

function displayInfo(data)
{    console.log(data)
    var container = document.getElementsByClassName("container")[0]
     container.innerHTML = `
     <button id="btn">Back &#8592;</button>
     <article>
     <img src=${data[0].flag}>
     <section>
     <h1>${data[0].name}</h1>  
     <p><span>Native name : </span>${data[0].nativeName} </p>
      <p><span>Population : </span>${data[0].population} </p>
      <p><span>Region :  </span>${data[0].region} </p>
      <p><span>Subegion :  </span>${data[0].subregion} </p>
      <p><span>Capital :  </span>${data[0].capital} </p>
      <p><span>Top level domain :  </span>${data[0].topLevelDomain} </p>
      <p><span>Currencies :  </span>${data[0].currencies[0].code} </p>
      <p><span>Languages :  </span>${languages(data[0].languages)} </p>
      <p><span>Border Countries :  </span>${bordered(data[0].borders)} </p>
       </section>
       </article>
       `
      document.getElementById("btn").addEventListener("click", () => {
          container.innerHTML = `
          <div class="search">
          <input type="text" id="search" placeholder="search for a country...">
          <select>
              <option value="" disabled selected>Filter by region </option>
              <option value="All">All</option>
              <option value="Africa">Africa</option>
              <option value="Americas">Americas</option>
              <option value="Asia">Asia</option>
               <option value="Europe">Europe</option>
               <option value="Oceania">Oceania</option>
               <option value="Polar">Polar</option>
          </select>
      </div>
      <div class="countries">

      </div>
          `
          loadCountries()
          search()
          filter()
      })
     
}



function languages(tab)
{      var string = ""
      for(let i=0; i< tab.length ; i++)
      {
          string += tab[i].name + " "
      }
      return string
}

function bordered(tab)
{      var string = ""
      for(let i=0; i< tab.length ; i++)
      {
          string += tab[i] + " "
      }
      return string
}
