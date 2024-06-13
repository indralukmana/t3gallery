import Link from "next/link";
import { db } from "~/server/db";

const mockImages = [
  {
    name: "mokhalad-musavi-HKkvKhQv6qc-unsplash.jpg",
    key: "543dcc9e-1dec-4c53-bc5b-11fcfaeae496-g1uvg9.jpg",
    customId: null,
    url: "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/543dcc9e-1dec-4c53-bc5b-11fcfaeae496-g1uvg9.jpg",
    size: 2242476,
    uploadedAt: "2024-06-12T13:31:23.000Z",
  },
  {
    name: "joseph-corl-P0vdtS4jlq4-unsplash.jpg",
    key: "eb737394-5f33-4527-a2c4-74efc9a24112-84c1nu.jpg",
    customId: null,
    url: "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/eb737394-5f33-4527-a2c4-74efc9a24112-84c1nu.jpg",
    size: 2316018,
    uploadedAt: "2024-06-12T13:31:23.000Z",
  },
  {
    name: "chuttersnap-35-ci-fEAXw-unsplash.jpg",
    key: "a98fb739-3571-46fb-932f-fc80b55a505e-t16hgu.jpg",
    customId: null,
    url: "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/a98fb739-3571-46fb-932f-fc80b55a505e-t16hgu.jpg",
    size: 2274047,
    uploadedAt: "2024-06-12T13:31:23.000Z",
  },
  {
    name: "tim-marshall-bvuwsIUCksA-unsplash.jpg",
    key: "13401026-81c4-4388-a075-a7b76adf64ce-678gq0.jpg",
    customId: null,
    url: "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/13401026-81c4-4388-a075-a7b76adf64ce-678gq0.jpg",
    size: 1749259,
    uploadedAt: "2024-06-12T13:31:23.000Z",
  },
];

export default async function HomePage() {
  const posts = await db.query.posts.findMany();

  return (
    <main className="">
      <div className="flex flex-wrap gap-4">
        {posts.map((post) => (
          <p key={post.id}>{post.name}</p>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image) => {
          return (
            <div key={image.key} className="w-48">
              <img src={image.url} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
