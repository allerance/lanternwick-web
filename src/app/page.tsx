import LanternWall from "./components/LanternWall";

export default function Home() {
  return (
    <div className="relative flex min-h-full flex-1 flex-col overflow-hidden bg-[#0b0a12] text-amber-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(60rem_40rem_at_50%_-10%,rgba(251,191,36,0.18),transparent)]"
      />

      <header className="relative z-10 mx-auto w-full max-w-5xl px-6 pt-10">
        <div className="flex items-center gap-2">
          <span className="text-2xl" aria-hidden>
            🏮
          </span>
          <span className="text-lg font-semibold tracking-tight">
            Lanternwick
          </span>
        </div>
      </header>

      <main className="relative z-10 mx-auto w-full max-w-5xl flex-1 px-6 py-16">
        <section className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300/70">
            A small, warm corner of the web
          </p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">
            Leave a light on the wall.
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg leading-8 text-amber-100/70">
            Lanternwick is a tiny community wall. Light a lantern with a short
            message and it joins the glow for everyone who visits after you.
          </p>
        </section>

        <section className="mt-14">
          <LanternWall />
        </section>
      </main>

      <footer className="relative z-10 mx-auto w-full max-w-5xl px-6 pb-10 text-center text-sm text-amber-100/40">
        Built with Next.js · Lanternwick
      </footer>
    </div>
  );
}
