'use client';

import { useState, useEffect } from 'react';
import { TorreAPI } from '@/lib/torre-api';
import { Analytics } from '@/lib/analytics';
import { TorrePerson } from '@/types/torre';
import SearchBar from '@/components/SearchBar';
import PersonCard from '@/components/PersonCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import UserList from '@/components/UserList';
import { Users, TrendingUp, MapPin, Star, Search, Loader2, AlertCircle, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  const [people, setPeople] = useState<TorrePerson[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<TorrePerson | null>(null);
  const [skillAnalysis, setSkillAnalysis] = useState<any[]>([]);
  const [locationAnalysis, setLocationAnalysis] = useState<any[]>([]);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setPeople([]);
      setSearchPerformed(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const results = await TorreAPI.searchPeopleByName(query, 20);
      setPeople(results);
      setSearchPerformed(true);
      
      // Generate analytics
      if (results.length > 0) {
        setSkillAnalysis(Analytics.analyzeSkills(results));
        setLocationAnalysis(Analytics.analyzeLocations(results));
      }
    } catch (error: any) {
      console.error('Search error:', error);
      setError(error.message || 'Error al buscar personas. Por favor, intenta de nuevo.');
      setPeople([]);
      setSearchPerformed(true);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (person: TorrePerson) => {
    setSelectedPerson(person);
  };

  const handleBackToSearch = () => {
    setSelectedPerson(null);
  };

  if (selectedPerson) {
    return (
      <div className="container mx-auto px-4 py-8">
        <button
          onClick={handleBackToSearch}
          className="btn-secondary mb-6"
        >
          ← Back to Search
        </button>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <PersonCard person={selectedPerson} showSkills={false} />
          </div>
          
          <div className="lg:col-span-2 space-y-6">
            {selectedPerson.skills && selectedPerson.skills.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                  <Star className="h-5 w-5 mr-2" />
                  Skills ({selectedPerson.skills.length})
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {selectedPerson.skills.map((skill, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-background rounded-lg border border-text/10">
                      <span className="font-medium text-text">{skill.name}</span>
                      <span className="text-sm text-text-muted">Level {skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedPerson.experience && selectedPerson.experience.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {selectedPerson.experience.map((exp, index) => (
                    <div key={index} className="border-l-4 border-accent pl-4">
                      <h4 className="font-semibold text-text">{exp.title}</h4>
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
            
            {selectedPerson.education && selectedPerson.education.length > 0 && (
              <div className="card">
                <h3 className="text-lg font-semibold text-text mb-4">Education</h3>
                <div className="space-y-3">
                  {selectedPerson.education.map((edu, index) => (
                    <div key={index} className="p-3 bg-background rounded-lg border border-text/10">
                      <h4 className="font-semibold text-text">{edu.degree}</h4>
                      <p className="text-text-muted">{edu.name}</p>
                      <p className="text-sm text-text-muted">
                        {edu.fromMonth}/{edu.fromYear} - {edu.toMonth ? `${edu.toMonth}/` : ''}{edu.toYear || 'Present'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-text mb-4">
          Torre People Search
        </h1>
        <p className="text-lg text-text-muted max-w-2xl mx-auto">
          Discover talented professionals on Torre. Search by name and explore detailed profiles with skills, experience, and analytics.
        </p>
      </div>

      <div className="max-w-2xl mx-auto mb-8">
        <SearchBar onSearch={handleSearch} />
      </div>

      {loading && (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-accent" />
          <span className="ml-2 text-text-muted">Searching...</span>
        </div>
      )}

      {error && (
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4 flex items-center">
            <AlertCircle className="h-5 w-5 text-red-400 mr-3" />
            <div>
              <h3 className="text-sm font-medium text-red-300">Error en la búsqueda</h3>
              <p className="text-sm text-red-200 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {!loading && searchPerformed && !error && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-text mb-2">
              Search Results ({people.length} people found)
            </h2>
          </div>

          {people.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {people.map((person) => (
                <PersonCard
                  key={person.id}
                  person={person}
                  onViewDetails={handleViewDetails}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <Search className="h-12 w-12 text-text-muted mx-auto mb-4" />
              <h3 className="text-lg font-medium text-text mb-2">No results found</h3>
              <p className="text-text-muted">Try adjusting your search terms or try a different name.</p>
            </div>
          )}

          {people.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-semibold text-text mb-6 text-center">
                Analytics & Insights
              </h2>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {skillAnalysis.length > 0 && (
                  <AnalyticsChart
                    data={skillAnalysis}
                    type="skills"
                    title="Top Skills Distribution"
                  />
                )}
                
                {locationAnalysis.length > 0 && (
                  <AnalyticsChart
                    data={locationAnalysis}
                    type="locations"
                    title="Geographic Distribution"
                  />
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {!loading && !searchPerformed && !error && (
        <div className="space-y-12">
          {/* Popular Users Section */}
          <div className="bg-background-light rounded-lg shadow-sm border border-text/10 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-text flex items-center">
                <Users className="h-6 w-6 mr-2" />
                Popular Users
              </h2>
              <Link 
                href="/users" 
                className="btn-primary flex items-center"
              >
                See more
                <ArrowRight className="h-4 w-4 ml-2" />
              </Link>
            </div>
            
            <UserList 
              title="" 
              limit={6} 
              showRefresh={false} 
            />
          </div>

          {/* Exploration Section */}
          <div className="text-center py-12">
          </div>
        </div>
      )}
    </div>
  );
} 