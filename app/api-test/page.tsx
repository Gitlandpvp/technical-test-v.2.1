'use client';

import ApiTester from '@/components/ApiTester';
import { Database, AlertTriangle } from 'lucide-react';

export default function ApiTestPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-light shadow-sm border-b border-text/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text flex items-center">
                <Database className="h-8 w-8 mr-3" />
                API Tester
              </h1>
              <p className="text-text-muted mt-2">
                Prueba y verifica todos los endpoints de la API de Torre
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <ApiTester />
      </div>

      {/* Info Section */}
      <div className="bg-background-light border-t border-text/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-300 mb-1">
                  Información sobre los Tests
                </h3>
                <p className="text-sm text-yellow-200">
                  Este tester verifica todos los endpoints documentados en la API de Torre. 
                  Algunos tests pueden fallar con datos de prueba, lo cual es normal. 
                  Los endpoints principales como `/entities/_search` deberían funcionar correctamente.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 