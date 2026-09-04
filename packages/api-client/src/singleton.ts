import type { ApiClientOptions } from './client';

import { createApiClient } from './client';

export const httpClient = createApiClient();

export function configureApiClient(options: Partial<ApiClientOptions>) {
  httpClient.configure(options);
}
