"use client";

import Image from "next/image";
import { useRef, useState, useSyncExternalStore } from "react";
import { Camera, Check, Trash2 } from "lucide-react";

const avatarStorageKey = "sayan-portfolio-profile-picture";
const avatarChangeEvent = "sayan-portfolio-avatar-change";
const maximumFileSize = 15 * 1024 * 1024;
const portraitSize = 512;

function subscribeToAvatar(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(avatarChangeEvent, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(avatarChangeEvent, onStoreChange);
  };
}

function getAvatarSnapshot() {
  return window.localStorage.getItem(avatarStorageKey);
}

function getServerAvatarSnapshot() {
  return null;
}

async function makePortraitDataUrl(file: File) {
  if (!file.type.startsWith("image/")) {
    throw new Error("Choose an image file to upload your profile photo.");
  }

  if (file.size > maximumFileSize) {
    throw new Error("That image is too large. Choose a photo under 15 MB.");
  }

  const image = await createImageBitmap(file);

  try {
    if (image.width < 128 || image.height < 128) {
      throw new Error("Choose a photo that is at least 128 pixels wide and tall.");
    }

    const cropSize = Math.min(image.width, image.height);
    const cropX = (image.width - cropSize) / 2;
    const cropY = (image.height - cropSize) / 2;
    const canvas = document.createElement("canvas");
    canvas.width = portraitSize;
    canvas.height = portraitSize;

    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error("Your browser couldn’t prepare this photo. Try another image.");
    }

    context.drawImage(image, cropX, cropY, cropSize, cropSize, 0, 0, portraitSize, portraitSize);

    return await new Promise<string>((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Your browser couldn’t prepare this photo. Try another image."));
            return;
          }

          const reader = new FileReader();
          reader.addEventListener("load", () => {
            if (typeof reader.result !== "string") {
              reject(new Error("Your browser couldn’t prepare this photo. Try another image."));
              return;
            }

            resolve(reader.result);
          });
          reader.addEventListener("error", () => reject(new Error("Your photo couldn’t be read. Try another image.")));
          reader.readAsDataURL(blob);
        },
        "image/webp",
        0.84
      );
    });
  } finally {
    image.close();
  }
}

export function ProfilePortrait() {
  const avatar = useSyncExternalStore(
    subscribeToAvatar,
    getAvatarSnapshot,
    getServerAvatarSnapshot
  );
  const fileInput = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState("");
  const [isError, setIsError] = useState(false);

  async function handlePhotoSelection(event: React.ChangeEvent<HTMLInputElement>) {
    const input = event.currentTarget;
    const file = input.files?.[0];

    input.value = "";

    if (!file) {
      return;
    }

    try {
      const portraitDataUrl = await makePortraitDataUrl(file);
      window.localStorage.setItem(avatarStorageKey, portraitDataUrl);
      window.dispatchEvent(new Event(avatarChangeEvent));
      setIsError(false);
      setStatus("Your photo is saved in this browser.");
    } catch (error) {
      setIsError(true);
      setStatus(
        error instanceof Error
          ? error.message
          : "Your photo couldn’t be saved. Try another image."
      );
    }
  }

  function removePhoto() {
    try {
      window.localStorage.removeItem(avatarStorageKey);
      window.dispatchEvent(new Event(avatarChangeEvent));
      setIsError(false);
      setStatus("Your photo was removed from this browser.");
    } catch {
      setIsError(true);
      setStatus("Your photo couldn’t be removed. Please try again.");
    }
  }

  return (
    <div className="profile-portrait">
      <div className="portrait-frame">
        {avatar ? (
          <Image
            alt="Profile photo of Sayan Sengupta"
            className="portrait-image"
            fill
            priority
            sizes="104px"
            src={avatar}
            unoptimized
          />
        ) : (
          <span aria-label="Sayan Sengupta monogram placeholder" className="portrait-monogram" role="img">
            SS<span>.</span>
          </span>
        )}
      </div>

      <button
        aria-label={avatar ? "Change profile photo" : "Upload profile photo"}
        className="portrait-upload"
        onClick={() => fileInput.current?.click()}
        type="button"
      >
        <Camera aria-hidden="true" size={15} />
      </button>

      <input
        accept="image/*"
        aria-label="Choose a profile photo"
        className="visually-hidden"
        onChange={handlePhotoSelection}
        ref={fileInput}
        tabIndex={-1}
        type="file"
      />

      <div className="portrait-details">
        <span className="portrait-caption">
          {avatar ? "YOUR PHOTO" : "ADD YOUR PHOTO"}
          <Check aria-hidden="true" size={11} />
        </span>

        {avatar && (
          <button
            aria-label="Remove profile photo"
            className="portrait-remove"
            onClick={removePhoto}
            type="button"
          >
            <Trash2 aria-hidden="true" size={12} />
            Remove
          </button>
        )}
      </div>

      <p aria-live="polite" className={`portrait-status${isError ? " is-error" : ""}`} role="status">
        {status}
      </p>
    </div>
  );
}
