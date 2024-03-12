import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ThrottlerModule } from '@nestjs/throttler';
import depthLimit from 'graphql-depth-limit';
import * as path from 'path';

import { APIModule } from '../api/api.module';

@Module({
  imports: [
    APIModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: path.join(process.cwd(), 'src/schema.gql'),
      validationRules: [depthLimit(10)],
    }),
    ThrottlerModule.forRoot([{
      ttl: 60,
      limit: 60,
    }]),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
