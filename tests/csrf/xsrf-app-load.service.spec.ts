import { TestBed, inject } from '@angular/core/testing';
import { XsrfAppLoadService } from '../../src/csrf/xsrf-app-load.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('XsrfAppLoadService', () => {
    let xsrfAppLoadService: XsrfAppLoadService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [XsrfAppLoadService]
        });
    });

    beforeEach(inject(
        [XsrfAppLoadService, HttpTestingController],
        (_xsrfAppLoadService: XsrfAppLoadService, _httpTestingController: HttpTestingController) => {
            xsrfAppLoadService = _xsrfAppLoadService;
            httpMock = _httpTestingController;
        }
    ));

    afterEach(() => {
        httpMock.verify();
    });

    describe('initializeApp', () => {
        it('should call the provided API endpoint', (done) => {
            const xsrfApiUrl = 'http://example.com/api/v1/csrf';

            xsrfAppLoadService.initializeApp(xsrfApiUrl).then(done);

            const req = httpMock.expectOne(xsrfApiUrl);
            expect(req.request.method).toBe('GET');
            req.flush(null);
        });
    });
});

