"use client";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";
import Loader from "@/components/layout/Loader";
import EditableImage from "@/components/layout/EditableImage";
import { useEffect, useState } from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import Left from "@/components/icons/Left";
import toast from "react-hot-toast";
import { useParams } from "next/navigation";



export default function EditMenuItemPage() {
  const {id} = useParams();
  const { loading: profileLoading, data: profileData } = useProfile();
  const [image, setImage] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [basePrice, setBasePrice] = useState(0);
  const [redirectToItems, setRedirectToItems] = useState(false);
  useEffect(() => {
    fetch("/api/menu-items/").then((res) => {
      res.json().then((items) => {
        const item = items.find((item) => item._id === id);
        setImage(item.image);
        setName(item.name);
        setDescription(item.description);
        setBasePrice(item.basePrice);
      });
    });
  }, []);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    const data = { name, description, basePrice, image,_id:id };
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/menu-items", {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        resolve(response.json());
      } else {
        reject("Failed to save");
      }
    });
    await toast.promise(savingPromise, {
      loading: "Creating menu item",
      success: "Created menu item",
      error: "Error",
    });
    setTimeout(setRedirectToItems(true), 1000);
  }
  if (redirectToItems) {
    return redirect("/menu-items/");
  }
  if (profileLoading) {
    return <Loader />;
  }
  if (!profileData.admin) return "Not an admin";
  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-md mx-auto mt-8">
        <Link className="button" href="/menu-items/">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <form onSubmit={handleFormSubmit} className="mt-8 max-w-md mx-auto">
        <div
          className="grid items-start gap-4"
          style={{ gridTemplateColumns: ".3fr .7fr" }}
        >
          <div>
            <EditableImage link={image} setLink={setImage} />
          </div>
          <div className="grow">
            <label htmlFor="name">Item name</label>
            <input
              value={name}
              onChange={(ev) => setName(ev.target.value)}
              type="text"
            />
            <label htmlFor="name">Description</label>
            <input
              type="text"
              value={description}
              onChange={(ev) => setDescription(ev.target.value)}
            />
            <label htmlFor="name">Base Price</label>
            <input
              value={basePrice}
              onChange={(ev) => setBasePrice(ev.target.value)}
              type="text"
            />
            <button type="submit">Save</button>
          </div>
        </div>
      </form>
    </section>
  );
}
