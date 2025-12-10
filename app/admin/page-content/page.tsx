"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Plus, Edit, Trash2, FileText, Search } from "lucide-react";

export default function AdminPageContentPage() {
  const [pageContents, setPageContents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState("home");
  const [searchTerm, setSearchTerm] = useState("");

  const pages = ["home", "training", "study-abroad", "bioinformatics", "ngs", "amr", "aptamers", "rd-services"];

  useEffect(() => {
    fetchPageContent();
  }, [selectedPage]);

  const fetchPageContent = async () => {
    try {
      const response = await fetch(`/api/admin/page-content?pageSlug=${selectedPage}&activeOnly=false`);
      const data = await response.json();
      if (data.success) {
        setPageContents(data.content || []);
      }
    } catch (error) {
      console.error("Error fetching page content:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this content?")) return;

    try {
      const response = await fetch(`/api/admin/page-content/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchPageContent();
      }
    } catch (error) {
      console.error("Error deleting page content:", error);
      alert("Failed to delete page content");
    }
  };

  const filteredContent = pageContents.filter((content) =>
    content.section_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (content.title && content.title.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Page Content</h1>
        <Link
          href={`/admin/page-content/new?page=${selectedPage}`}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Section
        </Link>
      </div>

      <div className="mb-4 flex gap-4">
        <select
          value={selectedPage}
          onChange={(e) => {
            setSelectedPage(e.target.value);
            setLoading(true);
          }}
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        >
          {pages.map((page) => (
            <option key={page} value={page}>
              {page.charAt(0).toUpperCase() + page.slice(1).replace("-", " ")}
            </option>
          ))}
        </select>

        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search sections..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredContent.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500">
            No content found for this page
          </div>
        ) : (
          filteredContent.map((content) => (
            <div
              key={content.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg">
                    <FileText className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {content.section_key}
                    </h3>
                    {content.title && (
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {content.title}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {content.content && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                  {content.content.replace(/<[^>]*>/g, "").substring(0, 100)}...
                </p>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-gray-200 dark:border-gray-700">
                <span
                  className={`px-2 py-1 text-xs rounded-full ${
                    content.active
                      ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                      : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400"
                  }`}
                >
                  {content.active ? "Active" : "Inactive"}
                </span>
                <div className="flex gap-2">
                  <Link
                    href={`/admin/page-content/${content.id}/edit`}
                    className="text-emerald-600 hover:text-emerald-900 dark:text-emerald-400 dark:hover:text-emerald-300"
                  >
                    <Edit className="w-5 h-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(content.id)}
                    className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}








