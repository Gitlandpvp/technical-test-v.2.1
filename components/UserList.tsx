'use client';

import { useState, useEffect } from 'react';
import { TorrePerson } from '@/types/torre';
import { TorreAPI } from '@/lib/torre-api';
import PersonCard from './PersonCard';
import { Users, Loader2, RefreshCw, ArrowLeft, X, Star, TrendingUp, MapPin, Briefcase, GraduationCap, ExternalLink, Mail } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface UserListProps {
  title?: string;
  limit?: number;
  showRefresh?: boolean;
  showBackButton?: boolean;
}

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

export default function UserList({ 
  title = "Popular Users", 
  limit = 12, 
  showRefresh = true,
  showBackButton = false
}: UserListProps) {
  const [users, setUsers] = useState<TorrePerson[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<TorrePerson | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      // Search for users with popular terms
      const popularTerms = ['developer', 'engineer', 'designer', 'manager'];
      const randomTerm = popularTerms[Math.floor(Math.random() * popularTerms.length)];
      
      const results = await TorreAPI.searchPeopleByName(randomTerm, limit);
      setUsers(results);
    } catch (error: any) {
      console.error('Error loading users:', error);
      setError('Error loading users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleRefresh = () => {
    loadUsers();
  };

  const handleBack = () => {
    router.push('/');
  };

  const handleUserClick = (person: TorrePerson) => {
    setSelectedUser(person);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text mb-6">{title}</h2>
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-accent" />
            <span className="ml-2 text-text-muted">Loading users...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-text mb-6">{title}</h2>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 max-w-md mx-auto">
            <p className="text-red-200">{error}</p>
            {showRefresh && (
              <button
                onClick={handleRefresh}
                className="btn-primary mt-4"
              >
                Try again
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            {showBackButton && (
              <button
                onClick={handleBack}
                className="btn-secondary flex items-center mr-4"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </button>
            )}
            <h2 className="text-2xl font-semibold text-text flex items-center">
              <Users className="h-6 w-6 mr-2" />
              {title} ({users.length})
            </h2>
          </div>
          {showRefresh && (
            <button
              onClick={handleRefresh}
              className="btn-secondary flex items-center"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Update
            </button>
          )}
        </div>

        {users.length > 0 ? (
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
        ) : (
          <div className="text-center py-12">
            <Users className="h-16 w-16 text-text-muted mx-auto mb-4" />
            <h3 className="text-lg font-medium text-text mb-2">No users found</h3>
            <p className="text-text-muted">Try refreshing the list or searching manually..</p>
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