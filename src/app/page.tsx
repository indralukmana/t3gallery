import { SignedIn, SignedOut } from "@clerk/nextjs";
import { db } from "~/server/db";

export const dynamic = "force-dynamic";

async function GalleryImages() {
  const images = await db.query.images.findMany({
    orderBy: (model, { desc }) => desc(model.id),
  });
  return (
    <div className="flex flex-wrap gap-4">
      {images.map((image) => {
        return (
          <div key={image.id} className="w-48">
            <img src={image.url} alt={image.name ?? "image"} />
          </div>
        );
      })}
    </div>
  );
}

export default async function HomePage() {
  return (
    <main className="h-full w-full">
      <SignedOut>
        <div className="grid h-full w-full place-items-center">
          <p>Please sign in to show your gallery</p>
        </div>
      </SignedOut>
      <SignedIn>
        <GalleryImages />
      </SignedIn>
    </main>
  );
}
