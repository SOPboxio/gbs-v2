import Image from "next/image";
import Link from "next/link";
import { Lato } from "next/font/google";

const lato = Lato({ 
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
});

interface Project {
  id: string;
  title: string;
  description: string;
  testimonial?: string;
  testimonialAuthor?: string;
  webUrl?: string;
  status?: string;
  milestone?: string;
  bestMetric?: string;
  contact?: string;
  logo?: string;
  comingSoon?: boolean;
  lastUpdated?: string;
}

const projects: Project[] = [
  {
    id: "sopbox",
    title: "SOPbox",
    description: "A Chrome extension that provides SOPs and Checklists for streamlined workflows",
    testimonial: "This is a testimonial of monumental proportions and not to be taken lightly.",
    testimonialAuthor: "M. Pinkowski",
    webUrl: "sopbox-main.vercel.app",
    status: "v2 in Dev. Beta target is Sept 1",
    milestone: "Checklists, SOPs are scaffolded",
    bestMetric: "",
    contact: "support@sopbox.io",
    logo: "/sopbox-logo.png",
    lastUpdated: "July 7, 2025",
  },
  {
    id: "pink-cow",
    title: "PINK COW",
    description: "A SaaS, iOS, and Android service supporting Special Education Instructors",
    logo: "/pinkcow-logo.png",
  },
  {
    id: "two-friends",
    title: "TWOFRIENDS",
    description: "An upcoming hardware project that helps friends and families stay in touch",
    comingSoon: true,
    logo: "/twofriends-logo.png",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start mb-16">
          {/* Text Area - now 2/3 width */}
          <div className="md:col-span-2">
            <div className={`bg-gray-50 p-6 rounded-lg border border-gray-200 ${lato.className}`}>
              <p className="text-gray-700 text-sm leading-relaxed mb-3">
                For many years I have ended team meetings with &ldquo;Go, Be, Great&rdquo; or &ldquo;Go. Be. STRONG&rdquo;. It was my attempt to end a gathering on an upbeat note. Encouraging each attendee to:
              </p>
              <ul className="text-gray-700 text-sm list-disc list-inside mb-3 space-y-1">
                <li><strong>Go</strong> - Take action. Move forward. Tackle a problem. Seize an opportunity.</li>
                <li><strong>Be</strong> - Be world class. Be an athlete, Be in love. Be YOU! The real you.</li>
                <li><strong>Strong</strong> - Fearless, Confident, Tenacious, and Durable. Focus on your strengths.</li>
              </ul>
              <p className="text-gray-700 text-sm leading-relaxed">
                And now in my late 60s, I am still trying to &ldquo;walk that talk&rdquo;. Listed here are some of the projects that I am working on. Some are for me. Some are for family and friends. Most are experiments to see how far I can push my love of vibecoding. If you are a member of my alumni association (or if we&apos;ve never even met) I would love to hear from you and look for ways that I could help you in your journey. Peace and Love, Michael
              </p>
            </div>
          </div>
          
          {/* Avatar */}
          <div className="flex justify-center md:justify-end">
            <div className="w-56 h-72 overflow-hidden border-2 border-gray-300 drop-shadow-lg">
              <Image
                src="/michael-avatar.jpeg"
                alt="Michael Pinkowski"
                width={224}
                height={288}
                className="object-cover w-full h-full"
              />
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div>
          <h1 className="text-4xl font-bold mb-12 text-center">PROJECTS</h1>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                className="h-96 border-4 border-black p-6 flex flex-col relative"
              >
                {/* Project Logo in top right */}
                {project.logo && (
                  <div className="absolute top-4 right-4 w-12 h-12 drop-shadow-md">
                    {project.id === "sopbox" ? (
                      <a href="https://sopbox.io" target="_blank" rel="noopener noreferrer" className="block">
                        <Image
                          src={project.logo}
                          alt={`${project.title} logo`}
                          width={48}
                          height={48}
                          className="object-contain w-full h-full hover:opacity-80 transition-opacity"
                        />
                      </a>
                    ) : (
                      <Image
                        src={project.logo}
                        alt={`${project.title} logo`}
                        width={48}
                        height={48}
                        className="object-contain w-full h-full"
                      />
                    )}
                  </div>
                )}
                
                <h2 className="text-2xl font-bold mb-4">{project.title}</h2>
                <p className="text-sm mb-4">{project.description}</p>
                
                {project.testimonial && (
                  <div className="bg-gray-100 p-3 rounded mb-4 flex-grow">
                    <p className="text-sm italic">{project.testimonial}</p>
                    <p className="text-xs mt-2">- {project.testimonialAuthor}</p>
                  </div>
                )}
                
                {project.comingSoon && (
                  <div className="mt-auto">
                    <p className="text-sm font-bold text-gray-500">COMING SOON</p>
                  </div>
                )}
                
                {project.webUrl && (
                  <div className="mt-auto space-y-1 text-xs">
                    <p>
                      <span className="font-bold">Web:</span>{" "}
                      <a 
                        href={`https://${project.webUrl}`} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="font-normal text-blue-600 hover:underline"
                      >
                        {project.webUrl}
                      </a>
                    </p>
                    <p><span className="font-bold">Status/Ver:</span> <span className="font-normal">{project.status}</span></p>
                    <p><span className="font-bold">Latest Milestone:</span> <span className="font-normal">{project.milestone}</span></p>
                    <p><span className="font-bold">Best Metric:</span> <span className="font-normal">{project.bestMetric}</span></p>
                    <p><span className="font-bold">Contact:</span> <span className="font-normal">{project.contact}</span></p>
                    {project.lastUpdated && (
                      <p className="text-gray-400 text-[10px] mt-2">Updated: {project.lastUpdated}</p>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Mini Projects Link */}
        <div className="mt-16 text-center">
          <Link
            href="/mini"
            className="inline-block px-8 py-3 bg-gray-100 hover:bg-gray-200 border-2 border-gray-300 rounded-lg text-gray-800 font-semibold transition-all hover:border-black"
          >
            🧪 Explore Mini Projects →
          </Link>
          <p className="mt-3 text-sm text-gray-600">
            Weekend experiments and quick builds
          </p>
        </div>
      </div>
    </div>
  );
}