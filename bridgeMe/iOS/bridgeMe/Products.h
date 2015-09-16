//
//  Products.h
//  bridgeMe
//
//  Created by shopify account on 2015-09-09.
//  Copyright © 2015 Facebook. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "RCTBridgeModule.h"


@interface Products : NSObject <RCTBridgeModule>

@property (nonatomic , weak) NSString * title;
@property (nonatomic, strong) NSArray * products;
@end
