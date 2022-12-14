# NodeJS Boilerplate

- ES6
- Koa
- Typescript with auto generating of models
- MongoDB + Mongoose
- Joi validation
- API documentation with auto generating of models for swagger
- Migrations
- Docker support
- Eslint + Prettier

## Autogenerate Json schemas for swagger and TS interfaces from Joi validators

Source of true for TS interfaces can be Joi Validator or Json schema if we don't need validation

***Flow of generation:***

***Joi Validator*** -> ***Json schema*** -> TS interface

### Files structure

- If you have validation (for example on request data or model) place request Joi schemas in ***src/modules/<module-name>/joiSchemas*** it will be converted automatically to TS interfaces and swagger schemas

- If you don't have validation (for example on response data or model) place Json schemas in ***src/jsonSchemas/[responses|models]*** it will be converted automatically to TS interfaces

- Place reusable validators to ***src/joiValidators***

### Naming

- Use ***RequestDto**, ***ResponseDto** or ***Dto** (For entities) naming for Joi schemas class names it will be converted to TS interfaces and swagger schemas automatically

- Use *Validator for naming validator variables it will be converted to swagger schemas automatically with camelize names

Naming using in generating of union types for groups of interfaces in ***src/jsonSchemas/interfaces.ts***. This types can be used in App.
```
export type AnyModel = PostDto | UserDto;
export type AnyRequest = RegisterRequestDto | LoginRequestDto | CreatePostRequestDto;
export type AnyResponse = LoginResponseDto;
```

## Development

1. Install dependencies in first run or skip it
```
yarn && yarn build
```

2. Run docker containers with api services like Mongo DB

```
docker-compose up -d
```

3. Run app
It will be started in watch mode, and you can edit all files all will be rebuilt automatically. You should restart this script only if you change generation script.
It run script ***src/scripts/start.ts*** in which we run gulp for generating interfaces and nodeamon to start app on rebuild

```
yarn serve
```