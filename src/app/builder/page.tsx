// This page does 3 things for the UX.
// 1. Lets the user pick an image (shows a local preview immediately).
// 2. Uploads it to Cloudinary with a secure signed request.
// 3. Saves that permanent URL and personal message into the db as a customization.

"use client";
import { useState, useRef } from "react";
import { useSearchParams } from "next/navigation";

export default function BuilderPage() {
  const [message, setMessage] = useState(""); // Holds the user input text
  const [previewImg, setPreviewImg] = useState<string | null>(null); // Temporary preview
  const [file, setFile] = useState<File | null>(null); // Raw image selected from user's computer
  const [uploading, setUploading] = useState(false);

  const searchParams = useSearchParams();
  const productId = searchParams.get("productId");

  const fileInputRef = useRef<HTMLInputElement>(null); // Create a ref for the file input.

  const clearFile = () => {
    setFile(null);
    setPreviewImg(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select an image to upload.");
      return;
    }

    setUploading(true);

    // Get signed params from our API
    const sigRes = await fetch("/api/uploads/sign");
    const { cloud_name, api_key, timestamp, signature } = await sigRes.json();

    // Build a form payload for Cloudinary
    const formData = new FormData();
    formData.append("file", file);
    formData.append("api_key", api_key);
    formData.append("timestamp", timestamp);
    formData.append("signature", signature);
    formData.append("folder", "greeting-cards");

    // Upload directly to Cloudinary
    const uploadRes = await fetch(
      `https://api.cloudinary.com/v1_1/${cloud_name}/auto/upload`,
      { method: "POST", body: formData }
    );

    // Updates preview with the permanent Cloudinary URL
    const data = await uploadRes.json();
    console.log("Cloudinary upload result:", data);

    if (uploadRes.ok && data.secure_url) {
      setPreviewImg(data.secure_url);
      // Save customization draft to DB
      await fetch("/api/customizations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId, imageUrl: data.secure_url, message }),
      });
      alert("Customization saved!");
    } else {
      alert("Upload failed. Please try again.");
      console.error("Upload error:", data);
    }

    setUploading(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Build Your Card</h2>

      {/* File selector + filename pill with X */}
      <div className="flex items-center gap-3 flex-wrap mb-3">
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-2 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer transition-colors"
        >
          Choose Image File
        </label>
        <input
          id="file-upload"
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) {
              setFile(f);
              setPreviewImg(URL.createObjectURL(f)); // local preview
            } else {
              clearFile();
            }
          }}
          className="sr-only"
        />

        {file && (
          <span className="inline-flex items-center gap-2 max-w-full truncate px-3 py-1.5 rounded-full text-sm bg-indigo-50 text-indigo-700 border border-indigo-200">
            <span className="truncate">{file.name}</span>
            <button
              type="button"
              onClick={clearFile}
              aria-label="Remove selected file"
              className="inline-flex items-center justify-center w-5 h-5 rounded-full hover:bg-indigo-100 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              title="Remove"
            >
              <svg
                viewBox="0 0 20 20"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="w-3.5 h-3.5"
                aria-hidden="true"
              >
                <path d="M6 6l8 8M14 6l-8 8" />
              </svg>
            </button>
          </span>
        )}
      </div>

      {previewImg && (
        <img
          src={previewImg}
          className="w-64 h-64 object-cover border mb-4"
          alt="Card preview"
        />
      )}

      <textarea
        placeholder="Write your message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="w-full border rounded p-2 mb-4"
      />

      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        disabled={uploading || !file}
      >
        {uploading ? "Uploading..." : "Upload & Save"}
      </button>
    </div>
  );
}
