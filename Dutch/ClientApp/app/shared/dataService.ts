import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) {}
    public products = [];

    loadProducts() {
        return this.http.get("https://localhost:44396/api/products")
            .pipe(
                map((data: any[]) => {
                    this.products = data;
                    return true;
                }));
    }
}