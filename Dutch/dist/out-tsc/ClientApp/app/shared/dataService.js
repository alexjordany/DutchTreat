import { __decorate } from "tslib";
import { Injectable } from "@angular/core";
import { map } from "rxjs/operators";
let DataService = class DataService {
    constructor(http) {
        this.http = http;
        this.products = [];
    }
    loadProducts() {
        return this.http.get("https://localhost:44396/api/products")
            .pipe(map((data) => {
            this.products = data;
            return true;
        }));
    }
};
DataService = __decorate([
    Injectable()
], DataService);
export { DataService };
//# sourceMappingURL=dataService.js.map