#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(Haptics, NSObject)

RCT_EXTERN_METHOD(impact:(NSString *)style)
RCT_EXTERN_METHOD(selection)
RCT_EXTERN_METHOD(notification:(NSString *)type)

@end
