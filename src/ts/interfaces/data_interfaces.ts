export interface LatLng {
  lat: number;
  lng: number;
}

export interface CarPosition {
  [key: string] : CarData[];
}

export interface CarData {
  battery_level: number;
  color: string;
  cpu_usage: number,
  id: string;
  lat: number;
  lng: number;
  name: string;
  plate_number: string;
  speed: number;
  timestamp: number;
  vehicle_id: number;
}