### MVC setting

## Create folder

mkdir controllers 
mkdir routers
mkdir services
mkdir utils

## Create files

touch ./controllers/controller.ts ./routers/routes.ts ./services/service.ts ./utils/logger.ts

# app.ts router setting

***app.ts**
```ts
import {routes} from "./routes";
app.use("/api",routes)

```
