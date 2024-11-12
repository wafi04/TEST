import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

// Internal Imports
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';

// Module Imports
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './modules/product/product.module';

// Config Imports
import jwtConfig from './config/jwt.config';

// Guards and Interceptors
import { AuthGuard } from './auth/guards/auth.guard';
import { ResponseInterceptor } from './common/interceptor/reponse.interceptor';

// Middleware
import { AuthMiddleware } from './middlewares/auth.middleware';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  // Organize imports in a logical order
  imports: [
    // Configuration Module
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
      cache: true,
    }),

    // Feature Modules
    AuthModule,
    PrismaModule,
    ProductModule,
  ],

  // Controllers
  controllers: [AppController],

  // Providers with clear categorization
  providers: [
    // Services
    AppService,
    PrismaService,
    JwtService,

    // Global Interceptor
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseInterceptor,
    },

    // Global Guard
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule implements NestModule {
  // Middleware configuration with clear exclusions
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        // Publicly accessible routes
        { path: 'auth/login', method: RequestMethod.POST },
        { path: 'auth/register', method: RequestMethod.POST },
        { path: 'auth/refresh', method: RequestMethod.POST },
      )
      .forRoutes('*');
  }
}
