// Hakshan (客善) store locations across Malaysia.
// ---------------------------------------------------------------------------
// HOW TO EDIT:
//   - Add / remove entries in the `STORES` array below.
//   - Each store needs: name, address, lat, lng.
//   - `lat`/`lng` are decimal degrees (WGS84). You can read exact values off
//     Google Maps (right-click a spot -> the first two numbers) or by dragging
//     a marker on this map (drag is enabled; the popup shows live coordinates).
//
// NOTE: Coordinates below are best-effort, derived from the published street
// addresses. Drag any marker to fine-tune, then copy the new lat/lng here.
// ---------------------------------------------------------------------------

const STORES = [
  {
    name: "Hakshan @ USJ Taipan",
    address: "No. 31 & 33, Jalan USJ 10/1A, USJ Taipan, 47620 Subang Jaya, Selangor",
    lat: 3.0461,
    lng: 101.5856,
  },
  {
    name: "Hakshan @ Bandar Puteri Puchong",
    address: "No. 39, 41 & 43, Jalan Puteri 2/1, Bandar Puteri, 47100 Puchong, Selangor",
    lat: 3.0235,
    lng: 101.6180,
  },
  {
    name: "Hakshan @ IOI Mall Puchong",
    address: "Lot G-00A3A1, Ground Floor, IOI Mall, Bandar Puchong Jaya, 47100 Puchong, Selangor",
    lat: 3.0476,
    lng: 101.6195,
  },
  {
    name: "Hakshan @ Balakong (Cheras)",
    address: "11, Jalan Cheras, Balakong, 43000 Kajang, Selangor",
    lat: 3.0350,
    lng: 101.7470,
  },
  {
    name: "Hakshan @ Kepong",
    address: "Kepong, Kuala Lumpur",
    lat: 3.2106,
    lng: 101.6366,
  },
  {
    name: "Hakshan @ Ipoh",
    address: "No. 45, 47 & 49, Medan Soon Choon 1, Jalan Sultan Nazrin Shah, 31350 Ipoh, Perak",
    lat: 4.6235,
    lng: 101.1185,
  },
];

// Coverage radius drawn around every store, in metres.
const COVERAGE_RADIUS_M = 9000; // 9 km

// Make available whether loaded as a module or a plain <script>.
if (typeof window !== "undefined") {
  window.STORES = STORES;
  window.COVERAGE_RADIUS_M = COVERAGE_RADIUS_M;
}
