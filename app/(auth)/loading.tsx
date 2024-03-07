import Image from "next/image";

export default function AuthLoading() {
  return (
    <div className="animate-pulse opacity-50">
      <Image alt="logo" src={"/pickuro-icon.png"} width={200} height={200} />
    </div>
  );
}
