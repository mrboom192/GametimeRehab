const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

// Get the default Metro configuration
const defaultConfig = getDefaultConfig(__dirname);

// Extend the resolver to include `.cjs` files
defaultConfig.resolver.sourceExts.push("cjs");

// Apply the NativeWind Metro configuration
module.exports = withNativeWind(defaultConfig, { input: "./global.css" });
