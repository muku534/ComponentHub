package com.travelogger.haptics

import android.content.Context
import android.os.Build
import android.os.VibrationEffect
import android.os.Vibrator
import android.view.HapticFeedbackConstants
import android.view.View
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class HapticsModule(
  private val reactContext: ReactApplicationContext
) : ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "Haptics"

  private fun vibrate(duration: Long, amplitude: Int) {
    val vibrator =
      reactContext.getSystemService(Context.VIBRATOR_SERVICE) as Vibrator

    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
      vibrator.vibrate(
        VibrationEffect.createOneShot(duration, amplitude)
      )
    } else {
      @Suppress("DEPRECATION")
      vibrator.vibrate(duration)
    }
  }

  @ReactMethod
  fun impact(style: String) {
    when (style) {
      "light" -> vibrate(10, 50)
      "medium" -> vibrate(20, 120)
      "heavy" -> vibrate(30, 255)
      else -> vibrate(15, 100)
    }
  }

  @ReactMethod
  fun selection() {
    val activity = reactContext.currentActivity ?: return

    activity.window.decorView.performHapticFeedback(
      HapticFeedbackConstants.KEYBOARD_TAP,
      HapticFeedbackConstants.FLAG_IGNORE_GLOBAL_SETTING
    )
  }

  @ReactMethod
  fun notification(type: String) {
    when (type) {
      "success" -> vibrate(40, 180)
      "warning" -> vibrate(60, 200)
      "error" -> vibrate(80, 255)
    }
  }
}
