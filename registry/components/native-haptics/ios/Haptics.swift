import UIKit

@objc(Haptics)
class Haptics: NSObject {

  @objc static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc func impact(_ style: NSString) {
    DispatchQueue.main.async {
      let feedbackStyle: UIImpactFeedbackGenerator.FeedbackStyle

      switch style {
      case "light":
        feedbackStyle = .light
      case "medium":
        feedbackStyle = .medium
      case "heavy":
        feedbackStyle = .heavy
      case "soft":
        if #available(iOS 13.0, *) {
          feedbackStyle = .soft
        } else {
          feedbackStyle = .light
        }
      case "rigid":
        if #available(iOS 13.0, *) {
          feedbackStyle = .rigid
        } else {
          feedbackStyle = .medium
        }
      default:
        feedbackStyle = .medium
      }

      let generator = UIImpactFeedbackGenerator(style: feedbackStyle)
      generator.prepare()
      generator.impactOccurred()
    }
  }

  @objc func selection() {
    DispatchQueue.main.async {
      let generator = UISelectionFeedbackGenerator()
      generator.prepare()
      generator.selectionChanged()
    }
  }

  @objc func notification(_ type: NSString) {
    DispatchQueue.main.async {
      let generator = UINotificationFeedbackGenerator()
      generator.prepare()

      switch type {
      case "success":
        generator.notificationOccurred(.success)
      case "warning":
        generator.notificationOccurred(.warning)
      case "error":
        generator.notificationOccurred(.error)
      default:
        generator.notificationOccurred(.success)
      }
    }
  }
}
