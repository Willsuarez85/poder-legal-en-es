// Stripe configuration with environment-based key selection
const getStripePublishableKey = () => {
  // Check if we're in production environment
  const isProduction = window.location.hostname !== 'localhost' && 
                      !window.location.hostname.includes('127.0.0.1') &&
                      !window.location.hostname.includes('preview.lovable.app');

  // Return production key if available and in production, otherwise test key
  const productionKey = "pk_live_51QsUtdRC0tkfGTyne3I9OVeufeYi9etGrPdt6gJQfWzzrHH4Xwo6ULKlfAnJq0tg0j8aGqesQRnmqLo4qLre21Ap0000btOiOa";
  const testKey = "pk_test_51RxqFiIBQw7kgyciyR040S9yhwdzeoYE3aUwc9xTjyBaTrBn6UtViiExe7jmqpj5RNsgc7tTvqzzkYV6vOiNl6tN00GPFCGtnT";

  if (isProduction) {
    return productionKey;
  }
  
  return testKey;
};

export const STRIPE_PUBLISHABLE_KEY = getStripePublishableKey();

// Note: This is a publishable key and is safe to include in client-side code
// For production, replace the productionKey variable above with your live publishable key (pk_live_...)