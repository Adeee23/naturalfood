// Inicializamos el mapa en la ubicación central de la empresa
let map = L.map("mapa").setView([40.32319, -3.63424], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

// Agregamos un marcador en la ubicación de la empresa
let markerEmpresa = L.marker([40.32319, -3.63424]).addTo(map).bindPopup('Nuestra ubicación').openPopup();

// Función para geocodificar la dirección del cliente y calcular la ruta
function calcularRuta() {
    let direccionCliente = document.getElementById("direccionCliente").value;

    if (!direccionCliente) {
        alert("Por favor, introduce una dirección.");
        return;
    }

    // URL de la API de geocodificación de Nominatim para convertir la dirección en coordenadas
    let geocodeUrl = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(direccionCliente)}`;

    // Hacemos una solicitud para obtener las coordenadas de la dirección
    fetch(geocodeUrl)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                let latCliente = data[0].lat;
                let lonCliente = data[0].lon;

                // Marcador para la ubicación del cliente
                let markerCliente = L.marker([latCliente, lonCliente]).addTo(map).bindPopup('Tu ubicación').openPopup();

                // Configuramos Leaflet Routing Machine para calcular la ruta entre el cliente y la empresa
                L.Routing.control({
                    waypoints: [
                        L.latLng(latCliente, lonCliente),  // Coordenadas del cliente
                        L.latLng(40.32319, -3.63424)       // Coordenadas de la empresa
                    ],
                    routeWhileDragging: true
                }).addTo(map);

            } else {
                alert("No se pudo encontrar la ubicación. Intenta con otra dirección.");
            }
        })
        .catch(error => {
            console.error('Error al geocodificar la dirección:', error);
            alert("Hubo un error al procesar la dirección.");
        });
}
