export interface TorrePerson {
  id: string;
  name: string;
  username: string;
  picture: string;
  headline: string;
  location: {
    name: string;
    country: string;
  };
  skills: TorreSkill[];
  languages: TorreLanguage[];
  education: TorreEducation[];
  experience: TorreExperience[];
  interests: string[];
  publicId: string;
}

export interface TorreSkill {
  name: string;
  level: number;
  weight: number;
}

export interface TorreLanguage {
  name: string;
  level: number;
}

export interface TorreEducation {
  name: string;
  degree: string;
  fromMonth: number;
  fromYear: number;
  toMonth?: number;
  toYear?: number;
}

export interface TorreExperience {
  name: string;
  title: string;
  fromMonth: number;
  fromYear: number;
  toMonth?: number;
  toYear?: number;
  description?: string;
}

export interface SearchResponse {
  results: TorrePerson[];
  total: number;
}

// Esquema completo según la documentación de la API
export interface SearchPeopleSchema {
  query: string;
  torreGgId?: string;
  identityType?: string;
  limit?: number;
  meta?: boolean;
  excluding?: string[];
  excludedPeople?: string[];
  excludeContacts?: boolean;
}

export interface SearchRequest {
  query: string;
  limit?: number;
  offset?: number;
  meta?: boolean;
  filters?: {
    type?: string;
  };
}

export interface SkillAnalysis {
  skill: string;
  count: number;
  averageLevel: number;
  percentage: number;
}

export interface LocationAnalysis {
  location: string;
  count: number;
  percentage: number;
}

// Nuevos tipos para endpoints adicionales
export interface UsergroupResponse {
  id: string;
  name: string;
  members: TorrePerson[];
}

export interface WorkgroupResponse {
  id: string;
  name: string;
  members: TorrePerson[];
}

// ===== NUEVOS SCHEMAS SEGÚN LA DOCUMENTACIÓN =====

// Opportunities Schemas
export interface OpportunitiesSearchSchema {
  and?: any;
  not?: any;
  or?: any;
  appliedto?: AppliedToSchema;
  bestfor?: BestForSchema;
  similarto?: OpportunitySimilarToSchema;
  compensation?: OpportunitiesCompensationSchema;
  compensationrange?: OpportunitiesCompensationRangeSchema;
  id?: OpportunityIdSchema;
  keywords?: KeywordsSchema;
  language?: OpportunityLanguageSchema;
  location?: OpportunityLocationSchema;
  members?: MembersSchema;
  notskill?: NotSkillSchema;
  organization?: OpportunityOrganizationSchema;
  organizationsize?: OrganizationSizeSchema;
  quickapply?: QuickApplySchema;
  remote?: RemoteSchema;
  role?: RoleSchema;
  skill?: OpportunitySkillSchema;
  source?: SourceSchema;
  stable?: StableSchema;
  status?: StatusSchema;
  timezone?: OpportunityTimezoneSchema;
  type?: TypeSchema;
  'skill/role'?: SkillRoleSchema;
  serviceType?: ServiceTypeSchema;
  createdOn?: CreatedOnSchema;
}

export interface AppliedToSchema {
  ggId: string;
}

export interface BestForSchema {
  username?: string;
  subjectId?: string;
  ggId?: string;
  overrides?: BestForQueryOverridesSchema;
  context?: BestForContextSchema;
  scope?: any[];
}

export interface BestForContextSchema {
  contextFeature: string; // Enum with 24 values
  nyax: boolean;
}

export interface BestForQueryOverridesSchema {
  bio?: BioOverrideDTOSchema;
  preferences?: PreferenceDTOSchema;
}

export interface BioOverrideDTOSchema {
  person?: BioPersonDTOSchema;
  strengths?: BioStrengthDTOSchema[];
  implicitStrengths?: ImplicitStrengthDTOSchema[];
  experiences?: BioExperienceDTOSchema[];
  interests?: BioInterestDTOSchema[];
  implicitLanguages?: ImplicitLanguageDTOSchema[];
  languages?: BioLanguageDTOSchema[];
}

export interface BioPersonDTOSchema {
  ggId: string;
  subjectId: string;
  publicId: string;
  email: string;
  name: string;
  picture: string;
  professionalHeadline: string;
  summaryOfBio: string;
  theme: string;
  location: BioPersonLocationDTO;
  flags: BioPersonFlagsDTO;
  weight: number;
  grammar: number;
  completion: number;
  verified: boolean;
  detectedLanguage: string;
  locale: string;
  subscriptions: any[];
  creators: any;
}

export interface BioPersonLocationDTO {
  latitude: number;
  longitude: number;
  name: string;
  shortName: string;
  timezone: string;
}

export interface BioPersonFlagsDTO {
  remoter: boolean;
  visibility: string; // Enum with 2 values
}

export interface BioStrengthDTOSchema {
  id: string;
  code: number;
  weight: number;
  name: string;
  proficiency: string; // Enum with 5 values
  relevance: number;
  implicitProficiency: boolean;
}

export interface ImplicitStrengthDTOSchema {
  id: string;
  code: number;
  name: string;
  proficiency: string; // Enum with 5 values
  sourceId: string;
  sourceType: string;
  active: boolean;
}

export interface BioExperienceDTOSchema {
  id: string;
  category: string; // Enum with 5 values
  name: string;
  fromMonth: string;
  fromYear: string;
  toMonth: string;
  toYear: string;
  additionalInfo: string;
  strengths?: BioExperienceStrengthDTO[];
  detectedStrengths?: BioExperienceDetectedStrengthDTO[];
  organizations?: BioExperienceOrganizationDTO[];
}

export interface BioExperienceStrengthDTO {
  id: string;
  code: number;
  weight: number;
  name: string;
  proficiency: string; // Enum with 5 values
  relevance: number;
  implicitProficiency: boolean;
}

export interface BioExperienceDetectedStrengthDTO {
  name: string;
  code: number;
}

export interface BioExperienceOrganizationDTO {
  name: string;
}

export interface BioInterestDTOSchema {
  id: string;
  code: number;
  name: string;
}

export interface ImplicitLanguageDTOSchema {
  code: string;
}

export interface BioLanguageDTOSchema {
  code: string;
  fluency: string; // Enum with 3 values
}

export interface PreferenceDTOSchema {
  // Empty schema according to documentation
}

export interface OpportunitySimilarToSchema {
  items: WeightedOppRefIdSchema[];
}

export interface WeightedOppRefIdSchema {
  refId: string;
  weight: number;
}

export interface OpportunitiesCompensationSchema {
  amount: number; // minimum: 0
  currency: string;
  periodicity: string; // Enum with 8 values
  scope: string; // Enum with 2 values
  onlyDisclosed: boolean;
}

export interface OpportunitiesCompensationRangeSchema {
  minAmount: number; // minimum: 0
  maxAmount: number; // minimum: 0
  currency: string;
  periodicity: string; // Enum with 8 values
  onlyDisclosed: boolean;
}

export interface OpportunityIdSchema {
  include: any[];
  exclude: any[];
}

export interface KeywordsSchema {
  term: string;
  locale: string; // Enum with 2 values
}

export interface OpportunityLanguageSchema {
  code: string;
  term: string;
  fluency: string; // Enum with 3 values
}

export interface OpportunityLocationSchema {
  term: string;
  coordinates: CoordinatesSchema;
}

export interface CoordinatesSchema {
  neLatitude: number;
  neLongitude: number;
  swLatitude: number;
  swLongitude: number;
}

export interface MembersSchema {
  member: MemberOfRoleSchema;
  signaledBy: string;
  includeNonVisibleMembers: boolean;
}

export interface MemberOfRoleSchema {
  subjectId: string;
  role: string; // Enum with 3 values
}

export interface NotSkillSchema {
  term: string;
}

export interface OpportunityOrganizationSchema {
  code: number;
  codes: any[];
  term: string;
  publicId: string;
}

export interface OrganizationSizeSchema {
  min: number;
  max: number;
}

export interface QuickApplySchema {
  term: boolean;
}

export interface RemoteSchema {
  term: boolean;
  scope: string; // Enum
  coordinates: CoordinatesSchema[];
}

export interface RoleSchema {
  text: string;
  experience: string; // Enum with 18 values
  proficiency: string; // Enum with 5 values
}

export interface OpportunitySkillSchema {
  term: string;
  weight: number; // minimum: 0
  experience: string; // Enum with 18 values
  proficiency: string; // Enum with 5 values
  extractedProficiency: string; // Enum with 5 values
}

export interface SkillRoleSchema {
  text: string;
  experience: string; // Enum with 18 values
  proficiency: string; // Enum with 5 values
}

export interface SourceSchema {
  source: string; // Enum with 2 values
}

export interface StableSchema {
  term: string; // Enum with 2 values
}

export interface StatusSchema {
  code: string; // Enum with 3 values
}

export interface OpportunityTimezoneSchema {
  code: any; // Complex object
}

export interface TypeSchema {
  code: string; // Enum with 6 values
}

export interface ServiceTypeSchema {
  types: any[];
}

export interface CreatedOnSchema {
  from: string; // date-time
  to: string; // date-time
}

// People Schemas
export interface PeopleSearchSchema {
  and?: any;
  not?: any;
  or?: any;
  candidatedatabaseof?: any;
  compensation?: PeopleCompensationSchema;
  compensationrange?: PeopleCompensationRangeSchema;
  completion?: CompletionSchema;
  context?: ContextSchema;
  ggid?: GgldSchema;
  job?: JobSchema;
  language?: PeopleLanguageSchema;
  location?: PeopleLocationSchema;
  opento?: OpenToSchema;
  appliedto?: AppliedToPeopleSchema;
  organization?: PeopleOrganizationSchema;
  remoter?: RemoterSchema;
  role?: RoleSchema;
  signaledby?: SignaledBySchema;
  signalersof?: SignalersOfSchema;
  similarto?: PeopleSimilarToSchema;
  skill?: PeopleSkillSchema;
  subject?: SubjectSchema;
  timezone?: PeopleTimezoneSchema;
  'skill/role'?: SkillRoleSchema;
}

export interface PeopleCompensationSchema {
  amount: number; // minimum: 0
  currency: string;
  periodicity: string; // Enum with 8 values
}

export interface PeopleCompensationRangeSchema {
  minAmount: number; // minimum: 0
  maxAmount: number; // minimum: 0
  currency: string;
  periodicity: string; // Enum with 8 values
}

export interface CompletionSchema {
  min: number; // minimum: 0
}

export interface ContextSchema {
  contextFeature: string; // Enum with 24 values
  nyax: boolean;
}

export interface GgldSchema {
  include: any[];
  exclude: any[];
}

export interface JobSchema {
  id: string;
  membersCloseConnections: boolean;
  penalizeOverqualified: boolean;
}

export interface PeopleLanguageSchema {
  code: string;
  term: string;
  fluency: string; // Enum with 3 values
}

export interface PeopleLocationSchema {
  term: string;
}

export interface OpenToSchema {
  term: string; // Enum with 6 values
}

export interface AppliedToPeopleSchema {
  refIds: any[];
}

export interface PeopleOrganizationSchema {
  term: string;
}

export interface RemoterSchema {
  term: boolean;
}

export interface SignaledBySchema {
  username: string;
}

export interface SignalersOfSchema {
  username: string;
}

export interface PeopleSimilarToSchema {
  username: string;
  ggId: string;
}

export interface PeopleSkillSchema {
  experience: string; // Enum with 18 values
  proficiency: string; // Enum with 5 values
  term: string; // maxLength: 2147483647, minLength: 1
}

export interface SubjectSchema {
  include: any[];
  exclude: any[];
}

export interface PeopleTimezoneSchema {
  left: string;
  right: string;
  tolerance: number; // maximum: 13, minimum: 0
}

// Analysis Schemas
export interface OpportunitiesAnalyzeSchema {
  query: OpportunitiesSearchSchema;
  analysis: OpportunitiesStatisticsSchema;
}

export interface OpportunitiesStatisticsSchema {
  compensation: OpportunitiesCompensationStatisticsSchema;
}

export interface OpportunitiesCompensationStatisticsSchema {
  mean: boolean;
  deciles: boolean;
  quartiles: boolean;
  min: boolean;
  max: boolean;
  histogram: boolean;
}

export interface PeopleEvalSchema {
  subjectIds: any[];
  ggIds: any[];
  query: PeopleSearchSchema;
  filter: any[];
}

export interface PeopleAnalyzeSchema {
  query: PeopleSearchSchema;
  analysis: PeopleStatisticsSchema;
}

export interface PeopleStatisticsSchema {
  compensation: PeopleCompensationStatisticsSchema;
  weighted: boolean;
}

export interface PeopleCompensationStatisticsSchema {
  mean: boolean;
  suggested: boolean;
  deciles: boolean;
  quartiles: boolean;
  min: boolean;
  max: boolean;
  histogram: boolean;
}

export interface RankSchema {
  subjectIds: any[];
  ggIds: any[];
  query: PeopleSearchSchema;
}

// Match Schemas
export interface MatchOpportunitiesByGgIdSchema {
  ggId: string;
}

export interface MatchPeopleByOpportunitySchema {
  opportunityRef: string;
} 