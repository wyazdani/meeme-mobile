package com.rn.memee

import android.net.Uri
import android.os.Bundle
import androidx.appcompat.app.AppCompatActivity
import com.rn.memee.databinding.ActivityPostBinding

class PostActivity : AppCompatActivity() {

    lateinit var binding: ActivityPostBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityPostBinding.inflate(layoutInflater)
        setContentView(binding.root)
        init()
    }

    private fun init() {
        setImage()
    }

    private fun setImage() {
        binding.ivImage.setImageURI(Uri.parse(intent.extras?.getString("image_uri")!!))
    }

}