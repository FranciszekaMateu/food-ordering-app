import  Image  from "next/image";
import toast from "react-hot-toast";
export default function EditableImage({ link, setLink }){

  async function handleFileChange(ev) {
    const files = ev.target.files;
    if (files?.length === 1) {
      const data = new FormData();
      data.set("file", files[0]);

      const uploadingPromise = fetch("/api/upload", {
        method: "POST",
        body: data,
      }).then(async (response) => {
        if (response.ok) {
          const link = await response.json();
          setLink(link);
        } else {
          throw new Error("Failed to upload");
        }
      });

      await toast.promise(uploadingPromise, {
        loading: "Uploading",
        success: "Uploaded",
        error: "Failed to upload",
      });
    }
  }
  return (
    <>
      {link && (
        <Image
          className="rounded-lg max-w-[120px] relative p-2"
          src={link}
          alt={"avatar"}
          width={250}
          height={250}
        />
      )}
      {!link && (
        <div className="rounded-lg max-w-[120px] relative p-2 text-gray-500 bg-gray-200">
          <div className="text-center">No image</div>
        </div>
      )
      }
      <label>
        <input type="file" className="hidden" onChange={handleFileChange} />
        <span className="block border rounded-lg p-2 text-center font-semibold border-gray-300 cursor-pointer">
          Edit
        </span>
      </label>
    </>
  );
}
