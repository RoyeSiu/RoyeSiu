### 1. Installation


### 1.1. `yarn`

```bash
yarn init -y

yarn add --dev typescript @types/node ts-node ts-node-dev
```

### 1.2. `.gitignore`

touch .gitignore .env

```
node_modules
.DS_Store
.vscode
.env
```

### 1.3. `package.json`

```json
    "scripts": {
        "start": "ts-node app.ts",
        "test": "jest"
    },
```

### 1.4. `tsconfig.json`

```json
{
  "compilerOptions": {
    "module": "commonjs",
    "target": "es5",
    "lib": ["es6", "dom"],
    "sourceMap": true,
    "allowJs": true,
    "jsx": "react",
    "esModuleInterop": true,
    "moduleResolution": "node",
    "noImplicitReturns": true,
    "noImplicitThis": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "suppressImplicitAnyIndexErrors": true,
    "noUnusedLocals": true
  },
  "exclude": ["node_modules", "build", "scripts", "index.js"]
}
```