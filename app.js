document.addEventListener('DOMContentLoaded', () => {

    // Registrar Service Worker
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Service Worker registrado'))
            .catch(err => console.error('Error SW', err));
    }

    const btn = document.getElementById('btn-geo');
    const coordsText = document.getElementById('coords');
    const map = document.getElementById('map');

    btn.addEventListener('click', () => {
        if (!navigator.geolocation) {
            coordsText.textContent = 'Geolocalización no soportada';
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (pos) => {
                const lat = pos.coords.latitude;
                const lng = pos.coords.longitude;

                coordsText.textContent = `Latitud: ${lat}, Longitud: ${lng}`;
                map.src = `https://www.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
            },
            () => {
                coordsText.textContent = 'Permiso denegado';
            }
        );
    });
});