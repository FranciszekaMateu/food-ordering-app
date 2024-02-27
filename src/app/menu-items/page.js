"use client";
import useProfile from "@/components/UseProfile";
import Loader from "@/components/layout/Loader";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import RightArrow from "@/components/icons/Right";
import { useEffect } from "react";
export default function MenuItemsPage() {
  const [menuItems, setMenuItems] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();

  useEffect(() => {
    fetch("/api/menu-items").then((res) => {
      res.json().then((menuItems) => {
        setMenuItems(menuItems);
      });
    });
  }, []);

  if (profileLoading) {
    return <Loader />;
  }
  if (!profileData.admin) return "Not an admin";
  return (
    <section className="mt-8 max-w-md mx-auto">
      <UserTabs isAdmin={true} />
      <div className="mt-8">
        <Link className="button flex" href="/menu-items/new">
          Create new menu item
          <RightArrow />
        </Link>
      </div>
      <div>
        <h2 className="text-sm text-gray-500 mt-8 mb-2">Edit Menu Items:</h2>
        <div className="grid grid-cols-3 gap-2">
          {menuItems?.length > 0 &&
            menuItems.map((item) => (
              <Link
                href={"/menu-items/edit/" + item._id}
                className="bg-gray-100 rounded-lg p-4 "
              >
                <div className="relative ">
                  <Image className="rounded-md" src={item.image} width={200} height={200} />
                </div>
                <div className="text-center">
                  {item.name}
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}
