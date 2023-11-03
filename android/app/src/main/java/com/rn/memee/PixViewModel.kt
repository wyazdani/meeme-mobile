package com.rn.memee

import androidx.lifecycle.LiveData
import androidx.lifecycle.MutableLiveData
import androidx.lifecycle.ViewModel
import com.rn.memee.ModelList

/**
 * Created By Akshay Sharma on 17,June,2021
 * https://ak1.io
 */


internal class PixViewModel : ViewModel() {


    private val allImagesList by lazy { MutableLiveData(ModelList()) }

    val imageList: LiveData<ModelList> = allImagesList

    suspend fun retrieveImages(localResourceManager: LocalResourceManager) {
        val sizeInitial = 100
        allImagesList.postValue(
            localResourceManager.retrieveMedia(
                limit = sizeInitial
            )
        )
        val modelList = localResourceManager.retrieveMedia(
            start = sizeInitial + 1
        )
        if (modelList.list.isNotEmpty()) {
            allImagesList.postValue(modelList)
        }
    }


}

open class Event<out T>(private val content: T) {

    var hasBeenHandled = false
        private set // Allow external read but not write

    /**
     * Returns the content and prevents its use again.
     */
    fun getContentIfNotHandledOrReturnNull(): T? {
        return if (hasBeenHandled) {
            null
        } else {
            hasBeenHandled = true
            content
        }
    }

    /**
     * Returns the content, even if it's already been handled.
     */
    fun peekContent(): T = content
}
