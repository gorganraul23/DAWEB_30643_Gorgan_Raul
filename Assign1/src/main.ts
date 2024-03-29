import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import{registerLicense} from "@syncfusion/ej2-base"

registerLicense("Mgo+DSMBaFt+QHFqUUdrWk5GaV1CX2BZe1lyRmldfE4BCV5EYF5SRHNfQV1mTH5Wc0VlWHs=;Mgo+DSMBPh8sVXJ1S0d+WFBPcEBAQmFJfFBmQGldfFR0d0U3HVdTRHRcQlhjSn5Wc0VmXH9Zd3A=;ORg4AjUWIQA/Gnt2VFhhQlVFfVldX3xLflF1VWZTe116cFZWESFaRnZdQV1mSX1Tc0BjXHpeeXdR;MTkwNTU5NkAzMjMxMmUzMTJlMzQzMU1nVExsN1BodTVhT2d2YmhSZDNEWXNtVlB3T3NDbDQvdUhQYkRoR0lZTjA9;MTkwNTU5N0AzMjMxMmUzMTJlMzQzMUk4c0ZvSTUzUHZYcmkwaS9ISmdNOUpXMUF4UW0vRjhjSTY5Y09KdUo1TE09;NRAiBiAaIQQuGjN/V0d+XU9Ad1REQmFWfFN0RnNcdVpzflFFcC0sT3RfQF5jTH5QdkBmWXpbcXFUQg==;MTkwNTU5OUAzMjMxMmUzMTJlMzQzMUgzNTdnVWg5eFg0NzVMcUM3WGJVYkVoVEF6dlc4RzZpbkN4UkdiRnJoWFU9;MTkwNTYwMEAzMjMxMmUzMTJlMzQzMUNnT1IydVRRRXprQXE5OUFqT0FzNDBmYjRuaE9OT3FkdjNtV1c4NG5Rb009;Mgo+DSMBMAY9C3t2VFhhQlVFfVldX3xLflF1VWZTe116cFZWESFaRnZdQV1mSX1Tc0BjXHpccnRR;MTkwNTYwMkAzMjMxMmUzMTJlMzQzMUR2YThTY0hZdk9LaE9LR3RTRnFWQUl2NDZBUysxUDh2SHFZRzNkamVlNzg9;MTkwNTYwM0AzMjMxMmUzMTJlMzQzMWtWUkViV0QrUDkwamJud1prZWtDYVcvK2h2RmtaSXNwSmVGdklPdmFqT1E9;MTkwNTYwNEAzMjMxMmUzMTJlMzQzMUgzNTdnVWg5eFg0NzVMcUM3WGJVYkVoVEF6dlc4RzZpbkN4UkdiRnJoWFU9");

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
