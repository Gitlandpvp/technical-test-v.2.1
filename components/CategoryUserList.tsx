'use client';

import { useState, useEffect } from 'react';
import { TorrePerson } from '@/types/torre';
import { TorreAPI } from '@/lib/torre-api';
import PersonCard from './PersonCard';
import { Users, Loader2, Code, Palette, Briefcase, Database, Globe, X, Star, TrendingUp, MapPin, Briefcase as BriefcaseIcon, GraduationCap, ExternalLink, Mail } from 'lucide-react';

interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  searchTerms: string[];
}

const categories: Category[] = [
  {
    id: 'developers',
    name: 'Developers',
    icon: <Code className="h-5 w-5" />,
    searchTerms: ['developer', 'programmer', 'software engineer']
  },
  {
    id: 'designers',
    name: 'Designers',
    icon: <Palette className="h-5 w-5" />,
    searchTerms: ['designer', 'ui designer', 'ux designer']
  },
  {
    id: 'managers',
    name: 'Managers',
    icon: <Briefcase className="h-5 w-5" />,
    searchTerms: ['manager', 'project manager', 'product manager']
  },
  {
    id: 'data',
    name: 'Data Scientists',
    icon: <Database className="h-5 w-5" />,
    searchTerms: ['data scientist', 'analyst', 'machine learning']
  },
  {
    id: 'marketing',
    name: 'Marketing',
    icon: <Globe className="h-5 w-5" />,
    searchTerms: ['marketing', 'digital marketing', 'growth']
  }
];

// Modal component for user details
function UserDetailModal({ person, isOpen, onClose }: { 
  person: TorrePerson | null; 
  isOpen: boolean; 
  onClose: () => void; 
}) {
  if (!isOpen || !person) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-text/10">
          <h2 className="text-xl font-semibold text-text">User Details</h2>
          <button
            onClick={onClose}
            className="text-text-muted hover:text-text transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* User Info */}
          <div className="flex items-start space-x-4">
            <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center border-2 border-text/20">
              <Users className="h-10 w-10 text-background" />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-text">{person.name}</h3>
              <p className="text-text-muted mt-1">{person.headline}</p>
              <div className="flex items-center text-sm text-text-muted mt-2">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{person.location?.name || 'Location not specified'}</span>
              </div>
            </div>
          </div>

          {/* Skills */}
          {person.skills && person.skills.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-text mb-3 flex items-center">
                <Star className="h-5 w-5 mr-2" />
                Skills ({person.skills.length})
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {person.skills.map((skill, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-background-light rounded border border-text/10">
                    <span className="font-medium text-text">{skill.name}</span>
                    <span className="text-sm text-text-muted">Level {skill.level}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience */}
          {person.experience && person.experience.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-text mb-3 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Experience
              </h4>
              <div className="space-y-3">
                {person.experience.map((exp, index) => (
                  <div key={index} className="border-l-4 border-accent pl-4">
                    <h5 className="font-semibold text-text">{exp.title}</h5>
                    <p className="text-text-muted">{exp.name}</p>
                    <p className="text-sm text-text-muted">
                      {exp.fromMonth}/{exp.fromYear} - {exp.toMonth ? `${exp.toMonth}/` : ''}{exp.toYear || 'Present'}
                    </p>
                    {exp.description && (
                      <p className="text-sm text-text-muted mt-2">{exp.description}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Education */}
          {person.education && person.education.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-text mb-3 flex items-center">
                <GraduationCap className="h-5 w-5 mr-2" />
                Education
              </h4>
              <div className="space-y-3">
                {person.education.map((edu, index) => (
                  <div key={index} className="p-3 bg-background-light rounded border border-text/10">
                    <h5 className="font-semibold text-text">{edu.degree}</h5>
                    <p className="text-text-muted">{edu.name}</p>
                    <p className="text-sm text-text-muted">
                      {edu.fromMonth}/{edu.fromYear} - {edu.toMonth ? `${edu.toMonth}/` : ''}{edu.toYear || 'Present'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Info */}
          {person.interests && person.interests.length > 0 && (
            <div>
              <h4 className="text-lg font-semibold text-text mb-3">Interests</h4>
              <div className="flex flex-wrap gap-2">
                {person.interests.map((interest, index) => (
                  <span key={index} className="text-xs bg-accent/20 text-accent px-2 py-1 rounded">
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-text/10">
          <div className="flex space-x-3">
            <a
              href={`https://torre.co/${person.username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary flex items-center"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Profile
            </a>
            <button
              onClick={() => {
                // Open default email client with pre-filled subject and body
                const subject = encodeURIComponent(`Interested in connecting with ${person.name}`);
                const body = encodeURIComponent(`Hi ${person.name},\n\nI found your profile on Torre and I'm interested in connecting with you.\n\nBest regards,`);
                window.open(`mailto:?subject=${subject}&body=${body}`, '_blank');
              }}
              className="btn-secondary flex items-center"
            >
              <Mail className="h-4 w-4 mr-2" />
              Contact User
            </button>
          </div>
          <button
            onClick={onClose}
            className="btn-secondary"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

interface CategoryUserListProps {
  selectedCategory?: string;
  limit?: number;
}

export default function CategoryUserList({ 
  selectedCategory = 'developers', 
  limit = 8 
}: CategoryUserListProps) {
  const [users, setUsers] = useState<TorrePerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [selectedUser, setSelectedUser] = useState<TorrePerson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loadUsersByCategory = async (categoryId: string) => {
    setLoading(true);
    setError(null);
    try {
      const category = categories.find(c => c.id === categoryId);
      if (!category) return;

      const randomTerm = category.searchTerms[Math.floor(Math.random() * category.searchTerms.length)];
      const results = await TorreAPI.searchPeopleByName(randomTerm, limit);
      setUsers(results);
    } catch (error: any) {
      console.error('Error loading users by category:', error);
      setError('Error loading users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsersByCategory(activeCategory);
  }, [activeCategory]);

  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  const handleUserClick = (person: TorrePerson) => {
    setSelectedUser(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-text mb-4">Explore by Categories</h2>
          <p className="text-lg text-text-muted">Discover talented professionals in different areas</p>
        </div>

        {/* Categorías */}
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                activeCategory === category.id
                  ? 'bg-accent text-background'
                  : 'bg-background-light text-text hover:bg-background-dark border border-text/20'
              }`}
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </button>
          ))}
        </div>

        {/* Contenido de la categoría */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-semibold text-text flex items-center">
              {categories.find(c => c.id === activeCategory)?.icon}
              <span className="ml-2">{categories.find(c => c.id === activeCategory)?.name}</span>
            </h3>
            {loading && (
              <div className="flex items-center text-sm text-text-muted">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Cargando...
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 mb-6">
            <p className="text-red-200">{error}</p>
            <button
              onClick={() => loadUsersByCategory(activeCategory)}
              className="btn-primary mt-2"
            >
              Try again
            </button>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {users.map((user) => (
              <div 
                key={user.id} 
                onClick={() => handleUserClick(user)}
                className="cursor-pointer"
              >
                <PersonCard
                  person={user}
                  showSkills={false}
                />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && users.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text mb-2">No users found</h3>
            <p className="text-text-muted">Try changing categories or searching manually.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      <UserDetailModal 
        person={selectedUser}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </>
  );
} 