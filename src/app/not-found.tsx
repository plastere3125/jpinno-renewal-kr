import Link from "next/link";
import Logo from "@/components/shared/Logo";

export default function NotFound() {
  return (
    <main id="main" className="flex min-h-svh flex-col items-center justify-center bg-mist px-4 text-center">
      <Logo />
      <p className="mt-10 text-[64px] font-semibold leading-none text-navy">404</p>
      <h1 className="mt-4 text-[20px] font-semibold text-ink">요청하신 페이지를 찾을 수 없습니다.</h1>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link href="/concept-a/" className="inline-flex h-12 items-center rounded-[4px] bg-navy px-6 text-[15px] font-semibold text-white">
          메인으로
        </Link>
      </div>
    </main>
  );
}
