import Header from "@/components/Header";
import Image from "next/image";
import { Button } from "antd";

export default function Home() {
  return (
    <>

      <main className="min-h-screen flex items-center text-black px-4 py-16 selection:bg-red-200">
        <div className="max-w-5xl mx-auto flex flex-col gap-5 justify-center items-center text-center">

          {/* Brand/Logo Section */}
          <div className="flex flex-col items-center gap-2">
            <div className="logo mb-2">
              <Image
                src="/logo.png"
                alt="Formy Logo"
                height={50}
                width={180}
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-4xl md:text-7xl font-black leading-tight uppercase tracking-tight">
              formy
              <span className="block mt-2 text-3xl md:text-5xl font-bold normal-case">
                is launching <span className="bg-[#EA4335] text-white px-3 py-1 font-extrabold lowercase">soon</span>
              </span>
            </h1>
          </div>

          <p className="italic text-gray-600">Until then…</p>


          <div className="max-w-2xl space-y-4">
            <p className="font-medium text-lg text-gray-900">
              Join the free early access waitlist for formy, the form builder that google forms can never become. We are currently google's wettest dream.
            </p>

          </div>


          <form
            action="https://api.web3forms.com/submit" method="POST"

            className="mt-4 w-full flex justify-center"
          >
            <div className="p-6 md:p-8 flex flex-col gap-3 w-full max-w-xl">


              <input type="hidden" name="access_key" value="ce1766fc-e595-4938-942f-ab63c2e4b9a0" />

              <input
                type="text"
                name="name"
                placeholder="Your name"
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 outline-none focus:border-black transition-colors"
              />
              <input
                type="email"
                name="email"
                placeholder="Your best email"
                required
                className="w-full bg-white border border-gray-300 rounded-lg px-4 py-3 text-black placeholder-gray-500 outline-none focus:border-black transition-colors"
              />

              <Button
                htmlType="submit"
                block
                size="large"
                className="!bg-[#FFC437] !text-black !font-bold !border-none hover:!bg-[#f0b82e] active:!scale-[0.99]"
              >
                Join Now
              </Button>
            </div>
          </form>



        </div>
      </main>
    </>
  );
}