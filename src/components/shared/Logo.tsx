import { img } from "@/lib/site";

/** 기존 사이트 원본 로고(PNG 212x52). 벡터 원본 수령 시 교체 */
export default function Logo({ variant = "color", className = "h-8 w-auto lg:h-9" }: { variant?: "color" | "white"; className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={img(`brand/logo-${variant}.png`)} alt="JP이노베이션" width={212} height={52} className={className} />
  );
}
