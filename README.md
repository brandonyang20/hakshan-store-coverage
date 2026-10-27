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

- A **location search box** (top-left) with type-ahead suggestions to find any
  address or place and jump to it — handy for checking a spot against the
  coverage circles.
- A fixed pin for every store, with a popup showing its name, address and
  coordinates.
- A semi-transparent coverage circle around each store.
- A **radius slider** (top-right) adjustable from **3 km to 20 km** (default
  **5 km**) that resizes every circle live.
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
`COVERAGE_RADIUS_M` (5000 m), `RADIUS_MIN_M` (3000 m) and `RADIUS_MAX_M`
(20000 m).

### Fixing a pin's position

Pins are fixed in place. To move one, edit its `lat`/`lng` in `stores.js`. You
can grab exact coordinates from Google Maps (right-click a location → click the
lat/lng pair to copy).

## About the coverage radius

The circle is a true **geographic radius** — Leaflet draws it in real metres on
the ground, so a 10 km circle really is 10 km from the store in every direction.
Because the outlets sit near the equator the circles are essentially round (no
meaningful projection distortion). Note this is **straight-line ("as the crow
flies") distance**, not road driving distance or drive time.

## Stores currently included

20 open outlets and 1 upcoming one: every active row in the Hakshan Web App's
Supabase `outlets` table, plus HakShan Pandan Indah and the upcoming HakShan
Seri Kembangan, which aren't in the database yet and were added by hand. Brand
codes starting with `CLOUD` are cloud kitchens. Upcoming stores (`upcoming: true`
in `stores.js`) get a dashed amber circle and an "Upcoming" badge.

| Store | Brand | Lat, Lng |
| --- | --- | --- |
| HakShan Bandar Puteri Puchong | BPP | 3.0276610, 101.6167490 |
| HakShan Bukit Tinggi | BKTTINGGI | 3.0101246, 101.4361055 |
| HakShan Cheras Trader Square | CTS | 3.0343960, 101.7639260 |
| HakShan Ipoh | IPOHG | 4.6071292, 101.1186191 |
| HakShan Kepong Rimbunan | HKR | 3.2109599, 101.6500727 |
| HakShan Kota Damansara | KD | 3.1525320, 101.5924090 |
| HakShan Kota Kemuning | HSKK | 3.0041073, 101.5348148 |
| HakShan Menjalara Kepong | MJL | 3.1940740, 101.6315510 |
| HakShan Pandan Indah | PDI | 3.1332921, 101.7522078 |
| HakShan Plaza Damansara | CLOUDPD | 3.1502964, 101.6535105 |
| HakShan Pudu Plaza | CLOUDPP | 3.1376680, 101.7137140 |
| HakShan Seri Kembangan (upcoming) | SKB | 3.0136913, 101.6980710 |
| HakShan Setapak | STP | 3.2031056, 101.7169180 |
| HakShan Setia Alam | STALAM | 3.1001233, 101.4444431 |
| HakShan Solaris Mont Kiara | SMK | 3.1761424, 101.6594647 |
| HakShan Sri Petaling | SRP | 3.0680430, 101.6947330 |
| HakShan SS2 | SS2 | 3.1196040, 101.6230770 |
| HakShan Sunway Mentari | CLOUDSM | 3.0758230, 101.6114612 |
| HakShan Taman Danau Desa | TDD | 3.0983995, 101.6865513 |
| HakShan Taman Segar Cheras | TSC | 3.0893488, 101.7418426 |
| HakShan USJ Taipan | USJ | 3.0472380, 101.5849920 |

> The inactive `Hakshan (DEMO)` / `HDEMO` test row is left out.
