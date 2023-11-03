package com.rn.memee

import com.rn.memee.Img

interface ImageListener {
    fun onSelectImage(image: Img)
    fun onCaptureImage()
}