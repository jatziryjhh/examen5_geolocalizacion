// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js')
        .then(() => console.log('Service Worker registrado'))
        .catch(err => console.error('Error al registrar SW', err));
}

// Geolocalización + mapa
document.getElementById('btn-geo').addEventListener('click', () => {
    if (!navigator.geolocation) {
        alert('Geolocalización no soportada');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;

            document.getElementById('coords').textContent =
                `Latitud: ${lat}, Longitud: ${lng}`;

            document.getElementById('map').src =
                `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
        },
        () => alert('Permiso denegado')
    );
});