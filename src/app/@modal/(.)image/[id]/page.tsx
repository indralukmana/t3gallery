import Image from "next/image";
import { Modal } from "~/app/@modal/(.)image/[id]/modal";
import { getImageById } from "~/server/db/queries";

export default async function ImageModal({
  params: { id: imageId },
}: {
  params: { id: string };
}) {
  const image = await getImageById(imageId);

  return (
    <Modal>
      <Image
        src={image.url}
        alt={image.name ?? "image"}
        width={200}
        height={200}
      />
    </Modal>
  );
}
