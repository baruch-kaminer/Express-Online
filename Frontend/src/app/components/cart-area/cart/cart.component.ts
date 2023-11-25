import { AfterContentInit, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { CartModel } from 'src/app/models/cart.model';
import { CartItemsModel } from 'src/app/models/cartItems-model';
import { AuthService } from 'src/app/services/auth.service';
import { CartItemsService } from 'src/app/services/cart-items.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { AppConfig } from 'src/app/utils/app-config.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, AfterContentInit {

  public constructor( public auth: AuthService, private cartService: CartService,
    private cartItemService: CartItemsService,
    private productService: ProductService,
    private config: AppConfig){}

    public userId = this.auth.user.userId;
    @Input()
    public cart: CartModel;
    @Input()
    public father: string;
    public cartItems: CartItemsModel[];
    
    public btnDelAll = false;
    public sumPrice: number;
    public  hide = false; 
    public title = 'highlight-text';
    public searchText='';
    public loader = false;
    public imageName: string;
    public imgSrc = this.config.images;
    
    async ngOnInit(): Promise<void>  {
      
      try {
        await this.cartItemService.getCartItemsByCartId(this.cart.cartId);     
        
        this.cartItemService.getCartItems().subscribe(async (i) => {
          this.loader = true;
          this.cartItems = i;
          i.map(async (i: any) => {
            
            try {
              const imageName = await this.productService.getImageNameByProductsId(i.productId);
              
              i.imageName = imageName;
              
            } catch (error: any) {
            console.log(error.message);
          }
          if (i.amount <= 0)
          this.deleteItem(i.cartItemsId);
        });
        this.cartItems.length > 0 ? this.btnDelAll = true : this.btnDelAll = false;
        this.sumPrice = await this.cartItemService.getSumPriceByCartId(this.cart.cartId);
        
        setTimeout(() => {
          this.loader = false;
        }, 500);
      });
    } catch (error:any) {
      console.log(error.message)
    }
    
  }

  

 async ngAfterViewInit() {
  const cartItems =  await this.cartItemService.getCartItemsByCartId(this.cart.cartId)
  
    if(cartItems.length > 0){      
      this.cartService.showCart()
    }  
}
  
  ngAfterContentInit(): void {
  }
  
  public async deleteItem(itemId: number){
    try {      
      await this.cartItemService.deleteCartItem(itemId, this.cart.cartId)
      if(this.cartItems.length === 0){
        this.cartService.hideCart()
      }
    } catch (error: any) {
      console.log(error.message)
    }
  }
  
  public async deleteAllCartItems(){
    try {
      await this.cartItemService.deleteAllCartItems(this.cart.cartId);  
      this.cartService.hideCart(); 
    } catch (error: any) {
      console.log(error.message)
    }
  }

  @ViewChild('htmlData') htmlData!: ElementRef;


  public openPDF(): void {
   
    let DATA: any = document.getElementById('htmlData');
    
    html2canvas(DATA).then((canvas:any) => {
      
      let fileWidth = 50;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 50;
      PDF.addImage(FILEURI, 'PNG', 80, position, fileWidth, fileHeight);
      PDF.save('אקספרס-אונליין');
    });
  }

  public hideCart(){
    if(this.hide === true){
      this.hide = false
      this.cartService.showCart();
    }else{
      this.hide = true;
      this.cartService.hideCart();

    }
    
  }
}
