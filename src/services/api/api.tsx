import { baseUrl } from '@/config/index';

interface IQueryParams {
  [key: string]: string
}

export const Header = {
  accept: 'application/json',
  Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMjEyZGMxYmZjMmQ4MDA5ZjczNmY2OGYyZTcxOTM4ZiIsInN1YiI6IjYwMzhhN2JhYjU0MDAyMDA2ZmY0NDVlZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.WcmCbjtu38vUUp6LblDFXR1glealfkkOi_f4AFnJrCo'
}


// this function for handle get request
export const GET = async (url: string, queryParams?: IQueryParams, header = Header): Promise<any> => {
  let queryString = ''
  if(queryParams) {
    queryString = Object.keys(queryParams)
  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`)
  .join('&');
  }
  
  try {
    const res = await fetch(`${baseUrl+url}?${queryString}`, {
      method: "GET",
      headers: header,
    });
    return {
      status: res.status,
      res: await res.json(),
    };
  } catch (err) {
    throw err;
  }
};
