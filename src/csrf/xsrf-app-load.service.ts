import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class XsrfAppLoadService {

    /**
     * @param http
     */
    public constructor(private http: HttpClient) {
    }

    /**
     * Initialize the CSRF cookie
     */
    public initializeApp(xsrfApiUrl: string): Promise<any> {
        return new Promise((resolve) => {
            this.http.get(xsrfApiUrl, {withCredentials: true})
                .subscribe(resolve);
        });
    }
}
