import { describe, expect, it } from "vitest";
import { formatLead, leadSchema, parseChatIds } from "./lead-format";

describe("lead rules", () => {
  it("rejects a phone number with fewer than 9 digits", () => {
    expect(leadSchema.safeParse({ type: "booking", name: "Ali", phone: "12-34" }).success).toBe(false);
  });

  it("accepts a normal Uzbek phone number", () => {
    expect(leadSchema.safeParse({ type: "booking", name: "Ali Valiyev", phone: "+998 90 123 45 67" }).success).toBe(true);
  });

  it("rejects submissions where the hidden spam field is filled", () => {
    expect(leadSchema.safeParse({ type: "booking", name: "Ali", phone: "+998901234567", website: "spam" }).success).toBe(false);
  });

  it("puts name, phone and extra fields into the Telegram message", () => {
    const lead = leadSchema.parse({ type: "doctor", name: "Ali <b>", phone: "+998901234567", fields: { Shifokor: "Azimov Aziz" } });
    const msg = formatLead(lead);
    expect(msg).toContain("Ali &lt;b&gt;");
    expect(msg).toContain("+998901234567");
    expect(msg).toContain("Azimov Aziz");
  });

  it("supports several Telegram chats separated by commas", () => {
    expect(parseChatIds("123, -456 ,789")).toEqual(["123", "-456", "789"]);
    expect(parseChatIds(undefined)).toEqual([]);
  });
});
