/**
 * Project Types
 * 
 * Common types and enums for projects
 */

export enum ProjectType {
  NODE = 'NODE',
  PYTHON = 'PYTHON',
  DOCKER = 'DOCKER',
  OTHER = 'OTHER'
}

export enum EnvironmentType {
  DEV = 'dev',
  PROD = 'prod',
  STAGING = 'staging',
  TEST = 'test'
}

export enum ResourceType {
  DATABASE = 'database',
  SERVICE = 'service',
  WEBSITE = 'website',
  GITHUB = 'github',
  GITLAB = 'gitlab',
  BITBUCKET = 'bitbucket'
}

export enum DatabaseType {
  POSTGRES = 'postgres',
  MYSQL = 'mysql',
  MONGODB = 'mongodb'
}

export enum ServiceType {
  NODE = 'node',
  PYTHON = 'python',
  DOCKER = 'docker'
}

export enum ProjectStatus {
  CREATED = 'created',
  DEPLOYING = 'deploying',
  RUNNING = 'running',
  STOPPED = 'stopped',
  FAILED = 'failed',
  ERROR = 'error'
}

export interface EnvironmentVariable {
  key: string;
  value: string;
  isSecret: boolean;
}

export interface Environment {
  id: string;
  name: string;
  variables: EnvironmentVariable[];
  projectId: string;
  created_at: string;
  updated_at: string;
}

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  serverId: string;
  status: ProjectStatus;
  error?: string;
  environmentVariables?: EnvironmentVariable[];
  // Database specific fields
  databaseType?: DatabaseType;
  databaseName?: string;
  adminEmail?: string;
  initialDatabase?: string;
  dbPassword?: string;
  // Service specific fields
  serviceType?: ServiceType;
  repositoryUrl?: string;
  dockerComposeContent?: string;
  dockerImageUrl?: string;
  // Website specific fields
  branch?: string;
  projectId: string;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  serverId: string;
  ownerId: string;
  status: ProjectStatus;
  environments: Environment[];
  resources: Resource[];
  environmentVariables?: EnvironmentVariable[];
  created_at: string;
  updated_at: string;
} 