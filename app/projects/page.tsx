interface Project {
  id: string;
  title: string;
  description: string;
  status: "active" | "upcoming" | "placeholder";
}

const projects: Project[] = [
  {
    id: "sopbox",
    title: "SOPbox",
    description: "A Chrome extension that provides SOPs and Checklists for streamlined workflows",
    status: "active",
  },
  {
    id: "pink-cow",
    title: "Pink Cow",
    description: "A SaaS, iOS, and Android service supporting Special Education Instructors",
    status: "active",
  },
  {
    id: "two-friends",
    title: "TwoFriends",
    description: "An upcoming hardware project that helps friends and families stay in touch",
    status: "upcoming",
  },
  {
    id: "project-4",
    title: "Coming Soon",
    description: "Future project slot",
    status: "placeholder",
  },
  {
    id: "project-5",
    title: "Coming Soon",
    description: "Future project slot",
    status: "placeholder",
  },
  {
    id: "project-6",
    title: "Coming Soon",
    description: "Future project slot",
    status: "placeholder",
  },
];

export default function Projects() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-12 text-center">PROJECTS.</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className={`aspect-square border-4 border-black p-8 flex flex-col justify-between ${
                project.status === "placeholder" ? "opacity-50" : ""
              } hover:shadow-lg transition-shadow`}
            >
              <div>
                <h2 className="text-2xl font-bold mb-4">{project.title.toUpperCase()}</h2>
                <p className="text-gray-700">{project.description}</p>
              </div>
              {project.status === "upcoming" && (
                <p className="text-sm font-bold text-gray-500 mt-4">COMING SOON</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}