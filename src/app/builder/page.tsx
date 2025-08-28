"use client";
import { useState } from "react";

export default function BuilderPage() {
  const [message, setMessage] = useState("");
  const [previewImg, setPreviewImg] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async () => {
    // let uploadedUrl = previewImg; // temporary
    // later we’ll replace this with Cloudinary signed upload

    const res = await fetch("/api/customizations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ imageUrl: message }),
    });

    const data = await res.json();
    console.log("Saved customization:", data);
    alert("Customization saved! (check console)");
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Build Your Card</h2>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) {
            setFile(f);
            setPreviewImg(URL.createObjectURL(f));
          }
        }}
        className="mb-4"
      />
      {previewImg && (
        <img src={previewImg} className="w-64 h-64 object-cover border mb-4" />
      )}
      <textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />
      <div className="border p-4 mb-4">
        <h3 className="font-semibold">Live Preview:</h3>
        {previewImg && (
          <img src={previewImg} className="w-48 h-48 object-cover" />
        )}
        <p>{message}</p>
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Save Customization
      </button>
    </div>
  );
}
