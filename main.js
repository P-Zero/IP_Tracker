const submitIp = document.querySelector('.submitip')
submitIp.addEventListener('click', () => {
    const userIpAdress = document.querySelector('.ipinput').value
    tracker(userIpAdress, 2)
    userIpAdress.value = ''
})

async function tracker(inputIpAdress, validator){
    const ipadress = document.querySelector('.ipadress')
    const location = document.querySelector('.location')
    const timezone = document.querySelector('.timezone')
    const isp = document.querySelector('.isp')
    const theMap = document.querySelector('#map')
    const main = document.querySelector('#main')
    let myIcon = L.icon({
        iconUrl: './images/icon-location.svg',
        iconSize:     [36, 46], // size of the icon
        iconAnchor:   [22, 60], // point of the icon which will correspond to marker's location
    })
    
    const res = await fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_vEBfFmhXRuy7R4ZbXzPjroRi06y3Z&ipAddress=${inputIpAdress}`)
    const data = await res.json()

    ipadress.innerHTML = data.ip
    location.innerHTML = data.location.city
    timezone.innerHTML = `UTC ${data.location.timezone}`
    isp.innerHTML = data.isp

    if(validator == 2){
        theMap.remove()
        const newMap = document.createElement('div')
        newMap.setAttribute('id', 'map');
        main.appendChild(newMap)
    }

    let map = L.map('map').setView([data.location.lat, data.location.lng], 12)
    L.marker([data.location.lat, data.location.lng], {icon: myIcon}).addTo(map);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);
}

tracker('', 1)
