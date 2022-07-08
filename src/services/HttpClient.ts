export interface IHTTPClientRequest {
    url: string,
    query?: {[key: string]: string | number},
    method: Method
    body?: any
}

export interface IHTTPCallback<HTTPClientResponse> {
  onError?: (err: IErrorResponse) => void
  onSuccess?: (response: HTTPClientResponse) => void
}

export interface IErrorResponse {
    status: number,
    statusText: {status_code: number, status_message: string}
}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    DELETE = 'DELETE',
}

class HttpClient {
  static request = async <HTTPClientResponse>(request: IHTTPClientRequest, cb?: IHTTPCallback<HTTPClientResponse>) => {
        try {
            const data = await HttpClient.get(request) as HTTPClientResponse;
            if (data) {
              if (cb && cb.onSuccess) cb.onSuccess(data);
                return data;
            }      
        } catch (error: unknown) {
            const err = error as IErrorResponse;
            if (cb && cb.onError) cb.onError(err);
            console.log(err.status, err.statusText.status_message ?? err.statusText)
        }
    }

  private static getQueryString = (query: {[key: string]: string | number}) => {
    let queryString = ''
    for (let key in query) {
      queryString += `&${key}=${query[key]}`
    }
    return queryString
  }

  private static async get({url, method, body = null, query}:IHTTPClientRequest ) {
    return new Promise((resolve, reject) => {
      let request = new XMLHttpRequest();
      
      let urlStr = url
      if (query) {
        urlStr += `?${HttpClient.getQueryString(query)}`
      }

      request.open(method, urlStr, true);

      request.onload = () => {
        if (request.status >= 200 && request.status < 300) {
          resolve(JSON.parse(request.responseText));
        } else {
            console.log(request)
            reject({
              status: request.status,
              statusText: JSON.parse(request.responseText)
            })
        }
      }
      request.onerror = () => {
        console.log(request)
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }

      if (body) {
        request.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
        body = JSON.stringify(body);
      }
      request.send(body);
    })
  }
}

export default HttpClient