# Nextflix

Netflix clone of sorts using the Youtube API, created with Next.js. 



## Environment Variables
``` 
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY
MAGIC_SECRET_KEY
YOUTUBE_API_KEY 
DEVELOPMENT
NEXT_PUBLIC_HASURA_ENDPOINT
JWT_SECRET
``````

## Technologies

**Magic Link**: Passwordless login solution.

**GraphQL**: Used so that only the needed data is pulled, increasing page speed. 

**Hasura**: Layer between app and database. requests in GraphQL then converts into SQL to send to the database. Using Hasura we can easily change out databases without needing to edit this app.
