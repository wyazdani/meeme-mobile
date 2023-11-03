//
//  Memee-Bridging-Header.h
//  Memee
//
//  Created by SA on 12/10/2023.
//

#import <React/RCTBridgeModule.h>
#import <React/RCTEventEmitter.h>

@interface RCT_EXTERN_MODULE(MemeeModule, RCTEventEmitter)
RCT_EXTERN_METHOD(goToNextScreen)
@end
