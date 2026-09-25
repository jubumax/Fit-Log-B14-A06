import logo from "@/assets/logo.png";
import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a0b0d]">
      <div className="mx-auto flex max-w-[1280px] flex-col gap-3 px-5 py-5 sm:gap-5 sm:px-8 sm:py-8 sm:flex-row sm:items-center sm:justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="grid size-6 place-items-center rounded-full sm:size-8">
            <Image
              src={logo}
              alt="FitLog Logo"
              width={20}
              height={20}
              className="object-contain -rotate-[44deg]"
            />
          </span>

          <span className="display-font text-sm font-bold tracking-wide sm:text-base">
            FITLOG
          </span>
        </Link>

        <p className="text-[10px] text-white/50 sm:text-sm">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
