// Hakshan (客善) store locations across Malaysia.
// ---------------------------------------------------------------------------
// SOURCE: the `public.outlets` table of the Hakshan Web App (Supabase), rows
// with is_active = true. Names, brand codes, addresses and coordinates are
// copied as-is. The inactive "Hakshan (DEMO)" / HDEMO test row is left out.
// Brand codes starting with CLOUD are cloud kitchens.
//
// HOW TO EDIT:
//   - Add / remove entries in the `STORES` array below.
//   - Each store needs: name, brand, address, lat, lng.
//   - `lat`/`lng` are decimal degrees (WGS84). You can read exact values off
//     Google Maps (right-click a spot -> the first two numbers).
// ---------------------------------------------------------------------------

const STORES = [
  {
    name: "HakShan Bandar Puteri Puchong",
    brand: "BPP",
    address: "53G, Jalan Puteri 1/4, Bandar Puteri, 47100 Puchong, Selangor",
    lat: 3.0276610,
    lng: 101.6167490,
  },
  {
    name: "HakShan Bukit Tinggi",
    brand: "BKTTINGGI",
    address: "21-G, Jalan Batu Nilam 3F/KS06, Bandar Bukit Tinggi 1, 41200 Klang, Selangor",
    lat: 3.0101246,
    lng: 101.4361055,
  },
  {
    name: "HakShan Cheras Trader Square",
    brand: "CTS",
    address: "153A-G, Jln Dataran Cheras 9, Cheras Trader Square, 43200 Selangor",
    lat: 3.0343960,
    lng: 101.7639260,
  },
  {
    name: "HakShan Ipoh",
    brand: "IPOHG",
    address: "15 & 16 G/F, Ipoh Garden, Jalan Sultan Azlan Shah, Taman Ipoh, 31400 Ipoh, Perak",
    lat: 4.6071292,
    lng: 101.1186191,
  },
  {
    name: "HakShan Kepong Rimbunan",
    brand: "HKR",
    address: "57-1, Ground Floor, Jalan Rimbunan Raya 1, Laman Rimbunan, Kepong, 52100 Kuala Lumpur",
    lat: 3.2109599,
    lng: 101.6500727,
  },
  {
    name: "HakShan Kota Damansara",
    brand: "KD",
    address: "3-1, Jalan PJU 5/13, Dataran Sunway, Kota Damansara, 47810 Petaling Jaya, Selangor",
    lat: 3.1525320,
    lng: 101.5924090,
  },
  {
    name: "HakShan Kota Kemuning",
    brand: "HSKK",
    address: "21, Jln Anggerik Vanilla BF 31/BF, Kota Kemuning, 40460 Shah Alam, Selangor",
    lat: 3.0041073,
    lng: 101.5348148,
  },
  {
    name: "HakShan Menjalara Kepong",
    brand: "MJL",
    address: "Ground Floor, 25, Jln 5/62a, Bandar Menjalara, 52200 Kuala Lumpur",
    lat: 3.1940740,
    lng: 101.6315510,
  },
  {
    name: "HakShan Plaza Damansara",
    brand: "CLOUDPD",
    address: "No. 61-1, Jalan Medan Setia 1, Plaza Damansara, Damansara Heights, 50490 Kuala Lumpur",
    lat: 3.1502964,
    lng: 101.6535105,
  },
  {
    name: "HakShan Pudu Plaza",
    brand: "CLOUDPP",
    address: "L-E6 & L-E7, LG Floor, Pudu Plaza Shopping Centre, 51, Jln Landak Off Jln Pudu, 55100 Kuala Lumpur",
    lat: 3.1376680,
    lng: 101.7137140,
  },
  {
    name: "HakShan Setapak",
    brand: "STP",
    address: "G12A & G16, Jalan Danau Niaga 1, Taman Danau Kota, 53300 Kuala Lumpur",
    lat: 3.2031056,
    lng: 101.7169180,
  },
  {
    name: "HakShan Solaris Mont Kiara",
    brand: "SMK",
    address: "16, Jalan Solaris 5, Solaris Mont Kiara, 50480 Kuala Lumpur",
    lat: 3.1761424,
    lng: 101.6594647,
  },
  {
    name: "HakShan Sri Petaling",
    brand: "SRP",
    address: "12, Jalan Radin Anum 1, Bandar Baru Sri Petaling, 57000 Kuala Lumpur",
    lat: 3.0680430,
    lng: 101.6947330,
  },
  {
    name: "HakShan SS2",
    brand: "SS2",
    address: "11A, Ground Floor, Jalan SS2/75, SS 2, 47300 Petaling Jaya, Selangor",
    lat: 3.1196040,
    lng: 101.6230770,
  },
  {
    name: "HakShan Sunway Mentari",
    brand: "CLOUDSM",
    address: "2A-3, Jalan PJS 8/4, Sunway Mentari, 46150 Petaling Jaya, Selangor",
    lat: 3.0758230,
    lng: 101.6114612,
  },
  {
    name: "HakShan Taman Danau Desa",
    brand: "TDD",
    address: "31, Jalan 1/109f, Taman Danau Desa, 58100 Kuala Lumpur",
    lat: 3.0983995,
    lng: 101.6865513,
  },
  {
    name: "HakShan Taman Segar Cheras",
    brand: "TSC",
    address: "No 29-GF, Jalan Manis 6, Taman Segar, 56100 Kuala Lumpur",
    lat: 3.0893488,
    lng: 101.7418426,
  },
  {
    name: "HakShan USJ Taipan",
    brand: "USJ",
    address: "33, Jalan USJ 10/1g, Taipan Business Centre, 47620 Subang Jaya, Selangor",
    lat: 3.0472380,
    lng: 101.5849920,
  },
];

// Coverage radius drawn around every store, in metres. Adjustable in the UI
// between RADIUS_MIN_M and RADIUS_MAX_M; this is the value shown on load.
const COVERAGE_RADIUS_M = 5000; // 5 km
const RADIUS_MIN_M = 3000; // 3 km
const RADIUS_MAX_M = 20000; // 20 km

// Make available whether loaded as a module or a plain <script>.
if (typeof window !== "undefined") {
  window.STORES = STORES;
  window.COVERAGE_RADIUS_M = COVERAGE_RADIUS_M;
  window.RADIUS_MIN_M = RADIUS_MIN_M;
  window.RADIUS_MAX_M = RADIUS_MAX_M;
}
