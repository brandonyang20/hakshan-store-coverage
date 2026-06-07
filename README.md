# Hakshan Store Coverage Map

An interactive map of every **Hakshan (客善)** outlet in Malaysia, each with an
adjustable **coverage radius** drawn around it. The map opens framed on the
Klang Valley (Kuala Lumpur / Selangor), where most outlets are.

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
- A semi-transparent coverage circle around each store.
- A **radius slider** (top-right) adjustable from **5 km to 20 km** (default
  **10 km**) that resizes every circle live.
- Controls to hide the radius, or zoom to KL/Selangor, all stores, or the whole
  country.

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

The default radius and slider range are set in the same file via
`COVERAGE_RADIUS_M` (10000 m), `RADIUS_MIN_M` (5000 m) and `RADIUS_MAX_M`
(20000 m).

### Fixing a pin's position

Every marker is **draggable**. Drag a pin to the exact spot — its popup and the
browser console will show the updated `lat, lng`, which you can paste back into
`stores.js` to make it permanent. You can also grab coordinates from Google Maps
(right-click a location → click the lat/lng pair to copy).

## Stores currently included

10 outlets, with coordinates taken from the outlet database:

| Store | Brand | Lat, Lng |
| --- | --- | --- |
| HakShan Bandar Puteri Puchong | BPP | 3.027661, 101.616749 |
| HakShan Menjalara Kepong | MJL | 3.194074, 101.631551 |
| HakShan Kota Damansara | KD | 3.152532, 101.592409 |
| HakShan SS2 | SS2 | 3.119604, 101.623077 |
| HakShan Pudu Plaza | CLOUDPP | 3.137668, 101.713714 |
| HakShan Sri Petaling | SRP | 3.068043, 101.694733 |
| HakShan Cheras Trader Square | CTS | 3.034396, 101.763926 |
| HakShan Ipoh | IPOHG | 4.6071292, 101.1186191 |
| HakShan Bukit Tinggi | BKTTINGGI | 3.0101246, 101.4361055 |
| HakShan USJ Taipan | USJ | 3.047238, 101.584992 |

> The `Hakshan (DEMO)` / `HDEMO` database record is intentionally excluded — it
> duplicates the Cheras Trader Square address with a bad latitude (2.034). Add it
> to `stores.js` if you want it on the map.
