export interface HttpClientOptions<T> {
  [key: string]: keyof T | ((data: any) => any);
}

export const httpClient = async <T>(
  url: string,
  transformMap?: HttpClientOptions<T>
): Promise<T> => {
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const data = await response.json();

  if (transformMap) {
    const transformed: any = {};
    
    for (const [key, value] of Object.entries(transformMap)) {
      if (typeof value === 'function') {
        transformed[key] = value(data);
      } else {
        transformed[key] = data[value] || 'Unknown';
      }
    }
    
    return transformed as T;
  }

  return data as T;
};