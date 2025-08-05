'use client';

import { useState } from 'react';
import { TorreAPI } from '@/lib/torre-api';
import { TorrePerson } from '@/types/torre';
import { Search, AlertCircle, CheckCircle, Loader2, Image, User } from 'lucide-react';

interface ImageDebugResult {
  person: TorrePerson;
  imageUrl: string;
  status: 'loading' | 'success' | 'error';
  error?: string;
}

export default function ImageDebugger() {
  const [debugResults, setDebugResults] = useState<ImageDebugResult[]>([]);
  const [isDebugging, setIsDebugging] = useState(false);
  const [searchQuery, setSearchQuery] = useState('developer');

  const debugImages = async () => {
    setIsDebugging(true);
    setDebugResults([]);

    try {
      // Buscar personas
      const people = await TorreAPI.searchPeopleByName(searchQuery, 5);
      
      const results: ImageDebugResult[] = [];

      for (const person of people) {
        const result: ImageDebugResult = {
          person,
          imageUrl: person.picture || 'No image URL',
          status: 'loading'
        };

        results.push(result);
        setDebugResults([...results]);

        // Probar la imagen
        if (person.picture) {
          try {
            const img = new Image();
            img.onload = () => {
              const updatedResults = results.map(r => 
                r.person.id === person.id 
                  ? { ...r, status: 'success' as const }
                  : r
              );
              setDebugResults([...updatedResults]);
            };
            img.onerror = () => {
              const updatedResults = results.map(r => 
                r.person.id === person.id 
                  ? { ...r, status: 'error' as const, error: 'Failed to load image' }
                  : r
              );
              setDebugResults([...updatedResults]);
            };
            img.src = person.picture;
          } catch (error) {
            const updatedResults = results.map(r => 
              r.person.id === person.id 
                ? { ...r, status: 'error' as const, error: 'Invalid image URL' }
                : r
            );
            setDebugResults([...updatedResults]);
          }
        } else {
          const updatedResults = results.map(r => 
            r.person.id === person.id 
              ? { ...r, status: 'error' as const, error: 'No image URL provided' }
              : r
          );
          setDebugResults([...updatedResults]);
        }

        // Pequeña pausa entre tests
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    } catch (error: any) {
      console.error('Error debugging images:', error);
    } finally {
      setIsDebugging(false);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-400" />;
      case 'error':
        return <AlertCircle className="h-5 w-5 text-red-400" />;
      case 'loading':
        return <Loader2 className="h-5 w-5 text-yellow-400 animate-spin" />;
      default:
        return <Image className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'bg-green-900/20 border-green-500/30';
      case 'error':
        return 'bg-red-900/20 border-red-500/30';
      case 'loading':
        return 'bg-yellow-900/20 border-yellow-500/30';
      default:
        return 'bg-gray-900/20 border-gray-500/30';
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
          <Image className="h-6 w-6 mr-2" />
          Debug de Imágenes
        </h2>

        <div className="mb-6">
          <label className="block text-text mb-2">Query de búsqueda:</label>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="input-field"
            placeholder="Ej: developer, designer, manager"
          />
        </div>

        <button
          onClick={debugImages}
          disabled={isDebugging}
          className="btn-primary flex items-center"
        >
          {isDebugging ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Debuggeando imágenes...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Debuggear Imágenes
            </>
          )}
        </button>

        {debugResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-text mb-4">Resultados del Debug:</h3>
            <div className="space-y-4">
              {debugResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${getStatusColor(result.status)}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      {result.status === 'success' ? (
                        <img
                          src={result.imageUrl}
                          alt={result.person.name}
                          className="w-16 h-16 rounded-full object-cover border-2 border-text/20"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-full bg-accent flex items-center justify-center border-2 border-text/20">
                          <User className="h-8 w-8 text-background" />
                        </div>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-lg font-semibold text-text">{result.person.name}</h4>
                        {getStatusIcon(result.status)}
                      </div>
                      
                      <p className="text-sm text-text-muted mt-1">{result.person.headline}</p>
                      
                      <div className="mt-2">
                        <p className="text-sm text-text-muted">
                          <strong>URL de imagen:</strong> {result.imageUrl}
                        </p>
                        
                        {result.error && (
                          <p className="text-sm text-red-300 mt-1">
                            <strong>Error:</strong> {result.error}
                          </p>
                        )}
                        
                        {result.status === 'success' && (
                          <p className="text-sm text-green-300 mt-1">
                            ✅ Imagen cargada correctamente
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 