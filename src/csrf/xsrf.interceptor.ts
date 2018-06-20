import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class XsrfInterceptor implements HttpInterceptor {

    /**
     * @param tokenExtractor
     */
    public constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
    }

    /**
     * @param req
     * @param next
     */
    public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let requestToForward = req;

        // Do nothing if the requested URL is on a different host
        if ((req.url.startsWith('http://') || req.url.startsWith('https://'))
            && req.url.indexOf(`${window.location.protocol}//${window.location.hostname}`) < 0) {
            return next.handle(requestToForward);
        }

        const token = this.tokenExtractor.getToken() as string;
        if (token !== null) {
            requestToForward = req.clone({setHeaders: {'X-XSRF-TOKEN': token}});
        }
        return next.handle(requestToForward);
    }
}
