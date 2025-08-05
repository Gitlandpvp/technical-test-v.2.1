'use client';

import { TorrePerson } from '@/types/torre';
import { MapPin, Briefcase, Star, Users, User } from 'lucide-react';
import { Analytics } from '@/lib/analytics';
import { useState } from 'react';

interface PersonCardProps {
  person: TorrePerson;
  onViewDetails?: (person: TorrePerson) => void;
  showSkills?: boolean;
}

export default function PersonCard({ person, onViewDetails, showSkills = true }: PersonCardProps) {
  const experienceLevel = Analytics.getExperienceLevel(person);
  const topSkills = person.skills?.slice(0, 3) || [];
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };

  const handleImageError = () => {
    console.log(`Error loading image for ${person.name}:`, person.picture);
    setImageError(true);
    setImageLoading(false);
  };

  const renderAvatar = () => {
    if (imageError || !person.picture) {
      return (
        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center border-2 border-text/20">
          <User className="h-8 w-8 text-background" />
        </div>
      );
    }

    return (
      <img
        src={person.picture}
        alt={person.name}
        className="w-16 h-16 rounded-full object-cover border-2 border-text/20"
        onLoad={handleImageLoad}
        onError={handleImageError}
        style={{ display: imageLoading ? 'none' : 'block' }}
      />
    );
  };

  return (
    <div className="card hover:shadow-lg transition-shadow duration-200 hover:border-accent/30">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {imageLoading && !imageError && (
            <div className="w-16 h-16 rounded-full bg-background-light animate-pulse border-2 border-text/20 flex items-center justify-center">
              <div className="w-4 h-4 bg-accent rounded-full animate-ping"></div>
            </div>
          )}
          {renderAvatar()}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-text truncate">
              {person.name}
            </h3>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
              {experienceLevel}
            </span>
          </div>
          
          <p className="text-sm text-text-muted mt-1">{person.headline}</p>
          
          <div className="flex items-center text-sm text-text-muted mt-2">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{person.location?.name || 'Location not specified'}</span>
          </div>
          
          {person.experience && person.experience.length > 0 && (
            <div className="flex items-center text-sm text-text-muted mt-1">
              <Briefcase className="h-4 w-4 mr-1" />
              <span>{person.experience[0].title} at {person.experience[0].name}</span>
            </div>
          )}
          
          {showSkills && topSkills.length > 0 && (
            <div className="mt-3">
              <div className="flex items-center text-sm text-text-muted mb-2">
                <Star className="h-4 w-4 mr-1" />
                <span>Top Skills</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {topSkills.map((skill, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-background text-text border border-text/20"
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {onViewDetails && (
            <button
              onClick={() => onViewDetails(person)}
              className="btn-secondary mt-3 w-full text-sm"
            >
              View Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
} 