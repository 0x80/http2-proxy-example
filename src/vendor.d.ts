declare module "http2-proxy" {
  import * as Http from "http";
  import * as Http2 from "http2";
  import * as Net from "net";

  function web(
    req: Http.IncomingMessage | Http2.Http2ServerRequest,
    res: Http.ServerResponse | Http2.Http2ServerResponse,
    options: webOptions,
    callback?: (err: Error) => Function
  ): Promise<Error>;

  function ws(
    req: Http.IncomingMessage | Http2.Http2ServerRequest,
    socket: Net.Socket,
    head: Buffer,
    options: wsOptions,
    callback?: (err: Error) => Function
  ): Promise<Error>;

  interface options {
    hostname: string;
    port: number;
    proxyTimeout?: number;
    proxyName?: string;
    timeout?: Http.IncomingMessage | Http2.Http2ServerRequest;

    onReq?(req: Http.IncomingMessage, options: Http.RequestOptions): void;
  }

  interface webOptions extends options {
    onRes?(
      req: Http.IncomingMessage | Http2.Http2ServerRequest,
      res: Http.ServerResponse | Http2.Http2ServerResponse
    ): void;
  }

  interface wsOptions extends options {
    onRes?(
      req: Http.IncomingMessage | Http2.Http2ServerRequest,
      socket: Net.Socket
    ): void;
  }
}
