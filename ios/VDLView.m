//  Created by react-native-create-bridge
#import <Foundation/Foundation.h>
#import "VDLView.h"

// import RCTEventDispatcher
#if __has_include(<React/RCTEventDispatcher.h>)
#import <React/RCTEventDispatcher.h>
#elif __has_include(“RCTEventDispatcher.h”)
#import “RCTEventDispatcher.h”
#else
#import “React/RCTEventDispatcher.h” // Required when used as a Pod in a Swift project
#endif



#import "MobileVLCKit/MobileVLCKit.h"
#import <React/RCTRootView.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTBridge.h>
//#import "VDLReactModule.swift"


  
  
  @interface VDLView ()
  {
    VLCMediaPlayer *_mediaplayer;
    RCTEventDispatcher *_eventDispatcher;
    RCTRootView * _app;
    RCTRootView *rootView;
//    UIViewController * _childview;
    
  }
  
  @end
  
  @implementation VDLView

  
  - (void)viewDidLoad
  {
    [super viewDidLoad];
    
    /* setup the media player instance, give it a delegate and something to draw into */
    _mediaplayer = [[VLCMediaPlayer alloc] init];
   _mediaplayer.delegate = self;
    _mediaplayer.drawable = self.movieView;
    
    /* create a media object and give it to the player */
    _mediaplayer.media = [VLCMedia mediaWithURL:[NSURL URLWithString:_value2]];
    
    [_mediaplayer play];

  }

- (instancetype)initWithEventDispatcher:(RCTEventDispatcher *)eventDispatcher
{
  if ((self = [super init])) {
   _eventDispatcher = eventDispatcher;
    self.movieView = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
    // Override point for customization after application launch.
    VDLView * _childview = [[VDLView alloc] init];
    self.movieView = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
    UIViewController *rootViewController = [UIViewController new];
    rootViewController = _childview;
    self.view = _childview;
  }

  return self;
}

- (IBAction)goToreactNative:(id)sender
{
  
[self dismissViewControllerAnimated:YES completion:nil];

}
  

- (IBAction)playandPause:(id)sender
  {
    if (_mediaplayer.isPlaying)
      [_mediaplayer pause];
    
  [_mediaplayer play];
  }


  - (void)viewDidLayoutSubviews
{
  [super viewDidLayoutSubviews];
  rootView.frame = self.view.bounds;
}


  - (void)didReceiveMemoryWarning
  {
    [super didReceiveMemoryWarning];
    // Dispose of any resources that can be recreated.
  }
  
  @end

//      NSURL *jsCodeLocation;
//
//      jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
//      self.movieView = [[UIWindow alloc] initWithFrame:[[UIScreen mainScreen] bounds]];
//
//      rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
//                                             moduleName:@"ats_test4"
//                                      initialProperties:nil
//                                          launchOptions:nil];
//
//      rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//
//     self.movieView = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
//
//      UIView *rootViewController = [UIView new];
//      rootViewController = rootView;
//      rootView.frame = self.movieView.bounds;
//
//      self.view = rootView;

