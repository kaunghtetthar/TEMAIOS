//  Created by react-native-create-bridge

#import <Foundation/Foundation.h>
#import "VDLView.h"
#import "VDLViewManager.h"
//#import "VDLAppDelegate.m"
#import "VDLAppDelegate.h"

#import "AppDelegate.h"
#import "React/RCTBridge.h"
#import <React/RCTUIManager.h>


// import RCTBridge
#if __has_include(<React/RCTBridge.h>)
#import <React/RCTBridge.h>
#elif __has_include(“RCTBridge.h”)
#import “RCTBridge.h”
#else
#import “React/RCTBridge.h” // Required when used as a Pod in a Swift project
#endif

@implementation VDLViewManager

@synthesize bridge = _bridge;

// Export a native module
// https://facebook.github.io/react-native/docs/native-modules-ios.html
RCT_EXPORT_MODULE();

// Return the native view that represents your React component
- (UIViewController *)view
{
  return [[VDLView alloc] initWithEventDispatcher:self.bridge.eventDispatcher];
}

RCT_EXPORT_VIEW_PROPERTY(exampleProp, NSString)


- (NSArray<NSString *> *)supportedEvents
{
  return @[@"EXAMPLE_EVENT"];
}
// Export constants
// https://facebook.github.io/react-native/releases/next/docs/native-modules-ios.html#exporting-constants
- (NSDictionary *)constantsToExport
{
  return @{
           @"EXAMPLE": @"example"
         };
}

- (dispatch_queue_t)methodQueue
{
  return dispatch_get_main_queue();
}

RCT_EXPORT_METHOD(gopagetwo: (NSString *) gopagetwo) {
  NSLog(@"123");
  
  [self emitMessageToRN:@"EXAMPLE_EVENT" :nil];
  NSString *location = [RCTConvert NSString:gopagetwo];


  VDLAppDelegate *share = (VDLAppDelegate *)[UIApplication sharedApplication].delegate;
   UIViewController *nav = (UIViewController *) share.window.rootViewController;
 

  VDLView *_pagetwo = [[VDLView alloc] init];
  _pagetwo.value2 = location;
 [nav presentViewController:_pagetwo animated:YES completion:Nil];
  ///[share.emitter emit:@"gopagetwo"];
  
  }

- (void) emitMessageToRN: (NSString *)eventName
                        :(NSDictionary *)params{
  [self.bridge.eventDispatcher sendAppEventWithName: eventName body: params];
}

  
// [(VDLAppDelegate *)[[UIApplication sharedApplication] delegate] goNativeStoryboard];
//  share.goNativeStoryboard();

@end

