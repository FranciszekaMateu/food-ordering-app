
"use client";
import { useState } from "react";
import UserTabs from "@/components/layout/UserTabs";
import Loader from "@/components/layout/Loader";
import useProfile from "@/components/UseProfile";
import toast from "react-hot-toast";
import { useEffect } from "react";

export default function CategoriesPage() {
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const { loading: profileLoading, data: profileData } = useProfile();
  const [editCategory, setEditCategory] = useState(null);
  const [LoadingCategories, setLoadingCategories] = useState(false);
  const fetchCategories = async () => {
    const response = await fetch("/api/categories");
    await response.json().then((data) => {
    setCategories(data)
    setLoadingCategories(true);
    
    });

  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const data = { name: categoryName };
    if (editCategory) {
      data._id = editCategory._id;
    }
    const creationPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/categories", {
        method: editCategory ? 'PUT' :  "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      setEditCategory(null);
        setCategoryName("");
      if (response.ok) {
        resolve();
        fetchCategories();  
      } else {
        reject();
      }
    });

    toast.promise(creationPromise, {
      loading: editCategory ? 'Updating category...' : "Creating Category...",
      success: editCategory ? 'Category updated' : "Category Created",
      error: "Error, try again.",
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
        <form className="mt-8" onSubmit={handleCategorySubmit}>
          <div className="flex gap-2 items-end">
            <div>
              <label>{editCategory ? 'Edit category' : 'New Category Name' }
              {editCategory && ( 
                <>: <b>{editCategory.name}</b> </>
              )}
              </label>
              <input
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </div>
            <div className="pb-2">
              <button className="border border-primary" type="submit">
                {editCategory ? "Edit" : "Create"}
              </button>
            </div>
          </div>
        </form>
        <div className="mt-8">
         <h2 className='Edit Categories'>Edit Categories :</h2>
         {!LoadingCategories && <Loader />}
         {LoadingCategories && (
<ul>
            {categories.map((category) => (
              <li className=" rounded-xl mb-2 p-2 px-4 flex gap-1 cursor-pointer" key={category._id}>
                <button onClick={() => {
                  setEditCategory(category);
                  setCategoryName(category.name);
                }
                } className="border-none">{category.name}</button>    
              </li>

            ))}
          </ul>
          )}  
         {categories.length === 0 && <p>No categories yet</p>}
        
        </div>
      </section>
    </>
  );
}
