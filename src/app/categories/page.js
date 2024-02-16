
"use client";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Loader from "@/components/layout/Loader";
import useProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function CategoriesPage() {
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editCategory, setEditCategory] = useState(null);
  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    await response.json().then((data) => setCategories(data));
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleNewCategorySubmit = async (e) => {
    e.preventDefault();

    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newCategory }),
      });

      if (response.ok) {
        resolve();
        setNewCategory("");
        fetchCategories();  
      } else {
        reject();
      }
    });

    toast.promise(creationPromise, {
      loading: "Creating Category...",
      success: "Category Created",
      error: "Error Creating Category",
    });
  };

  if (profileLoading) {
    return <Loader />;
  }
  if (!profileData.admin) return "Not an admin";

  return (
    <>
      <UserTabs isAdmin={true} />
      <section className="mt-8 max-w-lg mx-auto">
        <form className="mt-8" onSubmit={handleNewCategorySubmit}>
          <div className="flex gap-2 items-end">
            <div>
              <label>{editCategory ? 'Edit category' : 'New Category Name' }</label>
              <input
                type="text"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
            </div>
            <div className="pb-2">
              <button className="border border-primary" type="submit">
                {editedCategory ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </form>
        <div className="mt-8">
          <h2 className='Edit Categories'>Edit Categories :</h2>
          <ul>
            {categories.map((category) => (
              <li className="bg-gray-200 rounded-xl mb-2 p-2 px-4 flex gap-1 cursor-pointer" key={category._id}>
                <button onClick={() => setEditCategory(category.name)} className="border-none">{category.name}</button>
              </li>

            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
