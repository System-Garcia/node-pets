# API - MissingPets

## Steps - Dev
1. Run command:
``` 
    npm i
```

2. Clone the '.env.template' file and rename it to '.env'.
3. Fill in the environment variables accordingly.
4. Database construction with the command: 
``` 
    docker compose up -d
```
5. If you want to reset the database, execute the command:
```
    npx prisma migrate reset
```
6. Fill the database:
```
    npm run seed
```

7. Run to Dev:
```  
    npm run dev
```
