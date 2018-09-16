import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import {
  Router,
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from "@angular/router";
import { map, take } from "rxjs/operators";
import { ProductsService } from "../shared/services/products.service";
import { Product } from "../shared/models/product";

@Injectable({
  providedIn: "root"
})
export class ReviewResolver implements Resolve<any> {
  constructor(
    private productsService: ProductsService,
    private router: Router
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<Product> {
    let id = route.paramMap.get("id");

    return this.productsService.getById(id).pipe(
      take(1),
      map(data => {
        if (data) {
          return data as Product;
        } else {
          // id not found
          return null;
        }
      })
    );
  }
}
