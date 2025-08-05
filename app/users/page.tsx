'use client';

import { useState } from 'react';
import UserList from '@/components/UserList';
import CategoryUserList from '@/components/CategoryUserList';
import { Users, Grid, Filter } from 'lucide-react';

export default function UsersPage() {
  const [viewMode, setViewMode] = useState<'popular' | 'categories'>('popular');

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-light shadow-sm border-b border-text/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text flex items-center">
                <Users className="h-8 w-8 mr-3" />
                Explore Users
              </h1>
              <p className="text-text-muted mt-2">
                Discover talented professionals in Torre
              </p>
            </div>
            
            {/* View Mode Toggle */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('popular')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  viewMode === 'popular'
                    ? 'bg-accent text-background'
                    : 'bg-background text-text hover:bg-background-light border border-text/20'
                }`}
              >
                <Grid className="h-4 w-4 mr-2" />
                Popular
              </button>
              <button
                onClick={() => setViewMode('categories')}
                className={`flex items-center px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  viewMode === 'categories'
                    ? 'bg-accent text-background'
                    : 'bg-background text-text hover:bg-background-light border border-text/20'
                }`}
              >
                <Filter className="h-4 w-4 mr-2" />
                By Categories
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        {viewMode === 'popular' ? (
          <UserList 
            title="Popular Users" 
            limit={16} 
            showRefresh={true}
            showBackButton={true}
          />
        ) : (
          <CategoryUserList 
            selectedCategory="developers" 
            limit={12} 
          />
        )}
      </div>

      {/* Footer Info */}
      <div className="bg-background-light border-t border-text/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="text-center text-text-muted">
            <p className="text-sm">
              The users displayed are obtained from the Torre API.
              <br />
              Update the list to discover new professionals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
} 