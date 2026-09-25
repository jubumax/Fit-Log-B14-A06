import Image from "next/image";
import Banner from "@/assets/banner.png";
import Link from "next/link";
import { LuArrowDownRight } from "react-icons/lu";

export default function Hero() {
  return (
    <section className="mx-auto max-w-[1280px] px-5 pt-6 sm:px-8 mt-4 lg:mt-8">
      <div className="grid items-center gap-10 overflow-hidden rounded-[24px] border border-[#272b33] bg-[#14161b] px-6 py-10 sm:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:px-12 lg:py-14">
        {/* Text */}
        <div>
          <p className="mb-5 text-xs font-bold tracking-[0.25em] text-[#ccff00]">
            WORKOUT LIBRARY
          </p>

          <h1 className="display-font max-w-3xl text-5xl font-bold uppercase leading-[0.95] tracking-tight sm:text-5xl lg:text-6xl">
            Train with intent. Log
            <br />
            every set.
          </h1>

         <p className="mt-7 max-w-[550px] text-base leading-7 text-white/55 sm:text-lg">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into today&apos;s plan, and watch the week&apos;s work add up.
       </p>

          <Link
            href="#library"
            className="mt-8 inline-flex items-center gap-3 rounded-md bg-[#ccff00] px-6 py-3 text-sm font-black text-black transition hover:bg-[#d8ff33]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Image */}
     <div className="relative mx-auto flex h-[320px] w-full max-w-[500px] items-center justify-center sm:h-[420px] lg:h-[480px]">
     <Image
       src={Banner}
       alt="FitLog workout character"
       width={334}
       height={334}
       priority
       className="object-contain"
       />
</div>
      </div>
    </section>
  );
}