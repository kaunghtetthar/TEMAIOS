//  Created by react-native-create-bridge

// import UIKit so you can subclass off UIView
#import <UIKit/UIKit.h>

@class RCTEventDispatcher;

@interface VDLView : UIViewController
  // Define view properties here with @property
  @property (nonatomic, assign) NSString *exampleProp;

@property (strong, nonatomic) IBOutlet UIButton *Cancel;


  // Streaming url from react-native side
  @property (nonatomic, assign) NSString *value2;

@property (nonatomic, strong) IBOutlet UIView *movieView;

- (IBAction)goToreactNative:(id)sender;

- (IBAction)playandPause:(id)sender;

  // Initializing with the event dispatcher allows us to communicate with JS
- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher NS_DESIGNATED_INITIALIZER;

@end
