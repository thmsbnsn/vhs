import { getRouteApi } from "@tanstack/react-router";

const vehicleRoute = getRouteApi("/vehicles/$vehicleId");

/** Active vehicle from the vehicle layout loader. */
export function useVehicle() {
  return vehicleRoute.useLoaderData().vehicle;
}
