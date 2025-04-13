import Image from "next/image";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen h-screen absolute">
      <Image
        src="/images/japan-volleyball-mobile.jpg"
        alt="Background"
        fill={true}
        style={{ objectFit: "cover" }}
        quality={80}
        className="-z-10"
      />
      <div className="flex items-center justify-center flex-col h-full w-full p-8">
        <h1 className="h-full text-sky-50">LOGO</h1>
        {children}
      </div>
    </div>
  );
}
