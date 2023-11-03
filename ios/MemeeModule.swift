//
//  MemeeModule.swift
//  Memee
//
//  Created by SA on 12/10/2023.
//


import Foundation
import React

@objc(MemeeModule)
class MemeeModule: RCTEventEmitter {
    override static func moduleName() -> String {
        return "MemeeModule"
    }

    @objc func goToNextScreen() {
        DispatchQueue.main.async {
            let viewController = MemeeViewController() // Create your native view controller
            let rootViewController = UIApplication.shared.keyWindow?.rootViewController
            rootViewController?.present(viewController, animated: true, completion: nil)
        }
    }
}
