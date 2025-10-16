import Image from "next/image"

export function SustainableBench() {
  return (
    <div className="flex md:mt-32 mt-10 flex-col md:flex-row items-center justify-between max-w-7xl mx-auto">
      {/* Left side text */}
      <div className="mb-8 md:mb-0 self-center">
        <h1 className="text-5xl font-semibold leading-tight">
          Sustainable
          <br />
          Advertising
          <br />
          <span className="font-normal">Benches</span>
        </h1>
      </div>

      {/* Center image */}
      <div className="relative mx-auto">
        <Image
          src="/images/ads-bench.webp"
          alt="Sustainable advertising bench"
          width={400}
          height={300}
          className="w-auto h-auto scale-110"
          priority
        />
      </div>

      {/* Right side text and sticker */}
      <div className="mt-10 mb-8 md:mb-0  text-center md:text-right md:self-start">
        <h2 className="text-4xl font-medium leading-tight">
          Advertise
          <br />
          your brand
          <br />
          and join
          <br />
          <span className="text-4xl font-bold">#declutter</span>
        </h2>

        <div className="flex justify-start mt-[-30px] ml-[-50px]">
          <Image
            src="/images/STICKER.webp"
            alt="Available at malls & railways metro station"
            width={120}
            height={120}
          />
        </div>

        <p className="mt-5 md:text-right text-center text-lg">
          Advertise Greener.
          <br />
          Connect Deeper.
        </p>
      </div>
    </div>
  )
}
