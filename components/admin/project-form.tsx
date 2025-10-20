"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface ProjectFormData {
  title: string;
  slug: string;
  logo_url: string;
  live_url: string;
  description: string;
  testimonial: string;
  testimonial_author: string;
  test_url: string;
  status: string;
  version: string;
  latest_milestone: string;
  best_metric: string;
  contact_email: string;
  is_published: boolean;
}

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<void>;
  submitLabel?: string;
}

const defaultFormData: ProjectFormData = {
  title: "",
  slug: "",
  logo_url: "",
  live_url: "",
  description: "",
  testimonial: "",
  testimonial_author: "",
  test_url: "",
  status: "Development",
  version: "",
  latest_milestone: "",
  best_metric: "",
  contact_email: "",
  is_published: false,
};

export default function ProjectForm({ initialData, onSubmit, submitLabel = "Save" }: ProjectFormProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<ProjectFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      await onSubmit(formData);
      router.push("/admin/dashboard");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setLoading(false);
    }
  };

  const generateSlug = () => {
    const slug = formData.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '');
    setFormData(prev => ({ ...prev, slug }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200">
      <div className="space-y-8 divide-y divide-gray-200">
        <div>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Project Information</h3>
            <p className="mt-1 text-sm text-gray-500">Basic details about your project.</p>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-4">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                name="title"
                id="title"
                required
                value={formData.title}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-4">
              <label htmlFor="slug" className="block text-sm font-medium text-gray-700">
                Slug
              </label>
              <div className="mt-1 flex rounded-md shadow-sm">
                <input
                  type="text"
                  name="slug"
                  id="slug"
                  required
                  value={formData.slug}
                  onChange={handleChange}
                  className="flex-1 block w-full rounded-md border-gray-300 focus:border-black focus:ring-black sm:text-sm"
                />
                <button
                  type="button"
                  onClick={generateSlug}
                  className="ml-3 inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
                >
                  Generate
                </button>
              </div>
            </div>

            <div className="sm:col-span-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              >
                <option value="Development">Development</option>
                <option value="Beta">Beta</option>
                <option value="Live">Live</option>
                <option value="Archived">Archived</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="version" className="block text-sm font-medium text-gray-700">
                Version
              </label>
              <input
                type="text"
                name="version"
                id="version"
                value={formData.version}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-2">
              <div className="flex items-center">
                <input
                  id="is_published"
                  name="is_published"
                  type="checkbox"
                  checked={formData.is_published}
                  onChange={handleChange}
                  className="h-4 w-4 text-black focus:ring-black border-gray-300 rounded"
                />
                <label htmlFor="is_published" className="ml-2 block text-sm text-gray-900">
                  Published
                </label>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">URLs and Contact</h3>
            <p className="mt-1 text-sm text-gray-500">Links and contact information.</p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label htmlFor="logo_url" className="block text-sm font-medium text-gray-700">
                Logo URL
              </label>
              <input
                type="url"
                name="logo_url"
                id="logo_url"
                value={formData.logo_url}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="live_url" className="block text-sm font-medium text-gray-700">
                Live URL
              </label>
              <input
                type="url"
                name="live_url"
                id="live_url"
                value={formData.live_url}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="test_url" className="block text-sm font-medium text-gray-700">
                Test URL
              </label>
              <input
                type="url"
                name="test_url"
                id="test_url"
                value={formData.test_url}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                Contact Email
              </label>
              <input
                type="email"
                name="contact_email"
                id="contact_email"
                value={formData.contact_email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>
          </div>
        </div>

        <div className="pt-8">
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900">Additional Information</h3>
            <p className="mt-1 text-sm text-gray-500">Testimonials, milestones, and metrics.</p>
          </div>
          
          <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
            <div className="sm:col-span-6">
              <label htmlFor="testimonial" className="block text-sm font-medium text-gray-700">
                Testimonial
              </label>
              <textarea
                id="testimonial"
                name="testimonial"
                rows={3}
                value={formData.testimonial}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="testimonial_author" className="block text-sm font-medium text-gray-700">
                Testimonial Author
              </label>
              <input
                type="text"
                name="testimonial_author"
                id="testimonial_author"
                value={formData.testimonial_author}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="latest_milestone" className="block text-sm font-medium text-gray-700">
                Latest Milestone
              </label>
              <input
                type="text"
                name="latest_milestone"
                id="latest_milestone"
                value={formData.latest_milestone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>

            <div className="sm:col-span-3">
              <label htmlFor="best_metric" className="block text-sm font-medium text-gray-700">
                Best Metric
              </label>
              <input
                type="text"
                name="best_metric"
                id="best_metric"
                value={formData.best_metric}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-black focus:ring-black sm:text-sm"
              />
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-md bg-red-50 p-4">
          <p className="text-sm text-red-800">{error}</p>
        </div>
      )}

      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.back()}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-50"
          >
            {loading ? "Saving..." : submitLabel}
          </button>
        </div>
      </div>
    </form>
  );
}