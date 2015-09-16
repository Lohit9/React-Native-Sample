
#import <UIKit/UIKit.h>
#import "RCTBridgeModule.h"

@interface ViewController : UITableViewController <RCTBridgeModule>

- (void)getCheckoutStatusWithURL:(NSURL *)url;

@end
