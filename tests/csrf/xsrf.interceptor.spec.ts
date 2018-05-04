import { TestBed, inject } from '@angular/core/testing';
import { XsrfInterceptor } from '../../src/csrf/xsrf.interceptor';
import { HttpRequest, HttpXsrfTokenExtractor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpEvent } from '@angular/common/http';

describe('XsrfInterceptor', () => {
    let xsrfInterceptor: XsrfInterceptor;
    let httpXsrfTokenExtractor: HttpXsrfTokenExtractor;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                XsrfInterceptor,
                {provide: HttpXsrfTokenExtractor, useValue: {getToken: () => null}}
            ]
        });
    });

    beforeEach(inject(
        [XsrfInterceptor, HttpXsrfTokenExtractor],
        (_xsrfInterceptor: XsrfInterceptor, _httpXsrfTokenExtractor: HttpXsrfTokenExtractor) => {
            xsrfInterceptor = _xsrfInterceptor;
            httpXsrfTokenExtractor = _httpXsrfTokenExtractor;
        }
    ));

    describe('::intercept', () => {
        let httpHandler: HttpHandler;

        beforeEach(() => {
            httpHandler = {handle: () => new Observable<HttpEvent<any>>()} as HttpHandler;

            spyOn(httpHandler, 'handle');
        });

        it('should add the xsrf header to the request', () => {
            const url = `${window.location.protocol}//${window.location.hostname}/api/v1/todo`;
            const request = new HttpRequest('POST', url, {});
            const requestClone = request.clone();
            const token = 'abc123';

            spyOn(request, 'clone').and.returnValue(requestClone);
            spyOn(httpXsrfTokenExtractor, 'getToken').and.returnValue(token);

            xsrfInterceptor.intercept(request, httpHandler);

            expect(request.clone).toHaveBeenCalledWith({setHeaders: {'X-XSRF-TOKEN': token}});
            expect(httpHandler.handle).toHaveBeenCalledWith(requestClone);
        });

        it('should do nothing if the request URL is relative', () => {
            const request = new HttpRequest('POST', '/api/v1/todo', {});

            xsrfInterceptor.intercept(request, httpHandler);

            expect(httpHandler.handle).toHaveBeenCalledWith(request);
        });

        it('should do nothing if the request URL is on a different host', () => {
            const request = new HttpRequest('POST', 'http://example.com/api/v1/todo', {});

            xsrfInterceptor.intercept(request, httpHandler);

            expect(httpHandler.handle).toHaveBeenCalledWith(request);
        });
    });
});
