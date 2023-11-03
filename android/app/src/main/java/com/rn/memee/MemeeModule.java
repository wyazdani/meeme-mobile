package com.rn.memee; // Replace with your actual package name

import android.content.Intent;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MemeeModule extends ReactContextBaseJavaModule {

    public MemeeModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "MemeeModule"; // This is the name you will use to access this module in JavaScript.
    }

    @ReactMethod
    public void goToNextScreen() {
        Intent intent = new Intent(getReactApplicationContext(),MemeeActivity.class);
        getCurrentActivity().startActivity(intent);
    }
}
