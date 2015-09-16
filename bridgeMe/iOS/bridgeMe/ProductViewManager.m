//
//  CustomViewController.m
//  bridgeMe
//
//  Created by shopify account on 2015-09-14.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import "ProductViewManager.h"
@import Buy;

#warning - Enter your shop domain and API Key
#define SHOP_DOMAIN @"the-app-boutique.myshopify.com"
#define API_KEY @"506ede8b60f86fbf86109a762fe8093d"
#define CHANNEL_ID @"9060547"

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

- (UIView *)view
{
  //BUYClient *client = [[BUYClient alloc] initWithShopDomain:self.domain apiKey:self.api   channelId:self.channelid ];
//
//  UIView *containerView = [[UIView alloc] initWithFrame:CGRectMake(0, 0, 300, 300)];
//  containerView.backgroundColor = UIColor.redColor;
//  
  
  //[containerView addSubview:self.buyViewController.view];
  
  return self.buyViewController.view;

}




RCT_EXPORT_METHOD(setDomain:(NSString *)domain api:(NSString *)api channelid:(NSString *)channelid callback:(RCTResponseSenderBlock)callback)
{
  
  self.channelid = channelid;
  self.api = api;
  self.domain = domain;
  
 
  
  callback(@[[NSNull null], self.domain ]);
  callback(@[[NSNull null], self.api ]);
  callback(@[[NSNull null], self.channelid ]);

  }

RCT_EXPORT_METHOD(loadProductWithiD:(NSString *)prodid)
{
  BUYClient *client = [[BUYClient alloc] initWithShopDomain:SHOP_DOMAIN apiKey:API_KEY   channelId:CHANNEL_ID];
  _buyViewController = [[BUYProductViewController alloc] initWithClient:client ];
  _buyViewController.merchantId = @"merchant.com.shopify.applepay";
  _buyViewController.delegate = self;
  [self.buyViewController loadProduct:prodid completion:^(BOOL success, NSError *error) {
   
  }];
  

}

- (BUYProductViewController*)productViewController
{
  if (_buyViewController != nil) {
    return _buyViewController;
  }
  
  
  
  return _buyViewController;
}

#pragma mark - buyProductViewDelegate

-(void)controller:(BUYViewController *)controller didCompleteCheckout:(BUYCheckout *)checkout status:(BUYStatus)status
{
  
  
}



@end
