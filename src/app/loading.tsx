import Spinner from "@/components/shared/Spinner";

export default function Loading() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center">
      <Spinner />
    </section>
  );
}
