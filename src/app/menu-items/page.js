"use client";
import useProfile from "@/components/UseProfile";
import Loader from "@/components/layout/Loader";
import UserTabs from "@/components/layout/UserTabs";
import Link from "next/link";
import RightArrow from "@/components/icons/Right";
export default function MenuItemsPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
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
    </section>
  );
}
