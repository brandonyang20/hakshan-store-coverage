/* Hakshan store coverage map.
 * Renders every store as a marker with an adjustable coverage circle. Opens
 * framed on the Klang Valley (KL / Selangor) where most outlets are. Markers
 * are draggable so positions can be corrected. */

(function () {
  "use strict";

  const stores = window.STORES || [];
  let currentRadius = window.COVERAGE_RADIUS_M || 10000;
  const radiusMin = window.RADIUS_MIN_M || 5000;
  const radiusMax = window.RADIUS_MAX_M || 20000;

  // Approximate bounding box of Malaysia (Peninsular + Borneo).
  const MALAYSIA_BOUNDS = L.latLngBounds(
    L.latLng(0.85, 99.6), // south-west
    L.latLng(7.5, 119.3)  // north-east
  );

  // Default view: the Klang Valley (Kuala Lumpur + Selangor).
  const KLANG_VALLEY_BOUNDS = L.latLngBounds(
    L.latLng(2.95, 101.35), // south-west
    L.latLng(3.26, 101.82)  // north-east
  );

  const map = L.map("map", {
    center: [3.1, 101.6],
    zoom: 11,
    worldCopyJump: true,
  });

  map.fitBounds(KLANG_VALLEY_BOUNDS);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  // Location search box (top-left). Geocodes via OpenStreetMap / Nominatim,
  // biased to Malaysia, and drops a marker on the chosen place.
  if (L.Control && L.Control.Geocoder) {
    L.Control.geocoder({
      position: "topleft",
      placeholder: "Search a location…",
      defaultMarkGeocode: true,
      geocoder: L.Control.Geocoder.nominatim({
        geocodingQueryParams: { countrycodes: "my" },
      }),
    }).addTo(map);
  }

  const markersLayer = L.layerGroup().addTo(map);
  const circlesLayer = L.layerGroup().addTo(map);
  const storeMarkers = [];

  function km(metres) {
    // Trim trailing ".0" so "10 km" reads cleanly but "7.5 km" still shows.
    return (metres / 1000).toFixed(1).replace(/\.0$/, "");
  }

  function popupHtml(store) {
    const brand = store.brand
      ? ' <span class="popup-brand">' + escapeHtml(store.brand) + "</span>"
      : "";
    return (
      '<div class="popup">' +
      "<strong>" + escapeHtml(store.name) + "</strong>" + brand +
      '<div class="popup-addr">' + escapeHtml(store.address || "") + "</div>" +
      '<div class="popup-coords">' +
      store.lat.toFixed(5) + ", " + store.lng.toFixed(5) +
      "</div>" +
      "</div>"
    );
  }

  function addStore(store) {
    const circle = L.circle([store.lat, store.lng], {
      radius: currentRadius,
      color: "#c0392b",
      weight: 1.5,
      fillColor: "#e74c3c",
      fillOpacity: 0.18,
    }).addTo(circlesLayer);

    const marker = L.marker([store.lat, store.lng], {
      draggable: true,
      title: store.name,
    }).addTo(markersLayer);

    marker.bindPopup(popupHtml(store));
    marker.bindTooltip(store.name, { direction: "top", offset: [0, -10] });

    marker.on("drag", function (e) {
      circle.setLatLng(e.latlng);
    });

    marker.on("dragend", function (e) {
      const ll = e.target.getLatLng();
      store.lat = ll.lat;
      store.lng = ll.lng;
      marker.setPopupContent(popupHtml(store));
      marker.openPopup();
      console.log(
        store.name + " -> lat: " + ll.lat.toFixed(5) + ", lng: " + ll.lng.toFixed(5)
      );
    });

    storeMarkers.push({ store: store, marker: marker, circle: circle });
  }

  stores.forEach(addStore);

  function setRadius(metres) {
    currentRadius = metres;
    storeMarkers.forEach(function (s) {
      s.circle.setRadius(metres);
    });
  }

  // --- Controls --------------------------------------------------------------

  let radiusVisible = true;
  const Controls = L.Control.extend({
    options: { position: "topright" },
    onAdd: function () {
      const div = L.DomUtil.create("div", "leaflet-bar map-control");
      div.innerHTML =
        '<div class="radius-slider">' +
        '<label for="radius-range">Coverage radius: ' +
        '<strong id="radius-value">' + km(currentRadius) + " km</strong></label>" +
        '<input id="radius-range" type="range" min="' + radiusMin +
        '" max="' + radiusMax + '" step="500" value="' + currentRadius + '">' +
        '<div class="radius-ends"><span>' + km(radiusMin) + " km</span><span>" +
        km(radiusMax) + " km</span></div>" +
        "</div>" +
        '<button id="toggle-radius" type="button">Hide radius</button>' +
        '<button id="fit-klang" type="button">KL / Selangor</button>' +
        '<button id="fit-stores" type="button">All stores</button>' +
        '<button id="fit-malaysia" type="button">Whole Malaysia</button>';
      L.DomEvent.disableClickPropagation(div);
      L.DomEvent.disableScrollPropagation(div);

      const range = div.querySelector("#radius-range");
      const value = div.querySelector("#radius-value");
      range.addEventListener("input", function () {
        const metres = Number(range.value);
        value.textContent = km(metres) + " km";
        setRadius(metres);
      });

      div.querySelector("#toggle-radius").addEventListener("click", function (e) {
        radiusVisible = !radiusVisible;
        if (radiusVisible) {
          circlesLayer.addTo(map);
          e.target.textContent = "Hide radius";
        } else {
          map.removeLayer(circlesLayer);
          e.target.textContent = "Show radius";
        }
      });

      div.querySelector("#fit-klang").addEventListener("click", function () {
        map.fitBounds(KLANG_VALLEY_BOUNDS);
      });

      div.querySelector("#fit-stores").addEventListener("click", function () {
        if (storeMarkers.length) {
          const group = L.featureGroup(storeMarkers.map((s) => s.circle));
          map.fitBounds(group.getBounds().pad(0.1));
        }
      });

      div.querySelector("#fit-malaysia").addEventListener("click", function () {
        map.fitBounds(MALAYSIA_BOUNDS);
      });

      return div;
    },
  });
  map.addControl(new Controls());

  // Store count badge.
  const Info = L.Control.extend({
    options: { position: "bottomleft" },
    onAdd: function () {
      const div = L.DomUtil.create("div", "map-info");
      div.innerHTML =
        "<strong>Hakshan store coverage</strong><br>" +
        stores.length + " stores";
      return div;
    },
  });
  map.addControl(new Info());

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
})();
