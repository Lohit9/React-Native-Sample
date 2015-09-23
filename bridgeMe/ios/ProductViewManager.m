//
//  ProductViewManager.m
//  bridgeMe
//
//  Created by shopify account on 2015-09-21.
//  Copyright © 2015 Facebook. All rights reserved.
//
#import "ProductViewManager.h"
#import <Buy/BUYNavigationController.h>
@import Buy;

#warning - Enter your shop domain and API Key
#define SHOP_DOMAIN @""
#define API_KEY @""
#define CHANNEL_ID @""

#define PRODUCT_ID @""

#warning Optionally, to support Apple Pay, enter your merchant ID
#define MERCHANT_ID @"merchant.com.theappboutique.hackdays"

@interface ProductViewManager ()<BUYViewControllerDelegate>

@property (nonatomic,strong) BUYProductViewController *buyViewController;

@property (nonatomic,copy) NSString *domain;
@property (nonatomic,copy) NSString *api;
@property (nonatomic,copy) NSString *channelid;


@end

@implementation ProductViewManager


RCT_EXPORT_MODULE()






RCT_EXPORT_METHOD(setDomain:(NSString *)domain api:(NSString *)api channelid:(NSString *)channelid callback:(RCTResponseSenderBlock)callback)
{
  
  self.channelid = channelid;
  self.api = api;
  self.domain = domain;
  
  
  
  callback(@[[NSNull null], self.domain ]);
  callback(@[[NSNull null], self.api ]);
  callback(@[[NSNull null], self.channelid ]);
  
}


RCT_EXPORT_METHOD(presentProductwithId:(NSString *)prodid)
{
  BUYClient *client = [[BUYClient alloc] initWithShopDomain:SHOP_DOMAIN apiKey:API_KEY   channelId:CHANNEL_ID];
  _buyViewController = [[BUYProductViewController alloc] initWithClient:client ];
  _buyViewController.merchantId = @"merchant.com.shopify.applepay";
  _buyViewController.delegate = self;
  
  [self.buyViewController loadProduct:prodid completion:^(BOOL success, NSError *error) {
    
    UIWindow *window = [[UIApplication sharedApplication] keyWindow];
    UIViewController *controller = window.rootViewController;
    
    [controller presentViewController:self.buyViewController animated:YES completion:nil];
    
  }];
  
}


#pragma mark - buyProductViewDelegate

-(void)controller:(BUYViewController *)controller didCompleteCheckout:(BUYCheckout *)checkout status:(BUYStatus)status
{
  
  
}

- (NSDictionary *)constantsToExport {
  NSString *test = [@"http://" stringByAppendingString:SHOP_DOMAIN ];
  NSString *shopdomain = [test stringByAppendingString:@"/products.json"] ;
  return @{@"shopdomain":shopdomain};
}


@end

