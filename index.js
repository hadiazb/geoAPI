import mapStyle from './map-style.js'
const $map = document.querySelector('#map')
const map = new window.google.maps.Map($map, {
  center: {
    lat: 37.09024,
    lng: -95.712891
  },
  zoom: 4.7,
  styles: mapStyle,
})

function traer() {
  fetch('https://www.trackcorona.live/api/countries')
  .then(res => res.json())
  .then(data => {
    for (let i = 0; i < data.data.length; i++) {
      if (data.data[i].country_code == "us") {
        // console.log(data.data[i]);
        return console.log(data.data[i]);
      }
    }
  })
}
traer();

renderData()
async function getData() {
  const response = await fetch('https://www.trackcorona.live/api/provinces')
  const data = await response.json()
  var dataBase = [
    {
      "confirmed": null,
      "country_code": null,
      "dead": null,
      "latitude": null,
      "location": null,
      "longitude": null,
      "recovered": null,
      "updated": null,

    },
  ]

  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].country_code == "us") {
        var place = { 
          "confirmed":     data.data[i].confirmed,
          "country_code":  data.data[i].country_code,
          "dead":          data.data[i].dead,
          "latitude":      data.data[i].latitude,
          "location":      data.data[i].location,
          "longitude":     data.data[i].longitude,
          "recovered":     data.data[i].recovered,
          "updated":       data.data[i].updated,
        }
        dataBase.push(place);
      }
    }
  // console.log(dataBase)
  return dataBase
}
// getData()

function renderExtraData({ location, country_code, recovered, dead, confirmed }) {
  return (`
    <div>
      <p> <strong>${country_code} - ${location}</strong> </p>
      <p> confirmados: ${confirmed} </p>
      <p> muertes: ${dead} </p>
      <p> recuperados: ${recovered} </p>
    </div>
  `)
}
const icon = 'https://raw.githubusercontent.com/LeonidasEsteban/covid-19-map/master/icon.png'
const popup = new window.google.maps.InfoWindow()

async function renderData() {
  const data = await getData() 
  data.forEach(item => {
    const marker = new window.google.maps.Marker({
      position: {
        lat: item.latitude,
        lng: item.longitude,
      },
      map,
      icon,
      title: String(item.confirmed),
    })
    marker.addListener('click', () => {
      popup.setContent(renderExtraData(item))
      popup.open(map, marker)
    })
  })
}