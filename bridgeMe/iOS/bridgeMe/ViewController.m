//
//  ViewControllerTableViewController.m
//  bridgeMe
//
//  Created by shopify account on 2015-09-04.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "ViewController.h"

@import Buy;


#warning - Enter your shop domain and API Key
#define SHOP_DOMAIN @"the-app-boutique.myshopify.com"
#define API_KEY @"506ede8b60f86fbf86109a762fe8093d"
#define CHANNEL_ID @"9060547"

#define PRODUCT_ID @""

#warning Optionally, to support Apple Pay, enter your merchant ID
#define MERCHANT_ID @"merchant.com.theappboutique.hackdays"


@interface ViewController () <BUYViewControllerDelegate>
@property (nonatomic, strong) NSArray *products;
@property (nonatomic, strong) BUYClient *client;

@property (nonatomic, strong) NSString *title;

@property (nonatomic, strong) BUYProductViewController *productViewController;
@end


@implementation ViewController


RCT_EXPORT_MODULE()




- (NSDictionary *)constantsToExport
{
  
  return @{@"greeting": @"Welcome to the DevDactic\n React Native Tutorial!"};
  
  
  
}


- (void)viewDidLoad {
  [super viewDidLoad];
  // Do any additional setup after loading the view, typically from a nib.
  
  self.title = @"Products";
  
  // Initialize the Buy SDK
  self.client = [[BUYClient alloc] initWithShopDomain:SHOP_DOMAIN apiKey:API_KEY channelId:CHANNEL_ID];
  self.client.urlScheme = @"sampleapp://";
  
  // Get the list of products
  [self.client getProductsPage:1 completion:^(NSArray *products, NSUInteger page, BOOL reachedEnd, NSError *error) {
    
    if (error) {
      NSLog(@"Error retrieving products: %@", error.userInfo);
    }
    else {
      [self.tableView reloadData];
    }
  }];
}



- (BUYProductViewController *)productViewController
{
  // reusing the same productViewController will prevent unnecessary network calls in subsequent uses
  if (_productViewController == nil) {
    _productViewController = [[BUYProductViewController alloc] initWithClient:self.client];
    _productViewController.delegate = self;
    _productViewController.merchantId = MERCHANT_ID;
  }
  
  return _productViewController;
}

#pragma TableView methods

- (NSInteger)tableView:(UITableView *)tableView numberOfRowsInSection:(NSInteger)section
{
  return self.products.count;
}



- (NSMutableArray *)tableView:(UITableView *)tableView cellForRowAtIndexPath:(NSIndexPath *)indexPath
{
  UITableViewCell *cell = [self.tableView dequeueReusableCellWithIdentifier:@"Cell" forIndexPath:indexPath];
  BUYProduct *product = self.products[indexPath.row];
  
  cell.textLabel.text = product.title;
  
  
  NSMutableArray *arr = [[NSMutableArray alloc] init];
  [arr addObject:product.title];
  
  return arr;
}



RCT_EXPORT_METHOD(productList:(RCTResponseSenderBlock)callback) {
  
  //NSLog(@"entered");
 
  BUYClient *client = [[BUYClient alloc] initWithShopDomain:SHOP_DOMAIN apiKey:API_KEY channelId:CHANNEL_ID];
  

  
  [client getProductsPage:0 completion:^(NSArray *products, NSUInteger page, BOOL reachedEnd, NSError *error) {
    if (error == nil) {
      self.products = products;
      // display list of products
    } else {
      // Handle errors here
    }
  }];
  
  
  BUYProduct *product = self.products[0];
  
  NSLog(@"the title is %@",product.title);


  
  
  
  NSArray *title = @[@"1Password T-shirt",@"Automatic Adapter (2nd Generation)",@"Scarf",@"Smooth Taupe Calfskin Strap", @"Test Product With No Image"];
  
  

  callback(@[[NSNull null], title]);
  
}






- (void)tableView:(UITableView *)tableView didSelectRowAtIndexPath:(NSIndexPath *)indexPath
{
  BUYProduct *product = self.products[indexPath.row];
  
  if (self.productViewController.isLoading == NO) {
    
    [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:YES];
    
    [self.productViewController loadWithProduct:product completion:^(BOOL success, NSError *error) {
      
      [[UIApplication sharedApplication] setNetworkActivityIndicatorVisible:NO];
      
      if (success) {
        [self presentViewController:self.productViewController animated:YES completion:nil];
      }
      else {
        NSLog(@"Error: %@", error.userInfo);
      }
    }];
  }
}







#pragma mark - BUYViewController delegate methods

- (void)controllerWillCheckoutViaWeb:(BUYViewController *)viewController
{
  NSLog(@"Started web checkout");
}

- (void)controller:(BUYViewController *)controller didDismissWebCheckout:(BUYCheckout *)checkout
{
  NSLog(@"web view controller dismissed");
}

- (void)controller:(BUYViewController *)controller didCompleteCheckout:(BUYCheckout *)checkout status:(BUYStatus)status
{
  NSLog(@"web checkout complete: %lu", (unsigned long)status);
}

- (void)didDismissViewController:(BUYViewController *)viewController
{
  NSLog(@"product view controller dismissed");
}

@end
