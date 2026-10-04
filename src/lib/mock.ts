// Mock data for the VHS 0.1 shell. Replace with API calls later.
export type Status =
  | "unknown"
  | "good"
  | "monitor"
  | "issue"
  | "service"
  | "new"
  | "serviced"
  | "na";

export const STATUS_LABEL: Record<Status, string> = {
  unknown: "Unknown",
  good: "Good",
  monitor: "Monitor",
  issue: "Issue reported",
  service: "Needs service",
  new: "Replaced / New",
  serviced: "Serviced",
  na: "Not applicable",
};

export type Source = "Owner observed" | "Shop record" | "Receipt" | "Manufacturer" | "Imported";

export interface Vehicle {
  id: string;
  nickname: string;
  year: number;
  make: string;
  model: string;
  trim: string;
  vin: string;
  mileage: number;
  mileageDate: string;
  engine: string;
  plate: string;
}

export interface Component {
  id: string;
  vehicleId: string;
  name: string;
  group: string;
  status: Status;
  source?: Source;
  observed?: string;
  mileage?: number;
  note: string;
  history: { date: string; mileage?: number; status: Status; note: string; source: Source }[];
}

export interface TimelineEvent {
  id: string;
  vehicleId: string;
  date: string;
  mileage?: number;
  kind: "Service" | "Symptom" | "Check" | "Mileage" | "Document" | "Recall";
  title: string;
  detail: string;
  source: Source;
}

export interface MaintItem {
  id: string;
  vehicleId: string;
  name: string;
  due: "overdue" | "due-soon" | "upcoming" | "unknown";
  dueText: string;
  lastDone?: string;
  interval: string;
  why: string;
}

export interface Symptom {
  id: string;
  vehicleId: string;
  title: string;
  started: string;
  mileage: number;
  when: string;
  status: Status;
  notes: string;
}

export interface Doc {
  id: string;
  vehicleId: string;
  title: string;
  type: "Receipt" | "Inspection" | "Registration" | "Insurance" | "Manual";
  date: string;
  size: string;
}

export interface Recall {
  id: string;
  vehicleId: string;
  campaign: string;
  title: string;
  issued: string;
  state: "open" | "completed" | "unknown";
  summary: string;
}

export const vehicles: Vehicle[] = [
  {
    id: "civic",
    nickname: "The Civic",
    year: 2012,
    make: "Honda",
    model: "Civic",
    trim: "LX Sedan",
    vin: "19XFB2F59CE312847",
    mileage: 148320,
    mileageDate: "2026-09-28",
    engine: "1.8L I4",
    plate: "IN 4KZ 812",
  },
  {
    id: "tacoma",
    nickname: "Work Truck",
    year: 2009,
    make: "Toyota",
    model: "Tacoma",
    trim: "Access Cab 4x4",
    vin: "5TEUU42N09Z633015",
    mileage: 211904,
    mileageDate: "2026-08-14",
    engine: "4.0L V6",
    plate: "IN 7TR 330",
  },
  {
    id: "outback",
    nickname: "Family Wagon",
    year: 2016,
    make: "Subaru",
    model: "Outback",
    trim: "2.5i Premium",
    vin: "4S4BSAFC2G3240117",
    mileage: 97410,
    mileageDate: "2026-07-02",
    engine: "2.5L H4",
    plate: "IN 2PL 905",
  },
];

const c = (
  vehicleId: string,
  id: string,
  name: string,
  group: string,
  status: Status,
  note: string,
  extra: Partial<Component> = {},
): Component => ({ id, vehicleId, name, group, status, note, history: [], ...extra });

export const components: Component[] = [
  c("civic", "front-brakes", "Front brake pads", "Brakes", "monitor", "Light squeal on cold mornings. Pads looked about 4 mm at last inspection.", {
    source: "Shop record",
    observed: "2026-06-11",
    mileage: 144900,
    history: [
      { date: "2026-06-11", mileage: 144900, status: "monitor", note: "Pads ~4 mm, rotors OK.", source: "Shop record" },
      { date: "2024-03-02", mileage: 128450, status: "new", note: "Pads replaced, rotors resurfaced.", source: "Receipt" },
    ],
  }),
  c("civic", "rear-brakes", "Rear brakes", "Brakes", "unknown", "No record of inspection since purchase."),
  c("civic", "engine-oil", "Engine oil", "Engine", "serviced", "0W-20 synthetic, filter replaced.", {
    source: "Receipt",
    observed: "2026-07-20",
    mileage: 145980,
    history: [{ date: "2026-07-20", mileage: 145980, status: "serviced", note: "Oil + filter.", source: "Receipt" }],
  }),
  c("civic", "battery", "12V battery", "Electrical", "good", "Tested 12.6 V, 540 CCA.", { source: "Shop record", observed: "2026-06-11", mileage: 144900 }),
  c("civic", "tires", "Tires", "Wheels & tires", "monitor", "Front tread 4/32\". Rears 6/32\".", { source: "Owner observed", observed: "2026-09-12", mileage: 148010 }),
  c("civic", "coolant", "Coolant", "Engine", "unknown", "Never recorded. Honda interval is roughly 10 yrs / 120k mi for the first change."),
  c("civic", "trans-fluid", "Transmission fluid", "Drivetrain", "unknown", "Previous owner history not available."),
  c("civic", "ac", "A/C system", "Comfort", "issue", "Blows warm after ~20 min on hot days.", { source: "Owner observed", observed: "2026-08-03", mileage: 146700 }),
  c("civic", "wipers", "Wiper blades", "Visibility", "new", "Replaced both fronts.", { source: "Owner observed", observed: "2026-09-01", mileage: 147800 }),
  c("civic", "spark-plugs", "Spark plugs", "Engine", "service", "Original-interval plugs likely past 105k mi with no record of replacement.", { source: "Manufacturer", observed: "2026-09-28", mileage: 148320 }),
  c("civic", "awd", "AWD / transfer case", "Drivetrain", "na", "Front-wheel drive vehicle."),

  c("tacoma", "front-brakes", "Front brake pads", "Brakes", "good", "Replaced last spring.", { source: "Receipt", observed: "2026-04-10", mileage: 205300 }),
  c("tacoma", "frame", "Frame / rust", "Body", "monitor", "Surface rust on rear crossmember.", { source: "Shop record", observed: "2026-05-22", mileage: 207100 }),
  c("tacoma", "timing", "Timing chain", "Engine", "unknown", "No records."),
  c("tacoma", "engine-oil", "Engine oil", "Engine", "service", "Overdue by ~1,100 mi.", { source: "Owner observed", observed: "2026-08-14", mileage: 211904 }),

  c("outback", "engine-oil", "Engine oil", "Engine", "good", "Changed at dealer.", { source: "Shop record", observed: "2026-05-01", mileage: 95200 }),
  c("outback", "cvt", "CVT fluid", "Drivetrain", "unknown", "Manufacturer says 'lifetime'. Worth asking a mechanic."),
];

export const events: TimelineEvent[] = [
  { id: "e1", vehicleId: "civic", date: "2026-09-28", mileage: 148320, kind: "Mileage", title: "Mileage updated", detail: "Odometer reading entered by owner.", source: "Owner observed" },
  { id: "e2", vehicleId: "civic", date: "2026-09-12", mileage: 148010, kind: "Check", title: "Quick check: tires", detail: "Front tread measured at 4/32\". Marked Monitor.", source: "Owner observed" },
  { id: "e3", vehicleId: "civic", date: "2026-09-01", mileage: 147800, kind: "Service", title: "Wiper blades replaced", detail: "Bosch Icon 26\" + 18\".", source: "Owner observed" },
  { id: "e4", vehicleId: "civic", date: "2026-08-03", mileage: 146700, kind: "Symptom", title: "A/C blows warm", detail: "Starts cold, turns warm after ~20 min on 90°F days.", source: "Owner observed" },
  { id: "e5", vehicleId: "civic", date: "2026-07-20", mileage: 145980, kind: "Service", title: "Oil & filter change", detail: "Valvoline Instant Oil Change — 0W-20 full synthetic.", source: "Receipt" },
  { id: "e6", vehicleId: "civic", date: "2026-06-11", mileage: 144900, kind: "Check", title: "Multi-point inspection", detail: "Brakes, battery, belts inspected at Eastside Auto.", source: "Shop record" },
  { id: "e7", vehicleId: "civic", date: "2026-02-14", kind: "Recall", title: "Recall notice received", detail: "Takata passenger airbag inflator — campaign 19V-182.", source: "Manufacturer" },
  { id: "e8", vehicleId: "tacoma", date: "2026-08-14", mileage: 211904, kind: "Mileage", title: "Mileage updated", detail: "Entered by owner.", source: "Owner observed" },
  { id: "e9", vehicleId: "tacoma", date: "2026-05-22", mileage: 207100, kind: "Check", title: "Frame inspection", detail: "Surface rust noted, no perforation.", source: "Shop record" },
];

export const maintenance: MaintItem[] = [
  { id: "spark-plugs", vehicleId: "civic", name: "Spark plugs", due: "overdue", dueText: "Likely overdue", interval: "Every 105,000 mi", why: "No record of replacement and the car is past 105k miles. VHS can't confirm whether a previous owner did this." },
  { id: "oil", vehicleId: "civic", name: "Oil & filter", due: "due-soon", dueText: "Due in ~1,660 mi", lastDone: "2026-07-20 · 145,980 mi", interval: "Every 5,000 mi or 6 months", why: "Based on your last receipt and current mileage." },
  { id: "rotation", vehicleId: "civic", name: "Tire rotation", due: "upcoming", dueText: "Due around 152,000 mi", lastDone: "2026-03-10 · 142,000 mi", interval: "Every 7,500 mi", why: "Uneven front wear noted — rotation may help." },
  { id: "coolant", vehicleId: "civic", name: "Coolant replacement", due: "unknown", dueText: "Unknown", interval: "Every 60,000 mi after first", why: "No history recorded. Add a receipt or ask a mechanic to inspect." },
  { id: "cabin", vehicleId: "civic", name: "Cabin air filter", due: "upcoming", dueText: "Due ~Jan 2027", lastDone: "2026-01-08", interval: "Every 12 months", why: "Owner-recorded replacement." },
  { id: "oil", vehicleId: "tacoma", name: "Oil & filter", due: "overdue", dueText: "Overdue by ~1,100 mi", interval: "Every 5,000 mi", why: "Based on last recorded change." },
];

export const symptoms: Symptom[] = [
  { id: "ac-warm", vehicleId: "civic", title: "A/C blows warm after a while", started: "2026-08-03", mileage: 146700, when: "Hot days, after ~20 minutes of driving", status: "issue", notes: "Compressor clutch seems to cycle off. No unusual noise. Not yet seen by a shop." },
  { id: "brake-squeal", vehicleId: "civic", title: "Brake squeal on cold mornings", started: "2026-05-30", mileage: 144500, when: "First few stops, below 50°F", status: "monitor", notes: "Goes away once warm. Shop says pads ~4 mm." },
];

export const documents: Doc[] = [
  { id: "d1", vehicleId: "civic", title: "Valvoline oil change receipt", type: "Receipt", date: "2026-07-20", size: "184 KB" },
  { id: "d2", vehicleId: "civic", title: "Eastside Auto inspection", type: "Inspection", date: "2026-06-11", size: "1.2 MB" },
  { id: "d3", vehicleId: "civic", title: "Indiana registration 2026", type: "Registration", date: "2026-01-15", size: "96 KB" },
  { id: "d4", vehicleId: "civic", title: "Brake job — Midas", type: "Receipt", date: "2024-03-02", size: "220 KB" },
];

export const recalls: Recall[] = [
  { id: "r1", vehicleId: "civic", campaign: "19V-182", title: "Passenger frontal airbag inflator", issued: "2019-03-07", state: "open", summary: "Inflator may rupture during deployment. Dealer replaces the inflator free of charge." },
  { id: "r2", vehicleId: "civic", campaign: "14V-353", title: "Power window switch", issued: "2014-06-20", state: "unknown", summary: "Completion not recorded. Ask a Honda dealer to look up the VIN." },
];

export const shares = [
  { token: "demo-eastside", vehicleId: "civic", recipient: "Eastside Auto", created: "2026-09-20", expires: "2026-10-20", scope: "Summary, health, service records" },
];

export const fmtMi = (n?: number) => (n == null ? "—" : `${n.toLocaleString("en-US")} mi`);
export const fmtDate = (d?: string) =>
  d ? new Date(d + "T12:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Not recorded";

export const getVehicle = (id: string) => vehicles.find((v) => v.id === id);
export const byVehicle = <T extends { vehicleId: string }>(list: T[], id: string) => list.filter((x) => x.vehicleId === id);
