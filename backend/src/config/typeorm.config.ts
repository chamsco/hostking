import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { Device } from '../auth/entities/device.entity';
import { Project } from '../projects/entities/project.entity';
import { Resource } from '../projects/entities/resource.entity';
import { Environment } from '../projects/entities/environment.entity';
import { EnvironmentVariable } from '../projects/entities/environment-variable.entity';
import { Server } from '../servers/entities/server.entity';
import { InitialSchema1710000000000 } from '../migrations/1710000000000-InitialSchema';
import { AddServerAndEnvironmentIds1710000000001 } from '../migrations/1710000000001-AddServerAndEnvironmentIds';
import { CreateResourcesTable1710000000000 } from '../migrations/1710000000002-CreateResourcesTable';
import { CreateEnvironmentVariablesTable1710000000003 } from '../migrations/1710000000004-CreateEnvironmentVariablesTable';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.DB_HOST || 'postgres',
  port: parseInt(process.env.DB_PORT, 10) || 5432,
  username: process.env.DB_USERNAME || 'squadronuser',
  password: process.env.DB_PASSWORD || 'squadronpass',
  database: process.env.DB_DATABASE || 'squadron',
  entities: [User, Device, Project, Resource, Environment, EnvironmentVariable, Server],
  migrations: [
    InitialSchema1710000000000,
    AddServerAndEnvironmentIds1710000000001,
    CreateResourcesTable1710000000000,
    CreateEnvironmentVariablesTable1710000000003
  ],
  migrationsRun: true,
  migrationsTransactionMode: 'each',
  synchronize: false,
  logging: true,
  dropSchema: false, // Don't drop existing tables
}; 