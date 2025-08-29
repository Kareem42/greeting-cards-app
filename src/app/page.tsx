// import Image from "next/image";
// import BuilderPage from "./builder/page";

export default function LandingPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold mb-6">
        Send Love with a Personal Touch
      </h1>
      <p className="text-lg mb-8 text-gray-600">
        Personalized greeting cards with your photos, messages, even voice &
        video.
      </p>
      <a
        href="/products"
        className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-500 transition"
      >
        Browse Cards
      </a>
    </div>
  );
}
