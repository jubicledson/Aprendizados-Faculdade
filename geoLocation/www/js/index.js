/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}

var onSuccess = function(position) {

    var latitude = position.coords.latitude;      
    var longitude = position.coords.longitude;    

    var endereco = 'https://api.open-meteo.com/v1/forecast?latitude='+latitude+'&longitude='+longitude+'&current=temperature_2m,relative_humidity_2m';

        var xhttp = new XMLHttpRequest();

        xhttp.onload = function() {
            var objRecebido = JSON.parse(this.responseText);
            var temperatura = objRecebido.current.temperature_2m;
            var umidadeRelativa = objRecebido.current.relative_humidity_2m;
            
            var tempe = document.getElementById("temperatura");
            tempe.innerText = "Temperatura: " + temperatura + " °C";
            
            var umidade = document.getElementById("umidade");
            umidade.innerText = "Umidade: " + umidadeRelativa + " %";

        }
        
        xhttp.open('GET', endereco, true);
        xhttp.send();
        
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}