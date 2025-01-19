import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent {
  item: any = {};
  mainPic: string = '';
  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data: any) => {
      this.item = data['product'];
      this.mainPic = this.item.images[0];
      console.log(this.item);
    });
  }

  getOneImageId(id?: string) {
    this.mainPic = this.item.images.find((image: any) => image === id);
  }
}
