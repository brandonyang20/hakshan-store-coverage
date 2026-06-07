/* Hakshan store coverage map.
 * Renders every store as a marker with a 9 km coverage circle, on a map
 * framed over Malaysia. Markers are draggable so positions can be corrected. */

(function () {
  "use strict";

  const stores = window.STORES || [];
  const radius = window.COVERAGE_RADIUS_M || 9000;

  // Approximate bounding box of Malaysia (Peninsular + Borneo) so the initial
  // view always covers the whole country.
  const MALAYSIA_BOUNDS = L.latLngBounds(
    L.latLng(0.85, 99.6), // south-west
    L.latLng(7.5, 119.3)  // north-east
  );

  const map = L.map("map", {
    center: [4.2, 109.0],
    zoom: 6,
    worldCopyJump: true,
  });

  map.fitBounds(MALAYSIA_BOUNDS);

  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  const markersLayer = L.layerGroup().addTo(map);
  const circlesLayer = L.layerGroup().addTo(map);
  const storeMarkers = [];

  function popupHtml(store) {
    return (
      '<div class="popup">' +
      '<strong>' + escapeHtml(store.name) + "</strong>" +
      '<div class="popup-addr">' + escapeHtml(store.address || "") + "</div>" +
      '<div class="popup-coords">' +
      store.lat.toFixed(5) + ", " + store.lng.toFixed(5) +
      "</div>" +
      '<div class="popup-radius">Coverage: ' + (radius / 1000) + " km radius</div>" +
      "</div>"
    );
  }

  function addStore(store) {
    const circle = L.circle([store.lat, store.lng], {
      radius: radius,
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

  // --- Controls --------------------------------------------------------------

  let radiusVisible = true;
  const RadiusToggle = L.Control.extend({
    options: { position: "topright" },
    onAdd: function () {
      const div = L.DomUtil.create("div", "leaflet-bar map-control");
      div.innerHTML =
        '<button id="toggle-radius" type="button">Hide 9&nbsp;km radius</button>' +
        '<button id="fit-stores" type="button">Zoom to stores</button>' +
        '<button id="fit-malaysia" type="button">Whole Malaysia</button>';
      L.DomEvent.disableClickPropagation(div);

      div.querySelector("#toggle-radius").addEventListener("click", function (e) {
        radiusVisible = !radiusVisible;
        if (radiusVisible) {
          circlesLayer.addTo(map);
          e.target.innerHTML = "Hide 9&nbsp;km radius";
        } else {
          map.removeLayer(circlesLayer);
          e.target.innerHTML = "Show 9&nbsp;km radius";
        }
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
  map.addControl(new RadiusToggle());

  // Store count badge.
  const Info = L.Control.extend({
    options: { position: "bottomleft" },
    onAdd: function () {
      const div = L.DomUtil.create("div", "map-info");
      div.innerHTML =
        "<strong>Hakshan store coverage</strong><br>" +
        stores.length + " stores &middot; 9 km radius each";
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
