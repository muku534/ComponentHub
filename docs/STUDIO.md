# Form Studio & New Components Documentation

Welcome to the comprehensive guide for **Form Studio** and the newly added NativeCN components: **Custom Inputs** and the **Gradient Button**.

---

## 🎨 1. Form Studio

Form Studio is a powerful, interactive drag-and-drop builder that allows you to visually construct React Native forms, configure their properties, and instantly generate clean, production-ready React Native JSX code.

### 🌟 Key Features

#### 📱 Realistic Device Mockups
* **Cross-Platform Previews**: Switch seamlessly between **iPhone 15 Pro** (with Dynamic Island) and **Pixel 8** (with native Android navigation bars) device frames.
* **True Drop Freedom**: Drag components directly onto the device canvas. You can drop them anywhere inside the mockup frame, not just at the bottom of a list.
* **Interactive Previews**: The components rendered inside the phone are interactive equivalents of their React Native counterparts. You can click into TextInputs, toggle passwords (👁/🙈), and trigger switches directly in the web browser.

#### ⚙️ Interactive Props Panel
* When you select a component on the canvas, the right-hand **Props Panel** dynamically updates to show that specific component's configurability.
* Real-time edits to properties (like placeholder text, labels, button colors, and widths) instantly reflect on the device canvas.
* Configuration changes are safely stored and auto-saved to your local session (TTL: 60 minutes).

#### 💻 Real-Time Code Generation
* **View Code & Export**: Click the "View Code →" or "Export Code →" buttons at any time to see the cleanly formatted, highly optimized React Native JSX that represents your exact visual layout.
* Component imports, state variables (`useState` for passwords and inputs), validation states (`emailError`), and structured container `View`s are all automatically generated for you.
* The output is completely agnostic of third-party routing, ready to be copied and pasted directly into your Expo or React Native CLI project.

#### 📊 Comprehensive Analytics
* Every interaction is elegantly tracked via NativeCN Telemetry without impacting the user experience.
* The Admin Dashboard captures: `Landing Views`, `Builder Sessions`, `Drag/Drop Component Adds`, `Prop Updates`, `Code Views`, `Code Copies`, and `Studio Exports`.

---

## ⌨️ 2. Custom Inputs Suite

To make form generation incredibly rapid, Form Studio introduces the **Custom Inputs suite**—a set of 7 specialized input fields engineered for specific use-cases.

### The 7 Variants:
1. **Text Input** (✏️): The standard, versatile labeled text entry field.
2. **Email Input** (📧): Automatically configures `keyboardType="email-address"` and `autoCapitalize="none"`. Includes built-in error message configurations.
3. **Password Input** (🔒): Features `secureTextEntry={true}` by default, and automatically pairs with a generated `showPassword` state variable to toggle password visibility.
4. **Phone Input** (📞): Triggers the native `keyboardType="phone-pad"`.
5. **Number Input** (🔢): Triggers the native `keyboardType="numeric"`.
6. **Search Input** (🔍): A specialized input field optimized for search queries (often with a clear button or search icon).
7. **Multiline Input** (📄): Configures `multiline={true}` and adjusts the height for text areas, perfect for comments, bios, or descriptions.

### Shared Capabilities
* Every Custom Input supports conditional **Error Messages**. If you configure an `errorMessage` in the Studio, the generated code wraps the input in validation logic (e.g., displaying the red error string below the input bordered in red).
* Full control over visual properties: `label`, `placeholder`, `description`, etc.

---

## ✨ 3. Gradient Button

The **Gradient Button** is a premium, highly customizable React Native button that utilizes `expo-linear-gradient` to create beautiful, sweeping color transitions.

### Key Capabilities
* **Customizable Dimensions**: Unlike generic buttons that strictly stretch to `100%` width, the Gradient Button allows for strict pixel sizing (e.g., `width: 250`, `height: 50`) alongside percentages.
* **Color Stops**: Define exact hex codes for `color1` (left) and `color2` (right) to create striking horizontal gradients (e.g., `#FF5F6D` to `#FFC371`).
* **Radius Control**: Fully adjustable `borderRadius` for pill-shaped, rounded-rectangle, or sharp square designs.
* **Text Shadows & Polish**: Includes subtle iOS/Android shadows and text drop-shadows to ensure the label remains highly readable regardless of the vibrant background colors.

### Usage in Studio
Just drag it into the phone canvas, select it, and use the Props Panel to experiment with colors until you find the perfect aesthetic. The Studio generates the exact `<LinearGradient>` bounding box and text structure required.
