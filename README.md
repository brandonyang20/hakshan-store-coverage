# Hakshan Store Coverage Map

An interactive map covering all of Malaysia with every **Hakshan (客善)** outlet
pinned, and a **9 km coverage radius** drawn around each store.

## Open it

Just open `index.html` in any web browser (double-click it, or serve the folder).
No build step is required. An internet connection is needed to load the map
tiles and the Leaflet library.

To serve locally instead of opening the file directly:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

## What you get

- A map framed over the whole of Malaysia (Peninsular + Borneo).
- A pin for every store, with a popup showing its name, address and coordinates.
- A semi-transparent **9 km radius** circle around each store.
- Controls (top-right) to toggle the radius, zoom to the stores, or zoom back
  out to the whole country.

## Editing the store list

All store data lives in **`stores.js`** — edit that one file:

```js
{
  name: "Hakshan @ Somewhere",
  address: "Full street address",
  lat: 3.1234,
  lng: 101.5678,
}
```

The 9 km radius is set once via `COVERAGE_RADIUS_M` (9000 metres) in the same file.

### Fixing a pin's position

Every marker is **draggable**. Drag a pin to the exact spot — its popup and the
browser console will show the updated `lat, lng`, which you can paste back into
`stores.js` to make it permanent. You can also grab coordinates from Google Maps
(right-click a location → click the lat/lng pair to copy).

## Stores currently included

| Store | Address |
| --- | --- |
| Hakshan @ USJ Taipan | No. 31 & 33, Jalan USJ 10/1A, USJ Taipan, 47620 Subang Jaya, Selangor |
| Hakshan @ Bandar Puteri Puchong | No. 39, 41 & 43, Jalan Puteri 2/1, Bandar Puteri, 47100 Puchong, Selangor |
| Hakshan @ IOI Mall Puchong | Lot G-00A3A1, Ground Floor, IOI Mall, Bandar Puchong Jaya, 47100 Puchong, Selangor |
| Hakshan @ Balakong (Cheras) | 11, Jalan Cheras, Balakong, 43000 Kajang, Selangor |
| Hakshan @ Kepong | Kepong, Kuala Lumpur |
| Hakshan @ Ipoh | No. 45, 47 & 49, Medan Soon Choon 1, Jalan Sultan Nazrin Shah, 31350 Ipoh, Perak |

> Coordinates are best-effort, derived from the published street addresses.
> Drag any marker to fine-tune, then copy the corrected coordinates into
> `stores.js`.
