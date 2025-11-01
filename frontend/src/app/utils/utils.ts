export const getUrl = (endPoint: string): string => {
  const baseUrl = process.env.NODE_ENV === 'development'
    ? process.env.NEXT_PUBLIC_DEV_URL
    : process.env.NEXT_PUBLIC_PRUD_URL;

  if (!baseUrl) {
    throw new Error('Base URL environment variable is not defined');
  }

  if (endPoint === "") {
    return baseUrl;
  }

  // Ensure endPoint doesn't start with a slash to prevent double slashes
  const cleanEndPoint = endPoint.startsWith('/') ? endPoint.slice(1) : endPoint;
  const url = `${baseUrl}/api/${cleanEndPoint}`;
  
  return url;
};