const status = document.getElementById('status');
const coords = document.getElementById('coords');

document.getElementById('btn-geo').addEventListener('click', () => {
    if (!navigator.geolocation) {
        status.textContent = 'Geolocalización no soportada';
        return;
    }

    status.textContent = 'Obteniendo ubicación...';

    navigator.geolocation.getCurrentPosition(
        position => {
            const { latitude, longitude } = position.coords;
            status.textContent = 'Ubicación obtenida ✔️';
            coords.textContent = `Lat: ${latitude}, Lng: ${longitude}`;
        },
        error => {
            status.textContent = 'Error al obtener ubicación';
        }
    );
});