function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 31.5394502, lng: -82.4687613 }
    });
    var geocoder = new google.maps.Geocoder();

    document.getElementById('locator').addEventListener('submit', function(e) {
        e.preventDefault();
        geocodeAddress(geocoder, map,
            function () {
                $.post('/dealer-locator', serializeLocation()).done(function(dealers) {
                    for (var i = 0; i < dealers.length; i++) {
                        var dealer = dealers[i];
                        addMarker(map, dealer, i + 1);
                        addResultList(dealer, i + 1);
                    }
                });
            }
        );
    });
}

function geocodeAddress(geocoder, resultsMap, next) {
    var address = document.getElementById('address').value;

    geocoder.geocode({ 'address': address }, function(results, status) {
        if (status === 'OK') {
            resultsMap.setCenter(results[0].geometry.location);
            // set form coordinates
            $('#lat').val(results[0].geometry.location.lat());
            $('#lng').val(results[0].geometry.location.lng());
            next();
        } else {
            console.log('Geocode was not successful for the following reason: ' + status);
        }
    });
}

function serializeLocation() {
    return {
        action: $('#action').val(),
        address: $('#address').val(),
        lat: $('#lat').val(),
        lng: $('#lng').val()
    }
}

function addMarker(map, dealer, label) {
    var info = new google.maps.InfoWindow({
        content: getInfoContent(dealer)
    });

    var marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(dealer.address.geo[1], dealer.address.geo[0]),
        label: label.toString()
    });

    marker.addListener('click', function () {
        info.open(map, marker);
    });
}

function addResultList(dealer, label) {
    $('#results').append(getResultContent(dealer, label));
}

function getInfoContent(dealer) {
    return `<div>
        <a target="blank" href="${getGMapLink(dealer)}"><h5>${dealer.storeName}</h5></a>
        <span>${dealer.address.street1}</span><br/>
        <span>${dealer.address.suburb}, ${dealer.address.state} ${dealer.address.postcode}</span><br/>
        <span>${dealer.phone}</span>
     </div>`;
}

function getResultContent(dealer, label) {
    return `<div style="font-size: 12px;">
        <a target="blank" href="${getGMapLink(dealer)}"><h5 style="margin-bottom: 5px;">${label}. ${dealer.storeName}</h5></a>
        <span>${dealer.address.street1}</span><br/>
        <span>${dealer.address.suburb}, ${dealer.address.state} ${dealer.address.postcode}</span><br/>
        <span>${dealer.phone}</span>
     </div>`;
}

function getGMapLink(dealer) {
    return "https://www.google.com/maps/dir/?api=1" + 
           "&origin=" + encodeURIComponent($('#address').val()) +
           "&destination=" + encodeURIComponent(dealer.address.street1 + " " + 
                                                dealer.address.suburb + " " + 
                                                dealer.address.state);
}