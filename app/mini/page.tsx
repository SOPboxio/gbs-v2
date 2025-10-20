import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface MiniProject {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  dateAdded: string;
}

const miniProjects: MiniProject[] = [
  {
    id: "dinnerdecider",
    title: "Dinner Decider",
    description: "A family-friendly app to help decide what's for dinner. Features voting, spinning wheel, inventory tracking, and shopping list management.",
    url: "/mini/dinnerdecider",
    tags: ["Family", "Food", "Decision Making"],
    dateAdded: "2025-10-20",
  },
];

export default function MiniProjectsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-12">
          <Link
            href="/"
            className="text-sm text-gray-600 hover:text-black mb-4 inline-block"
          >
            ← Back to Home
          </Link>
          <h1 className="text-4xl font-bold mb-4">Mini Projects</h1>
          <div className={`${lato.className} text-gray-700 text-sm leading-relaxed max-w-3xl`}>
            <p className="mb-3">
              These are small weekend projects and experiments - quick builds that solve specific problems
              or explore new ideas. Some are practical tools, others are just for fun. All are learning experiences.
            </p>
            <p>
              Feel free to use any of these tools. They&apos;re all client-side applications that run in your browser.
            </p>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {miniProjects.map((project) => (
            <Link
              key={project.id}
              href={project.url}
              className="group border-2 border-gray-300 p-6 rounded-lg hover:border-black hover:shadow-lg transition-all"
            >
              <h2 className="text-2xl font-bold mb-3 group-hover:text-blue-600">
                {project.title}
              </h2>
              <p className="text-sm text-gray-700 mb-4 leading-relaxed">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-3">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <p className="text-xs text-gray-400">
                Added: {new Date(project.dateAdded).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </Link>
          ))}
        </div>

        {/* Coming Soon */}
        <div className="mt-16 text-center text-gray-500">
          <p className="text-sm">
            More mini projects coming soon. Check back often!
          </p>
        </div>
      </div>
    </div>
  );
}
