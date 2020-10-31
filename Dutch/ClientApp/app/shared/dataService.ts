import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { Order, OrderItem } from './order';
import { Product } from "./product";

@Injectable()
export class DataService {

    constructor(private http: HttpClient) { }

    public order: Order = new Order();

    public products: Product[] = [];

    loadProducts(): Observable<boolean> {
        return this.http.get("https://localhost:44396/api/products")
            .pipe(
                map((data: any[]) => {
                    this.products = data;
                    return true;
                }));
    }

    public AddToOrder(newProduct: Product) {

        let item: OrderItem = this.order.items.find(i => i.productId == newProduct.id);

        if (item) {
            item.quantity++;
        }
        else {
            item.productId = newProduct.id;
            item.productArtist = newProduct.artist;
            item.productArtId = newProduct.artId;
            item.productCategory = newProduct.category;
            item.productSize = newProduct.size;
            item.productTitle = newProduct.title;
            item.unitPrice = newProduct.price;
            item.quantity = 1;
        }

        this.order.items.push(item);
    }
}