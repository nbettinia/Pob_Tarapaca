// Definir atributos iniciales para el Mapa
const MAP_ZOOM = 8
const CAMINA = [-19.37, -69.50]
const ALTO_HOSPICIO = [-20,18 -70.01]
const HUARA = [-19.66, -69.91]
const IQUIQUE = [-20.92, -70.04]
const POZO_ALMONTE = [-20.77, -69.50]
const COLCHANE = [-19.35, -68.84]
const PICA = [-20.47, -68.91]
const MAP_CENTER = [-20.1, -69.51]


// Crear instancia del Mapa
var map = L.map('myMap').setView(MAP_CENTER, MAP_ZOOM)

// Crear capa de sectores y Copyright del Mapa
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


//Agregar marcador (Marker) con información emergente (PopUp) de ejemplo
L.marker(CAMINA).addTo(map)
.bindPopup('CAMIÑA Hombres: 657 - Mujeres: 593')
L.marker(ALTO_HOSPICIO).addTo(map)
.bindPopup('ALTO HOSPICIO Hombres: 54206 - Mujeres: 54169')
L.marker(HUARA).addTo(map)
.bindPopup('HUARA  Hombres: 1501 - Mujeres: 1229')
L.marker(IQUIQUE).addTo(map)
.bindPopup('IQUIQUE   Hombres: 94897 - Mujeres: 96571')
L.marker(POZO_ALMONTE).addTo(map)
.bindPopup('POZO AL MONTE  Hombres: 8987 - Mujeres: 6724')
L.marker(COLCHANE).addTo(map)
.bindPopup('COLCHANE  Hombres: 995 - Mujeres: 733')
L.marker(PICA).addTo(map)
.bindPopup('PICA   Hombres: 6550 - Mujeres: 2746')

// Se establece una constante como referencia para mostrar "Información Adicional"
const mas_info = document.getElementById("mas_info")


  function MostrarDato(feature, layer) {
    // Se valida si el objeto tiene la propiedad "properties"
    if (feature.properties) {
      let dato_a_mostrar = `<p>
        <h5>Comuna: ${feature.properties.com}</h5><br/>
        <span><b>Mujeres</b>: ${feature.properties.Mujeres}</span><br/>
        <span><b>Hombres</b>: ${feature.properties.Hombres}</span><br/>
      
      </p>`
      layer.bindPopup(dato_a_mostrar);
      layer.on({
        click: (event)=>{
          // Se obtienen los datos desde las propiedades del JSON
          let Comuna = event.target.feature.properties.com
          let Mujeres = event.target.feature.properties.Mujeres
          let Hombres = event.target.feature.properties.Hombres
         
  
          // Se establece el tipo de "badge", de acuerdo a la condición de mortalidad entre un año y otro
          //let tipo_badge_2008 = (mortalidad_2008 > mortalidad_2009) ? 'badge-danger' : 'badge-primary'
          //let tipo_badge_2009 = (mortalidad_2008 < mortalidad_2009) ? 'badge-danger' : 'badge-primary'
  
          // Se genera el HTML para representar la acción de Click sobre un marcador
          let html_mortalidad = `
            <div class="alert alert-primary" role="alert">
              <p>
                Comuna: ${Comuna} hab <br/>
                Mujeres: ${Mujeres} hab <br/>
                Mujeres: ${Hombres} hab <br/>
              
              </p>
            </div>
          `
          // Se "escribe" el HTML en la página
          mas_info.innerHTML = html_mortalidad
        }
      })
    }
  }
  






//function MostrarDato(feature, layer) {
  // does this feature have a property named popupContent?
  //if (feature.properties) {
    //let dato_a_mostrar = `<p>
      //<h5>Comuna: ${feature.properties.COMUNA}</h5><br/>
      //<span><b>Mujeres</b>: ${feature.properties.TOT_M}</span><br/>
      //<span><b>Hombres</b>: ${feature.properties.TOTAL_H}</span><br/>
      //<span><b>Total</b>: ${feature.properties.TOT_COM}</span><br/>
    //</p>`
    //layer.bindPopup(dato_a_mostrar);
  //}
//}



// Se agrega data al Mapa
d3.json('./COMU.json')
  .then((geojson) => {
    L.geoJSON(geojson, {
      onEachFeature: MostrarDato

    }).addTo(map)
  })


  //d3.json('./mapa.json')
  //.then((geojson) => {
    //L.geoJSON(geojson, {
      //onEachFeature: MostrarDato,

      //pointToLayer: function (geoJsonPoint, latlng) {
        //return L.circleMarker(latlng).bindPopup(`Mortalidad 2008: ${geoJsonPoint.mortalidad_2008}`)
      //},
      //style: function (geoJsonPoint) {
        //let color = (geoJsonPoint.mortalidad_2008 > 20) ? 'red' : 'green'
        //((return { fillColor: color}
      //}
    //}).addTo(map)
  //})