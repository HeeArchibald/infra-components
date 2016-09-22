# infra-components
Angular2 agnostic components library

# Build

- clone this repo
- `npm install`
- `npm start`

Done !

# Use it

>bower.json

```json
"dependencies": {
    "infra-components": "git://github.com/web-education/infra-components#dev"
}
```
>.bowerrc

```json
{
    "directory": "node_modules"
}
```
>In your code

```typescript
import { InfraComponentsModule } from 'infra-components/dist'

@NgModule({
    imports: [
        /* ... */
        InfraComponentsModule
        /* ... */
     ]
})
```
