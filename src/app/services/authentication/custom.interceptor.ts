import { HttpInterceptorFn } from "@angular/common/http";

export const customInterceptor: HttpInterceptorFn = (request, next) => {

    const myToken = localStorage.getItem('token');
    console.log(myToken);

    if(!myToken) {
        return next(request);
    }

    const cloneRequest = request.clone({
        setHeaders: {
            Authorization: `Bearer ${myToken}`
        }
    });

    return next(cloneRequest);
}