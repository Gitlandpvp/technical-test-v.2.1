import axios from 'axios';
import { 
  TorrePerson, 
  SearchRequest, 
  SearchResponse, 
  SearchPeopleSchema, 
  UsergroupResponse, 
  WorkgroupResponse,
  // Nuevos tipos importados
  OpportunitiesSearchSchema,
  PeopleSearchSchema,
  OpportunitiesAnalyzeSchema,
  PeopleEvalSchema,
  PeopleAnalyzeSchema,
  RankSchema,
  MatchOpportunitiesByGgIdSchema,
  MatchPeopleByOpportunitySchema
} from '@/types/torre';

const TORRE_API_BASE = 'https://torre.ai/api';

export class TorreAPI {
  /**
   * Buscar personas y organizaciones por nombre (endpoint principal)
   * POST /entities/_search
   */
  private static async searchPeople(request: SearchRequest): Promise<TorrePerson[]> {
    try {
      const payload: SearchPeopleSchema = {
        query: request.query,
        limit: request.limit || 20,
        meta: request.meta || false,
        identityType: 'person', // Filtrar solo personas
        excludeContacts: false
      };

      const response = await axios.post(`${TORRE_API_BASE}/entities/_search`, payload);

      // Mapear los resultados al formato esperado
      const results = response.data.results || [];
      return results.map((person: any) => ({
        id: person.publicId || person.id,
        name: person.name,
        username: person.username,
        picture: person.picture || '/default-avatar.png',
        headline: person.headline || '',
        location: person.location || { name: '', country: '' },
        skills: person.skills || [],
        languages: person.languages || [],
        education: person.education || [],
        experience: person.experience || [],
        interests: person.interests || [],
        publicId: person.publicId || person.id
      }));
    } catch (error: any) {
      console.error('Error searching people:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw new Error('Error searching people: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Buscar personas con respuesta en stream
   * POST /entities/_searchStream
   */
  private static async searchPeopleStream(request: SearchRequest): Promise<TorrePerson[]> {
    try {
      const payload: SearchPeopleSchema = {
        query: request.query,
        limit: request.limit || 20,
        meta: request.meta || false,
        identityType: 'person',
        excludeContacts: false
      };

      const response = await axios.post(`${TORRE_API_BASE}/entities/_searchStream`, payload);

      // Mapear los resultados del stream
      const results = response.data.results || [];
      return results.map((person: any) => ({
        id: person.publicId || person.id,
        name: person.name,
        username: person.username,
        picture: person.picture || '/default-avatar.png',
        headline: person.headline || '',
        location: person.location || { name: '', country: '' },
        skills: person.skills || [],
        languages: person.languages || [],
        education: person.education || [],
        experience: person.experience || [],
        interests: person.interests || [],
        publicId: person.publicId || person.id
      }));
    } catch (error: any) {
      console.error('Error searching people stream:', error);
      if (error.response) {
        console.error('Response status:', error.response.status);
        console.error('Response data:', error.response.data);
      }
      throw new Error('Error searching people stream: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Obtener detalles de una persona por username
   * GET /genome/bios/{username}
   */
  private static async getPersonGenome(username: string): Promise<TorrePerson | null> {
    try {
      const response = await axios.get(`${TORRE_API_BASE}/genome/bios/${username}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching person genome:', error);
      return null;
    }
  }

  /**
   * Obtener grupo de usuarios por ggId
   * GET /usergroup/{ggId}
   */
  static async getUsergroup(ggId: string): Promise<UsergroupResponse | null> {
    try {
      const response = await axios.get(`${TORRE_API_BASE}/usergroup/${ggId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching usergroup:', error);
      return null;
    }
  }

  /**
   * Obtener grupo de trabajo por ggId
   * GET /workgroup/{ggId}
   */
  static async getWorkgroup(ggId: string): Promise<WorkgroupResponse | null> {
    try {
      const response = await axios.get(`${TORRE_API_BASE}/workgroup/${ggId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching workgroup:', error);
      return null;
    }
  }

  // ===== NUEVOS ENDPOINTS SEGÚN LA DOCUMENTACIÓN =====

  /**
   * Analizar estadísticas de oportunidades
   * POST /opportunities/_analyze
   */
  static async analyzeOpportunities(params: OpportunitiesAnalyzeSchema): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/opportunities/_analyze`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error analyzing opportunities:', error);
      throw new Error('Error analyzing opportunities: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Evaluar oportunidades
   * POST /opportunities/_eval
   */
  static async evalOpportunities(params: any): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/opportunities/_eval`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error evaluating opportunities:', error);
      throw new Error('Error evaluating opportunities: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Buscar oportunidades
   * POST /opportunities/_search
   */
  static async searchOpportunities(params: OpportunitiesSearchSchema): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/opportunities/_search`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error searching opportunities:', error);
      throw new Error('Error searching opportunities: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Evaluar oportunidad específica
   * POST /opportunities/{id}/_eval
   */
  static async evalOpportunity(id: string, params: any): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/opportunities/${id}/_eval`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error evaluating opportunity:', error);
      throw new Error('Error evaluating opportunity: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Analizar estadísticas de personas
   * POST /people/_analyze
   */
  static async analyzePeople(params: PeopleAnalyzeSchema): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/people/_analyze`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error analyzing people:', error);
      throw new Error('Error analyzing people: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Evaluar personas
   * POST /people/_eval
   */
  static async evalPeople(params: PeopleEvalSchema): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/people/_eval`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error evaluating people:', error);
      throw new Error('Error evaluating people: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Rankear personas
   * POST /people/_rank
   */
  static async rankPeople(params: RankSchema): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/people/_rank`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error ranking people:', error);
      throw new Error('Error ranking people: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Buscar personas (endpoint específico)
   * POST /people/_search
   */
  static async searchPeopleEndpoint(params: PeopleSearchSchema): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/people/_search`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error searching people endpoint:', error);
      throw new Error('Error searching people endpoint: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Obtener información de una persona específica
   * GET /people/{id}
   */
  static async getPersonById(id: string): Promise<any> {
    try {
      const response = await axios.get(`${TORRE_API_BASE}/people/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching person by id:', error);
      throw new Error('Error fetching person by id: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Evaluar persona específica
   * POST /people/{id}/_eval
   */
  static async evalPersonById(id: string, params: any): Promise<any> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/people/${id}/_eval`, params);
      return response.data;
    } catch (error: any) {
      console.error('Error evaluating person by id:', error);
      throw new Error('Error evaluating person by id: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Obtener matches de oportunidades por ggId
   * GET /matches/opportunities/by-ggid/{ggId}
   */
  static async getMatchesOpportunitiesByGgId(ggId: string): Promise<any> {
    try {
      const response = await axios.get(`${TORRE_API_BASE}/matches/opportunities/by-ggid/${ggId}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching matches opportunities by ggId:', error);
      throw new Error('Error fetching matches opportunities by ggId: ' + (error.message || 'Unknown error'));
    }
  }

  /**
   * Obtener matches de personas por oportunidad
   * GET /matches/people/by-opportunity/{opportunityRef}
   */
  static async getMatchesPeopleByOpportunity(opportunityRef: string): Promise<any> {
    try {
      const response = await axios.get(`${TORRE_API_BASE}/matches/people/by-opportunity/${opportunityRef}`);
      return response.data;
    } catch (error: any) {
      console.error('Error fetching matches people by opportunity:', error);
      throw new Error('Error fetching matches people by opportunity: ' + (error.message || 'Unknown error'));
    }
  }

  // ===== MÉTODOS EXISTENTES ACTUALIZADOS =====

  /**
   * Buscar personas por nombre (método principal)
   */
  static async searchPeopleByName(name: string, limit: number = 20): Promise<TorrePerson[]> {
    try {
      return await this.searchPeople({
        query: name,
        limit,
        meta: false,
        filters: {
          type: 'person'
        }
      });
    } catch (error: any) {
      console.error('Error searching people by name:', error);
      throw error;
    }
  }

  /**
   * Buscar personas por nombre con stream (método alternativo)
   */
  static async searchPeopleByNameStream(name: string, limit: number = 20): Promise<TorrePerson[]> {
    try {
      return await this.searchPeopleStream({
        query: name,
        limit,
        meta: false,
        filters: {
          type: 'person'
        }
      });
    } catch (error: any) {
      console.error('Error searching people by name stream:', error);
      throw error;
    }
  }

  /**
   * Obtener detalles de una persona
   */
  static async getPersonDetails(username: string): Promise<TorrePerson | null> {
    return this.getPersonGenome(username);
  }

  /**
   * Buscar personas por habilidades
   */
  static async searchPeopleBySkills(skills: string[], limit: number = 20): Promise<TorrePerson[]> {
    const skillsQuery = skills.join(' AND ');
    return this.searchPeople({
      query: skillsQuery,
      limit,
      meta: false,
      filters: {
        type: 'person'
      }
    });
  }

  /**
   * Buscar personas con parámetros avanzados
   */
  static async searchPeopleAdvanced(params: SearchPeopleSchema): Promise<TorrePerson[]> {
    try {
      const response = await axios.post(`${TORRE_API_BASE}/entities/_search`, params);
      
      const results = response.data.results || [];
      return results.map((person: any) => ({
        id: person.publicId || person.id,
        name: person.name,
        username: person.username,
        picture: person.picture || '/default-avatar.png',
        headline: person.headline || '',
        location: person.location || { name: '', country: '' },
        skills: person.skills || [],
        languages: person.languages || [],
        education: person.education || [],
        experience: person.experience || [],
        interests: person.interests || [],
        publicId: person.publicId || person.id
      }));
    } catch (error: any) {
      console.error('Error in advanced search:', error);
      throw new Error('Error in advanced search: ' + (error.message || 'Unknown error'));
    }
  }
} 