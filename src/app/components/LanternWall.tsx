"use client";

import { useEffect, useState } from "react";
import type { Lantern } from "@/lib/lanterns";

const NAME_MAX = 40;
const MESSAGE_MAX = 160;

function formatWhen(iso: string): string {
  const date = new Date(iso);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LanternWall() {
  const [lanterns, setLanterns] = useState<Lantern[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/lanterns", { cache: "no-store" });
        if (!res.ok) throw new Error("Could not load lanterns.");
        const data = (await res.json()) as { lanterns: Lantern[] };
        if (active) setLanterns(data.lanterns);
      } catch {
        if (active) {
          setError("Could not reach the lantern keeper. Try again shortly.");
        }
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch("/api/lanterns", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, message }),
      });
      const data = (await res.json()) as { lantern?: Lantern; error?: string };
      if (!res.ok) {
        setError(data.error ?? "Something went wrong lighting your lantern.");
        return;
      }
      if (data.lantern) {
        setLanterns((current) => [data.lantern as Lantern, ...current]);
      }
      setName("");
      setMessage("");
    } catch {
      setError("Could not reach the lantern keeper. Try again shortly.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="grid w-full gap-10 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]">
      <form
        onSubmit={handleSubmit}
        className="h-fit rounded-2xl border border-amber-200/20 bg-white/5 p-6 backdrop-blur"
      >
        <h2 className="text-lg font-semibold text-amber-100">
          Light a lantern
        </h2>
        <p className="mt-1 text-sm text-amber-100/60">
          Leave a small light on the wall for someone to find.
        </p>

        <label className="mt-6 block text-sm font-medium text-amber-100/80">
          Your name
          <input
            value={name}
            onChange={(event) => setName(event.target.value)}
            maxLength={NAME_MAX}
            placeholder="Wanderer"
            className="mt-1.5 w-full rounded-lg border border-amber-200/20 bg-black/30 px-3 py-2 text-amber-50 outline-none transition focus:border-amber-300/60 focus:ring-2 focus:ring-amber-400/30"
          />
        </label>

        <label className="mt-4 block text-sm font-medium text-amber-100/80">
          Message
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            maxLength={MESSAGE_MAX}
            rows={3}
            placeholder="A word of warmth for the road ahead…"
            className="mt-1.5 w-full resize-none rounded-lg border border-amber-200/20 bg-black/30 px-3 py-2 text-amber-50 outline-none transition focus:border-amber-300/60 focus:ring-2 focus:ring-amber-400/30"
          />
          <span className="mt-1 block text-right text-xs text-amber-100/40">
            {message.length}/{MESSAGE_MAX}
          </span>
        </label>

        {error ? (
          <p
            role="alert"
            className="mt-3 rounded-lg border border-red-400/30 bg-red-500/10 px-3 py-2 text-sm text-red-200"
          >
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={submitting}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg bg-amber-400 px-4 py-2.5 font-semibold text-amber-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Lighting…" : "Light it"}
        </button>
      </form>

      <div>
        <div className="mb-4 flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-amber-100">The wall</h2>
          <span className="text-sm text-amber-100/50">
            {lanterns.length} lantern{lanterns.length === 1 ? "" : "s"} lit
          </span>
        </div>

        {loading ? (
          <p className="text-amber-100/50">Gathering the lights…</p>
        ) : lanterns.length === 0 ? (
          <p className="text-amber-100/50">
            No lanterns yet. Be the first to light one.
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2">
            {lanterns.map((lantern) => (
              <li
                key={lantern.id}
                className="group relative overflow-hidden rounded-2xl border border-amber-200/15 bg-gradient-to-b from-amber-500/10 to-transparent p-5"
              >
                <div
                  aria-hidden
                  className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-400/20 blur-2xl transition group-hover:bg-amber-400/30"
                />
                <p className="text-amber-50">{lantern.message}</p>
                <div className="mt-4 flex items-center justify-between text-sm">
                  <span className="font-medium text-amber-200">
                    {lantern.name}
                  </span>
                  <time className="text-amber-100/40">
                    {formatWhen(lantern.createdAt)}
                  </time>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
