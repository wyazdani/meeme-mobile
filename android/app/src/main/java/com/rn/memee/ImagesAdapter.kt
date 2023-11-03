package com.rn.memee


import android.view.LayoutInflater
import android.view.ViewGroup
import androidx.recyclerview.widget.RecyclerView
import com.bumptech.glide.Glide
import com.rn.memee.databinding.ItemCameraBinding
import com.rn.memee.databinding.ItemImageBinding

class ImagesAdapter(private var imagesList: ArrayList<Img>,var imageListener: ImageListener) :
    RecyclerView.Adapter<RecyclerView.ViewHolder>() {


    override fun getItemViewType(position: Int): Int {
        return if(imagesList[position].isCameraPlaceHolder)
            0
        else
            1
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): RecyclerView.ViewHolder {
        if (viewType == 0)
            return CameraVH(ItemCameraBinding.inflate(LayoutInflater.from(parent.context), null, false))
        else
            return ImagesVH(ItemImageBinding.inflate(LayoutInflater.from(parent.context), null, false))
    }

    override fun getItemCount(): Int {
        return imagesList.size
    }

    override fun onBindViewHolder(holder: RecyclerView.ViewHolder, position: Int) {
        if (holder is CameraVH && position == 0)
            holder.bind()
        else if (holder is ImagesVH)
            holder.bind(imagesList[position])
    }

    inner class ImagesVH(private var binding: ItemImageBinding) : RecyclerView.ViewHolder(binding.root) {

        init {
            binding.root.setOnClickListener {
                imageListener.onSelectImage(imagesList[adapterPosition])
            }
        }

        fun bind(img: Img) {
            Glide.with(binding.ivThumbnail)
                .asBitmap()
                .load(img.contentUrl)
                .centerCrop()
                .into(binding.ivThumbnail)
        }
    }

    inner class CameraVH(private val binding: ItemCameraBinding) : RecyclerView.ViewHolder(binding.root) {

        init {
            binding.root.setOnClickListener {
                imageListener.onCaptureImage()
            }
        }

        fun bind() {

        }
    }
}
