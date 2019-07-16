module.exports = { 
//export function 
leerExcel(ARCHIVO, HOJA, callback) {
  const readXlsxFile = require('leerExcel');
  //TODO Leer JSON COMU
  const fs = require('fs');
  const centros = fs.readFileSync('COMU.json');
  const comunas = JSON.parse(centros);
  // readXlsxFile(ARCHIVO, { sheet: HOJA })
  //.then((data) => {
  //const COMU = 
  readXlsxFile(ARCHIVO, { sheet: HOJA })
    .then((data) => {
      console.log(data);
      let datos_extraidos = data.slice(1,7).map((item) => {
        let COMUNA = item[0].replace(/\*/g, '');
        comunas.centros.map((comu) => {
          if (COMUNA === r.properties.com) {
            // Se asignan invertidos ya que así estén en el GEOJSON de referencia.
            coordenada_x = comu.properties.coord_x;
            coordenada_y = comu.properties.coord_y;
            //let coordenada_x = -70.01
            //let coordenada_y = -20.18
            //TODO: asignar coordenadas
            //coord_x = COMU.properties.COORD_X
            //coord_y = COMU.properties.COORD_Y
          }
        });
        return {
          "type": "Feature",
          "properties": {
            "comuna": COMUNA,
            "mujeres": item[2],
            "hombres": item[1],
          },
          "geometry": {
            "type": "Point",
            "coordinates": [coordenada_x, coordenada_y]
          }
        };
      });
      let json = {
        "type": "FeatureCollection",
        "features": datos_extraidos
      };
      callback(null, json);
    })
    .catch((error) => {
      console.log("Se produjo un error al leer el archivo: " + ARCHIVO, error);
      callback(error);
    });
}

,escribirJSON: function (data){
  const fs = require('fs');

  fs.writeFile('COMU.json', JSON.stringify(data), 'utf8', function(){
    console.log('Archivo json creado correctamente.')
  })
 }
}