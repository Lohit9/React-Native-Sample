//
//  Products.m
//  bridgeMe
//
//  Created by shopify account on 2015-09-09.
//  Copyright © 2015 Facebook. All rights reserved.
//
/*
 
 Note :
 
 The Purpose of this class is to supply a list of products to the react js file. This should contain a function to obtain a array of products and convert into JSON format and return it to js file using the rct bridge, or it should return an array and then i can process in js files. 
 
 Needs to updated with the right code, coming up soon 
 
 
 */
#import "Products.h"
#import "RCTBridgeModule.h"

@import Buy;

#warning - Enter your shop domain and API Key
#define SHOP_DOMAIN @"the-app-boutique.myshopify.com"
#define API_KEY @"506ede8b60f86fbf86109a762fe8093d"
#define CHANNEL_ID @"9060547"

#define PRODUCT_ID @""

#warning Optionally, to support Apple Pay, enter your merchant ID
#define MERCHANT_ID @"merchant.com.theappboutique.hackdays"


@implementation Products

RCT_EXPORT_MODULE()



RCT_EXPORT_METHOD(productList:(RCTResponseSenderBlock)callback)

{
  
  BUYClient *client = [[BUYClient alloc] initWithShopDomain:SHOP_DOMAIN apiKey:API_KEY channelId:CHANNEL_ID];
  
  client.urlScheme = @"nativeapp://";
  
  /*c*/

  
  [client getProductsPage:0 completion:^(NSArray *products, NSUInteger page, BOOL reachedEnd, NSError *error) {
    if (error == nil) {

      self.products = products;
      // display list of products
    } else {
      // Handle errors here
    }
  }];
  NSLog(@"reached inside the end block");

  
  //NSLog(self.products);
  
  NSArray* title = self.products ;
  
  callback(@[[NSNull null], title]);
}




@end

