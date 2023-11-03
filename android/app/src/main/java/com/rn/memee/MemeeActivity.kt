package com.rn.memee

import android.content.Intent
import android.os.Build
import android.os.Bundle
import android.util.Log
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.recyclerview.widget.GridLayoutManager
import com.rn.memee.LocalResourceManager
import com.rn.memee.PixViewModel
import com.permissionx.guolindev.PermissionX
import com.rn.memee.databinding.ActivityMemeeBinding
import kotlinx.coroutines.CoroutineScope
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.cancel
import kotlinx.coroutines.isActive
import kotlinx.coroutines.launch


class MemeeActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMemeeBinding
    private val imagesViewModel: PixViewModel by viewModels()

    private lateinit var imagesAdapter: ImagesAdapter
    private var images: ArrayList<Img> = ArrayList()

    private var scope = CoroutineScope(Dispatchers.IO)

    lateinit var permissions: ArrayList<String>

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMemeeBinding.inflate(layoutInflater)
        setContentView(binding.root)
        init()
    }

    private fun init() {
        checkPermissions()
        images.add(Img(isCameraPlaceHolder = true))

    }

    private fun checkPermissions() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.TIRAMISU) {
            permissions = arrayListOf(
                android.Manifest.permission.READ_MEDIA_IMAGES,
            )
        } else {
            permissions = arrayListOf(
                android.Manifest.permission.WRITE_EXTERNAL_STORAGE,
            )
        }

        PermissionX.init(this)
            .permissions(permissions)
            .request { allGranted, grantedList, deniedList ->
                if (allGranted) {
                    observeImages()
                    setImagesAdapter()
                } else {
                    Toast.makeText(this, "These permissions are denied: $deniedList", Toast.LENGTH_LONG).show()
                }
            }
    }

    private fun observeImages() {
        imagesViewModel.imageList.observe(this) {
            Log.wtf("Total Images", it.list.size.toString())
            images.addAll(it.list)
            if (::imagesAdapter.isInitialized)
                imagesAdapter.notifyDataSetChanged()
        }
    }

    private fun setImagesAdapter() {
        binding.rvImages.post {
            imagesAdapter = ImagesAdapter(images, object : ImageListener {
                override fun onSelectImage(image: Img) {
                    startActivity(Intent(this@MemeeActivity, ImageSelectedActivity::class.java).apply {
                        putExtra("image_uri", image.contentUrl.toString())
                    })
                }

                override fun onCaptureImage() {
                    startActivity(Intent(this@MemeeActivity, CaptureActivity::class.java))
                }

            })
            binding.rvImages.adapter = imagesAdapter
            binding.rvImages.layoutManager = GridLayoutManager(applicationContext, 3)
            retrieveMedia()
        }
    }

    private fun retrieveMedia() {
        if (scope.isActive) {
            scope.cancel()
        }
        scope = CoroutineScope(Dispatchers.IO)
        scope.launch {
            val localResourceManager = LocalResourceManager(applicationContext).apply { }
            if (images.size > 1) {
                images.clear()
                images.add(Img(isCameraPlaceHolder = true))
            }

            imagesViewModel.retrieveImages(localResourceManager)
        }
    }

}