package com.rn.memee

import android.content.Intent
import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.rn.memee.databinding.ActivityImageSelectedBinding

class ImageSelectedActivity : AppCompatActivity() {

    lateinit var binding: ActivityImageSelectedBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityImageSelectedBinding.inflate(layoutInflater)
        setContentView(binding.root)
        init()
    }

    private fun init() {
        setImage()
        setListeners()
    }

    private fun setListeners() {
        binding.ivDone.setOnClickListener {
            startActivity(Intent(this, PostActivity::class.java).apply {
                putExtra("image_uri", intent.extras?.getString("image_uri")!!)
            })
        }
    }

    private fun setImage() {
        val uri: Uri = Uri.parse(intent.extras?.getString("image_uri")!!)
        binding.cropImageView.setImageUriAsync(uri)
    }
}