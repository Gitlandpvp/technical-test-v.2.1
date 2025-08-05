'use client';

import { useState } from 'react';
import { TorreAPI } from '@/lib/torre-api';
import { SearchPeopleSchema, OpportunitiesSearchSchema, PeopleSearchSchema } from '@/types/torre';
import { Search, Users, Database, AlertCircle, CheckCircle, Loader2, Briefcase, Target } from 'lucide-react';

interface ApiTestResult {
  endpoint: string;
  status: 'pending' | 'success' | 'error';
  message: string;
  data?: any;
}

export default function ApiTester() {
  const [testResults, setTestResults] = useState<ApiTestResult[]>([]);
  const [isTesting, setIsTesting] = useState(false);
  const [searchQuery, setSearchQuery] = useState('developer');

  const runApiTests = async () => {
    setIsTesting(true);
    setTestResults([]);

    const tests: Array<() => Promise<ApiTestResult>> = [
      // ===== TESTS EXISTENTES =====
      
      // Test 1: /entities/_search
      async () => {
        try {
          const results = await TorreAPI.searchPeopleByName(searchQuery, 5);
          return {
            endpoint: 'POST /entities/_search',
            status: 'success',
            message: `Encontrados ${results.length} usuarios`,
            data: results
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /entities/_search',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 2: /entities/_searchStream
      async () => {
        try {
          const results = await TorreAPI.searchPeopleByNameStream(searchQuery, 5);
          return {
            endpoint: 'POST /entities/_searchStream',
            status: 'success',
            message: `Encontrados ${results.length} usuarios (stream)`,
            data: results
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /entities/_searchStream',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 3: /genome/bios/{username}
      async () => {
        try {
          const result = await TorreAPI.getPersonDetails('johndoe');
          if (result) {
            return {
              endpoint: 'GET /genome/bios/{username}',
              status: 'success',
              message: 'Detalles de usuario obtenidos',
              data: result
            };
          } else {
            return {
              endpoint: 'GET /genome/bios/{username}',
              status: 'error',
              message: 'Usuario no encontrado (esperado para usuario de prueba)'
            };
          }
        } catch (error: any) {
          return {
            endpoint: 'GET /genome/bios/{username}',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 4: /usergroup/{ggId}
      async () => {
        try {
          const result = await TorreAPI.getUsergroup('test-group');
          if (result) {
            return {
              endpoint: 'GET /usergroup/{ggId}',
              status: 'success',
              message: 'Grupo de usuarios obtenido',
              data: result
            };
          } else {
            return {
              endpoint: 'GET /usergroup/{ggId}',
              status: 'error',
              message: 'Grupo no encontrado (esperado para ID de prueba)'
            };
          }
        } catch (error: any) {
          return {
            endpoint: 'GET /usergroup/{ggId}',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 5: /workgroup/{ggId}
      async () => {
        try {
          const result = await TorreAPI.getWorkgroup('test-workgroup');
          if (result) {
            return {
              endpoint: 'GET /workgroup/{ggId}',
              status: 'success',
              message: 'Grupo de trabajo obtenido',
              data: result
            };
          } else {
            return {
              endpoint: 'GET /workgroup/{ggId}',
              status: 'error',
              message: 'Grupo no encontrado (esperado para ID de prueba)'
            };
          }
        } catch (error: any) {
          return {
            endpoint: 'GET /workgroup/{ggId}',
            status: 'error',
            message: error.message
          };
        }
      },

      // ===== NUEVOS TESTS DE OPPORTUNITIES =====

      // Test 6: POST /opportunities/_analyze
      async () => {
        try {
          const params = {
            query: { 
              skill: { 
                term: searchQuery,
                weight: 1,
                experience: '5-plus-years',
                proficiency: 'expert',
                extractedProficiency: 'expert'
              } 
            },
            analysis: { 
              compensation: { 
                mean: true, 
                deciles: true,
                quartiles: true,
                min: true, 
                max: true,
                histogram: true
              } 
            }
          };
          const result = await TorreAPI.analyzeOpportunities(params);
          return {
            endpoint: 'POST /opportunities/_analyze',
            status: 'success',
            message: 'Análisis de oportunidades ejecutado',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /opportunities/_analyze',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 7: POST /opportunities/_search
      async () => {
        try {
          const params: OpportunitiesSearchSchema = {
            skill: { 
              term: searchQuery,
              weight: 1,
              experience: '5-plus-years',
              proficiency: 'expert',
              extractedProficiency: 'expert'
            },
            compensation: { amount: 50000, currency: 'USD', periodicity: 'monthly', scope: 'gross', onlyDisclosed: false }
          };
          const result = await TorreAPI.searchOpportunities(params);
          return {
            endpoint: 'POST /opportunities/_search',
            status: 'success',
            message: 'Búsqueda de oportunidades ejecutada',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /opportunities/_search',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 8: POST /opportunities/_eval
      async () => {
        try {
          const params = {
            ids: ['test-opportunity-1', 'test-opportunity-2'],
            query: { 
              skill: { 
                term: searchQuery,
                weight: 1,
                experience: '5-plus-years',
                proficiency: 'expert',
                extractedProficiency: 'expert'
              } 
            }
          };
          const result = await TorreAPI.evalOpportunities(params);
          return {
            endpoint: 'POST /opportunities/_eval',
            status: 'success',
            message: 'Evaluación de oportunidades ejecutada',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /opportunities/_eval',
            status: 'error',
            message: error.message
          };
        }
      },

      // ===== NUEVOS TESTS DE PEOPLE =====

      // Test 9: POST /people/_analyze
      async () => {
        try {
          const params = {
            query: { 
              skill: { 
                term: searchQuery,
                experience: '5-plus-years',
                proficiency: 'expert'
              } 
            },
            analysis: { 
              compensation: { 
                mean: true, 
                suggested: true,
                deciles: true,
                quartiles: true,
                min: true,
                max: true,
                histogram: true
              },
              weighted: true
            }
          };
          const result = await TorreAPI.analyzePeople(params);
          return {
            endpoint: 'POST /people/_analyze',
            status: 'success',
            message: 'Análisis de personas ejecutado',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /people/_analyze',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 10: POST /people/_search
      async () => {
        try {
          const params: PeopleSearchSchema = {
            skill: { 
              term: searchQuery, 
              experience: '5-plus-years', 
              proficiency: 'expert' 
            }
          };
          const result = await TorreAPI.searchPeopleEndpoint(params);
          return {
            endpoint: 'POST /people/_search',
            status: 'success',
            message: 'Búsqueda de personas ejecutada',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /people/_search',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 11: POST /people/_eval
      async () => {
        try {
          const params = {
            subjectIds: ['test-subject-1'],
            ggIds: ['test-gg-1'],
            query: { 
              skill: { 
                term: searchQuery,
                experience: '5-plus-years',
                proficiency: 'expert'
              } 
            },
            filter: []
          };
          const result = await TorreAPI.evalPeople(params);
          return {
            endpoint: 'POST /people/_eval',
            status: 'success',
            message: 'Evaluación de personas ejecutada',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /people/_eval',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 12: POST /people/_rank
      async () => {
        try {
          const params = {
            subjectIds: ['test-subject-1'],
            ggIds: ['test-gg-1'],
            query: { 
              skill: { 
                term: searchQuery,
                experience: '5-plus-years',
                proficiency: 'expert'
              } 
            }
          };
          const result = await TorreAPI.rankPeople(params);
          return {
            endpoint: 'POST /people/_rank',
            status: 'success',
            message: 'Ranking de personas ejecutado',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /people/_rank',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 13: GET /people/{id}
      async () => {
        try {
          const result = await TorreAPI.getPersonById('test-person-id');
          return {
            endpoint: 'GET /people/{id}',
            status: 'success',
            message: 'Información de persona obtenida',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'GET /people/{id}',
            status: 'error',
            message: error.message
          };
        }
      },

      // ===== TESTS DE MATCHES =====

      // Test 14: GET /matches/opportunities/by-ggid/{ggId}
      async () => {
        try {
          const result = await TorreAPI.getMatchesOpportunitiesByGgId('test-gg-id');
          return {
            endpoint: 'GET /matches/opportunities/by-ggid/{ggId}',
            status: 'success',
            message: 'Matches de oportunidades obtenidos',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'GET /matches/opportunities/by-ggid/{ggId}',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 15: GET /matches/people/by-opportunity/{opportunityRef}
      async () => {
        try {
          const result = await TorreAPI.getMatchesPeopleByOpportunity('test-opportunity-ref');
          return {
            endpoint: 'GET /matches/people/by-opportunity/{opportunityRef}',
            status: 'success',
            message: 'Matches de personas obtenidos',
            data: result
          };
        } catch (error: any) {
          return {
            endpoint: 'GET /matches/people/by-opportunity/{opportunityRef}',
            status: 'error',
            message: error.message
          };
        }
      },

      // Test 16: Búsqueda avanzada (existente)
      async () => {
        try {
          const params: SearchPeopleSchema = {
            query: searchQuery,
            limit: 3,
            meta: true,
            identityType: 'person',
            excludeContacts: false
          };
          const results = await TorreAPI.searchPeopleAdvanced(params);
          return {
            endpoint: 'POST /entities/_search (avanzado)',
            status: 'success',
            message: `Búsqueda avanzada: ${results.length} resultados`,
            data: results
          };
        } catch (error: any) {
          return {
            endpoint: 'POST /entities/_search (avanzado)',
            status: 'error',
            message: error.message
          };
        }
      }
    ];

    // Ejecutar tests secuencialmente
    for (let i = 0; i < tests.length; i++) {
      const test = tests[i];
      const result = await test();
      
      setTestResults(prev => [...prev, result]);
      
      // Pequeña pausa entre tests
      await new Promise(resolve => setTimeout(resolve, 300));
    }

    setIsTesting(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="card">
        <h2 className="text-2xl font-semibold text-text mb-6 flex items-center">
          <Database className="h-6 w-6 mr-2" />
          Tester Completo de API de Torre
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
          onClick={runApiTests}
          disabled={isTesting}
          className="btn-primary flex items-center"
        >
          {isTesting ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin mr-2" />
              Probando APIs...
            </>
          ) : (
            <>
              <Search className="h-4 w-4 mr-2" />
              Ejecutar Tests Completos de API
            </>
          )}
        </button>

        {testResults.length > 0 && (
          <div className="mt-8">
            <h3 className="text-lg font-semibold text-text mb-4">Resultados de los Tests:</h3>
            <div className="space-y-4">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border ${
                    result.status === 'success'
                      ? 'bg-green-900/20 border-green-500/30'
                      : result.status === 'error'
                      ? 'bg-red-900/20 border-red-500/30'
                      : 'bg-yellow-900/20 border-yellow-500/30'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      {result.status === 'success' ? (
                        <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
                      ) : result.status === 'error' ? (
                        <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
                      ) : (
                        <Loader2 className="h-5 w-5 text-yellow-400 mr-2 animate-spin" />
                      )}
                      <span className="font-medium text-text">{result.endpoint}</span>
                    </div>
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        result.status === 'success'
                          ? 'bg-green-500/20 text-green-300'
                          : result.status === 'error'
                          ? 'bg-red-500/20 text-red-300'
                          : 'bg-yellow-500/20 text-yellow-300'
                      }`}
                    >
                      {result.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-text-muted mt-2">{result.message}</p>
                  {result.data && (
                    <details className="mt-3">
                      <summary className="text-text cursor-pointer">Ver datos</summary>
                      <pre className="mt-2 p-3 bg-background rounded text-xs text-text-muted overflow-auto">
                        {JSON.stringify(result.data, null, 2)}
                      </pre>
                    </details>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 