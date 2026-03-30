// Shared filter option constants used by the Search feature.
// Keeping these in one place makes filter UIs and dummy specs deterministic.

export const OPERATING_SYSTEM_OPTIONS = ['Android', 'iOS', 'HarmonyOS', 'RTOS', 'Proprietary OS']
export const DISPLAY_OPTIONS = ['6.1 inch', '6.5 inch', '6.7 inch', '10.1 inch', '11.0 inch']
export const BATTERY_OPTIONS = ['1500-2499 mAh', '2500-3999 mAh', '4000-5499 mAh', '5500+ mAh']
export const PROCESSOR_CLOCK_OPTIONS = ['1.8 GHz', '2.0 GHz', '2.2 GHz', '2.4 GHz', '2.8 GHz']
export const PRIMARY_CAMERA_OPTIONS = ['8 MP', '12 MP', '24 MP', '48 MP', '64 MP']
export const VOICE_CALLING_OPTIONS = ['Yes', 'No']
export const DISCOUNT_BUCKETS = ['0-9%', '10-19%', '20-29%', '30%+']

export const INITIAL_EXPANDED_SECTIONS = {
  categories: true,
  brand: true,
  operatingSystem: true,
  display: true,
  customerRatings: true,
  batteryCapacity: true,
  processorClockSpeed: true,
  primaryCamera: true,
  voiceCallingFacility: true,
  discount: true,
}
