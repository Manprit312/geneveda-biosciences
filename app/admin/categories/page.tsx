"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, ChevronDown, ChevronRight, FileText, Eye } from "lucide-react";

interface Subcategory {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  orderIndex: number;
  active: boolean;
  blogs?: Array<{
    id: number;
    title: string;
    slug: string;
    published: boolean;
    views: number;
  }>;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
  orderIndex: number;
  active: boolean;
  subcategories: Subcategory[];
  blogs?: Array<{
    id: number;
    title: string;
    slug: string;
    published: boolean;
    views: number;
  }>;
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedCategories, setExpandedCategories] = useState<Set<number>>(new Set());
  const [expandedSubcategories, setExpandedSubcategories] = useState<Set<number>>(new Set());
  const [deleting, setDeleting] = useState<number | null>(null);
  const [blogCounts, setBlogCounts] = useState<Record<number, number>>({});
  const [subcategoryBlogCounts, setSubcategoryBlogCounts] = useState<Record<number, number>>({});
  const [addingSubcategory, setAddingSubcategory] = useState<number | null>(null);
  const [subcategoryForm, setSubcategoryForm] = useState({
    name: "",
    slug: "",
    description: "",
    orderIndex: 0,
    active: true,
  });

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/categories");
      const data = await response.json();
      if (data.success) {
        // Ensure all categories have subcategories array
        const categoriesWithSubcategories = data.categories.map((cat: any) => ({
          ...cat,
          subcategories: cat.subcategories || [],
        }));
        setCategories(categoriesWithSubcategories);
        // Fetch blog counts after categories are loaded
        fetchBlogCounts(categoriesWithSubcategories);
      }
    } catch (error) {
      console.error("Error fetching categories:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchBlogCounts = async (cats: Category[]) => {
    try {
      // Fetch blogs for each category
      const categoryCounts: Record<number, number> = {};
      const subcategoryCounts: Record<number, number> = {};

      for (const category of cats) {
        const response = await fetch(`/api/newsblogs?categoryId=${category.id}`);
        const data = await response.json();
        if (data.success) {
          categoryCounts[category.id] = data.blogs.length;
        }

        // Fetch blogs for subcategories
        if (category.subcategories && Array.isArray(category.subcategories)) {
          for (const subcategory of category.subcategories) {
            const subResponse = await fetch(`/api/newsblogs?subcategoryId=${subcategory.id}`);
            const subData = await subResponse.json();
            if (subData.success) {
              subcategoryCounts[subcategory.id] = subData.blogs.length;
            }
          }
        }
      }

      setBlogCounts(categoryCounts);
      setSubcategoryBlogCounts(subcategoryCounts);
    } catch (error) {
      console.error("Error fetching blog counts:", error);
    }
  };

  const handleDelete = async (id: number, isSubcategory: boolean = false) => {
    if (!confirm(`Are you sure you want to delete this ${isSubcategory ? "subcategory" : "category"}?`)) {
      return;
    }

    setDeleting(id);
    try {
      const endpoint = isSubcategory ? `/api/subcategories/${id}` : `/api/categories/${id}`;
      const response = await fetch(endpoint, {
        method: "DELETE",
      });

      if (response.ok) {
        await fetchCategories();
      } else {
        const data = await response.json();
        alert(data.error || "Failed to delete");
      }
    } catch (error) {
      console.error("Failed to delete:", error);
      alert("Failed to delete");
    } finally {
      setDeleting(null);
    }
  };

  const toggleExpand = (categoryId: number) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const toggleSubcategoryExpand = (subcategoryId: number) => {
    const newExpanded = new Set(expandedSubcategories);
    if (newExpanded.has(subcategoryId)) {
      newExpanded.delete(subcategoryId);
    } else {
      newExpanded.add(subcategoryId);
    }
    setExpandedSubcategories(newExpanded);
  };

  const fetchCategoryBlogs = async (categoryId: number) => {
    try {
      const response = await fetch(`/api/newsblogs?categoryId=${categoryId}`);
      const data = await response.json();
      if (data.success) {
        setCategories((prev) =>
          prev.map((cat) =>
            cat.id === categoryId ? { ...cat, blogs: data.blogs } : cat
          )
        );
      }
    } catch (error) {
      console.error("Error fetching category blogs:", error);
    }
  };

  const fetchSubcategoryBlogs = async (subcategoryId: number) => {
    try {
      const response = await fetch(`/api/newsblogs?subcategoryId=${subcategoryId}`);
      const data = await response.json();
      if (data.success) {
        setCategories((prev) =>
          prev.map((cat) => ({
            ...cat,
            subcategories: cat.subcategories.map((sub) =>
              sub.id === subcategoryId ? { ...sub, blogs: data.blogs } : sub
            ),
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching subcategory blogs:", error);
    }
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  };

  const handleAddSubcategory = (categoryId: number) => {
    setAddingSubcategory(categoryId);
    setSubcategoryForm({
      name: "",
      slug: "",
      description: "",
      orderIndex: 0,
      active: true,
    });
  };

  const handleCancelSubcategory = () => {
    setAddingSubcategory(null);
    setSubcategoryForm({
      name: "",
      slug: "",
      description: "",
      orderIndex: 0,
      active: true,
    });
  };

  const handleSubmitSubcategory = async (categoryId: number) => {
    if (!subcategoryForm.name || !subcategoryForm.slug) {
      alert("Please fill in name and slug");
      return;
    }

    try {
      const response = await fetch("/api/subcategories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...subcategoryForm,
          categoryId: categoryId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        await fetchCategories();
        handleCancelSubcategory();
      } else {
        const errorMessage = data.error || "Failed to create subcategory";
        alert(errorMessage);
        // If slug conflict, suggest auto-generating a new slug
        if (errorMessage.includes("already exists") && errorMessage.includes("slug")) {
          const newSlug = `${subcategoryForm.slug}-${Date.now().toString().slice(-4)}`;
          setSubcategoryForm({ ...subcategoryForm, slug: newSlug });
        }
      }
    } catch (error) {
      console.error("Failed to create subcategory:", error);
      alert("Failed to create subcategory");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Categories & NewsBlogs
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage categories, subcategories, and NewsBlogs content
          </p>
        </div>
        <Link
          href="/admin/categories/new"
          className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
        >
          <Plus className="w-5 h-5" />
          New Category
        </Link>
      </div>

      {categories.length === 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400 text-xl mb-4">
            No categories found.
          </p>
          <Link
            href="/admin/categories/new"
            className="inline-block bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
          >
            Create Your First Category
          </Link>
        </div>
      ) : (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {categories.map((category) => (
              <div key={category.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <button
                      onClick={() => {
                        toggleExpand(category.id);
                        if (!expandedCategories.has(category.id)) {
                          fetchCategoryBlogs(category.id);
                        }
                      }}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      {expandedCategories.has(category.id) ? (
                        <ChevronDown className="w-5 h-5" />
                      ) : (
                        <ChevronRight className="w-5 h-5" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-center gap-3">
                        <div className="font-semibold text-lg text-gray-900 dark:text-white">
                          {category.name}
                        </div>
                        {blogCounts[category.id] !== undefined && (
                          <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {blogCounts[category.id]} blogs
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">
                        Slug: {category.slug} | Order: {category.orderIndex} |
                        {category.active ? (
                          <span className="text-green-600 dark:text-green-400 ml-2">Active</span>
                        ) : (
                          <span className="text-gray-400 ml-2">Inactive</span>
                        )}
                      </div>
                      {category.description && (
                        <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                          {category.description}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/categories/${category.id}/blogs/new`}
                      className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-4 py-2 rounded-lg font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Blog
                    </Link>
                    <Link
                      href={`/admin/categories/${category.id}/edit`}
                      className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-4 py-2 rounded-lg font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-2"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </Link>
                    <Link
                      href={`/admin/categories/${category.id}/subcategories/new`}
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-4 py-2 rounded-lg font-semibold hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" />
                      Add Subcategory
                    </Link>
                    <button
                      onClick={() => handleDelete(category.id, false)}
                      disabled={deleting === category.id}
                      className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-4 py-2 rounded-lg font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-2 disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>

                {/* Category Blogs */}
                {expandedCategories.has(category.id) && category.blogs && (
                  <div className="mt-4 ml-8 border-l-2 border-emerald-200 dark:border-emerald-800 pl-4">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Blogs in {category.name}
                      </h3>
                      <Link
                        href={`/admin/categories/${category.id}/blogs/new`}
                        className="text-sm text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        Add Blog
                      </Link>
                    </div>
                    {category.blogs.length === 0 ? (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        No blogs in this category yet.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {category.blogs.map((blog) => (
                          <div
                            key={blog.id}
                            className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 p-3 rounded-lg"
                          >
                            <div className="flex-1">
                              <div className="font-medium text-gray-900 dark:text-white">
                                {blog.title}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                <span>Slug: {blog.slug}</span>
                                <span className="flex items-center gap-1">
                                  <Eye className="w-3 h-3" />
                                  {blog.views} views
                                </span>
                                {blog.published ? (
                                  <span className="text-green-600 dark:text-green-400">Published</span>
                                ) : (
                                  <span className="text-yellow-600 dark:text-yellow-400">Draft</span>
                                )}
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              <Link
                                href={`/admin/categories/${category.id}/blogs/${blog.id}/edit`}
                                className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded text-sm font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors"
                              >
                                Edit
                              </Link>
                              <button
                                onClick={async () => {
                                  if (!confirm("Delete this blog?")) return;
                                  try {
                                    const response = await fetch(`/api/newsblogs/${blog.id}`, {
                                      method: "DELETE",
                                    });
                                    if (response.ok) {
                                      fetchCategoryBlogs(category.id);
                                    }
                                  } catch (error) {
                                    alert("Failed to delete blog");
                                  }
                                }}
                                className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded text-sm font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Subcategories */}
                {expandedCategories.has(category.id) && (
                  <div className="mt-4 ml-8 border-l-2 border-gray-200 dark:border-gray-700 pl-4 space-y-3">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300">
                        Subcategories
                      </h3>
                      {!addingSubcategory && (
                        <button
                          onClick={() => handleAddSubcategory(category.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2"
                        >
                          <Plus className="w-4 h-4" />
                          Add Subcategory
                        </button>
                      )}
                    </div>

                    {/* Add Subcategory Form */}
                    {addingSubcategory === category.id && (
                      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-3">
                        <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-3">
                          Add New Subcategory
                        </h4>
                        <div className="space-y-3">
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Name *
                            </label>
                            <input
                              type="text"
                              value={subcategoryForm.name}
                              onChange={(e) => {
                                const name = e.target.value;
                                setSubcategoryForm({
                                  ...subcategoryForm,
                                  name,
                                  slug: subcategoryForm.slug || generateSlug(name),
                                });
                              }}
                              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="e.g., AI & ML"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Slug *
                            </label>
                            <input
                              type="text"
                              value={subcategoryForm.slug}
                              onChange={(e) =>
                                setSubcategoryForm({ ...subcategoryForm, slug: e.target.value })
                              }
                              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="e.g., ai-ml"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                              Description
                            </label>
                            <textarea
                              value={subcategoryForm.description}
                              onChange={(e) =>
                                setSubcategoryForm({ ...subcategoryForm, description: e.target.value })
                              }
                              rows={2}
                              className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              placeholder="Optional description"
                            />
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="flex-1">
                              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                                Order Index
                              </label>
                              <input
                                type="number"
                                value={subcategoryForm.orderIndex}
                                onChange={(e) =>
                                  setSubcategoryForm({
                                    ...subcategoryForm,
                                    orderIndex: parseInt(e.target.value) || 0,
                                  })
                                }
                                className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                              />
                            </div>
                            <div className="flex items-center pt-6">
                              <input
                                type="checkbox"
                                id={`active-${category.id}`}
                                checked={subcategoryForm.active}
                                onChange={(e) =>
                                  setSubcategoryForm({ ...subcategoryForm, active: e.target.checked })
                                }
                                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                              />
                              <label
                                htmlFor={`active-${category.id}`}
                                className="ml-2 text-xs font-semibold text-gray-700 dark:text-gray-300"
                              >
                                Active
                              </label>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSubmitSubcategory(category.id)}
                              className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors"
                            >
                              Create Subcategory
                            </button>
                            <button
                              onClick={handleCancelSubcategory}
                              className="flex-1 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {category.subcategories.length === 0 && !addingSubcategory && (
                      <div className="bg-gray-50 dark:bg-gray-700/50 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                          No subcategories yet.
                        </p>
                        <button
                          onClick={() => handleAddSubcategory(category.id)}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                        >
                          <Plus className="w-4 h-4" />
                          Add Your First Subcategory
                        </button>
                      </div>
                    )}

                    {category.subcategories.length > 0 && (
                      <>
                        {category.subcategories.map((subcategory) => (
                      <div
                        key={subcategory.id}
                        className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3 flex-1">
                            <button
                              onClick={() => {
                                toggleSubcategoryExpand(subcategory.id);
                                if (!expandedSubcategories.has(subcategory.id)) {
                                  fetchSubcategoryBlogs(subcategory.id);
                                }
                              }}
                              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                            >
                              {expandedSubcategories.has(subcategory.id) ? (
                                <ChevronDown className="w-4 h-4" />
                              ) : (
                                <ChevronRight className="w-4 h-4" />
                              )}
                            </button>
                            <div className="flex-1">
                              <div className="flex items-center gap-3">
                                <div className="font-semibold text-gray-900 dark:text-white">
                                  {subcategory.name}
                                </div>
                                {subcategoryBlogCounts[subcategory.id] !== undefined && (
                                  <span className="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                                    <FileText className="w-3 h-3" />
                                    {subcategoryBlogCounts[subcategory.id]} blogs
                                  </span>
                                )}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                Slug: {subcategory.slug} | Order: {subcategory.orderIndex} |
                                {subcategory.active ? (
                                  <span className="text-green-600 dark:text-green-400 ml-2">Active</span>
                                ) : (
                                  <span className="text-gray-400 ml-2">Inactive</span>
                                )}
                              </div>
                              {subcategory.description && (
                                <div className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                  {subcategory.description}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Link
                              href={`/admin/categories/${category.id}/subcategories/${subcategory.id}/blogs/new`}
                              className="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 px-3 py-1.5 rounded font-semibold hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors flex items-center gap-1 text-sm"
                            >
                              <Plus className="w-3 h-3" />
                              Add Blog
                            </Link>
                            <Link
                              href={`/admin/subcategories/${subcategory.id}/edit`}
                              className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-3 py-1.5 rounded font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50 transition-colors flex items-center gap-1 text-sm"
                            >
                              <Edit className="w-3 h-3" />
                              Edit
                            </Link>
                            <button
                              onClick={() => handleDelete(subcategory.id, true)}
                              disabled={deleting === subcategory.id}
                              className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1.5 rounded font-semibold hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors flex items-center gap-1 text-sm disabled:opacity-50"
                            >
                              <Trash2 className="w-3 h-3" />
                              Delete
                            </button>
                          </div>
                        </div>

                        {/* Subcategory Blogs */}
                        {expandedSubcategories.has(subcategory.id) && (
                          <div className="mt-3 ml-6 border-l-2 border-blue-200 dark:border-blue-800 pl-4">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="text-sm font-semibold text-gray-600 dark:text-gray-400">
                                Blogs in {subcategory.name}
                              </h4>
                              <Link
                                href={`/admin/categories/${category.id}/subcategories/${subcategory.id}/blogs/new`}
                                className="text-xs text-purple-600 dark:text-purple-400 hover:underline flex items-center gap-1"
                              >
                                <Plus className="w-3 h-3" />
                                Add Blog
                              </Link>
                            </div>
                            {subcategory.blogs && subcategory.blogs.length === 0 ? (
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                No blogs in this subcategory yet.
                              </p>
                            ) : (
                              subcategory.blogs && (
                                <div className="space-y-2">
                                  {subcategory.blogs.map((blog) => (
                                    <div
                                      key={blog.id}
                                      className="flex items-center justify-between bg-white dark:bg-gray-800 p-2 rounded"
                                    >
                                      <div className="flex-1">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                          {blog.title}
                                        </div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400 flex items-center gap-2 mt-1">
                                          <span>{blog.slug}</span>
                                          <span className="flex items-center gap-1">
                                            <Eye className="w-3 h-3" />
                                            {blog.views}
                                          </span>
                                          {blog.published ? (
                                            <span className="text-green-600 dark:text-green-400">Published</span>
                                          ) : (
                                            <span className="text-yellow-600 dark:text-yellow-400">Draft</span>
                                          )}
                                        </div>
                                      </div>
                                      <div className="flex items-center gap-1">
                                        <Link
                                          href={`/admin/categories/${category.id}/subcategories/${subcategory.id}/blogs/${blog.id}/edit`}
                                          className="bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 px-2 py-1 rounded text-xs font-semibold hover:bg-emerald-200 dark:hover:bg-emerald-900/50"
                                        >
                                          Edit
                                        </Link>
                                        <button
                                          onClick={async () => {
                                            if (!confirm("Delete this blog?")) return;
                                            try {
                                              const response = await fetch(`/api/newsblogs/${blog.id}`, {
                                                method: "DELETE",
                                              });
                                              if (response.ok) {
                                                fetchSubcategoryBlogs(subcategory.id);
                                              }
                                            } catch (error) {
                                              alert("Failed to delete blog");
                                            }
                                          }}
                                          className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-2 py-1 rounded text-xs font-semibold hover:bg-red-200 dark:hover:bg-red-900/50"
                                        >
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )
                            )}
                          </div>
                        )}
                      </div>
                    ))}
                      </>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
