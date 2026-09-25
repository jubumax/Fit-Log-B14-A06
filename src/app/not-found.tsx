import Link from "next/link";
import { LuArrowLeft } from "react-icons/lu";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[75vh] max-w-[1280px] items-center justify-center px-5 py-20 sm:px-8">
      <div className="w-full max-w-2xl text-center">
        <p className="display-font text-[120px] font-bold leading-none tracking-tight text-[#e8333f] sm:text-[170px]">
          404
        </p>

        <div className="mx-auto mt-2 h-px w-20 bg-white/15" />

        <h1 className="display-font mt-7 text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          Page Not Found
        </h1>

        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-white/45 sm:text-base">
          Sorry, we couldn&apos;t find the page you&apos;re looking for. It may
          have been moved, removed, or the URL may be incorrect.
        </p>

        <Link
          href="/"
          className="mt-8 inline-flex items-center gap-2 rounded-md bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d7ff4d]"
        >
          <LuArrowLeft size={17} />
          Back to Home
        </Link>
      </div>
    </section>
  );
}
