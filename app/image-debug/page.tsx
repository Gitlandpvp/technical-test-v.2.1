'use client';

import ImageDebugger from '@/components/ImageDebugger';
import { Image, AlertTriangle } from 'lucide-react';

export default function ImageDebugPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-background-light shadow-sm border-b border-text/10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-text flex items-center">
                <Image className="h-8 w-8 mr-3" />
                Debug de Imágenes
              </h1>
              <p className="text-text-muted mt-2">
                Diagnostica problemas con la carga de imágenes de usuarios
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-8">
        <ImageDebugger />
      </div>

      {/* Info Section */}
      <div className="bg-background-light border-t border-text/10 mt-12">
        <div className="container mx-auto px-4 py-6">
          <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-lg p-4">
            <div className="flex items-start">
              <AlertTriangle className="h-5 w-5 text-yellow-400 mr-3 mt-0.5" />
              <div>
                <h3 className="text-sm font-medium text-yellow-300 mb-1">
                  Información sobre el Debug de Imágenes
                </h3>
                <p className="text-sm text-yellow-200">
                  Esta herramienta te ayuda a diagnosticar por qué las imágenes de perfil de los usuarios no se están cargando correctamente. 
                  Revisa la consola del navegador (F12) para ver errores detallados de CORS, 404, o problemas de red.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 