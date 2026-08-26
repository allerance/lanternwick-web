import { randomUUID } from "crypto";

export type Lantern = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

export type NewLantern = {
  name: string;
  message: string;
};

// Simple in-memory store. This resets on server restart, which is fine for a
// development / demo environment. Swap for a real database when persistence is
// needed.
const lanterns: Lantern[] = [
  {
    id: randomUUID(),
    name: "The Keeper",
    message: "Welcome to Lanternwick. Leave a light for someone who needs it.",
    createdAt: new Date("2026-01-01T18:00:00.000Z").toISOString(),
  },
];

export const NAME_MAX = 40;
export const MESSAGE_MAX = 160;

export function listLanterns(): Lantern[] {
  return [...lanterns].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export function validateNewLantern(input: unknown): {
  ok: true;
  value: NewLantern;
} | {
  ok: false;
  error: string;
} {
  if (typeof input !== "object" || input === null) {
    return { ok: false, error: "Request body must be a JSON object." };
  }

  const { name, message } = input as Record<string, unknown>;

  if (typeof name !== "string" || typeof message !== "string") {
    return { ok: false, error: "Both 'name' and 'message' are required." };
  }

  const trimmedName = name.trim();
  const trimmedMessage = message.trim();

  if (trimmedName.length === 0) {
    return { ok: false, error: "Please tell us who is lighting this lantern." };
  }
  if (trimmedName.length > NAME_MAX) {
    return { ok: false, error: `Name must be ${NAME_MAX} characters or fewer.` };
  }
  if (trimmedMessage.length === 0) {
    return { ok: false, error: "A lantern needs a message to carry." };
  }
  if (trimmedMessage.length > MESSAGE_MAX) {
    return {
      ok: false,
      error: `Message must be ${MESSAGE_MAX} characters or fewer.`,
    };
  }

  return { ok: true, value: { name: trimmedName, message: trimmedMessage } };
}

export function lightLantern(input: NewLantern): Lantern {
  const lantern: Lantern = {
    id: randomUUID(),
    name: input.name,
    message: input.message,
    createdAt: new Date().toISOString(),
  };
  lanterns.push(lantern);
  return lantern;
}
