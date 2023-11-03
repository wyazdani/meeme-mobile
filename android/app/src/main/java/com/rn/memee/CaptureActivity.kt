package com.rn.memee

import android.content.Intent
import android.graphics.BitmapFactory
import android.graphics.ImageFormat
import android.graphics.Rect
import android.graphics.YuvImage
import android.os.Bundle
import android.view.View
import androidx.appcompat.app.AppCompatActivity
import androidx.core.net.toUri
import com.otaliastudios.cameraview.CameraListener
import com.otaliastudios.cameraview.CameraOptions
import com.otaliastudios.cameraview.PictureResult
import com.otaliastudios.cameraview.frame.Frame
import com.otaliastudios.cameraview.frame.FrameProcessor
import com.rn.memee.databinding.ActivityCaptureBinding
import java.io.ByteArrayOutputStream
import java.io.File
import java.io.FileOutputStream
import java.io.IOException


class CaptureActivity : AppCompatActivity() {

    lateinit var binding: ActivityCaptureBinding

    companion object {
        private const val USE_FRAME_PROCESSOR = false
        private const val DECODE_BITMAP = false
    }

    private var captureTime: Long = 0

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityCaptureBinding.inflate(layoutInflater)
        setContentView(binding.root)
        init()
    }

    private fun init() {
        setListeners()
        binding.camera.setLifecycleOwner(this)
        binding.camera.addCameraListener(Listener())
        if (USE_FRAME_PROCESSOR) {
            binding.camera.addFrameProcessor(object : FrameProcessor {
                private var lastTime = System.currentTimeMillis()
                override fun process(frame: Frame) {
                    val newTime = frame.time
                    val delay = newTime - lastTime
                    lastTime = newTime
                    if (DECODE_BITMAP) {
                        if (frame.format == ImageFormat.NV21
                            && frame.dataClass == ByteArray::class.java
                        ) {
                            val data = frame.getData<ByteArray>()
                            val yuvImage = YuvImage(
                                data,
                                frame.format,
                                frame.size.width,
                                frame.size.height,
                                null
                            )
                            val jpegStream = ByteArrayOutputStream()
                            yuvImage.compressToJpeg(
                                Rect(
                                    0, 0,
                                    frame.size.width,
                                    frame.size.height
                                ), 100, jpegStream
                            )
                            val jpegByteArray = jpegStream.toByteArray()
                            val bitmap = BitmapFactory.decodeByteArray(
                                jpegByteArray,
                                0, jpegByteArray.size
                            )
                            bitmap.toString()
                        }
                    }
                }
            })
        }
    }

    private fun setListeners() {
        binding.ivCamera.setOnClickListener {
            capturePicture()
        }
    }

    private inner class Listener : CameraListener() {


        override fun onCameraOpened(options: CameraOptions) {
            binding.ivCamera.visibility = View.VISIBLE
        }

        override fun onPictureTaken(result: PictureResult) {
            super.onPictureTaken(result)

            val callbackTime = System.currentTimeMillis()
            if (captureTime == 0L) {
                captureTime = callbackTime - 300
            }
            saveImage(result.data)?.let { file ->
                startActivity(Intent(this@CaptureActivity, ImageSelectedActivity::class.java).apply {
                    putExtra("image_uri", file.toUri().toString())
                })
            }

            captureTime = 0
        }
    }

    fun saveImage(data: ByteArray): File? {
        val myExternalFile = File(getExternalFilesDir("MyFileStorage"), "filename")
        return try {
            val fos = FileOutputStream(myExternalFile)
            fos.write(data)
            fos.close()
            myExternalFile
        } catch (e: IOException) {
            e.printStackTrace()
            null
        }
    }


    private fun capturePicture() {
        if (binding.camera.isTakingPicture) {
            return
        }
        captureTime = System.currentTimeMillis()
        binding.camera.takePicture()
    }
}