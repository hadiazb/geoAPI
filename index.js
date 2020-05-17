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
// traer();

  // location
  // country_code
  // latitude
  // longitude
  // recovered
  // dead 
  // confirmed


// renderData()
async function getData() {
  const response = await fetch('https://www.trackcorona.live/api/provinces')
  const data = await response.json()
  // console.log(data.data.length)
  for (let i = 0; i < data.data.length; i++) {
    if (data.data[i].country_code == "us") {
      // console.log(data.data[i]);
      console.log(data.data[i]);
      // return data.data
    }
  }
}
getData()

// function renderExtraData({ location, country_code, recovered, dead, confirmed }) {
//   return (`
//     <div>
//       <p> <strong>${country_code} - ${location}</strong> </p>
//       <p> confirmados: ${confirmed} </p>
//       <p> muertes: ${dead} </p>
//       <p> recuperados: ${recovered} </p>
//     </div>
//   `)
// }
// const icon = './icon.png'
// const popup = new window.google.maps.InfoWindow()

// async function renderData() {
//   const data = await getData() 
//   data.forEach(item => {
//     const marker = new window.google.maps.Marker({
//       position: {
//         lat: item.latitude,
//         lng: item.longitude,
//       },
//       map,
//       // icon,
//       title: String(item.confirmed),
//     })
//     marker.addListener('click', () => {
//       popup.setContent(renderExtraData(item))
//       popup.open(map, marker)
//     })
//   })
// }