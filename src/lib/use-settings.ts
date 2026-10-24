import { useQuery } from "@tanstack/react-query";
import { getSettings } from "./settings.functions";
import { ADDRESS, EMAIL, PHONE, SHORT } from "./data";
import { l } from "./i18n";

export const settingsQuery = { queryKey: ["site-settings"], queryFn: () => getSettings(), staleTime: 60_000 };

export function useSettings() {
  const { data = {} } = useQuery(settingsQuery);
  const phone = data["phone"] || PHONE;
  return {
    phone,
    tel: `tel:+${phone.replace(/\D/g, "")}`,
    short: data["short"] || SHORT,
    email: data["email"] || EMAIL,
    address: data["address_uz"] ? l(data["address_uz"], data["address_ru"] || data["address_uz"]) : ADDRESS,
    announcement: data["announcement_uz"] ? l(data["announcement_uz"], data["announcement_ru"] || data["announcement_uz"]) : null,
  };
}
